<?php
/**
 * Get template part implementation for wedocs.
 *
 * Looks at the theme directory first
 */
function wedocs_get_template_part( $slug, $name = '' ) {
    $wedocs = WeDocs::init();

    $templates = [];
    $name      = (string) $name;

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
        $templates = [
            "{$slug}.php",
            $wedocs->theme_dir_path . "{$slug}.php",
        ];

        $template = locate_template( $templates );
    }

    if ( $template ) {
        load_template( $template, false );
    }
}

/**
 * Include a template by precedance.
 *
 * Looks at the theme directory first
 *
 * @param string $template_name
 * @param array  $args
 *
 * @return void
 */
function wedocs_get_template( $template_name, $args = [] ) {
    $wedocs = WeDocs::init();

    if ( $args && is_array( $args ) ) {
        extract( $args );
    }

    $template = locate_template( [
        $wedocs->theme_dir_path . $template_name,
        $template_name,
    ] );

    if ( !$template ) {
        $template = $wedocs->template_path() . $template_name;
    }

    if ( file_exists( $template ) ) {
        include $template;
    }
}

if ( !function_exists( 'wedocs_breadcrumbs' ) ) {

    /**
     * Docs breadcrumb.
     *
     * @return void
     */
    function wedocs_breadcrumbs() {
        global $post;

        $html = '';
        $args = apply_filters( 'wedocs_breadcrumbs', [
            'delimiter' => '<li class="delimiter"><i class="wedocs-icon wedocs-icon-angle-right"></i></li>',
            'home'      => __( 'Home', 'wedocs' ),
            'before'    => '<li><span class="current">',
            'after'     => '</span></li>',
        ] );

        $breadcrumb_position = 1;

        $html .= '<ol class="wedocs-breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">';
        $html .= '<li><i class="wedocs-icon wedocs-icon-home"></i></li>';
        $html .= wedocs_get_breadcrumb_item( $args['home'], home_url( '/' ), $breadcrumb_position );
        $html .= $args['delimiter'];

        $docs_home = wedocs_get_option( 'docs_home', 'wedocs_settings' );

        if ( $docs_home ) {
            ++$breadcrumb_position;

            $html .= wedocs_get_breadcrumb_item( __( 'Docs', 'wedocs' ), get_permalink( $docs_home ), $breadcrumb_position );
            $html .= $args['delimiter'];
        }

        if ( 'docs' == $post->post_type && $post->post_parent ) {
            $parent_id   = $post->post_parent;
            $breadcrumbs = [];

            while ( $parent_id ) {
                ++$breadcrumb_position;

                $page          = get_post( $parent_id );
                $breadcrumbs[] = wedocs_get_breadcrumb_item( get_the_title( $page->ID ), get_permalink( $page->ID ), $breadcrumb_position );
                $parent_id     = $page->post_parent;
            }

            $breadcrumbs = array_reverse( $breadcrumbs );

            for ( $i = 0; $i < count( $breadcrumbs ); ++$i ) {
                $html .= $breadcrumbs[$i];
                $html .= ' ' . $args['delimiter'] . ' ';
            }
        }

        $html .= ' ' . $args['before'] . get_the_title() . $args['after'];

        $html .= '</ol>';

        echo apply_filters( 'wedocs_breadcrumbs_html', $html, $args );
    }
}

if ( !function_exists( 'wedocs_get_breadcrumb_item' ) ) {

    /**
     * Schema.org breadcrumb item wrapper for a link.
     *
     * @param string $label
     * @param string $permalink
     * @param int    $position
     *
     * @return string
     */
    function wedocs_get_breadcrumb_item( $label, $permalink, $position = 1 ) {
        return '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
            <a itemprop="item" href="' . esc_attr( $permalink ) . '">
            <span itemprop="name">' . esc_html( $label ) . '</span></a>
            <meta itemprop="position" content="' . $position . '" />
        </li>';
    }
}

/**
 * Next, previous post navigation for a single doc.
 *
 * @return void
 */
function wedocs_doc_nav() {
    global $post, $wpdb;

    $next_query = "SELECT ID FROM {$wpdb->posts}
        WHERE post_parent = {$post->post_parent} and post_type = 'docs' and post_status = 'publish' and menu_order > {$post->menu_order}
        ORDER BY menu_order ASC
        LIMIT 0, 1";

    $prev_query = "SELECT ID FROM {$wpdb->posts}
        WHERE post_parent = {$post->post_parent} and post_type = 'docs' and post_status = 'publish' and menu_order < {$post->menu_order}
        ORDER BY menu_order DESC
        LIMIT 0, 1";

    $next_post_id = (int) $wpdb->get_var( $next_query );
    $prev_post_id = (int) $wpdb->get_var( $prev_query );

    if ( $next_post_id || $prev_post_id ) {
        echo '<nav class="wedocs-doc-nav wedocs-hide-print">';
        echo '<h3 class="assistive-text screen-reader-text">' . __( 'Doc navigation', 'wedocs' ) . '</h3>';

        if ( $prev_post_id ) {
            echo '<span class="nav-prev"><a href="' . get_permalink( $prev_post_id ) . '">&larr; ' . apply_filters( 'wedocs_translate_text', get_post( $prev_post_id )->post_title ) . '</a></span>';
        }

        if ( $next_post_id ) {
            echo '<span class="nav-next"><a href="' . get_permalink( $next_post_id ) . '">' . apply_filters( 'wedocs_translate_text', get_post( $next_post_id )->post_title ) . ' &rarr;</a></span>';
        }

        echo '</nav>';
    }
}

if ( !function_exists( 'wedocs_get_posts_children' ) ) {

    /**
     * Recursively fetch child posts.
     *
     * @param int    $parent_id
     * @param string $post_type
     *
     * @return array
     */
    function wedocs_get_posts_children( $parent_id, $post_type = 'page' ) {
        $children = [];

        // grab the posts children
        $posts = get_posts( [
            'numberposts'      => -1,
            'post_status'      => 'publish',
            'post_type'        => $post_type,
            'post_parent'      => $parent_id,
            'suppress_filters' => false,
        ] );

        // now grab the grand children
        foreach ( $posts as $child ) {
            // recursion!! hurrah
            $gchildren = wedocs_get_posts_children( $child->ID, $post_type );

            // merge the grand children into the children array
            if ( !empty( $gchildren ) ) {
                $children = array_merge( $children, $gchildren );
            }
        }

        // merge in the direct descendants we found earlier
        $children = array_merge( $children, $posts );

        return $children;
    }
}

/**
 * Retrieve the tags for a doc formatted as a string.
 *
 * @param string $before Optional. Before tags.
 * @param string $sep    Optional. Between tags.
 * @param string $after  Optional. After tags.
 * @param int    $id     Optional. Post ID. Defaults to the current post.
 *
 * @return string|false|WP_Error a list of tags on success, false if there are no terms, WP_Error on failure
 */
function wedocs_get_the_doc_tags( $post_id, $before = '', $sep = '', $after = '' ) {
    return get_the_term_list( $post_id, 'doc_tag', $before, $sep, $after );
}

// Check if QTranslate plugin is active before function declaration
$is_qtranslate = wedocs_is_plugin_active( 'qtranslate-x/qtranslate.php' );

if ( $is_qtranslate ) {
    /**
     * Translate dynamic text with QTranslate X plugin.
     *
     * @param string $text the multilingual text
     *
     * @return string the translated text
     */
    function wedocs_translate_text_with_qtranslate( $text ) {
        return apply_filters( 'translate_text', $text );
    }

    add_filter( 'wedocs_translate_text', 'wedocs_translate_text_with_qtranslate', 10, 1 );
}

/**
 * Check if a plugin is active.
 *
 * @param string $plugin_path_and_name the plugin relative path and filename of the plugin main file
 *
 * @return bool whether the plugin is active or not
 */
function wedocs_is_plugin_active( $plugin_path_and_name ) {
    if ( ! function_exists( 'is_plugin_active' ) ) {
        include_once ABSPATH . 'wp-admin/includes/plugin.php';
    }

    return is_plugin_active( $plugin_path_and_name );
}

/**
 * Get the value of a settings field.
 *
 * @param string $option  settings field name
 * @param string $section the section name this field belongs to
 * @param string $default default text if it's not found
 *
 * @return mixed
 */
function wedocs_get_option( $option, $section, $default = '' ) {
    $options = get_option( $section );

    if ( isset( $options[$option] ) ) {
        return $options[$option];
    }

    return $default;
}

/**
 * Get a clients IP address.
 *
 * @return string
 */
function wedocs_get_ip_address() {
    $ipaddress = '';

    if ( isset( $_SERVER['HTTP_CLIENT_IP'] ) ) {
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    } elseif ( isset( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } elseif ( isset( $_SERVER['HTTP_X_FORWARDED'] ) ) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    } elseif ( isset( $_SERVER['HTTP_FORWARDED_FOR'] ) ) {
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } elseif ( isset( $_SERVER['HTTP_FORWARDED'] ) ) {
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    } elseif ( isset( $_SERVER['REMOTE_ADDR'] ) ) {
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    } else {
        $ipaddress = 'UNKNOWN';
    }

    return $ipaddress;
}

/**
 * Send email feedback on a document.
 *
 * @param int    $doc_id
 * @param string $author
 * @param string $email
 * @param string $subject
 * @param string $message
 *
 * @since 1.2
 *
 * @return void
 */
function wedocs_doc_feedback_email( $doc_id, $author, $email, $subject, $message ) {
    $wp_email = 'wordpress@' . preg_replace( '#^www\.#', '', strtolower( $_SERVER['SERVER_NAME'] ) );
    $blogname = wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );
    $document = get_post( $doc_id );

    $email_to = wedocs_get_option( 'email_to', 'wedocs_settings', get_option( 'admin_email' ) );
    $subject  = sprintf( __( '[%1$s] New Doc Feedback: "%2$s"', 'wedocs' ), $blogname, $subject );

    $email_body = sprintf( __( 'New feedback on your doc "%s"', 'wedocs' ), apply_filters( 'wedocs_translate_text', $document->post_title ) ) . "\r\n";
    $email_body .= sprintf( __( 'Author: %1$s (IP: %2$s)', 'wedocs' ), $author, wedocs_get_ip_address() ) . "\r\n";
    $email_body .= sprintf( __( 'Email: %s', 'wedocs' ), $email ) . "\r\n";
    $email_body .= sprintf( __( 'Feedback: %s', 'wedocs' ), "\r\n" . $message ) . "\r\n\r\n";
    $email_body .= sprintf( __( 'Doc Permalink: %s', 'wedocs' ), get_permalink( $document ) ) . "\r\n";
    $email_body .= sprintf( __( 'Edit Doc: %s', 'wedocs' ), admin_url( 'post.php?action=edit&post=' . $doc_id ) ) . "\r\n";

    $from     = "From: \"${author}\" <${wp_email}>";
    $reply_to = "Reply-To: \"${email}\" <${email}>";

    $message_headers = "${from}\n"
            . 'Content-Type: text/plain; charset ="' . get_option( 'blog_charset' ) . "\"\n";
    $message_headers .= $reply_to . "\n";

    $email_to        = apply_filters( 'wedocs_email_feedback_to', $email_to, $doc_id, $document );
    $subject         = apply_filters( 'wedocs_email_feedback_subject', $subject, $doc_id, $document, $_POST );
    $email_body      = apply_filters( 'wedocs_email_feedback_body', $email_body, $doc_id, $document, $_POST );
    $message_headers = apply_filters( 'wedocs_email_feedback_headers', $message_headers, $doc_id, $document, $_POST );

    @wp_mail( $email_to, wp_specialchars_decode( $subject ), $email_body, $message_headers );
}

/**
 * Get the publishing capability for weDocs admin.
 *
 * @since 1.3
 *
 * @return string
 */
function wedocs_get_publish_cap() {
    return apply_filters( 'wedocs_publish_cap', 'publish_posts' );
}

if ( ! function_exists( 'wedocs_template_wrapper_start' ) ) {

    /**
     * Template start wrapper.
     *
     * @since 1.4
     *
     * @return void
     */
    function wedocs_template_wrapper_start() {
        echo '<div id="primary" class="content-area">';
        echo '<main id="main" class="site-main" role="main">';
    }
}

if ( !function_exists( 'wedocs_template_wrapper_end' ) ) {

    /**
     * Template end wrapper.
     *
     * @since 1.4
     *
     * @return void
     */
    function wedocs_template_wrapper_end() {
        echo '</main><!-- .site-main -->';
        echo '</div><!-- .content-area -->';
    }
}

add_action( 'wedocs_before_main_content', 'wedocs_template_wrapper_start', 10 );
add_action( 'wedocs_after_main_content', 'wedocs_template_wrapper_end', 10 );

/**
 * Sidebar open/closed status css classes.
 *
 * @param array   $css_class
 * @param WP_Post $page
 * @param int     $depth
 * @param array   $args
 * @param int     $current_page
 *
 * @return array
 */
function wedocs_sidebar_page_status_class( $css_class, $page, $depth, $args, $current_page ) {
    if ( 'docs' != $page->post_type ) {
        return $css_class;
    }

    if ( 0 == $depth ) {
        if ( in_array( 'current_page_item', $css_class ) ) {
            $css_class[] = 'wd-state-open';
        } else {
            $css_class[] = 'wd-state-closed';
        }
    }

    return $css_class;
}

add_filter( 'page_css_class', 'wedocs_sidebar_page_status_class', 20, 5 );
