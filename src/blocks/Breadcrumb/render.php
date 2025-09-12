<?php
/**
 * Render the breadcrumb block on frontend
 *
 * @param array  $attributes Block attributes
 * @param string $content    Block content
 * @return string Rendered block content
 */
// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Extract attributes with defaults
$separator = $attributes['separator'] ?? 'slash';
$hide_home_icon = $attributes['hideHomeIcon'] ?? false;

// Get separator icon
if (!function_exists('get_separator_icon')) {
    function get_separator_icon($separator) {
        switch ($separator) {
            case 'slash':
                return '/';
            case 'arrow':
                return '›';
            case 'chevron':
                return '»';
            case 'dot':
                return '•';
            default:
                return '/';
        }
    }
}

// Get current page info for breadcrumbs
if (!function_exists('get_breadcrumb_items')) {
    function get_breadcrumb_items() {
    $breadcrumbs = [];

    // Always start with Home
    $breadcrumbs[] = [
        'title' => __('Home', 'wedocs'),
        'url' => home_url('/')
    ];

    // Check if we're on a docs page
    if (is_singular('docs')) {
        global $post;

        // Add parent docs
        $parent_docs = get_doc_ancestors($post);
        foreach ($parent_docs as $parent) {
            $breadcrumbs[] = [
                'title' => $parent->post_title,
                'url' => get_permalink($parent->ID)
            ];
        }

        // Add current doc (no URL for current page)
        $breadcrumbs[] = [
            'title' => $post->post_title,
            'url' => null
        ];
    } elseif (is_post_type_archive('docs')) {
        $breadcrumbs[] = [
            'title' => __('Documentation', 'wedocs'),
            'url' => null
        ];
    } else {
        // For testing: Show breadcrumbs on any page
        if (is_singular()) {
            global $post;
            $breadcrumbs[] = [
                'title' => $post->post_title,
                'url' => null
            ];
        } elseif (is_home() || is_front_page()) {
            $breadcrumbs[] = [
                'title' => __('Blog', 'wedocs'),
                'url' => null
            ];
        } elseif (is_category()) {
            $breadcrumbs[] = [
                'title' => single_cat_title('', false),
                'url' => null
            ];
        } elseif (is_page()) {
            global $post;
            $breadcrumbs[] = [
                'title' => $post->post_title,
                'url' => null
            ];
        } else {
            // Fallback for any other page type
            $breadcrumbs[] = [
                'title' => __('Current Page', 'wedocs'),
                'url' => null
            ];
        }
    }

    return $breadcrumbs;
    }
}

if (!function_exists('get_doc_ancestors')) {
    function get_doc_ancestors($post) {
    $ancestors = [];
    $parent = $post->post_parent;

    while ($parent) {
        $parent_post = get_post($parent);
        if ($parent_post) {
            array_unshift($ancestors, $parent_post);
            $parent = $parent_post->post_parent;
        } else {
            break;
        }
    }

    return $ancestors;
    }
}

$separator_icon = get_separator_icon($separator);
$breadcrumbs = get_breadcrumb_items();
?>
<div class="wedocs-document">
    <nav aria-label="Breadcrumb" class="flex">
        <ol role="list" class="flex space-x-4 rounded-md bg-white px-6 shadow">
            <?php foreach ($breadcrumbs as $index => $breadcrumb): ?>
                <li class="flex">
                    <div class="flex items-center">
                        <?php if ($index > 0): ?>
                            <!-- Separator -->
                            <svg viewBox="0 0 24 44" fill="currentColor" preserveAspectRatio="none" aria-hidden="true" class="h-full w-6 shrink-0 text-gray-200">
                                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                            </svg>
                        <?php endif; ?>
                        
                        <?php if ($breadcrumb['url']): ?>
                            <!-- Link with home icon for first item -->
                            <?php if (!$hide_home_icon && $index === 0): ?>
                                <a href="<?php echo esc_url($breadcrumb['url']); ?>" class="text-gray-400 hover:text-gray-500">
                                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 shrink-0">
                                        <path d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clip-rule="evenodd" fill-rule="evenodd" />
                                    </svg>
                                    <span class="sr-only"><?php echo esc_html($breadcrumb['title']); ?></span>
                                </a>
                            <?php else: ?>
                                <!-- Regular link -->
                                <a href="<?php echo esc_url($breadcrumb['url']); ?>" class="<?php echo $index === 0 ? '' : 'ml-4'; ?> text-sm font-medium text-gray-500 hover:text-gray-700">
                                    <?php echo esc_html($breadcrumb['title']); ?>
                                </a>
                            <?php endif; ?>
                        <?php else: ?>
                            <!-- Current page (no link) -->
                            <span <?php echo $index === 0 ? '' : 'class="ml-4"'; ?> aria-current="page" class="text-sm font-medium text-gray-500 hover:text-gray-700">
                                <?php echo esc_html($breadcrumb['title']); ?>
                            </span>
                        <?php endif; ?>
                    </div>
                </li>
            <?php endforeach; ?>
        </ol>
    </nav>
</div>
