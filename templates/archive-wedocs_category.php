<?php
/**
 * The Template for displaying all single docs
 *
 * @package weDocs
 * @since weDocs 1.0
 */

get_header(); ?>

    <div id="primary" class="content-area">
        <div id="content" class="site-content" role="main">

                <article id="post-0" <?php post_class(); ?>>

                    <div class="entry-content">
                        <?php

                        wedocs_breadcrumbs();
                        // echo wedocs_get_category_parents( get_queried_object_id(), true, ' > ' );

                        $parent_cat = get_queried_object();
                        $categories = get_terms( 'wedocs_category', array('hide_empty' => false, 'orderby' => 'term_id', 'parent' => $parent_cat->term_id) );

                        if ( $categories ) {
                            printf( '<h2 class="category-title">%s</h2>', $parent_cat->name );

                            echo '<ul class="doc-category clearfix">';
                            foreach ( $categories as $category ) {
                                ?>
                                <li class="category">
                                    <h3><a href="<?php echo get_term_link( $category ); ?>"><?php echo $category->name; ?></a></h3>

                                    <div class="inside">
                                        <?php if ( !empty( $category->description ) ) { ?>
                                            <?php echo $category->description; ?>
                                        <?php } ?>
                                    </div>
                                </li>
                                <?php
                            }
                            echo '</ul>';
                        }

                        // The Loop
                        if ( have_posts() ) {

                            printf( '<h2 class="category-title">%s</h2>', __( 'Documents', 'wedocs' ) );

                            echo '<ul class="doc-category">';
                            while (have_posts()) {
                                the_post();
                                ?>
                                <li class="doc">
                                    <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>

                                    <div class="inside">
                                        <?php the_excerpt(); ?>

                                        <?php wedocs_get_template_part( 'content', 'feedback' ); ?>
                                    </div>
                                </li>
                                <?php
                            }
                            echo '</ul>';
                        }
                        ?>

                        <?php if ( !$categories && !have_posts() ) { ?>
                            <div class="wedocs-error">
                                <?php _e( 'Nothing found!', 'wedocs' ); ?>
                            </div>
                        <?php } ?>


                    </div><!-- .entry-content -->
                </article>

        </div><!-- #content -->
    </div><!-- #primary -->

<?php get_footer();