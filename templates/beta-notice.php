<div style='border-radius: 3px; padding: 8px 12px; padding-right: 38px;' class='notice notice-info is-dismissible' id='wedocs-beta-notice'>
    <div class='wd-beta-notice' style='display: flex; gap: 16px; align-items: center;'>
        <div class='logo-img' style='line-height: 1;'>
            <img
                style='border-radius: 6px; width: 80px;'
                src='<?php echo WEDOCS_URL . '/src/assets/img/wedocs-logo.svg'; ?>' alt='<?php esc_attr_e( 'weDocs Logo', 'wedocs' ) ?>'
            />
        </div>
        <div class='notice-content' style='width: 90%;'>
            <p style='margin-top: 1px;'>
                <?php esc_html_e( 'Try out weDocs v2 (Beta) with a completely revamped user interface, advanced role-based permission management, and A.I. infused Assistant widget. Provide feedback to enjoy up to 60% discount when we launch', 'wedocs' ); ?>
            </p>
            <p class='wd-beta-notice-buttons' style='display: flex; gap: 10px;'>
                <a target='_blank' href='https://wedocs.co/wedocs-beta/' class='button button-primary' id='try-now'><?php esc_html_e( 'Try Now', 'wedocs' ) ?></a>
                <a href='#' class='button' id='no-thanks' style='color: #374151; border-color: #d1d5db; background: transparent; '>
                    <?php esc_html_e( 'No, Thanks', 'wedocs' ); ?>
                </a>
            </p>
        </div>
    </div>
</div>
