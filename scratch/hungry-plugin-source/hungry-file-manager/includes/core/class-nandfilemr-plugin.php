<?php
/**
 * The file that defines the core plugin class
 *
 * @package HungryFileManager
 * @subpackage HungryFileManager/includes
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 */
class Nandfilemr_Plugin
{

    /**
     * Loader responsible for maintaining and registering all hooks.
     *
     * @var Nandfilemr_Loader
     */
    protected $loader;

    /**
     * The unique identifier of this plugin.
     *
     * @var string
     */
    protected $plugin_name;

    /**
     * The current version of the plugin.
     *
     * @var string
     */
    protected $version;

    /**
     * Define the core functionality of the plugin.
     */
    public function __construct()
    {
        $this->plugin_name = 'hungry-file-manager';
        $this->version = NANDFILEMR_VERSION;

        $this->load_dependencies();
        $this->define_admin_hooks();
    }

    /**
     * Load the required dependencies for this plugin.
     */
    private function load_dependencies()
    {
        /**
         * The class responsible for orchestrating the actions and filters.
         */
        require_once NANDFILEMR_PLUGIN_DIR . 'includes/core/class-nandfilemr-loader.php';

        /**
         * The class responsible for self-hosted updates.
         */
        require_once NANDFILEMR_PLUGIN_DIR . 'includes/core/class-nandfilemr-updater.php';

        $this->loader = new Nandfilemr_Loader();
    }

    /**
     * Register all of the hooks related to the admin area functionality.
     */
    private function define_admin_hooks()
    {
        // Admin Menu and Assets.
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));

        // REST API.
        add_action('rest_api_init', array($this, 'register_api_routes'));

        // Contact Form AJAX
        add_action('wp_ajax_nandfilemr_submit_contact', array($this, 'handle_contact_form'));

        // Self-hosted Updates.
        if (is_admin()) {
            Nandfilemr_Updater::init();
        }
    }

    /**
     * Register REST API routes.
     */
    public function register_api_routes()
    {
        require_once NANDFILEMR_PLUGIN_DIR . 'includes/services/class-nandfilemr-security.php';
        require_once NANDFILEMR_PLUGIN_DIR . 'includes/services/class-nandfilemr-filesystem.php';
        require_once NANDFILEMR_PLUGIN_DIR . 'includes/api/class-nandfilemr-api-base.php';
        require_once NANDFILEMR_PLUGIN_DIR . 'includes/api/class-nandfilemr-api-files.php';
        require_once NANDFILEMR_PLUGIN_DIR . 'includes/api/class-nandfilemr-api-settings.php';

        $files_controller = new Nandfilemr_Api_Files();
        $files_controller->register_routes();

        $settings_controller = new Nandfilemr_Api_Settings();
        $settings_controller->register_routes();
    }

    /**
     * Run the loader to execute all of the hooks with WordPress.
     */
    public function run()
    {
        $this->loader->run();
    }

    /**
     * Add menu item to the admin dashboard.
     */
    public function add_admin_menu()
    {
        add_menu_page(
            __('Hungry File Manager', 'hungry-file-manager'),
            __('File Manager', 'hungry-file-manager'),
            'manage_options',
            'hungry-file-manager',
            array($this, 'render_admin_page'),
            'dashicons-portfolio', // Placeholder icon
            75
        );
    }

    /**
     * Render the main admin page (React mount point).
     */
    public function render_admin_page()
    {
        // React App Root
        echo '<div id="nandfilemr-app"></div>';

        // External Ad/Footer Section (Replicated from tg-live-chat)
        echo '<div id="nandfilemr-ads" style="
            width: 100%;
            min-height: 600px;
            background: #f0f0f1;
            border-top: 1px solid #dcdcde;
            padding: 40px;
            box-sizing: border-box;
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
            justify-content: center;
        ">';

        // Styles (Inline to match reference)
        echo '<style>
            .tglivechat-card { background: #fff; border: 1px solid #c3c4c7; box-shadow: 0 1px 1px rgba(0,0,0,.04); }
            .tglivechat-card-body { padding: 0; }
            .tglivechat-nandann-promo { border-radius: 4px; margin-bottom: 20px; }
            .tglivechat-services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
            @media (max-width: 782px) { .tglivechat-services-grid { grid-template-columns: 1fr; } }
            .nand-input { width: 100%; padding: 0 8px; line-height: 2; min-height: 30px; box-shadow: 0 0 0 transparent; border-radius: 4px; border: 1px solid #8c8f94; background-color: #fff; color: #2c3338; }
            .nand-textarea { width: 100%; padding: 6px 8px; box-shadow: 0 0 0 transparent; border-radius: 4px; border: 1px solid #8c8f94; background-color: #fff; color: #2c3338; }
        </style>';

        // -----------------------
        // LEFT COLUMN (Main Content)
        // -----------------------
        echo '<div style="flex: 2; min-width: 300px; max-width: 800px;">';

        // NANDANN Promo Card
        echo '<div class="tglivechat-card tglivechat-nandann-promo" style="background: #fff; padding: 40px 30px; text-align: center; border-radius: 4px;">';
        echo '<div class="tglivechat-nandann-logo" style="margin-bottom: 20px; text-align: center;">';
        // Use the newly copied logo file
        $logo_url = NANDFILEMR_PLUGIN_URL . 'assets/images/nandann-logo.png';
        echo '<img src="' . esc_url($logo_url) . '" alt="Nandann" style="max-width: 200px; height: auto; margin: 0 auto;">';
        echo '</div>';
        echo '<p style="color: #7f8c8d; font-size: 12px; letter-spacing: 3px; margin: 0 0 20px 0; text-transform: uppercase; font-weight: 600;">Creative Agency</p>';

        echo '<h3 style="font-size: 24px; color: #2c3e50; margin: 0 0 10px 0; font-weight: 700;">Professional WordPress Development & Troubleshooting</h3>';
        echo '<p style="color: #95a5a6; font-size: 15px; margin: 0 0 25px 0; font-style: italic;">Expert solutions for complex WordPress challenges</p>';

        echo '<p style="color: #555; line-height: 1.8; margin-bottom: 25px; font-size: 14px;">Facing WordPress challenges? Get professional help from an experienced developer who understands the complexities of WordPress development and can provide reliable, efficient solutions.</p>';

        echo '<div style="margin-bottom: 20px;">';
        echo '<a href="mailto:prakhar@nandann.com" class="button button-primary" style="background: #667eea; border: none; padding: 12px 30px; font-size: 15px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; flex-direction: column; margin-bottom: 12px; min-width: 200px; line-height: 1.4; height: auto;">';
        echo '<span style="display: flex; align-items: center; gap: 8px;"><span class="dashicons dashicons-email-alt"></span><span>Get Expert Help</span></span>';
        echo '<span style="font-size: 13px; opacity: 0.9; margin-top: 4px;">prakhar@nandann.com</span>';
        echo '</a>';
        echo '</div>';

        echo '<div>';
        echo '<a href="https://nandann.com" target="_blank" class="button" style="padding: 12px 30px; font-size: 15px; font-weight: 600; border: 2px solid #667eea; color: #667eea; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-width: 200px; height: auto;">';
        echo '<span class="dashicons dashicons-external"></span><span>Visit nandann.com</span>';
        echo '</a>';
        echo '</div>';
        echo '</div>';

        // Service Cards Grid
        echo '<div class="tglivechat-services-grid" style="margin-top: 20px;">';
        // 1
        echo '<div class="tglivechat-card" style="text-align: center; padding: 25px 20px;">';
        echo '<div style="font-size: 40px; color: #667eea; margin-bottom: 15px;">🔧</div>';
        echo '<h4 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 700; color: #2c3e50;">WordPress Troubleshooting</h4>';
        echo '<p style="margin: 0; font-size: 13px; color: #7f8c8d; line-height: 1.6;">Expert diagnosis and resolution of complex WordPress issues, performance optimization, and security hardening.</p>';
        echo '</div>';
        // 2
        echo '<div class="tglivechat-card" style="text-align: center; padding: 25px 20px;">';
        echo '<div style="font-size: 40px; color: #667eea; margin-bottom: 15px;">💻</div>';
        echo '<h4 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 700; color: #2c3e50;">Custom Development</h4>';
        echo '<p style="margin: 0; font-size: 13px; color: #7f8c8d; line-height: 1.6;">Bespoke WordPress plugins, themes, and custom functionality tailored to your specific business needs.</p>';
        echo '</div>';
        // 3
        echo '<div class="tglivechat-card" style="text-align: center; padding: 25px 20px;">';
        echo '<div style="font-size: 40px; color: #667eea; margin-bottom: 15px;">🚀</div>';
        echo '<h4 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 700; color: #2c3e50;">Site Migration & Hosting</h4>';
        echo '<p style="margin: 0; font-size: 13px; color: #7f8c8d; line-height: 1.6;">Seamless website migrations, hosting optimization, and server configuration for peak performance.</p>';
        echo '</div>';
        // 4
        echo '<div class="tglivechat-card" style="text-align: center; padding: 25px 20px;">';
        echo '<div style="font-size: 40px; color: #667eea; margin-bottom: 15px;">🔒</div>';
        echo '<h4 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 700; color: #2c3e50;">Security & Maintenance</h4>';
        echo '<p style="margin: 0; font-size: 13px; color: #7f8c8d; line-height: 1.6;">Comprehensive security audits, malware removal, and ongoing maintenance to keep your site secure.</p>';
        echo '</div>';
        echo '</div>'; // End Grid

        echo '</div>'; // End Left Column

        // -----------------------
        // RIGHT COLUMN (Contact Form)
        // -----------------------
        echo '<div style="flex: 1; min-width: 300px; max-width: 400px;">';
        echo '<div class="tglivechat-card" style="background: #fff; padding: 0;">';
        echo '<div style="border-bottom: 1px solid #eee; padding: 15px 20px;">';
        echo '<h3 style="margin: 0; font-size: 14px; color: #23282d; font-weight: 600;"><span class="dashicons dashicons-email"></span> Send Us a Message</h3>';
        echo '</div>';

        echo '<div style="padding: 20px;">';
        echo '<p style="font-size: 14px; margin-bottom: 20px; color: #3c434a;">Have questions, suggestions, or need support? Send us a message below and we\'ll get back to you soon.</p>';

        echo '<form method="post" action="">';
        // Name
        echo '<div style="margin-bottom: 15px;">';
        echo '<label style="display:block; margin-bottom: 5px; font-weight: 600; font-size: 13px;">Your Name <span style="color: #d63638;">*</span></label>';
        echo '<input type="text" name="nand_name" class="nand-input" required placeholder="Enter your name">';
        echo '</div>';

        // Email
        echo '<div style="margin-bottom: 15px;">';
        echo '<label style="display:block; margin-bottom: 5px; font-weight: 600; font-size: 13px;">Your Email <span style="color: #d63638;">*</span></label>';
        echo '<input type="email" name="nand_email" class="nand-input" required value="' . esc_attr(get_option('admin_email')) . '" placeholder="Enter your email">';
        echo '</div>';

        // Message
        echo '<div style="margin-bottom: 15px;">';
        echo '<label style="display:block; margin-bottom: 5px; font-weight: 600; font-size: 13px;">Message <span style="color: #d63638;">*</span></label>';
        echo '<textarea name="nand_message" class="nand-textarea" rows="5" required placeholder="Type your message..."></textarea>';
        echo '</div>';

        echo '<button type="submit" class="button button-primary" style="width: 100%; justify-content: center; height: 35px;">';
        echo '<span class="dashicons dashicons-email-alt" style="margin-top: 4px;"></span> Send Message';
        echo '</button>';

        echo '</form>';
        echo '</div>';
        echo '</div>';

        echo '<div style="margin-top: 20px; text-align: right; font-size: 12px; color: #a0a0a0;">Hungry File Manager ' . esc_html(NANDFILEMR_VERSION) . '</div>';
        echo '</div>';

        echo '</div>'; // End Container
    }

    /**
     * Enqueue styles and scripts for the admin area.
     *
     * @param string $hook The current admin page.
     */
    public function enqueue_admin_assets($hook)
    {
        if ('toplevel_page_hungry-file-manager' !== $hook) {
            return;
        }

        $asset_file = include(NANDFILEMR_PLUGIN_DIR . 'build/index.asset.php');

        // Main App Script
        wp_enqueue_script(
            'nandfilemr-app',
            NANDFILEMR_PLUGIN_URL . 'build/index.js',
            $asset_file['dependencies'],
            $asset_file['version'],
            true
        );

        // Contact Form Handler
        wp_enqueue_script(
            'nandfilemr-contact-form',
            NANDFILEMR_PLUGIN_URL . 'assets/js/contact-form.js',
            array('jquery'),
            $this->version,
            true
        );

        // Localize Contact Form Script
        wp_localize_script(
            'nandfilemr-contact-form',
            'nandfilemrAjax',
            array(
                'ajaxurl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('nandfilemr_contact_nonce'),
            )
        );

        wp_enqueue_style(
            'nandfilemr-style',
            NANDFILEMR_PLUGIN_URL . 'build/style-index.css',
            array(),
            $asset_file['version']
        );
    }

    /**
     * Handle contact form submission.
     */
    public function handle_contact_form()
    {
        check_ajax_referer('nandfilemr_contact_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error('Permission denied.');
        }

        $name = isset($_POST['name']) ? sanitize_text_field(wp_unslash($_POST['name'])) : '';
        $email = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
        $message = isset($_POST['message']) ? sanitize_textarea_field(wp_unslash($_POST['message'])) : '';

        if (empty($name) || empty($email) || empty($message)) {
            wp_send_json_error('Please fill in all fields.');
        }

        $to = 'prakhar@nandann.com';
        $subject = 'New Message from Hungry File Manager User';
        $headers = array('Content-Type: text/html; charset=UTF-8');
        $headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';

        $body = '<h3>New Message</h3>';
        $body .= '<p><strong>Name:</strong> ' . $name . '</p>';
        $body .= '<p><strong>Email:</strong> ' . $email . '</p>';
        $body .= '<p><strong>Message:</strong></p>';
        $body .= '<p>' . nl2br($message) . '</p>';
        $body .= '<hr>';
        $body .= '<p>Sent from site: ' . home_url() . '</p>';

        $sent = wp_mail($to, $subject, $body, $headers);

        if ($sent) {
            wp_send_json_success('Message sent successfully! We will verify it and get back to you.');
        } else {
            wp_send_json_error('Failed to send message. Please try again later.');
        }
    }
}
