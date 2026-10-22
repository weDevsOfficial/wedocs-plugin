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
                <label for="wedocs-contact-name"><?php _e( 'Name', 'wedocs' ); ?></label>

                <div class="wedocs-form-field">
                    <input type="text" name="name" id="wedocs-contact-name" placeholder="" value="<?php echo $name; ?>" required />
                </div>
            </div>

            <div class="wedocs-form-row">
                <label for="wedocs-contact-email"><?php _e( 'Email', 'wedocs' ); ?></label>

                <div class="wedocs-form-field">
                    <input type="email" name="email" id="wedocs-contact-email" placeholder="you@example.com" value="<?php echo $email; ?>" <?php disabled( is_user_logged_in() ); ?> required />
                </div>
            </div>

            <div class="wedocs-form-row">
                <label for="wedocs-contact-subject"><?php _e( 'Subject', 'wedocs' ); ?></label>

                <div class="wedocs-form-field">
                    <input type="text" name="subject" id="wedocs-contact-subject" placeholder="" value="" required />
                </div>
            </div>

            <div class="wedocs-form-row">
                <label for="wedocs-contact-message"><?php _e( 'Message', 'wedocs' ); ?></label>

                <div class="wedocs-form-field">
                    <textarea type="message" name="message" id="wedocs-contact-message" required></textarea>
                </div>
            </div>

            <div class="wedocs-form-action">
                <input type="submit" name="submit" value="<?php esc_attr_e( 'Send', 'wedocs' ); ?>">
                <input type="hidden" name="doc_id" value="<?php the_ID(); ?>">
                <input type="hidden" name="action" value="wedocs_contact_feedback">
            </div>
        </form>
    </div>
</div>
