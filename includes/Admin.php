<?php

namespace WeDevs\WeDocs;

use \WeDevs\WeDocs\Appsero\Client as Appsero_Client;

/**
 * Frontend Handler Class
 */
class Admin {

    /**
     * Initialize the class
     */
    public function __construct() {
        new Admin\Admin();
        new Admin\Migrate();
        new Admin\Docs_List_Table();

        add_action( 'admin_init', array( $this, 'init_admin_actions' ), 5 );

        // Redirect to a new design after trashing a doc
        add_action('load-edit.php', array($this, 'trashed_docs_redirect'));

         // 1. Add links in the installed plugins list page
        add_filter( 'plugin_action_links_' . plugin_basename(WEDOCS_FILE ), [$this, 'plugin_instalation_page_link'], 10, 3 );
        // 2. Add links in the plugin install/info popup page
        add_filter( 'plugins_api_result', [$this, 'plugin_details_popup_link'], 10, 3 );
    }

    /**
     * Redirect to a new design after trashing a doc.
     *
     * @return void
     */
    public function trashed_docs_redirect() {
    $screen = get_current_screen();
    if ($screen->id === 'edit-docs') {
        if (isset($_GET['trashed']) && intval(sanitize_text_field($_GET['trashed'])) > 0) {
            wp_redirect(admin_url('admin.php?page=wedocs#'));
            exit();
        }
    }
}

    /**
     * Admin initialization hook.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function init_admin_actions() {
        $this->handle_plugin_activate_redirection();
        $this->init_appsero();
    }

    /**
     * Handle redirection after activate wedocs.
     *
     * @since 2.0.0
     *
     * @return void
     */
    public function handle_plugin_activate_redirection() {
        // Check if the plugin is being activated for the first time.
        if ( get_option( 'wedocs_activation_redirect', false ) ) {
            // Remove the redirect option to prevent further redirections.
            delete_option('wedocs_activation_redirect');

            // Redirect to the weDocs dashboard & exit.
            wp_safe_redirect( admin_url( 'admin.php?page=wedocs#/' ) );
            exit;
        }
    }

    /**
     * Initialize the appsero tracker
     *
     * @since 1.6.0
     *
     * @return void
     */
    public function init_appsero() {
        $client = new Appsero_Client( 'aa0ffba5-b889-40af-a34c-41fc8f707faa', 'weDocs', WEDOCS_FILE );
        $client->insights()->init();
    }


     function plugin_instalation_page_link( $links ) {
        $pro_link     = '<a href="https://wedocs.co/pricing/" target="_blank" style="font-weight:bold; color:#17b517;">'. esc_html__( 'Upgrade to Pro', 'wedocs' ) .'</a> ';
        $discount_link = '<a href="https://wedevs.com/coupons/" target="_blank" style="color:#d63638;">'. esc_html__( 'Check Discount', 'wedocs' ) .'</a>';
        $docs_link = '<a href="https://wedocs.co/docs/" target="_blank">'. esc_html__( 'Docs', 'wedocs' ) .'</a> ';
        $support_link = '<a href="https://wedocs.co/get-support/" target="_blank">'. esc_html__( 'Get Support', 'wedocs' ) .'</a>';
        $items = [
            $docs_link
        ];
        if(!is_plugin_active('wedocs-pro/wedocs-pro.php')){
            $items[]= $pro_link;
            $items []= $discount_link;
        }
        $items[] = $support_link;
        array_push( $links, ...$items, );
        return $links;
    }

    function plugin_details_popup_link( $res, $action, $args ) {
        if ( isset($res->slug) && $res->slug === 'wedocs' ) {
            if ( isset( $res->sections['description'] ) ) {
                $extra_html  = '<p style="margin-top:10px;">';
                if(!is_plugin_active('wedocs-pro/wedocs-pro.php')){
                    $extra_html .= '<a href="https://wedocs.co/pricing/" target="_blank" style="margin-right:6px;color:green;">'. esc_html__( 'Upgrade to Pro', 'wedocs' ) .'</a> | ';
                    $extra_html .= '<a href="https://wedevs.com/coupons/" target="_blank">'. esc_html__( 'Check Discount', 'wedocs' ) .'</a> | ';
                }
                $extra_html .= '<a href="https://wedocs.co/docs/" target="_blank">'. esc_html__( 'Docs', 'wedocs' ) .'</a> | ';
                $extra_html .= '<a href="https://wedocs.co/get-support/" target="_blank">'. esc_html__( 'Get Support', 'wedocs' ) .'</a>';
                $extra_html .= '</p>';
                $res->sections['description'] .= $extra_html;
            }
        }
        return $res;
    }

}