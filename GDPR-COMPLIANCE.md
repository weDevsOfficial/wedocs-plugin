# GDPR Compliance in weDocs

weDocs is designed to help you comply with GDPR requirements when collecting user feedback through the contact form.

## What We've Implemented

### 1. GDPR Consent Checkbox

A mandatory checkbox has been added to the contact form that informs users:
- Their name, email, and IP address will be collected
- The information will not be stored in the database
- The information will only be attached to the email sent to the site administrator

The checkbox must be checked before the form can be submitted (enforced both client-side and server-side).

### 2. Filter Hook for IP Address Customization

We've added a filter hook `wedocs_email_feedback_author_line` that allows you to customize how the author information (including IP address) appears in the feedback email.

## How to Customize IP Address Handling

### Option 1: Remove IP Address Completely

If you want to remove the IP address from the email entirely, add this code to your theme's `functions.php` file or a custom plugin:

```php
add_filter( 'wedocs_email_feedback_author_line', function( $author_line, $author ) {
    return sprintf( 'Author: %s', $author );
}, 10, 2 );
```

### Option 2: Anonymize IP Address

If you want to keep the IP but anonymize it (e.g., remove the last octet for IPv4):

**Note:** This example only handles IPv4 addresses. For production use, consider adding IPv6 support or using a library that handles both.

```php
add_filter( 'wedocs_email_feedback_author_line', function( $author_line, $author, $ip_address ) {
    // Anonymize IPv4 by removing last segment
    if ( filter_var( $ip_address, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 ) ) {
        $ip_parts = explode( '.', $ip_address );
        if ( count( $ip_parts ) === 4 ) {
            $ip_parts[3] = '0';
            $ip_address = implode( '.', $ip_parts );
        }
    }
    
    return sprintf( 'Author: %s (IP: %s - anonymized)', $author, $ip_address );
}, 10, 3 );
```

### Option 3: Add Additional Context

If you want to add more information to help with GDPR compliance:

```php
add_filter( 'wedocs_email_feedback_author_line', function( $author_line, $author, $ip_address, $doc_id, $document ) {
    return sprintf( 
        'Author: %s (IP: %s, Time: %s, Doc: %s)',
        $author,
        $ip_address,
        current_time( 'mysql' ),
        $document->post_title
    );
}, 10, 5 );
```

## Filter Parameters

The `wedocs_email_feedback_author_line` filter receives the following parameters:

1. `$author_line` (string) - The default formatted author line
2. `$author` (string) - The author's name
3. `$ip_address` (string) - The author's IP address
4. `$doc_id` (int) - The document ID
5. `$document` (WP_Post) - The document post object

## Additional Recommendations

### Update Your Privacy Policy

Make sure your privacy policy clearly states:
- What data you collect through the contact form
- How long the data is retained (email retention policy)
- Who has access to the data
- How users can request deletion of their data

### Email Retention

Since the feedback is sent via email, remember that:
- Emails may be stored in your email server/client
- You should have a policy for how long to retain feedback emails
- Consider implementing a process to delete old emails containing personal data

## Questions?

For more information about GDPR compliance, please refer to:
- [GDPR Official Website](https://gdpr.eu/)
- [WordPress GDPR Compliance Guide](https://wordpress.org/about/privacy/)
