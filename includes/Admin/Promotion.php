<?php

namespace Wedevs\WeDocs\Admin;

class Promotion {
    
    /**
     * Constructor
     */
    public function __construct()
    {
        add_action( 'admin_notices', [ $this, 'promotional_offer' ] );
        
        add_action( 'wedocs_notices', [ $this, 'promotional_offer' ] );
    }

    public function promotional_offer() {
        if ( ! current_user_can( 'manage_options' ) ) { // || 'toplevel_page_wedocs' !== get_current_screen()->id ) {
            return;
        }

        // error_log( 'CR SCR: ' . json_encode( get_current_screen()->id ) );

        $promo_notice_url = 'https://raw.githubusercontent.com/welabs-ltd/wedocs-util/master/promotion.json';
        $response         = wp_remote_get( $promo_notice_url, array( 'timeout' => 15 ) );
        $promos           = wp_remote_retrieve_body( $response );

        $promos = json_decode( $promos, true );

        error_log( 'PROMOS JSON: ' . json_encode( $promos ) );

        $this->generate_notice( $promos );
    }

    /**
     * Show admin notice
     *
     * @since WPUF @param $message and @param $option_name replaced with $args
     *
     * @return void
     */
    public function generate_notice( $args ) {
        $option_name  = ! empty( $args['key'] ) ? $args['key'] : '';
        $content      = ! empty( $args['content'] ) ? $args['content'] : '';
        $title        = ! empty( $args['title'] ) ? $args['title'] : '';
        $action_url   = ! empty( $args['action_url'] ) ? $args['action_url'] : '';
        $action_title = ! empty( $args['action_title'] ) ? $args['action_title'] : '';
        $hide_notice  = get_option( $option_name, 'no' );

        if ( 'hide' === $hide_notice ) {
            return;
        }
        ?>
        <div class="notice notice-success wedocs-notice" id="wedocs-promotion-notice">
            <div class="wedocs-logo-wrapper">
                <img src="<?php echo WEDOCS_URL . '/assets/img/wedocs-logo.svg'; ?>" alt="weDocs Icon">
            </div>
            <div class="wedocs-notice-content-wrapper">
                <h3><?php echo esc_html( $title ); ?></h3>
                <p><b><?php echo esc_html( $content ); ?></b></p>
                <a href="<?php echo esc_url_raw( $action_url ); ?>" class="button button-primary"><?php echo esc_html( $action_title ); ?></a>
            </div>
            <button type="button" class="notice-dismiss"><span class="screen-reader-text"><?php esc_attr_e( 'Dismiss this notice.', 'wedocs' ); ?></span></button>
        </div>
        <style>
            .wedocs-notice {
                position: relative;
                display: flex;
                padding: 0;
            }

            #wedocs-promotion-notice {
                height: 128px !important;
            }
            .wedocs-logo-wrapper {
                display: flex;
                margin-right: 20px;
                height: 128px !important;
            }
            .wedocs-notice-content-wrapper h3 {
                font-size: 1.3em;
                font-weight: 600;
                margin-top: 1em;
                margin-bottom: 0.5em;
            }

            @media screen and (max-width: 768px) {
                .wedocs-notice-content-wrapper {
                    margin-top: 30px;
                    padding-right: 5px;
                }
            }
        </style>

        <script type='text/javascript'>
            jQuery('body').on('click', '#wedocs-promotion-notice .notice-dismiss', function (e) {
                e.preventDefault();
                jQuery('#wedocs-promotion-notice').remove();
            });
        </script>
        <?php
    }
}