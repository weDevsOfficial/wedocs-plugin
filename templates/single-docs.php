<?php
/**
 * The template for displaying a single doc
 *
 * To customize this template, create a folder in your current theme named "wedocs" and copy it there.
 *
 * @package weDocs
 */

$skip_sidebar = ( get_post_meta( $post->ID, 'skip_sidebar', true ) == 'yes' ) ? true : false;

get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">
        <?php while ( have_posts() ) : the_post(); ?>

            <div class="wedocs-single-wrap">

                <?php if ( ! $skip_sidebar ) { ?>

                    <div class="wedocs-sidebar">
                        <?php
                        $ancestors = array();
                        $root      = $parent = false;
                        // $ancestors = get_post_ancestors( $post->ID );
                        // var_dump( $ancestors );
                        if ( $post->post_parent ) {
                            $ancestors = get_post_ancestors($post->ID);
                            $root      = count($ancestors) - 1;
                            $parent    = $ancestors[$root];
                        } else {
                            $parent = $post->ID;
                        }

                        // var_dump( $parent, $ancestors, $root );
                        $walker = new WeDocs_Walker_Docs();
                        $children = wp_list_pages( array(
                            'title_li'  => '',
                            'order'     => 'menu_order',
                            'child_of'  => $parent,
                            'echo'      => false,
                            'post_type' => 'docs',
                            'walker'    => $walker
                        ) );
                        ?>

                        <h3 class="widget-title"><?php echo get_post_field( 'post_title', $parent, 'display' ); ?></h3>

                        <?php if ($children) { ?>
                            <ul class="doc-nav-list">
                                <?php echo $children; ?>
                            </ul>
                        <?php } ?>
                    </div>

                <?php } ?>

                <div class="wedocs-single-content">
                    <?php wedocs_breadcrumbs(); ?>

                    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                        <header class="entry-header">
                            <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                        </header><!-- .entry-header -->

                        <div class="entry-content">
                            <?php
                                the_content( sprintf(
                                    /* translators: %s: Name of current post. */
                                    wp_kses( __( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'wedocs' ), array( 'span' => array( 'class' => array() ) ) ),
                                    the_title( '<span class="screen-reader-text">"', '"</span>', false )
                                ) );

                                wp_link_pages( array(
                                    'before' => '<div class="page-links">' . esc_html__( 'Docs:', 'wedocs' ),
                                    'after'  => '</div>',
                                ) );
                            ?>
                        </div><!-- .entry-content -->

                        <?php wedocs_doc_nav(); ?>

                        <?php wedocs_get_template_part( 'content', 'feedback' ); ?>

                    </article><!-- #post-## -->
                </div><!-- .wedocs-single-content -->
            </div><!-- .wedocs-single-wrap -->

        <?php endwhile; ?>

    </main><!-- .site-main -->

</div><!-- .content-area -->

<?php get_footer(); ?>
