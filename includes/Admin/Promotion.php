<?php

namespace Wedevs\WeDocs\Admin;

/**
 * Promotional offer class
 */
class Promotion {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'admin_notices', array( $this, 'promotional_offer' ) );
	}

	/**
	 * Promotional offer notice
	 *
	 * @since 2.1.11
	 *
	 * @return void
	 */
	public function promotional_offer() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$promos = get_transient( WEDOCS_PROMO_KEY );

		if ( false === $promos ) {
			$promo_notice_url   = WEDOCS_PROMO_URL;
			$response           = wp_remote_get( $promo_notice_url, array( 'timeout' => 15 ) );
			$promos             = wp_remote_retrieve_body( $response );
			$promos['logo_url'] = WEDOCS_URL . '/assets/img/wedocs-logo.svg';

			if ( is_wp_error( $response ) || $response['response']['code'] !== 200 ) {
                $promos = '[]';
            }

            set_transient( WEDOCS_PROMO_KEY, $promos, DAY_IN_SECONDS );
		}
		
		$promos = ! is_array( $promos ) ? json_decode( $promos, true ) : $promos;

		if ( empty( $promos ) || ! is_array( $promos ) ) {
            return;
        }

		$current_time = wedocs_convert_utc_to_est();

		if (
			isset( $promos['start_date'] )
			&& $promos['end_date']
            && strtotime( $promos['start_date'] ) < strtotime( $current_time )
            && strtotime( $current_time ) < strtotime( $promos['end_date'] )
            ) {
            $this->generate_notice( $promos );
        }
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

				#wedocs-promotion-notice {
					height: 145px !important;
				}

				.wedocs-logo-wrapper {
					height: auto !important;
					margin-right: 2px !important;
				}

				.wedocs-notice-content-wrapper {
					margin: 0px !important;
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