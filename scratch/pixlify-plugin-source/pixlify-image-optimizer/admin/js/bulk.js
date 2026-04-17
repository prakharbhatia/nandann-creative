/* global pixlify */
(function ($) {
    'use strict';

    var BulkOptimizer = {
        autoRunning:     false,
        autoTimer:       null,
        bgMode:          false,   // true after a 502 — PHP is running in background
        bgSkipCount:     0,       // consecutive "skipped" (locked) responses in bgMode
        normalSkipCount: 0,       // consecutive "skipped" in normal mode (stale lock detector)
        tickerInterval:  null,    // setInterval handle for live elapsed-time display
        tickerStart:     0,       // Date.now() when current batch AJAX was fired

        init: function () {
            if ( ! $( '#pixlify-btn-queue-all' ).length ) return;

            $( '#pixlify-btn-queue-all' ).on( 'click', this.queueAll.bind( this ) );
            $( '#pixlify-btn-run-batch' ).on( 'click', this.runBatch.bind( this ) );
            $( '#pixlify-btn-run-all' ).on( 'click', this.toggleAutoRun.bind( this ) );
            $( '#pixlify-btn-cancel' ).on( 'click', this.cancelQueue.bind( this ) );
            $( '#pixlify-clear-log' ).on( 'click', function () {
                $( '#pixlify-log' ).html( '<p class="pixlify-log-placeholder">Log cleared.</p>' );
            } );

            $( '#pixlify-btn-release-lock' ).on( 'click', this.releaseLock.bind( this ) );

            // Process manager.
            $( '#pixlify-btn-refresh-processes' ).on( 'click', this.loadProcesses.bind( this ) );
            $( '#pixlify-btn-kill-all' ).on( 'click', this.killAll.bind( this ) );
            $( document ).on( 'click', '.pixlify-btn-kill-process', this.killProcess.bind( this ) );

            // Error log retry actions.
            $( document ).on( 'click', '.pixlify-btn-retry', this.retryOne.bind( this ) );
            $( '#pixlify-retry-all-errors' ).on( 'click', this.retryAll.bind( this ) );

            // Force re-optimize (after format change).
            $( '#pixlify-btn-force-reopt' ).on( 'click', this.forceReoptimize.bind( this ) );

            this.pollStatus();
            this.loadProcesses();
        },

        queueAll: function () {
            var self = this;
            self.setStatus( 'info', 'Building queue of all unconverted images…' );
            self.setButtonsDisabled( true );

            $.post( pixlify.ajax_url, {
                action: 'pixlify_queue_all',
                nonce:  pixlify.nonce
            } ).done( function ( res ) {
                if ( res.success ) {
                    self.setStatus( 'success', 'Queue built: ' + res.data.total + ' images queued.' );
                    self.log( 'info', 'Queue created — ' + res.data.total + ' images pending.' );
                    self.pollStatus();
                } else {
                    self.setStatus( 'error', res.data || 'Unknown error.' );
                }
            } ).always( function () {
                self.setButtonsDisabled( false );
            } );
        },

        runBatch: function () {
            var self = this;
            self.setStatus( 'info', pixlify.strings.processing );

            $.post( pixlify.ajax_url, {
                action: 'pixlify_run_batch',
                nonce:  pixlify.nonce
            } ).done( function ( res ) {
                if ( res.success ) {
                    var d = res.data;
                    self.updateProgress( d );
                    self.logBatchResults( d );
                    if ( d.remaining === 0 ) {
                        self.setStatus( 'success', pixlify.strings.complete + ' All images converted.' );
                        self.stopAutoRun();
                    } else {
                        self.setStatus( 'info', d.processed + ' done this batch. ' + d.remaining + ' remaining.' );
                    }
                } else {
                    self.setStatus( 'error', res.data || 'Unknown error.' );
                    self.log( 'err', 'Server returned error: ' + ( res.data || 'no detail' ) );
                    self.stopAutoRun();
                }
            } ).fail( function ( jqXHR, textStatus, errorThrown ) {
                var httpStatus  = jqXHR.status || 0;
                var rawResponse = ( jqXHR.responseText || '' ).substring( 0, 400 ).replace( /\s+/g, ' ' );
                self.setStatus( 'error', 'HTTP ' + httpStatus + ' error — server did not respond correctly.' );
                self.log( 'err', 'HTTP ' + httpStatus + ' ' + textStatus + ( errorThrown ? ' — ' + errorThrown : '' ) );
                if ( rawResponse ) {
                    self.log( 'err', 'Server response: ' + rawResponse );
                }
                self.stopAutoRun();
            } );
        },

        toggleAutoRun: function () {
            if ( this.autoRunning ) {
                this.stopAutoRun();
                this.setStatus( 'info', 'Auto-processing stopped.' );
                this.log( 'info', 'Auto-processing stopped by user.' );
            } else {
                this.autoRunning = true;
                $( '#pixlify-btn-run-all' ).html(
                    '<span class="dashicons dashicons-update pixlify-spin" style="vertical-align:middle;margin-top:-2px;margin-right:4px;"></span>Stop Auto-Processing'
                );
                this.runNext();
            }
        },

        /**
         * Start the live elapsed-time ticker in the status bar.
         * Shows "Processing batch… 0s" and increments every second so the user
         * knows PHP is working even during a 40-second batch.
         */
        startTicker: function ( batchNum, totalBatches ) {
            var self = this;
            self.stopTicker();
            self.tickerStart = Date.now();

            var batchLabel = ( batchNum && totalBatches )
                ? ' (batch ' + batchNum + ' of ~' + totalBatches + ')'
                : '';

            self.tickerInterval = setInterval( function () {
                var elapsed = Math.floor( ( Date.now() - self.tickerStart ) / 1000 );
                self.setStatus( 'info',
                    'Processing batch' + batchLabel + '… ' + elapsed + 's elapsed — please wait.' );
            }, 1000 );

            // Show 0s immediately.
            self.setStatus( 'info', 'Processing batch' + batchLabel + '… 0s elapsed — please wait.' );
        },

        stopTicker: function () {
            if ( this.tickerInterval ) {
                clearInterval( this.tickerInterval );
                this.tickerInterval = null;
            }
        },

        runNext: function () {
            var self = this;
            if ( ! self.autoRunning ) return;

            // Work out approx batch number for the ticker label.
            var remaining   = parseInt( $( '#pixlify-stat-remaining' ).text(), 10 ) || 0;
            var total       = parseInt( $( '#pixlify-stat-total' ).text(), 10 ) || 0;
            var settings    = typeof pixlify.batch_size !== 'undefined' ? parseInt( pixlify.batch_size, 10 ) : 0;
            var batchNum    = 0;
            var totalBatches = 0;
            if ( settings > 0 && total > 0 ) {
                totalBatches = Math.ceil( total / settings );
                batchNum     = Math.ceil( ( total - remaining ) / settings ) + 1;
            }

            self.startTicker( batchNum, totalBatches );

            $.post( pixlify.ajax_url, {
                action: 'pixlify_run_batch',
                nonce:  pixlify.nonce
            } ).done( function ( res ) {
                self.stopTicker();

                if ( res.success ) {
                    var d = res.data;

                    // Batch was locked by a previous request still in flight.
                    if ( d.skipped ) {
                        self.bgSkipCount++;
                        $( '#pixlify-btn-release-lock' ).show();

                        if ( self.bgMode ) {
                            // We know PHP is running in background after a 502.
                            // Poll slowly (every 15 s) so we don't hammer the server.
                            var waited = self.bgSkipCount * 15;
                            self.setStatus( 'warning', 'PHP processing images in background… checking again in 15 s (' + waited + 's elapsed). Use "Release Lock" only if stuck.' );
                            if ( self.bgSkipCount === 1 ) {
                                self.log( 'info', 'PHP is running in background (ignore_user_abort). Polling every 15 s until batch finishes.' );
                            }
                            if ( self.autoRunning ) {
                                self.autoTimer = setTimeout( function () { self.runNext(); }, 15000 );
                            }
                        } else {
                            // Normal locked state — another tab/cron may be running.
                            self.normalSkipCount++;

                            if ( self.normalSkipCount >= 4 ) {
                                self.log( 'info', 'Lock held for ' + ( self.normalSkipCount * 5 ) + 's with no active batch — releasing stale lock automatically.' );
                                self.normalSkipCount = 0;
                                $.post( pixlify.ajax_url, { action: 'pixlify_release_lock', nonce: pixlify.nonce } )
                                    .done( function () {
                                        $( '#pixlify-btn-release-lock' ).hide();
                                        self.loadProcesses();
                                        if ( self.autoRunning ) {
                                            self.runNext(); // immediate retry after stale-lock release
                                        }
                                    } );
                                return;
                            }

                            self.setStatus( 'warning', 'Previous batch still running — waiting 5 s… (' + self.normalSkipCount + '/4 before auto-release)' );
                            self.log( 'info', 'Batch locked. Retrying in 5 s. Use "Release Lock" if this persists.' );
                            if ( self.autoRunning ) {
                                self.autoTimer = setTimeout( function () { self.runNext(); }, 5000 );
                            }
                        }
                        return;
                    }

                    var wasInBgMode = self.bgMode;

                    // Reset all lock counters.
                    self.bgMode          = false;
                    self.bgSkipCount     = 0;
                    self.normalSkipCount = 0;

                    $( '#pixlify-btn-release-lock' ).hide();

                    if ( wasInBgMode ) {
                        self.log( 'info', 'Background batch finished — server-side processing complete. Resuming normal batches.' );
                        self.loadProcesses();
                    }

                    self.updateProgress( d );
                    self.logBatchResults( d );

                    if ( d.remaining > 0 && self.autoRunning ) {
                        // Fire next batch immediately — no artificial delay.
                        // (A tiny 50 ms yield lets the browser repaint the progress update first.)
                        self.autoTimer = setTimeout( function () { self.runNext(); }, 50 );
                    } else {
                        self.setStatus( 'success', pixlify.strings.complete + ' All images optimized!' );
                        self.stopAutoRun();
                    }
                } else {
                    self.setStatus( 'error', res.data || 'Unknown error.' );
                    self.log( 'err', 'Server returned error: ' + ( res.data || 'no detail' ) );
                    self.stopAutoRun();
                }
            } ).fail( function ( jqXHR, textStatus, errorThrown ) {
                self.stopTicker();

                var httpStatus  = jqXHR.status || 0;
                var rawResponse = ( jqXHR.responseText || '' ).substring( 0, 400 ).replace( /\s+/g, ' ' );

                self.log( 'err', 'HTTP ' + httpStatus + ' ' + textStatus + ( errorThrown ? ' — ' + errorThrown : '' ) );
                if ( rawResponse ) {
                    self.log( 'err', 'Server response: ' + rawResponse );
                }

                if ( ( httpStatus === 504 || httpStatus === 502 || httpStatus === 0 ) && self.autoRunning ) {
                    self.bgMode      = true;
                    self.bgSkipCount = 0;
                    self.setStatus( 'warning', 'Server returned ' + httpStatus + ' — PHP is still running in background. Will check in 15 s…' );
                    self.log( 'info', 'Gateway timeout — PHP batch still running server-side (ignore_user_abort active). Switching to background polling.' );
                    self.autoTimer = setTimeout( function () { self.runNext(); }, 15000 );
                } else {
                    self.setStatus( 'error', 'HTTP ' + httpStatus + ' error — auto-run stopped. Check your server error log.' );
                    self.stopAutoRun();
                }
            } );
        },

        stopAutoRun: function () {
            this.autoRunning     = false;
            this.bgMode          = false;
            this.bgSkipCount     = 0;
            this.normalSkipCount = 0;
            clearTimeout( this.autoTimer );
            this.stopTicker();
            $( '#pixlify-btn-run-all' ).html(
                '<span class="dashicons dashicons-controls-play" style="vertical-align:middle;margin-top:-2px;margin-right:4px;"></span>Optimize All'
            );
        },

        releaseLock: function () {
            var self = this;
            $.post( pixlify.ajax_url, {
                action: 'pixlify_release_lock',
                nonce:  pixlify.nonce
            } ).done( function ( res ) {
                if ( res.success ) {
                    $( '#pixlify-btn-release-lock' ).hide();
                    self.setStatus( 'info', 'Lock released. You can now start a new batch.' );
                    self.log( 'info', 'Batch lock manually released.' );
                    self.pollStatus();
                }
            } );
        },

        cancelQueue: function () {
            var self = this;
            if ( ! window.confirm( 'Cancel the remaining queue?' ) ) return;
            self.stopAutoRun();

            $.post( pixlify.ajax_url, {
                action: 'pixlify_cancel_queue',
                nonce:  pixlify.nonce
            } ).done( function ( res ) {
                if ( res.success ) {
                    self.setStatus( 'info', 'Queue cancelled.' );
                    self.log( 'info', 'Queue cancelled by user.' );
                    self.updateProgress( { total: 0, processed: 0, remaining: 0, percent: 0 } );
                }
            } );
        },

        pollStatus: function () {
            var self = this;
            $.post( pixlify.ajax_url, {
                action: 'pixlify_queue_status',
                nonce:  pixlify.nonce
            } ).done( function ( res ) {
                if ( res.success ) {
                    self.updateProgress( res.data );
                }
            } );
        },

        updateProgress: function ( d ) {
            var pct      = d.percent || 0;
            var circumf  = 2 * Math.PI * 44;
            var dashOff  = circumf - ( circumf * pct / 100 );

            $( '#pixlify-progress-bar' ).css( 'width', pct + '%' );
            if ( pct >= 100 ) {
                $( '#pixlify-progress-bar' ).addClass( 'is-complete' );
            }
            $( '#pixlify-stat-processed' ).text( d.processed || 0 );
            $( '#pixlify-stat-total' ).text( d.total || 0 );
            $( '#pixlify-stat-remaining' ).text( d.remaining || 0 );
            $( '#pixlify-stat-percent' ).text( pct );

            // Update SVG ring.
            $( '.pixlify-bulk-ring-wrap .pixlify-ring-fill' )
                .attr( 'stroke-dashoffset', dashOff.toFixed( 2 ) );
            $( '.pixlify-bulk-pct #pixlify-stat-percent' ).text( pct );

            var hasQueue = ( d.remaining || 0 ) > 0;
            $( '#pixlify-btn-run-batch, #pixlify-btn-run-all, #pixlify-btn-cancel' ).prop( 'disabled', ! hasQueue );
        },

        setButtonsDisabled: function ( state ) {
            $( '#pixlify-btn-queue-all, #pixlify-btn-run-batch, #pixlify-btn-run-all, #pixlify-btn-cancel' ).prop( 'disabled', state );
        },

        setStatus: function ( type, msg ) {
            $( '#pixlify-status-msg' )
                .removeClass( 'is-info is-success is-error' )
                .addClass( 'is-' + type )
                .text( msg );
        },

        logBatchResults: function ( d ) {
            var self = this;

            // Summary header.
            var summaryType = ( d.processed > 0 ) ? 'ok' : 'info';
            var summaryMsg  = 'Batch complete — ' + d.processed + ' image(s) processed';
            if ( d.total_elapsed ) {
                summaryMsg += ' in ' + d.total_elapsed + 's';
            }
            summaryMsg += '. ' + d.remaining + ' remaining.';
            self.log( summaryType, summaryMsg );

            // Stray PHP output (notices/warnings) that would otherwise corrupt the response.
            if ( d.php_output ) {
                self.log( 'err', 'PHP output detected (may indicate a server error): ' + d.php_output );
            }

            // Per-image detail.
            if ( d.results && d.results.length ) {
                $.each( d.results, function ( i, r ) {
                    if ( ! r.name && ! r.id ) {
                        // Time-limit warning row.
                        self.log( 'err', r.error );
                        return;
                    }
                    var label = r.name ? r.name : ( 'ID #' + r.id );
                    if ( r.success ) {
                        var detail = label + ' ✓';
                        if ( r.saved && r.saved !== '0 B' ) {
                            detail += ' — saved ' + r.saved;
                        }
                        if ( r.elapsed ) {
                            detail += ' (' + r.elapsed + 's)';
                        }
                        self.log( 'ok', detail );
                    } else {
                        var errDetail = label + ' ✗';
                        if ( r.elapsed ) {
                            errDetail += ' (' + r.elapsed + 's)';
                        }
                        errDetail += ' — ' + ( r.error || 'Unknown error' );
                        self.log( 'err', errDetail );
                    }
                } );
            } else if ( d.processed === 0 && ! d.skipped ) {
                self.log( 'info', 'No images were processed — queue may be empty or all images already converted.' );
            }
        },

        retryOne: function ( e ) {
            var self = this;
            var $btn = $( e.currentTarget );
            var id   = parseInt( $btn.data( 'id' ), 10 );

            $btn.prop( 'disabled', true ).text( '…' );

            $.post( pixlify.ajax_url, {
                action:        'pixlify_retry_one',
                nonce:         pixlify.nonce,
                attachment_id: id
            } ).done( function ( res ) {
                if ( res.success ) {
                    $( '#pixlify-err-row-' + id ).fadeOut( 300, function () { $( this ).remove(); } );
                    self.log( 'ok', 'Retried attachment #' + id + ' — success.' );
                } else {
                    $btn.prop( 'disabled', false ).text( 'Retry' );
                    self.log( 'err', 'Retry #' + id + ' failed: ' + ( res.data || 'unknown' ) );
                }
            } ).fail( function () {
                $btn.prop( 'disabled', false ).text( 'Retry' );
                self.log( 'err', 'Network error retrying #' + id );
            } );
        },

        retryAll: function () {
            var self = this;
            $( '#pixlify-retry-status' )
                .removeClass( 'is-success is-error' ).addClass( 'is-info' )
                .text( 'Retrying all failed images…' );
            $( '#pixlify-retry-all-errors' ).prop( 'disabled', true );

            $.post( pixlify.ajax_url, {
                action: 'pixlify_retry_all_errors',
                nonce:  pixlify.nonce
            } ).done( function ( res ) {
                if ( res.success ) {
                    var d = res.data;
                    $( '#pixlify-retry-status' )
                        .removeClass( 'is-info' )
                        .addClass( d.errors > 0 ? 'is-warning' : 'is-success' )
                        .text( d.message );
                    self.log( 'ok', 'Retry-all complete: ' + d.message );
                    if ( d.retried > 0 && d.errors === 0 ) {
                        $( '#pixlify-error-log-card' ).fadeOut( 600 );
                    } else {
                        $( '#pixlify-retry-all-errors' ).prop( 'disabled', false );
                        // Reload to show updated error list.
                        setTimeout( function () { window.location.reload(); }, 1500 );
                    }
                } else {
                    $( '#pixlify-retry-status' ).removeClass( 'is-info' ).addClass( 'is-error' ).text( res.data || 'Unknown error.' );
                    $( '#pixlify-retry-all-errors' ).prop( 'disabled', false );
                }
            } ).fail( function () {
                $( '#pixlify-retry-status' ).removeClass( 'is-info' ).addClass( 'is-error' ).text( 'Network error.' );
                $( '#pixlify-retry-all-errors' ).prop( 'disabled', false );
            } );
        },

        // ---------------------------------------------------------------------
        // Force Re-optimize
        // ---------------------------------------------------------------------

        forceReoptimize: function () {
            var self = this;
            if ( ! window.confirm(
                'This will clear ALL conversion history and re-queue every image for optimization.\n\n' +
                'Use this after changing the output format (e.g. AVIF → WebP+AVIF).\n\n' +
                'Continue?'
            ) ) return;

            self.stopAutoRun();
            var $btn = $( '#pixlify-btn-force-reopt' );
            $btn.prop( 'disabled', true ).text( 'Resetting…' );
            self.setStatus( 'info', 'Clearing conversion history and rebuilding queue…' );

            $.post( pixlify.ajax_url, {
                action: 'pixlify_force_reoptimize',
                nonce:  pixlify.nonce
            } ).done( function ( res ) {
                if ( res.success ) {
                    var d = res.data;
                    self.log( 'ok', 'Force re-optimize: ' + d.message );
                    self.setStatus( 'success', d.message );
                    self.updateProgress( { total: d.total, processed: 0, remaining: d.total, percent: 0 } );
                    self.loadProcesses();
                } else {
                    self.log( 'err', 'Force re-optimize failed: ' + ( res.data || 'unknown error' ) );
                    self.setStatus( 'error', res.data || 'Failed to reset. Please try again.' );
                }
            } ).fail( function () {
                self.log( 'err', 'Network error during force re-optimize.' );
                self.setStatus( 'error', 'Network error. Please try again.' );
            } ).always( function () {
                $btn.prop( 'disabled', false ).html(
                    '<span class="dashicons dashicons-image-rotate" style="vertical-align:middle;margin-top:-2px;margin-right:4px;"></span>Force Re-optimize All'
                );
            } );
        },

        // ---------------------------------------------------------------------
        // Process Manager
        // ---------------------------------------------------------------------

        loadProcesses: function () {
            var self = this;
            $( '#pixlify-btn-refresh-processes' ).find( '.dashicons' ).addClass( 'pixlify-spin' );

            $.post( pixlify.ajax_url, {
                action: 'pixlify_get_processes',
                nonce:  pixlify.nonce
            } ).done( function ( res ) {
                if ( res.success && res.data && res.data.processes ) {
                    self.renderProcesses( res.data.processes );
                } else {
                    var errMsg = ( res && res.data ) ? res.data : 'Server returned an error.';
                    $( '#pixlify-processes-list' ).html(
                        '<p style="color:var(--px-danger);font-size:.85rem;">⚠ Could not load processes: ' + errMsg + '</p>'
                    );
                }
            } ).fail( function ( jqXHR ) {
                var status = jqXHR.status || 0;
                $( '#pixlify-processes-list' ).html(
                    '<p style="color:var(--px-danger);font-size:.85rem;">⚠ Network error loading processes (HTTP ' + status + '). <a href="#" id="pixlify-retry-processes">Retry</a></p>'
                );
                $( document ).one( 'click', '#pixlify-retry-processes', function ( e ) {
                    e.preventDefault();
                    self.loadProcesses();
                } );
            } ).always( function () {
                $( '#pixlify-btn-refresh-processes' ).find( '.dashicons' ).removeClass( 'pixlify-spin' );
            } );
        },

        renderProcesses: function ( processes ) {
            var $list = $( '#pixlify-processes-list' );
            if ( ! processes || ! processes.length ) {
                $list.html( '<p class="description">No processes found.</p>' );
                return;
            }

            var html = '<table class="pixlify-process-table"><tbody>';
            $.each( processes, function ( i, p ) {
                var dotCls = p.active ? 'pixlify-proc-dot is-active' : 'pixlify-proc-dot is-idle';
                var killBtn = p.killable
                    ? '<button class="button button-small pixlify-btn-kill-process pixlify-btn-danger-soft" data-id="' + p.id + '">Kill</button>'
                    : '<span style="color:var(--px-muted);font-size:.8rem;">—</span>';
                html += '<tr>' +
                    '<td><span class="' + dotCls + '"></span></td>' +
                    '<td class="proc-label"><strong>' + p.label + '</strong><br><span class="proc-desc">' + p.description + '</span></td>' +
                    '<td class="proc-status">' + p.status + '</td>' +
                    '<td class="proc-action">' + killBtn + '</td>' +
                    '</tr>';
            } );
            html += '</tbody></table>';

            $list.html( html );
        },

        killProcess: function ( e ) {
            var self       = this;
            var $btn       = $( e.currentTarget );
            var processId  = $btn.data( 'id' );

            if ( ! window.confirm( 'Kill process "' + processId + '"? This cannot be undone.' ) ) return;

            $btn.prop( 'disabled', true ).text( '…' );

            $.post( pixlify.ajax_url, {
                action:     'pixlify_kill_process',
                nonce:      pixlify.nonce,
                process_id: processId
            } ).done( function ( res ) {
                if ( res.success ) {
                    self.log( 'info', 'Process killed: ' + processId );
                    self.loadProcesses();
                    self.pollStatus();
                    if ( processId === 'ajax_lock' ) {
                        $( '#pixlify-btn-release-lock' ).hide();
                        self.bgMode      = false;
                        self.bgSkipCount = 0;
                    }
                } else {
                    self.log( 'err', 'Kill failed: ' + ( res.data || 'unknown' ) );
                    $btn.prop( 'disabled', false ).text( 'Kill' );
                }
            } ).fail( function () {
                self.log( 'err', 'Network error killing process.' );
                $btn.prop( 'disabled', false ).text( 'Kill' );
            } );
        },

        killAll: function () {
            var self = this;
            if ( ! window.confirm( 'Kill ALL processes and clear the image queue? The queue will need to be rebuilt.' ) ) return;

            self.stopAutoRun();
            $( '#pixlify-btn-kill-all' ).prop( 'disabled', true ).text( 'Killing…' );

            $.post( pixlify.ajax_url, {
                action:     'pixlify_kill_process',
                nonce:      pixlify.nonce,
                process_id: 'all'
            } ).done( function ( res ) {
                if ( res.success ) {
                    self.log( 'info', 'All processes killed and queue cleared.' );
                    self.loadProcesses();
                    self.pollStatus();
                    $( '#pixlify-btn-release-lock' ).hide();
                    self.setStatus( 'info', 'All stopped. Rebuild queue to start again.' );
                }
            } ).always( function () {
                $( '#pixlify-btn-kill-all' ).prop( 'disabled', false ).text( 'Kill All & Clear Queue' );
            } );
        },

        log: function ( type, msg ) {
            var $log = $( '#pixlify-log' );
            $log.find( '.pixlify-log-placeholder' ).remove();
            var ts = new Date().toLocaleTimeString();
            var $line = $( '<div>' )
                .append( $( '<span>' ).addClass( 'log-ts' ).text( '[' + ts + ']' ) )
                .append( $( '<span>' ).addClass( 'log-' + type ).text( ' ' + msg ) );
            $log.append( $line );
            $log.scrollTop( $log[ 0 ].scrollHeight );
        }
    };

    $( document ).ready( function () {
        BulkOptimizer.init();
    } );

}( jQuery ));
