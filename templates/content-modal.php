<?php
$name = $email = '';

if ( is_user_logged_in() ) {
    $user  = wp_get_current_user();
    $name  = $user->display_name;
    $email = $user->user_email;
}
?>

<div class="wedocs-modal-backdrop" id="wedocs-modal-backdrop"></div>
<div id="wedocs-contact-modal" class="wedocs-contact-modal wedocs-hide-print">
    <div class="wedocs-modal-header">
        <h3><?php _e( 'How can we help?', 'wedocs' ); ?></h3>
        <a href="#" id="wedocs-modal-close" class="wedocs-modal-close"><i class="wedocs-icon wedocs-icon-times"></i></a>
    </div>

    <div class="wedocs-modal-body">
        <div id="wedocs-modal-errors"></div>
        <form id="wedocs-contact-modal-form" action="" method="post">
            <div class="wedocs-form-row">
                <label for="name"><?php _e( 'Name', 'wedocs' ); ?></label>

                <div class="wedocs-form-field">
                    <input type="text" name="name" id="name" placeholder="" value="<?php echo $name; ?>" required />
                </div>
            </div>

            <div class="wedocs-form-row">
                <label for="email"><?php _e( 'Email', 'wedocs' ); ?></label>

                <div class="wedocs-form-field">
                    <input type="email" name="email" id="email" placeholder="you@example.com" value="<?php echo $email; ?>" <?php disabled( is_user_logged_in() ); ?> required />
                </div>
            </div>

            <div class="wedocs-form-row">
                <label for="subject"><?php _e( 'Subject', 'wedocs' ); ?></label>

                <div class="wedocs-form-field">
                    <input type="text" name="subject" id="subject" placeholder="" value="" required />
                </div>
            </div>

            <div class="wedocs-form-row">
                <label for="message"><?php _e( 'Message', 'wedocs' ); ?></label>

                <div class="wedocs-form-field">
                    <textarea type="message" name="message" id="message" required></textarea>
                </div>
            </div>

            <?php
            $gdpr_settings = wedocs_get_option( 'gdpr', 'wedocs_settings', [] );
            $gdpr_enabled  = ! empty( $gdpr_settings['enabled'] ) && $gdpr_settings['enabled'] === 'on';
            $modal_enabled = ! empty( $gdpr_settings['modal_enabled'] ) && $gdpr_settings['modal_enabled'] === 'on';

            if ( $gdpr_enabled && $modal_enabled ) :
                $consent_text      = ! empty( $gdpr_settings['consent_text'] ) ? $gdpr_settings['consent_text'] : '';
                $privacy_page_id   = ! empty( $gdpr_settings['privacy_policy_page'] ) ? intval( $gdpr_settings['privacy_policy_page'] ) : 0;
                $request_page_id   = ! empty( $gdpr_settings['data_request_page'] ) ? intval( $gdpr_settings['data_request_page'] ) : 0;
                $privacy_url       = $privacy_page_id ? get_permalink( $privacy_page_id ) : '#';
                $request_url       = $request_page_id ? get_permalink( $request_page_id ) : '#';

                $consent_text = str_replace(
                    [ '{privacy_policy}', '{request_data}' ],
                    [
                        '<a href="' . esc_url( $privacy_url ) . '" target="_blank" rel="noopener noreferrer">' . __( 'Privacy Policy', 'wedocs' ) . '</a>',
                        '<a href="' . esc_url( $request_url ) . '" target="_blank" rel="noopener noreferrer">' . __( 'request your data', 'wedocs' ) . '</a>',
                    ],
                    $consent_text
                );
            ?>
            <div class="wedocs-form-row wedocs-gdpr-consent">
                <label class="wedocs-gdpr-consent-label">
                    <input type="checkbox" name="gdpr_consent" id="wedocs-gdpr-consent" value="1" />
                    <span class="wedocs-gdpr-consent-text"><?php echo wp_kses_post( $consent_text ); ?></span>
                </label>
            </div>
            <?php endif; ?>

            <div class="wedocs-form-action">
                <input type="submit" name="submit" value="<?php esc_attr_e( 'Send', 'wedocs' ); ?>">
                <input type="hidden" name="doc_id" value="<?php the_ID(); ?>">
                <input type="hidden" name="action" value="wedocs_contact_feedback">
            </div>
        </form>
    </div>
</div>
