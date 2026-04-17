/* global pixlify */
(function ($) {
    'use strict';

    var SettingsPage = {

        init: function () {
            this.initResizeToggle();
            this.initQualitySlider();
        },

        /**
         * Show / hide the max-width / max-height rows based on the resize checkbox.
         */
        initResizeToggle: function () {
            var $toggle = $( '#pixlify-resize-enabled' );
            if ( ! $toggle.length ) return;

            function apply() {
                $( '.pixlify-resize-row' ).toggle( $toggle.is( ':checked' ) );
            }

            apply();
            $toggle.on( 'change', apply );
        },

        /**
         * Live-update the quality label as the range slider moves.
         */
        initQualitySlider: function () {
            var $range = $( '#pixlify-quality-range' );
            var $label = $( '#pixlify-quality-val' );
            if ( ! $range.length ) return;

            $range.on( 'input change', function () {
                $label.text( $( this ).val() );
            } );
        }
    };

    $( document ).ready( function () {
        SettingsPage.init();
    } );

}( jQuery ));
