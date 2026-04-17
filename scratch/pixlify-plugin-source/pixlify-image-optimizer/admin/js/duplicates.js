/* global pixlify, wp */
(function ($) {
    'use strict';

    var DuplicateManager = {
        currentType: 'unused',
        selectedIds: [],

        init: function () {
            if ( ! $( '.pixlify-scan-tab' ).length ) return;

            var self = this;

            // Tab selection — visual state only (scan triggered by Run Scan button).
            $( '.pixlify-scan-tab' ).on( 'click', function () {
                self.currentType = $( this ).data( 'type' );
                $( '.pixlify-scan-tab' ).removeClass( 'is-active' );
                $( this ).addClass( 'is-active' );
            } );

            $( '#pixlify-btn-scan' ).on( 'click', function () {
                self.scan();
            } );

            $( document ).on( 'change', '#pixlify-select-all', function () {
                $( '.pixlify-attachment-cb' ).prop( 'checked', $( this ).is( ':checked' ) ).trigger( 'change' );
            } );

            $( document ).on( 'change', '.pixlify-attachment-cb', function () {
                self.updateSelected();
            } );

            $( document ).on( 'click', '#pixlify-bulk-delete', function () {
                self.bulkDelete();
            } );

            $( document ).on( 'click', '.pixlify-btn-delete-one', function () {
                self.deleteOne( $( this ).data( 'id' ) );
            } );

            $( document ).on( 'click', '.pixlify-btn-ignore', function () {
                self.ignoreOne( $( this ).data( 'id' ) );
            } );
        },

        scan: function () {
            var self    = this;
            var $status = $( '#pixlify-scan-status' );

            $status.removeClass( 'is-success is-error' ).addClass( 'is-info' ).text( pixlify.strings.scanning );
            $( '#pixlify-dup-results' ).hide();

            $.post( pixlify.ajax_url, {
                action:    'pixlify_scan_duplicates',
                nonce:     pixlify.nonce,
                scan_type: self.currentType
            } ).done( function ( res ) {
                if ( res.success ) {
                    var d = res.data;
                    $status.removeClass( 'is-info' ).addClass( 'is-success' )
                        .text( 'Scan complete: ' + d.count + ' ' + ( d.count === 1 ? 'result' : 'results' ) + ' found.' );
                    self.renderResults( d );
                } else {
                    $status.removeClass( 'is-info' ).addClass( 'is-error' )
                        .text( 'Scan failed: ' + ( res.data || 'unknown error' ) );
                }
            } );
        },

        renderResults: function ( data ) {
            var $list  = $( '#pixlify-results-list' );
            var $card  = $( '#pixlify-dup-results' );
            var $title = $( '#pixlify-results-title' );

            $list.empty();
            $card.show();
            $( '#pixlify-select-all' ).prop( 'checked', false );
            $( '#pixlify-bulk-delete' ).prop( 'disabled', true );

            var labels = { unused: 'Unused Images', duplicates: 'Duplicate Groups', stale: 'Stale Images' };
            $title.text( labels[ data.type ] || 'Results' );

            if ( ! data.results || ! data.results.length ) {
                $list.html( '<p style="padding:12px;color:#646970;">' + pixlify.strings.no_results + '</p>' );
                return;
            }

            if ( 'duplicates' === data.type ) {
                var groupTmpl = wp.template( 'pixlify-duplicate-group' );
                $list.css( 'display', 'block' );
                $.each( data.results, function ( i, group ) {
                    $list.append( groupTmpl( group ) );
                } );
            } else {
                var cardTmpl = wp.template( 'pixlify-attachment-card' );
                $list.css( 'display', '' );
                $.each( data.results, function ( i, att ) {
                    $list.append( cardTmpl( att ) );
                } );
            }
        },

        updateSelected: function () {
            this.selectedIds = [];
            $( '.pixlify-attachment-cb:checked' ).each( function () {
                DuplicateManager.selectedIds.push( parseInt( $( this ).val(), 10 ) );
            } );
            $( '#pixlify-bulk-delete' ).prop( 'disabled', this.selectedIds.length === 0 );
        },

        bulkDelete: function () {
            var self = this;
            if ( ! self.selectedIds.length ) return;
            if ( ! window.confirm( pixlify.strings.confirm_delete ) ) return;

            $.post( pixlify.ajax_url, {
                action:         'pixlify_bulk_delete_attachments',
                nonce:          pixlify.nonce,
                attachment_ids: self.selectedIds
            } ).done( function ( res ) {
                if ( res.success ) {
                    $.each( res.data.deleted, function ( i, id ) {
                        $( '[data-id="' + id + '"]' ).fadeOut( 300, function () { $( this ).remove(); } );
                    } );
                    self.selectedIds = [];
                    $( '#pixlify-bulk-delete' ).prop( 'disabled', true );
                    $( '#pixlify-scan-status' )
                        .removeClass( 'is-info is-error' ).addClass( 'is-success' )
                        .text( 'Deleted ' + res.data.deleted.length + ' image(s).' );
                }
            } );
        },

        deleteOne: function ( id ) {
            if ( ! window.confirm( pixlify.strings.confirm_delete_one ) ) return;

            $.post( pixlify.ajax_url, {
                action:        'pixlify_delete_attachment',
                nonce:         pixlify.nonce,
                attachment_id: id
            } ).done( function ( res ) {
                if ( res.success ) {
                    $( '[data-id="' + id + '"]' ).fadeOut( 300, function () { $( this ).remove(); } );
                } else {
                    window.alert( 'Delete failed: ' + ( res.data || 'unknown' ) );
                }
            } );
        },

        ignoreOne: function ( id ) {
            $.post( pixlify.ajax_url, {
                action:        'pixlify_ignore_attachment',
                nonce:         pixlify.nonce,
                attachment_id: id
            } ).done( function ( res ) {
                if ( res.success ) {
                    $( '[data-id="' + id + '"]' ).fadeOut( 200, function () { $( this ).remove(); } );
                }
            } );
        }
    };

    $( document ).ready( function () {
        DuplicateManager.init();
    } );

}( jQuery ));
