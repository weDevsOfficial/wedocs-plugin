<?php
// Helper function to render header blocks
if (!function_exists('block_header_area')) {
    function block_header_area() {
        if (function_exists('block_template_part')) {
            block_template_part('header');
        } elseif (function_exists('wp_block_template_part')) {
            wp_block_template_part('header');
        }
    }
}

// Helper function to render footer blocks
if (!function_exists('block_footer_area')) {
    function block_footer_area() {
        if (function_exists('block_template_part')) {
            block_template_part('footer');
        } elseif (function_exists('wp_block_template_part')) {
            wp_block_template_part('footer');
        }
    }
}

/**
 * The template for displaying a single doc
 */

// For block themes, we need to output the minimal HTML structure
if (function_exists('wp_is_block_theme') && wp_is_block_theme()) {
    ?>
    <!DOCTYPE html>
    <html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <div class="wp-site-blocks">
        <?php block_header_area(); ?>
<?php
} else {
    get_header();
}
/**
 * The template for displaying a single doc
 *
 * To customize this template, create a folder in your current theme named "wedocs" and copy it there.
 */
$skip_sidebar = ( get_post_meta( $post->ID, 'skip_sidebar', true ) == 'yes' ) ? true : false;

?>

    <?php
        /**
         * @since 1.4
         *
         * @hooked wedocs_template_wrapper_start - 10
         */
        do_action( 'wedocs_before_main_content' );
    ?>

    <?php while ( have_posts() ) {
        the_post(); ?>

        <div class="wedocs-single-wrap">

            <?php if ( ! $skip_sidebar ) { ?>
                <?php wedocs_get_template_part( 'docs', 'sidebar', [ 'post' => $post ] ); ?>
            <?php } ?>

            <div class="wedocs-single-content">
                <?php wedocs_breadcrumbs(); ?>

                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> itemscope itemtype="http://schema.org/Article">
                    <header class="entry-header">
                        <?php the_title( '<h1 class="entry-title" itemprop="headline">', '</h1>' ); ?>

                        <?php if ( wedocs_get_general_settings( 'print', 'on' ) === 'on' ) { ?>
                            <a
                                href="#"
                                class="wedocs-print-article wedocs-hide-print wedocs-hide-mobile"
                                title="<?php echo esc_attr( __( 'Print this article', 'wedocs' ) ); ?>"
                            >
                                <i class="wedocs-icon wedocs-icon-print"></i>
                            </a>
                        <?php } ?>
                    </header><!-- .entry-header -->

                    <div class="entry-content" itemprop="articleBody">
                        <?php
                            the_content( sprintf(
                                /* translators: %s: Name of current post. */
                                wp_kses( __( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'wedocs' ), [ 'span' => [ 'class' => [] ] ] ),
                                the_title( '<span class="screen-reader-text">"', '"</span>', false )
                            ) );

                            wp_link_pages( [
                                'before' => '<div class="page-links">' . esc_html__( 'Docs:', 'wedocs' ),
                                'after'  => '</div>',
                            ] );

                            $children = wp_list_pages( 'title_li=&order=menu_order&child_of=' . $post->ID . '&echo=0&post_type=' . $post->post_type );

                            if ( $children ) {
                                echo '<div class="article-child well">';
                                echo '<h3>' . __( 'Articles', 'wedocs' ) . '</h3>';
                                echo '<ul>';
                                echo $children;
                                echo '</ul>';
                                echo '</div>';
                            }

                            $tags_list = wedocs_get_the_doc_tags( $post->ID, '', ', ' );

                            if ( $tags_list ) {
                                printf( '<span class="tags-links"><span class="screen-reader-text">%1$s </span>%2$s</span>',
                                    _x( 'Tags', 'Used before tag names.', 'wedocs' ),
                                    $tags_list
                                );
                            }
                        ?>
                    </div><!-- .entry-content -->

	                  <?php wedocs_doc_nav(); ?>

                    <footer class="entry-footer wedocs-entry-footer">
                        <?php if ( wedocs_get_general_settings( 'email', 'on' ) === 'on' ) { ?>
                            <div class='help-content wedocs-hide-mobile'>
                                <div class='help-panel'>
                                    <span class='help-icon'>
                                        <svg width="26" height="25" fill="none" class='wedocs-icon'>
                                            <path
                                                d="M1.429 21.292V9.924c0-.851.425-1.646 1.134-2.118l8.911-5.941c.855-.57 1.969-.57 2.825 0l8.911 5.941c.708.472 1.134 1.267 1.134 2.118v11.367m-22.914 0c0 1.406 1.14 2.546 2.546 2.546h17.822c1.406 0 2.546-1.14 2.546-2.546m-22.914 0l8.593-5.728m14.321 5.728l-8.593-5.728M1.429 9.835l8.593 5.728m14.321-5.728l-8.593 5.728m0 0l-1.452.968c-.855.57-1.969.57-2.825 0l-1.452-.968"
                                                stroke="#9559ff"
                                                stroke-width="1.67"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <span class="wedocs-help-link wedocs-hide-print wedocs-hide-mobile">
                                        <?php printf( '%s <a id="wedocs-stuck-modal" href="%s">%s</a>', __( 'Still stuck? ', 'wedocs' ), '#', __( 'How can we help?', 'wedocs' ) ); ?>

                                        <div class="wedocs-article-author" itemprop="author" itemscope itemtype="https://schema.org/Person">
                                            <meta itemprop="name" content="<?php echo get_the_author(); ?>" />
                                            <meta itemprop="url" content="<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>" />
                                        </div>

                                        <meta itemprop="datePublished" content="<?php echo get_the_time( 'c' ); ?>"/>
                                        <time itemprop="dateModified" datetime="<?php echo esc_attr( get_the_modified_date( 'c' ) ); ?>"><?php printf( __( 'Updated on %s', 'wedocs' ), get_the_modified_date() ); ?></time>
                                    </span>
                                </div>
                            </div>
                        <?php } ?>

                        <?php if ( wedocs_get_general_settings( 'helpful', 'on' ) === 'on' ) { ?>
                            <div class='feedback-content'>
                                <?php wedocs_get_template_part( 'content', 'feedback' ); ?>
                            </div>
                        <?php } ?>
                    </footer>

                    <?php if ( wedocs_get_general_settings( 'email', 'on' ) === 'on' ) { ?>
                        <?php wedocs_get_template_part( 'content', 'modal' ); ?>
                    <?php } ?>

                    <?php if ( wedocs_get_general_settings( 'comments', 'off' ) === 'on' ) { ?>
                        <?php if ( comments_open() || get_comments_number() ) { ?>
                            <div class="wedocs-comments-wrap">
                                <?php comments_template(); ?>
                            </div>
                        <?php } ?>
                    <?php } ?>

                </article><!-- #post-## -->
            </div><!-- .wedocs-single-content -->
        </div><!-- .wedocs-single-wrap -->

    <?php } ?>

    <?php
        /**
         * @since 1.4
         *
         * @hooked wedocs_template_wrapper_end - 10
         */
        do_action( 'wedocs_after_main_content' );
    ?>

    <?php
    // Close out based on theme type
    if (function_exists('wp_is_block_theme') && wp_is_block_theme()) {
        ?>
            <?php block_footer_area(); ?>
        </div><!-- .wp-site-blocks -->
        <?php wp_footer(); ?>
        </body>
        </html>
        <?php
    } else {
        get_footer();
    }
