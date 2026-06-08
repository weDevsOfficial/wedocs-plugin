<?php
// DESCRIPTION: Frontend FAQ template. Receives $faq_data from the shortcode
// class — an array of [ 'group' => WP_Term, 'faqs' => WP_Post[] ] entries.

if ( empty( $faq_data ) ) {
    return;
}
?>

<div class="wedocs-faq-section">
    <h2 class="wedocs-faq-section__title">
        <?php esc_html_e( 'Frequently Asked Questions', 'wedocs' ); ?>
    </h2>

    <?php foreach ( $faq_data as $entry ) :
        $group = $entry['group'];
        $faqs  = $entry['faqs'];
        ?>

        <div class="wedocs-faq-group">
            <h3 class="wedocs-faq-group__title">
                <?php
                $icon_id = get_term_meta( $group->term_id, 'icon', true );

                if ( $icon_id ) :
                    $icon_url = wp_get_attachment_image_url( $icon_id, 'thumbnail' );

                    if ( $icon_url ) :
                        ?>
                        <img
                            class="wedocs-faq-group__icon"
                            src="<?php echo esc_url( $icon_url ); ?>"
                            alt="<?php echo esc_attr( $group->name ); ?>"
                        />
                        <?php
                    endif;
                endif;
                ?>
                <?php echo esc_html( $group->name ); ?>
            </h3>

            <div class="wedocs-faq-group__items">
                <?php foreach ( $faqs as $faq ) :
                    $open_by_default = get_post_meta( $faq->ID, '_faq_open_by_default', true );
                    ?>
                    <details class="wedocs-faq-item" <?php echo $open_by_default ? 'open' : ''; ?>>
                        <summary class="wedocs-faq-item__question">
                            <?php echo esc_html( $faq->post_title ); ?>
                        </summary>
                        <div class="wedocs-faq-item__answer">
                            <div class="wedocs-faq-item__answer-inner">
                                <?php echo wp_kses_post( apply_filters( 'the_content', $faq->post_content ) ); ?>
                            </div>
                        </div>
                    </details>
                <?php endforeach; ?>
            </div>
        </div>

    <?php endforeach; ?>
</div>
