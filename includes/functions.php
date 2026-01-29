<?php
/**
 * Get template part implementation for wedocs.
 * Looks at the theme directory first.
 *
 * @since 2.0.0
 *
 * @param string $slug
 * @param string $name
 * @param array  $args
 *
 * @return void
 */
function wedocs_get_template_part( $slug, $name = '', $args = array() ) {
    $defaults = array(
        'pro' => false,
    );

    $args = wp_parse_args( $args, $defaults );
    if ( $args && is_array( $args ) ) {
        extract( $args ); // phpcs:ignore
    }

    $wedocs   = ! empty( $args['pro'] ) && true === $args['pro'] ? WeDocs_Pro::init() : WeDocs::init();
    $template = '';

    // Look in yourtheme/wedocs/slug-name.php and yourtheme/wedocs/slug.php.
    $template_path = ! empty( $name ) ? "{$slug}-{$name}.php" : "{$slug}.php";
    $template      = locate_template( [ $wedocs->theme_dir_path() . $template_path ] );

    $template_path = apply_filters( 'wedocs_set_template_path', $wedocs->plugin_path() . '/templates', $template, $args );

    // Get default slug-name.php.
    if ( ! $template && $name && file_exists( $template_path . "/{$slug}-{$name}.php" ) ) {
        $template = $template_path . "/{$slug}-{$name}.php";
    }

    if ( ! $template && ! $name && file_exists( $template_path . "/{$slug}.php" ) ) {
        $template = $template_path . "/{$slug}.php";
    }

    // Allow 3rd party plugin filter template file from their plugin
    $template = apply_filters( 'wedocs_get_template_part', $template, $slug, $name );

    if ( $template ) {
        include $template;
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
    $wedocs = ! empty( $args['pro'] ) && true === $args['pro'] ? WeDocs_Pro::init() :WeDocs::init();

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

/**
 * Control display content length.
 *
 * @since 2.0.0
 *
 * @param string $content
 * @param int    $max_content_number
 *
 * @return string
 */
function wedocs_apply_short_content( $content, $max_content_number ) {
    // Control content length by substr.
    return ( mb_strlen( $content ) > $max_content_number ) ? mb_substr( $content, 0, $max_content_number ) . '...' : $content;
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

        // Collect documentation home page settings.
        $docs_home = wedocs_get_general_settings( 'docs_home' );

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
        $breadcrumb_label = wedocs_apply_short_content( $label, 25 );

        return apply_filters(
            'wedocs_breadcrumbs_items',
            '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
	            <a itemprop="item" href="' . esc_attr( $permalink ) . '">
	            <span itemprop="name">' . esc_html( $breadcrumb_label ) . '</span></a>
	            <meta itemprop="position" content="' . $position . '" />
            </li>'
        );
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
    function wedocs_get_posts_children( $parent_id, $post_type = 'page', $custom_args = array() ) {
        $children = array();

        $default = array(
            'numberposts'      => -1,
            'post_status'      => 'publish',
            'post_type'        => $post_type,
            'post_parent'      => $parent_id,
            'suppress_filters' => false,
        );

        // Parse posts arguments.
        $args = wp_parse_args( $custom_args, $default );

        // grab the posts children
        $posts = get_posts( $args );

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

    if ( isset( $options[ $option ] ) ) {
        return $options[ $option ];
    }

    return $default;
}

/**
 * Get the value of general settings.
 *
 * @since 2.0.0
 *
 * @param string $field_name general settings field name.
 * @param string $default    default data if settings not found.
 *
 * @return mixed
 */
function wedocs_get_general_settings( $field_name = '', $default = '' ) {
    $general_settings  = wedocs_get_option( 'general', 'wedocs_settings', [] );

    if ( ! empty( $field_name ) ) {
        $wedocs_field_data = wedocs_get_option( $field_name, 'wedocs_settings', $default );

        // Check from general settings if not found then collect data from wedocs_settings.
        return ! empty( $general_settings[ $field_name ] ) ? $general_settings[ $field_name ] : $wedocs_field_data;
    }

    return $general_settings;
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

    // Collect feedback sending email address & prepare body.
    $email_to = wedocs_get_general_settings( 'email_to', get_option( 'admin_email' ) );
    $subject  = sprintf( __( '[%1$s] New Doc Feedback: "%2$s"', 'wedocs' ), $blogname, $subject );

    $email_body = sprintf( __( 'New feedback on your doc "%s"', 'wedocs' ), apply_filters( 'wedocs_translate_text', $document->post_title ) ) . "\r\n";
    $email_body .= sprintf( __( 'Author: %1$s (IP: %2$s)', 'wedocs' ), $author, wedocs_get_ip_address() ) . "\r\n";
    $email_body .= sprintf( __( 'Email: %s', 'wedocs' ), $email ) . "\r\n";
    $email_body .= sprintf( __( 'Feedback: %s', 'wedocs' ), "\r\n" . $message ) . "\r\n\r\n";
    $email_body .= sprintf( __( 'Doc Permalink: %s', 'wedocs' ), get_permalink( $document ) ) . "\r\n";
    $email_body .= sprintf( __( 'Edit Doc: %s', 'wedocs' ), admin_url( 'post.php?action=edit&post=' . $doc_id ) ) . "\r\n";

    $from     = "From: $author <$wp_email>";
    $reply_to = "Reply-To: $email <$email>";

    $message_headers = "$from\n"
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
    return apply_filters( 'wedocs_publish_cap', 'manage_categories' );
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

/**
 * Add weDocs documentation handling capabilities for users.
 *
 * @since 1.0.0
 *
 * @return void
 */
function wedocs_user_documentation_handling_capabilities() {
    global $wp_roles;

    if ( class_exists( 'WP_Roles' ) && ! isset( $wp_roles ) ) {
        $wp_roles = new \WP_Roles(); // @codingStandardsIgnoreLine
    }

    $permitted_roles = array( 'administrator', 'editor' );
    $all_roles       = $wp_roles->get_names();
    $capabilities    = array( 'edit_docs', 'publish_docs', 'edit_others_docs', 'read_private_docs', 'edit_private_docs', 'edit_published_docs' );

    // First, remove capabilities from unauthorized roles (cleanup for existing installations)
    foreach ( $capabilities as $capability ) {
        foreach ( array_keys( $all_roles ) as $role_key ) {
            $role = $wp_roles->get_role( $role_key );
            if ( $role && $role->has_cap( $capability ) && ! in_array( $role_key, $permitted_roles, true ) ) {
                $wp_roles->remove_cap( $role_key, $capability );
            }
        }
    }

    // Push documentation handling access ONLY to permitted roles.
    foreach ( $capabilities as $capability ) {
        foreach ( $permitted_roles as $role_key ) {
            if ( $wp_roles->is_role( $role_key ) ) {
                $wp_roles->add_cap( $role_key, $capability );
            }
        }
    }
}

/**
 * Check premium version
 * availability.
 *
 * @since 2.0.0
 *
 * @return bool
 */
function wedocs_pro_exists() {
    if ( ! class_exists( 'WeDocs_Pro' ) ) {
        return false;
    }

    // Check weDocs pro plugin domain availability.
    $active_plugins = get_option( 'active_plugins' );
    foreach ( $active_plugins as $plugin ) {
        $plugin_data        = get_plugin_data( WP_PLUGIN_DIR . '/' . $plugin );
        $plugin_text_domain = ! empty( $plugin_data[ 'TextDomain' ] ) ? sanitize_key( $plugin_data[ 'TextDomain' ] ) : '';

        if ( $plugin_text_domain === 'wedocs-pro' ) {
            return true;
        }
    }

     return false;
}

/**
 * Collect active layout colors.
 *
 * @since 2.0.2
 *
 * @return array
 */
function wedocs_get_search_modal_active_colors() {
    return apply_filters(
        'wedocs_search_modal_active_colors',
        array(
            'active_primary_color' => '#3B82F6',
            'active_shade_color'   => '#D9EBFF',
            'active_font_color'    => '#fff',
        )
    );
}

/**
 * Control displaying content length.
 *
 * @since 2.1.1
 *
 * @param string $content
 * @param int    $max_content_number
 *
 * @return string
 */
function wedocs_apply_extracted_content( $content, $max_content_number ) {
    // Control content length by substr.
    return ( mb_strlen( $content ) > $max_content_number ) ? mb_substr( $content, 0, $max_content_number ) . '...' : $content;
}

/**
 * Convert UTC Time zone to EST timezone
 *
 * @param string $date_time
 * @return string
 */
function wedocs_convert_utc_to_est() {
	$current_time = new DateTime( 'now', new DateTimeZone( 'UTC' ) );
	$current_time->setTimezone( new DateTimeZone( 'EST' ) );

	return $current_time->format( 'Y-m-d H:i:s T' );
}

/**
 * Get AI provider configurations.
 *
 * Returns configuration for all supported AI providers including their models
 * and vision capabilities for image analysis support.
 *
 * @since 2.1.15
 * @since 2.2.0 Added vision capability metadata for image analysis support.
 *
 * @return array Provider configurations with models and capabilities.
 */
function wedocs_get_ai_provider_configs() {
	$provider_configs = [
		'openai'    => [
			'name'         => 'OpenAI',
			'endpoint'     => 'https://api.openai.com/v1/chat/completions',
			'models'       => [
				'gpt-4o'        => [
					'name'   => 'GPT-4o - Most Capable Multimodal',
					'vision' => true,
				],
				'gpt-4o-mini'   => [
					'name'   => 'GPT-4o Mini - Efficient & Fast',
					'vision' => true,
				],
				'gpt-4-turbo'   => [
					'name'   => 'GPT-4 Turbo - High Performance',
					'vision' => true,
				],
				'gpt-4'         => [
					'name'   => 'GPT-4 - Advanced Reasoning',
					'vision' => false,
				],
				'gpt-3.5-turbo' => [
					'name'   => 'GPT-3.5 Turbo - Fast & Affordable',
					'vision' => false,
				],
			],
			'requires_key' => true,
		],
		'anthropic' => [
			'name'         => 'Anthropic Claude',
			'endpoint'     => 'https://api.anthropic.com/v1/messages',
			'models'       => [
				'claude-4.1-opus'            => [
					'name'   => 'Claude 4.1 Opus - Most Capable',
					'vision' => true,
				],
				'claude-4-opus'              => [
					'name'   => 'Claude 4 Opus - Best Coding Model',
					'vision' => true,
				],
				'claude-4-sonnet'            => [
					'name'   => 'Claude 4 Sonnet - Advanced Reasoning',
					'vision' => true,
				],
				'claude-3.7-sonnet'          => [
					'name'   => 'Claude 3.7 Sonnet - Hybrid Reasoning',
					'vision' => true,
				],
				'claude-3-5-sonnet-20241022' => [
					'name'   => 'Claude 3.5 Sonnet Latest',
					'vision' => true,
				],
				'claude-3-5-sonnet-20240620' => [
					'name'   => 'Claude 3.5 Sonnet',
					'vision' => true,
				],
				'claude-3-5-haiku-20241022'  => [
					'name'   => 'Claude 3.5 Haiku',
					'vision' => true,
				],
				'claude-3-opus-20240229'     => [
					'name'   => 'Claude 3 Opus',
					'vision' => true,
				],
				'claude-3-sonnet-20240229'   => [
					'name'   => 'Claude 3 Sonnet',
					'vision' => true,
				],
				'claude-3-haiku-20240307'    => [
					'name'   => 'Claude 3 Haiku',
					'vision' => true,
				],
			],
			'requires_key' => true,
		],
		'google'    => [
			'name'         => 'Google Gemini',
			'endpoint'     => 'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent',
			'models'       => [
				'gemini-2.0-flash-exp'      => [
					'name'   => 'Gemini 2.0 Flash Experimental - Latest',
					'vision' => true,
				],
				'gemini-2.0-flash'          => [
					'name'   => 'Gemini 2.0 Flash - Stable',
					'vision' => true,
				],
				'gemini-2.0-flash-001'      => [
					'name'   => 'Gemini 2.0 Flash 001 - Stable Version',
					'vision' => true,
				],
				'gemini-2.0-flash-lite-001' => [
					'name'   => 'Gemini 2.0 Flash-Lite 001 - Lightweight',
					'vision' => true,
				],
				'gemini-2.0-flash-lite'     => [
					'name'   => 'Gemini 2.0 Flash-Lite - Lightweight',
					'vision' => true,
				],
				'gemini-2.5-flash'          => [
					'name'   => 'Gemini 2.5 Flash - Latest Stable',
					'vision' => true,
				],
				'gemini-2.5-pro'            => [
					'name'   => 'Gemini 2.5 Pro - Most Capable',
					'vision' => true,
				],
				'gemini-2.5-flash-lite'     => [
					'name'   => 'Gemini 2.5 Flash-Lite - Efficient',
					'vision' => true,
				],
				'gemini-flash-latest'       => [
					'name'   => 'Gemini Flash Latest - Auto-Updated',
					'vision' => true,
				],
				'gemini-pro-latest'         => [
					'name'   => 'Gemini Pro Latest - Auto-Updated',
					'vision' => true,
				],
			],
			'requires_key' => true,
		],
	];

	return apply_filters( 'wedocs_ai_provider_configs', $provider_configs );
}

/**
 * Check if a specific AI model supports vision/image analysis.
 *
 * @since 2.2.0
 *
 * @param string $provider The provider key (openai, anthropic, google).
 * @param string $model    The model identifier.
 *
 * @return bool True if the model supports vision, false otherwise.
 */
function wedocs_model_supports_vision( $provider, $model ) {
	$configs = wedocs_get_ai_provider_configs();

	if ( ! isset( $configs[ $provider ]['models'][ $model ] ) ) {
		return false;
	}

	$model_config = $configs[ $provider ]['models'][ $model ];

	// Handle both old string format and new array format for backward compatibility.
	if ( is_array( $model_config ) ) {
		return ! empty( $model_config['vision'] );
	}

	return false;
}

/**
 * Get the display name of an AI model.
 *
 * @since 2.2.0
 *
 * @param string $provider The provider key (openai, anthropic, google).
 * @param string $model    The model identifier.
 *
 * @return string The model display name.
 */
function wedocs_get_model_name( $provider, $model ) {
	$configs = wedocs_get_ai_provider_configs();

	if ( ! isset( $configs[ $provider ]['models'][ $model ] ) ) {
		return $model;
	}

	$model_config = $configs[ $provider ]['models'][ $model ];

	// Handle both old string format and new array format for backward compatibility.
	if ( is_array( $model_config ) ) {
		return $model_config['name'] ?? $model;
	}

	return $model_config;
}

/**
 * Check if weDocs Pro is active.
 *
 * @since 2.1.15
 *
 * @return bool True if Pro is active, false otherwise.
 */
function wedocs_is_pro_active() {
	return defined( 'WEDOCS_PRO_VERSION' );
}

/**
 * Cleanup orphaned temporary images used for AI analysis.
 *
 * This function is called by a scheduled cron event to remove
 * temporary images that were uploaded but never cleaned up
 * (e.g., if the user closed the browser before generation completed).
 *
 * @since 2.2.0
 *
 * @return void
 */
function wedocs_cleanup_ai_temp_images() {
	$upload_dir = wp_upload_dir();
	$temp_dir   = $upload_dir['basedir'] . '/wedocs-ai-temp/';

	if ( ! is_dir( $temp_dir ) ) {
		return;
	}

	$files = glob( $temp_dir . '*' );
	$now   = time();

	// Delete files older than 1 hour.
	$max_age = 3600; // 1 hour in seconds.

	foreach ( $files as $file ) {
		// Skip index.php security file.
		if ( basename( $file ) === 'index.php' ) {
			continue;
		}

		if ( is_file( $file ) && ( $now - filemtime( $file ) ) > $max_age ) {
			unlink( $file );
		}
	}
}
add_action( 'wedocs_cleanup_ai_temp_images', 'wedocs_cleanup_ai_temp_images' );

/**
 * Schedule the AI temp images cleanup cron event.
 *
 * @since 2.2.0
 *
 * @return void
 */
function wedocs_schedule_ai_cleanup_cron() {
	if ( ! wp_next_scheduled( 'wedocs_cleanup_ai_temp_images' ) ) {
		wp_schedule_event( time(), 'hourly', 'wedocs_cleanup_ai_temp_images' );
	}
}
add_action( 'init', 'wedocs_schedule_ai_cleanup_cron' );

/**
 * Clear the AI temp images cleanup cron event on plugin deactivation.
 *
 * @since 2.2.0
 *
 * @return void
 */
function wedocs_clear_ai_cleanup_cron() {
	$timestamp = wp_next_scheduled( 'wedocs_cleanup_ai_temp_images' );
	if ( $timestamp ) {
		wp_unschedule_event( $timestamp, 'wedocs_cleanup_ai_temp_images' );
	}
}
