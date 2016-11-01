<?php global $post; ?>

<div class="wedocs-feedback-wrap wedocs-hide-print">
    <?php
    $positive = (int) get_post_meta( $post->ID, 'positive', true );
    $negative = (int) get_post_meta( $post->ID, 'negative', true );

    $positive_title = $positive ? sprintf( _n( '%d person found this useful', '%d persons found this useful', $positive, 'wedocs' ), number_format_i18n( $positive ) ) : __( 'No votes yet', 'wedocs' );
    $negative_title = $negative ? sprintf( _n( '%d person found this not useful', '%d persons found this not useful', $negative, 'wedocs' ), number_format_i18n( $negative ) ) : __( 'No votes yet', 'wedocs' );
    ?>

    <?php _e( 'Was this article helpful to you?', 'wedocs' ); ?>

    <span class="vote-link-wrap">
        <a href="#" class="wedocs-tip positive" data-id="<?php the_ID(); ?>" data-type="positive" title="<?php echo esc_attr( $positive_title ); ?>">
            <?php _e( 'Yes', 'wedocs' ); ?>

            <?php if ( $positive ) { ?>
                <span class="count"><?php echo number_format_i18n( $positive ); ?></span>
            <?php } ?>
        </a>
        <a href="#" class="wedocs-tip negative" data-id="<?php the_ID(); ?>" data-type="negative" title="<?php echo esc_attr( $negative_title ); ?>">
            <?php _e( 'No', 'wedocs' ); ?>

            <?php if ( $negative ) { ?>
                <span class="count"><?php echo number_format_i18n( $negative ); ?></span>
            <?php } ?>
        </a>
    </span>
</div>