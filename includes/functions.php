<?php
/**
 * Get template part implementation for wedocs
 *
 * Looks at the theme directory first
 */
function wedocs_get_template_part( $slug, $name = '' ) {
    $wedocs = WeDocs::init();

    $templates = array();
    $name = (string) $name;

    // lookup at theme/slug-name.php or wedocs/slug-name.php
    if ( '' !== $name ) {
        $templates[] = "{$slug}-{$name}.php";
        $templates[] = $wedocs->theme_dir_path . "{$slug}-{$name}.php";
    }

    $template = locate_template( $templates );

    // fallback to plugin default template
    if ( !$template && $name && file_exists( $wedocs->template_path() . "{$slug}-{$name}.php" ) ) {
        $template = $wedocs->template_path() . "{$slug}-{$name}.php";
    }

    // if not yet found, lookup in slug.php only
    if ( !$template ) {
        $templates = array(
            "{$slug}.php",
            $wedocs->theme_dir_path . "{$slug}.php"
        );

        $template = locate_template( $templates );
    }

    if ( $template ) {
        load_template( $template, false );
    }
}

/**
 * Include a template by precedance
 *
 * Looks at the theme directory first
 *
 * @param  string  $template_name
 * @param  array   $args
 *
 * @return void
 */
function wedocs_get_template( $template_name, $args = array() ) {
    $wedocs = WeDocs::init();

    if ( $args && is_array($args) ) {
        extract( $args );
    }

    $template = locate_template( array(
        $wedocs->theme_dir_path . $template_name,
        $template_name
    ) );

    if ( ! $template ) {
        $template = $wedocs->template_path() . $template_name;
    }

    if ( file_exists( $template ) ) {
        include $template;
    }
}

if ( ! function_exists( 'wedocs_breadcrumbs' ) ) :

/**
 * Docs breadcrumb
 *
 * @return void
 */
function wedocs_breadcrumbs() {
    global $post;

    $args = apply_filters( 'wedocs_breadcrumbs', array(
        'delimiter' => '&rarr;',
        'home'      => __( 'Home', 'wedocs' ),
        'before'    => '<span class="current">',
        'afeter'    => '</span>'
    ) );

    echo '<div class="wedocs-breadcrumb">';
    echo '<a href="' . home_url( '/' ) . '">' . $args['home'] . '</a> ' . $args['delimiter'] . ' ';

    if ( $post->post_type == 'docs' && $post->post_parent ) {
        $parent_id   = $post->post_parent;
        $breadcrumbs = array();

        while ($parent_id) {
            $page          = get_post($parent_id);
            $breadcrumbs[] = '<a href="' . get_permalink($page->ID) . '">' . get_the_title($page->ID) . '</a>';
            $parent_id     = $page->post_parent;
        }

        $breadcrumbs = array_reverse($breadcrumbs);
        for ($i = 0; $i < count($breadcrumbs); $i++) {
            echo $breadcrumbs[$i];

            if ( $i != count($breadcrumbs) - 1) {
                echo ' ' . $args['delimiter'] . ' ';
            }
        }

        echo ' ' . $args['delimiter'] . ' ' . $args['before'] . get_the_title() . $args['after'];

    }

    echo '</div>';
}

endif;

/**
 * Next, previous post navigation for a single doc
 *
 * @return void
 */
function wedocs_doc_nav() {
    global $post, $wpdb;

    $next_query = "SELECT ID FROM $wpdb->posts
        WHERE post_parent = $post->post_parent and post_type = 'docs' and post_status = 'publish' and menu_order > $post->menu_order
        ORDER BY menu_order ASC
        LIMIT 0, 1";

    $prev_query = "SELECT ID FROM $wpdb->posts
        WHERE post_parent = $post->post_parent and post_type = 'docs' and post_status = 'publish' and menu_order < $post->menu_order
        ORDER BY menu_order DESC
        LIMIT 0, 1";

    $next_post_id = (int) $wpdb->get_var( $next_query );
    $prev_post_id = (int) $wpdb->get_var( $prev_query );

    if ( $next_post_id || $prev_post_id ) {

        echo '<nav class="wedocs-doc-nav">';
        echo '<h3 class="assistive-text screen-reader-text">'. __( 'Doc navigation', 'wedocs' ) . '</h3>';

        if ( $prev_post_id ) {
            echo '<span class="nav-prev"><a href="' . get_permalink( $prev_post_id ) . '">&larr; ' . get_post( $prev_post_id )->post_title . '</a></span>';
        }

        if ( $next_post_id ) {
            echo '<span class="nav-next"><a href="' . get_permalink( $next_post_id ) . '">' . get_post( $next_post_id )->post_title . ' &rarr;</a></span>';
        }

        echo '</nav>';
    }
}

/**
 * Recursively fetch child posts
 *
 * @param  integer  $parent_id
 * @param  string  $post_type
 *
 * @return array
 */
function wedocs_get_posts_children( $parent_id, $post_type = 'page' ){
    $children = array();

    // grab the posts children
    $posts = get_posts( array(
        'numberposts'      => -1,
        'post_status'      => 'publish',
        'post_type'        => $post_type,
        'post_parent'      => $parent_id,
        'suppress_filters' => false
    ));

    // now grab the grand children
    foreach ( $posts as $child ) {
        // recursion!! hurrah
        $gchildren = wedocs_get_posts_children( $child->ID, $post_type );

        // merge the grand children into the children array
        if ( !empty($gchildren) ) {
            $children = array_merge($children, $gchildren);
        }
    }

    // merge in the direct descendants we found earlier
    $children = array_merge($children,$posts);
    return $children;
}

/**
 * Retrieve the tags for a doc formatted as a string.
 *
 * @param string $before Optional. Before tags.
 * @param string $sep Optional. Between tags.
 * @param string $after Optional. After tags.
 * @param int $id Optional. Post ID. Defaults to the current post.
 *
 * @return string|false|WP_Error A list of tags on success, false if there are no terms, WP_Error on failure.
 */
function wedocs_get_the_doc_tags( $post_id, $before = '', $sep = '', $after = '' ) {
    return get_the_term_list( $post_id, 'doc_tag', $before, $sep, $after );
}
