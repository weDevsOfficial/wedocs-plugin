<?php
/**
 * Helper functions and constants for CAPTCHA configuration
 *
 * To configure CAPTCHA for your HelpfulModal blocks:
 *
 * 1. For reCAPTCHA:
 *    - Get your site key and secret key from https://www.google.com/recaptcha/admin
 *    - Add the following to your wp-config.php or use wp-cli:
 *      update_option('wedocs_recaptcha_site_key', 'your-recaptcha-site-key');
 *      update_option('wedocs_recaptcha_secret_key', 'your-recaptcha-secret-key');
 *
 * 2. For Cloudflare Turnstile:
 *    - Get your site key and secret key from https://dash.cloudflare.com/?to=/:account/turnstile
 *    - Add the following to your wp-config.php or use wp-cli:
 *      update_option('wedocs_turnstile_site_key', 'your-turnstile-site-key');
 *      update_option('wedocs_turnstile_secret_key', 'your-turnstile-secret-key');
 *
 * 3. Configure in the block editor:
 *    - Edit your HelpfulModal block
 *    - In the block settings, enable CAPTCHA
 *    - Choose between reCAPTCHA or Turnstile
 *    - Optionally override the default site keys per block
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Get reCAPTCHA site key with fallback to global option
 */
function wedocs_get_recaptcha_site_key($block_key = '') {
    return !empty($block_key) ? $block_key : get_option('wedocs_recaptcha_site_key', '');
}

/**
 * Get Turnstile site key with fallback to global option
 */
function wedocs_get_turnstile_site_key($block_key = '') {
    return !empty($block_key) ? $block_key : get_option('wedocs_turnstile_site_key', '');
}

/**
 * Check if CAPTCHA is properly configured
 */
function wedocs_is_captcha_configured($type = 'recaptcha') {
    if ($type === 'recaptcha') {
        $site_key = get_option('wedocs_recaptcha_site_key', '');
        $secret_key = get_option('wedocs_recaptcha_secret_key', '');
        return !empty($site_key) && !empty($secret_key);
    } elseif ($type === 'turnstile') {
        $site_key = get_option('wedocs_turnstile_site_key', '');
        $secret_key = get_option('wedocs_turnstile_secret_key', '');
        return !empty($site_key) && !empty($secret_key);
    }

    return false;
}

/**
 * Admin notice for missing CAPTCHA configuration
 */
function wedocs_captcha_admin_notice() {
    if (!wedocs_is_captcha_configured('recaptcha') && !wedocs_is_captcha_configured('turnstile')) {
        $current_screen = get_current_screen();
        if ($current_screen && str_contains($current_screen->id, 'wedocs')) {
            echo '<div class="notice notice-info is-dismissible">';
            echo '<p><strong>WeDocs CAPTCHA:</strong> To enable CAPTCHA protection in your HelpfulModal blocks, ';
            echo 'please configure your reCAPTCHA or Turnstile keys. See the CAPTCHA configuration guide in ';
            echo '<code>/wp-content/plugins/wedocs-plugin/includes/captcha-config.php</code></p>';
            echo '</div>';
        }
    }
}
add_action('admin_notices', 'wedocs_captcha_admin_notice');

/**
 * Quick setup functions for wp-cli or programmatic configuration
 */

// Setup reCAPTCHA
function wedocs_setup_recaptcha($site_key, $secret_key) {
    update_option('wedocs_recaptcha_site_key', sanitize_text_field($site_key));
    update_option('wedocs_recaptcha_secret_key', sanitize_text_field($secret_key));
    return wedocs_is_captcha_configured('recaptcha');
}

// Setup Turnstile
function wedocs_setup_turnstile($site_key, $secret_key) {
    update_option('wedocs_turnstile_site_key', sanitize_text_field($site_key));
    update_option('wedocs_turnstile_secret_key', sanitize_text_field($secret_key));
    return wedocs_is_captcha_configured('turnstile');
}

/**
 * WP-CLI Commands (if WP-CLI is available)
 */
if (defined('WP_CLI') && WP_CLI) {

    /**
     * Configure CAPTCHA keys for WeDocs
     *
     * ## OPTIONS
     *
     * <type>
     * : CAPTCHA type - either 'recaptcha' or 'turnstile'
     *
     * <site_key>
     * : The site/public key from your CAPTCHA provider
     *
     * <secret_key>
     * : The secret key from your CAPTCHA provider
     *
     * ## EXAMPLES
     *
     *     wp wedocs captcha recaptcha 6Le... your-secret-key
     *     wp wedocs captcha turnstile 0x4A... your-secret-key
     */
    class WeDocs_CAPTCHA_CLI_Command extends WP_CLI_Command {

        public function captcha($args) {
            list($type, $site_key, $secret_key) = $args;

            if (!in_array($type, ['recaptcha', 'turnstile'])) {
                WP_CLI::error("Invalid CAPTCHA type. Use 'recaptcha' or 'turnstile'");
            }

            if ($type === 'recaptcha') {
                $success = wedocs_setup_recaptcha($site_key, $secret_key);
                $provider = 'reCAPTCHA';
            } else {
                $success = wedocs_setup_turnstile($site_key, $secret_key);
                $provider = 'Turnstile';
            }

            if ($success) {
                WP_CLI::success("$provider CAPTCHA configured successfully!");
            } else {
                WP_CLI::error("Failed to configure $provider CAPTCHA");
            }
        }
    }

    WP_CLI::add_command('wedocs', 'WeDocs_CAPTCHA_CLI_Command');
}
