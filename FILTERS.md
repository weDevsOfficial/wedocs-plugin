# weDocs Filters Documentation

This document describes the available filters in weDocs that developers can use to customize the plugin's behavior.

## `wedocs_upgrade_popup_content`

Filters the content displayed in the "Free to Pro" upgrade popup.

**Since:** 2.1.19

### Description

This filter allows you to customize the popup content for various campaigns and promotions. You can change the title, subtitle, features list, button text, button URL, and footer features dynamically without modifying the plugin's source code.

### Parameters

- **$content** (array) - Array of popup content data with the following structure:
  - **title** (string) - Popup title text.
  - **subtitle** (string) - Popup subtitle text.
  - **features** (array) - Array of feature items. Each item contains:
    - **title** (string) - Feature title (bold text).
    - **description** (string) - Feature description text.
  - **button_text** (string) - Upgrade button text.
  - **button_url** (string) - Upgrade button URL.
  - **footer_features** (array) - Array of footer feature texts.

### Default Values

```php
array(
    'title'    => __( 'Upgrade to', 'wedocs' ),
    'subtitle' => __( 'to experience even more Powerful features 🎉', 'wedocs' ),
    'features' => array(
        array(
            'title'       => __( 'Role based permission management ', 'wedocs' ),
            'description' => __( 'or viewing, managing, and configuring permission settings.', 'wedocs' ),
        ),
        array(
            'title'       => __( 'Arrange content automatically or manually ', 'wedocs' ),
            'description' => __( 'giving you full control over its presentation.', 'wedocs' ),
        ),
        array(
            'title'       => __( 'Personalize messaging tab with custom titles ', 'wedocs' ),
            'description' => __( 'and messages for seamless communication.', 'wedocs' ),
        ),
        array(
            'title'       => '',
            'description' => __( 'Customize with ', 'wedocs' ) . __( 'design widgets, colors, and pre-built options ', 'wedocs' ) . __( 'for an appealing interface.', 'wedocs' ),
        ),
        array(
            'title'       => __( 'Get assisted by A.I. Powered Chatbot ', 'wedocs' ),
            'description' => __( '24/7 with updated information and support.', 'wedocs' ),
        ),
    ),
    'button_text' => __( 'Get weDocs Pro', 'wedocs' ),
    'button_url'  => 'https://wedocs.co/pricing/?utm_source=wp-admin&utm_medium=freemium&utm_campaign=upgrade-popup',
    'footer_features' => array(
        __( '10,000+ successful businesses', 'wedocs' ),
        __( '14 days no questions asked refund policy', 'wedocs' ),
        __( 'Industry leading 24x7 support', 'wedocs' ),
    ),
)
```

### Example 1: Campaign Promotion

Customize the popup for a special discount campaign:

```php
add_filter( 'wedocs_upgrade_popup_content', function( $content ) {
    // Update title and subtitle for campaign
    $content['title'] = 'Special Black Friday Offer! 🎉';
    $content['subtitle'] = 'Get 30% OFF weDocs Pro - Limited Time Only!';
    
    // Update button text and URL with campaign tracking
    $content['button_text'] = 'Claim Your 30% Discount Now';
    $content['button_url'] = 'https://wedocs.co/pricing/?discount=BLACKFRIDAY30';
    
    return $content;
} );
```

### Example 2: Custom Features List

Show specific features relevant to your promotion:

```php
add_filter( 'wedocs_upgrade_popup_content', function( $content ) {
    $content['title'] = 'Unlock Premium Features';
    $content['subtitle'] = 'Take your documentation to the next level!';
    
    // Replace features with custom list
    $content['features'] = array(
        array(
            'title' => 'Role-Based Permission Management',
            'description' => '',
        ),
        array(
            'title' => 'Docs Duplicator',
            'description' => '',
        ),
        array(
            'title' => '7-layer hierarchical article creation',
            'description' => '',
        ),
        array(
            'title' => 'Social Sharing Options',
            'description' => '',
        ),
        array(
            'title' => 'Floating Contact Form',
            'description' => '',
        ),
    );
    
    return $content;
} );
```

### Example 3: Seasonal Campaign

Change content based on the current date/season:

```php
add_filter( 'wedocs_upgrade_popup_content', function( $content ) {
    $current_month = (int) date( 'n' );
    
    // December holiday campaign
    if ( 12 === $current_month ) {
        $content['title'] = 'Holiday Special! 🎄';
        $content['subtitle'] = 'End the year with powerful documentation tools - 25% OFF!';
        $content['button_text'] = 'Get Holiday Deal';
        $content['button_url'] = 'https://wedocs.co/pricing/?discount=HOLIDAY25';
    }
    // Summer campaign (June-August)
    elseif ( $current_month >= 6 && $current_month <= 8 ) {
        $content['title'] = 'Summer Sale! ☀️';
        $content['subtitle'] = 'Hot deals on weDocs Pro - Save 20%!';
        $content['button_text'] = 'Get Summer Deal';
        $content['button_url'] = 'https://wedocs.co/pricing/?discount=SUMMER20';
    }
    
    return $content;
} );
```

### Example 4: A/B Testing

Randomly show different variants for testing:

```php
add_filter( 'wedocs_upgrade_popup_content', function( $content ) {
    $variant = rand( 1, 2 );
    
    if ( $variant === 1 ) {
        // Variant A: Focus on features
        $content['title'] = 'Upgrade to Pro';
        $content['subtitle'] = 'Unlock powerful documentation features';
    } else {
        // Variant B: Focus on benefits
        $content['title'] = 'Save Time & Impress Users';
        $content['subtitle'] = 'Professional documentation made easy';
    }
    
    return $content;
} );
```

### Example 5: User-Specific Content

Show different content based on user roles or capabilities:

```php
add_filter( 'wedocs_upgrade_popup_content', function( $content ) {
    $current_user = wp_get_current_user();
    
    // For agency/developers
    if ( in_array( 'administrator', $current_user->roles ) ) {
        $content['features'] = array(
            array(
                'title' => 'White-label Documentation',
                'description' => 'for your clients',
            ),
            array(
                'title' => 'Advanced Permissions',
                'description' => 'for team management',
            ),
            array(
                'title' => 'Unlimited Sites',
                'description' => 'with agency license',
            ),
        );
        $content['button_text'] = 'Get Agency License';
        $content['button_url'] = 'https://wedocs.co/pricing/?plan=agency';
    }
    
    return $content;
} );
```

### Notes

- All text should be properly translated using WordPress internationalization functions (`__()`, `_e()`, etc.) when appropriate.
- The popup content is cached in the JavaScript layer, so changes will take effect on the next page load.
- Make sure to test your custom content in the popup to ensure it displays correctly.
- Keep feature descriptions concise to maintain a good user experience.
