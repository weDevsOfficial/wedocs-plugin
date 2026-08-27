<?php
/**
 * Plugin Name: weDocs E2E Environment
 * Description: Test-only environment setup so the suite is deterministic on a fresh wp-env.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

// weDocs registers `docs` with a rewrite slug and the FAQ shortcode links out to
// permalinks, so a fresh wp-env on plain permalinks (?p=123) breaks doc URLs and
// 404s /wp-json routes. Force pretty permalinks AND write .htaccess: wp-env runs
// Apache/mod_rewrite and flush_rewrite_rules() alone does not reliably create it.
add_action( 'init', function () {
    if ( get_option( 'permalink_structure' ) === '' ) {
        update_option( 'permalink_structure', '/%postname%/' );
        flush_rewrite_rules( true );
    }

    $htaccess = ABSPATH . '.htaccess';
    if ( ! file_exists( $htaccess ) || filesize( $htaccess ) === 0 ) {
        $rules = "# BEGIN WordPress\n"
            . "<IfModule mod_rewrite.c>\n"
            . "RewriteEngine On\n"
            . "RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]\n"
            . "RewriteBase /\n"
            . "RewriteRule ^index\\.php$ - [L]\n"
            . "RewriteCond %{REQUEST_FILENAME} !-f\n"
            . "RewriteCond %{REQUEST_FILENAME} !-d\n"
            . "RewriteRule . /index.php [L]\n"
            . "</IfModule>\n"
            . "# END WordPress\n";
        @file_put_contents( $htaccess, $rules );
        @chmod( $htaccess, 0644 );
    }
}, 1 );

// Admin "pointer" tooltips overlay the page and swallow clicks on the SPA.
add_action( 'admin_enqueue_scripts', function () {
    wp_deregister_script( 'wp-pointer' );
    wp_deregister_style( 'wp-pointer' );
}, 999 );

// weDocs shows a first-run setup/upgrade notice that covers the top of the admin
// screen. Mark it seen so the SPA is reachable on a fresh install.
add_action( 'init', function () {
    // wp-env provisions the container before WordPress is installed, so this can
    // fire with no tables yet. Writing then fills the log with "table doesn't
    // exist" errors, which the CI job dutifully surfaces on every run.
    if ( ! is_blog_installed() ) {
        return;
    }

    foreach ( array( 'wedocs_admin_notice_dismissed', 'wedocs_upgrade_popup_dismissed' ) as $option ) {
        if ( ! get_option( $option ) ) {
            update_option( $option, true );
        }
    }
}, 2 );
