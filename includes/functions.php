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

function wedocs_get_template( $template_name, $args = array() ) {
    global $wedocs;

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

function wedocs_breadcrumbs() {
    global $post;

    $delimiter = '<span class="sep">/</span>'; // delimiter between crumbs
    $home = __( 'Home', 'wedocs' ); // text for the 'Home' link
    $showCurrent = 1; // 1 - show current post/page title in breadcrumbs, 0 - don't show
    $before = '<span class="current">'; // tag before the current crumb
    $after = '</span>'; // tag after the current crumb
    $homeLink = home_url();

    echo '<div class="wedocs-breadcrumb"><a href="' . $homeLink . '">' . $home . '</a> ' . $delimiter . ' ';

    if ( is_tax( 'wedocs_category' ) ) {
        $thisCat = get_queried_object();

        if ( $thisCat->parent != 0 ) {
            echo wedocs_get_category_parents($thisCat->parent, TRUE, ' ' . $delimiter . ' ');
        }

        echo $before . single_cat_title('', false) . $after;

    } elseif ( is_singular( 'wedocs' ) ) {

        $cat = wedocs_get_the_category();
        $cats = wedocs_get_category_parents($cat[0], true, ' ' . $delimiter . ' ');
        echo $cats;
        echo $before . get_the_title() . $after;
    }

    echo '</div>';
}

/**
 * Retrieve category parents with separator.
 *
 * @since 1.2.0
 *
 * @param int $id Category ID.
 * @param bool $link Optional, default is false. Whether to format with link.
 * @param string $separator Optional, default is '/'. How to separate categories.
 * @param bool $nicename Optional, default is false. Whether to use nice name for display.
 * @param array $visited Optional. Already linked to categories to prevent duplicates.
 * @return string|WP_Error A list of category parents on success, WP_Error on failure.
 */
function wedocs_get_category_parents( $id, $link = false, $separator = '/', $nicename = false, $visited = array() ) {
    $chain = '';
    $parent = get_term( $id, 'wedocs_category' );
    if ( is_wp_error( $parent ) )
        return $parent;

    if ( $nicename )
        $name = $parent->slug;
    else
        $name = $parent->name;

    if ( $parent->parent && ( $parent->parent != $parent->term_id ) && !in_array( $parent->parent, $visited ) ) {
        $visited[] = $parent->parent;
        $chain .= wedocs_get_category_parents( $parent->parent, $link, $separator, $nicename, $visited );
    }

    if ( $link )
        $chain .= '<a href="' . esc_url( get_term_link( $parent->term_id, 'wedocs_category' ) ) . '" title="' . esc_attr( sprintf( __( "View all posts in %s" ), $parent->name ) ) . '">'.$name.'</a>' . $separator;
    else
        $chain .= $name.$separator;
    return $chain;
}

function wedocs_get_the_category( $post_id = false ) {
    $categories = get_the_terms( $post_id, 'wedocs_category' );
    if ( ! $categories || is_wp_error( $categories ) ) {
        $categories = array();
    }

    $categories = array_values( $categories );

    return $categories;
}