jQuery(document).ready(function ($) {
    'use strict';

    // Contact form submission
    $('form[action=""]').on('submit', function (e) {
        // Only target the specific contact form if possible, but the selector above is a bit broad. 
        // Let's rely on the fields inside.
        if ($(this).find('input[name="nand_email"]').length === 0) {
            return;
        }

        e.preventDefault();

        var $form = $(this);
        var $button = $form.find('button[type="submit"], button.nand-btn-primary');
        var $status = $form.find('.nand-contact-status');

        // Create status container if it doesn't exist
        if ($status.length === 0) {
            $button.after('<div class="nand-contact-status" style="margin-top: 10px; font-size: 13px;"></div>');
            $status = $form.find('.nand-contact-status');
        }

        $button.prop('disabled', true);
        $status.html('').css('color', 'inherit');

        $.ajax({
            url: nandfilemrAjax.ajaxurl,
            type: 'POST',
            data: {
                action: 'nandfilemr_submit_contact',
                nonce: nandfilemrAjax.nonce,
                name: $form.find('input[name="nand_name"]').val(),
                email: $form.find('input[name="nand_email"]').val(),
                message: $form.find('textarea[name="nand_message"]').val()
            },
            success: function (response) {
                if (response.success) {
                    $status.css('color', 'green').html(response.data);
                    $form[0].reset();
                } else {
                    $status.css('color', 'red').html(response.data);
                }
            },
            error: function () {
                $status.css('color', 'red').html('An error occurred. Please try again.');
            },
            complete: function () {
                $button.prop('disabled', false);
            }
        });
    });

});
