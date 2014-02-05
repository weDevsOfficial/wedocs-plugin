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
            <?php while ( have_posts() ) : the_post(); ?>

                <?php wedocs_breadcrumbs(); ?>

                <article id="post-<?php the_ID(); ?>" <?php post_class('wedocs-single-doc'); ?>>

                    <?php
                        $content = get_the_content();
                        $content = apply_filters( 'the_content', $content );
                        $content = str_replace( ']]>', ']]&gt;', $content );

                        preg_match_all( "/<h2>(.*?)<\/h2>/si", $content, $matches );
                        list( $with_tags, $without_tags) = $matches;

                        if ( $with_tags ) {
                        ?>
                            <div class="bs-sidebar hidden-print affix">
                                <ul class="nav bs-sidenav">
                                    <?php
                                    foreach ($without_tags as $link_text) {
                                        $slug = sanitize_title_with_dashes( $link_text );

                                        printf('<li><a href="#%s"><i class="fa fa-chevron-right pull-right"></i> %s</a></li>', $slug, strip_tags( $link_text ) );
                                    }
                                    ?>
                                </ul>
                            </div>
                    <?php } ?>

                    <div class="wedocs-single-content <?php echo $with_tags ? 'has-nav' : 'no-nav'; ?>">

                        <header class="entry-header">
                            <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                        </header>

                        <div class="entry-content">
                            <?php
                            foreach ($without_tags as $link_text) {
                                $slug = sanitize_title_with_dashes( $link_text );
                                $replace = sprintf('<div class="spy-item" id="%s"></div>', $slug );
                                $replace = $replace . '<div class="page-header"><h3 class="section-title">' . $link_text . '</h3></div>';

                                $content = str_replace("<h2>$link_text</h2>", $replace, $content);
                            }

                            echo $content;
                            ?>

                            <?php wedocs_get_template_part( 'content', 'feedback' ); ?>
                        </div>
                    </div><!-- .entry-content -->
                </article>

            <?php endwhile; ?>
        </div><!-- #content -->
    </div><!-- #primary -->

<?php get_footer();