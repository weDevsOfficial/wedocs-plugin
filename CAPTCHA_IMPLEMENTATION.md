# CAPTCHA Integration for HelpfulModal Block

This implementation adds comprehensive CAPTCHA protection to the WeDocs HelpfulModal block to prevent DDoS attacks and spam submissions.

## Features Added

### 🔒 Dual CAPTCHA Support
- **Google reCAPTCHA v2** - Industry standard CAPTCHA
- **Cloudflare Turnstile** - Privacy-focused alternative to reCAPTCHA

### 🎛️ Block Configuration
- Enable/disable CAPTCHA per block
- Choose between reCAPTCHA and Turnstile
- Global and per-block API key configuration
- Seamless editor integration

### 🛡️ Security Features
- Server-side token verification
- Rate limiting protection
- Automatic CAPTCHA reset after submission
- Fallback handling for configuration errors

### 📱 User Experience
- Responsive CAPTCHA widgets
- Accessible form controls
- Clear error messaging
- Auto-initialization after modal load

## Configuration

### 1. Get API Keys

**For reCAPTCHA:**
1. Visit https://www.google.com/recaptcha/admin
2. Create a new site (reCAPTCHA v2 "I'm not a robot" checkbox)
3. Get your Site Key and Secret Key

**For Turnstile:**
1. Visit https://dash.cloudflare.com
2. Go to Turnstile section
3. Create a new site
4. Get your Site Key and Secret Key

### 2. Configure Keys

**Option A: Using WordPress Admin**
```php
// Add to your theme's functions.php or a custom plugin
update_option('wedocs_recaptcha_site_key', 'your-recaptcha-site-key');
update_option('wedocs_recaptcha_secret_key', 'your-recaptcha-secret-key');

update_option('wedocs_turnstile_site_key', 'your-turnstile-site-key');
update_option('wedocs_turnstile_secret_key', 'your-turnstile-secret-key');
```

**Option B: Using WP-CLI**
```bash
wp wedocs captcha recaptcha your-site-key your-secret-key
wp wedocs captcha turnstile your-site-key your-secret-key
```

**Option C: Per-Block Configuration**
- In the block editor, enable CAPTCHA
- Enter site keys directly in the block settings
- Block-level keys override global settings

### 3. Enable in Blocks
1. Edit your page/post with HelpfulModal blocks
2. Select the HelpfulModal block
3. In block settings, toggle "Enable CAPTCHA"
4. Choose CAPTCHA type (reCAPTCHA or Turnstile)
5. Optionally override API keys per block

## Files Modified

### Frontend Components
- `src/blocks/HelpfulModal/render.php` - Server-side rendering with CAPTCHA
- `src/blocks/HelpfulModal/view.js` - Client-side CAPTCHA handling  
- `src/blocks/HelpfulModal/style.scss` - CAPTCHA widget styling
- `src/blocks/HelpfulModal/block.json` - Block attribute definitions

### Backend Components
- `includes/Ajax.php` - CAPTCHA verification logic
- `includes/captcha-config.php` - Configuration helpers and WP-CLI commands
- `wedocs.php` - Include CAPTCHA configuration

## How It Works

### Frontend Flow
1. Modal opens and CAPTCHA widget initializes
2. User fills form and completes CAPTCHA challenge
3. JavaScript validates CAPTCHA completion before submission
4. CAPTCHA token sent with form data via AJAX

### Backend Flow  
1. Server receives AJAX request with CAPTCHA token
2. Token verified against CAPTCHA provider API
3. Only valid submissions are processed
4. Failed verifications return error message

### Security Features
- All CAPTCHA tokens verified server-side
- API keys stored securely in WordPress options
- Request rate limiting via CAPTCHA providers
- Graceful fallback if CAPTCHA unavailable

## Testing

### Test CAPTCHA Integration
1. Enable CAPTCHA on a HelpfulModal block
2. Open the modal and verify CAPTCHA widget loads
3. Try submitting without completing CAPTCHA (should fail)
4. Complete CAPTCHA and submit (should succeed)
5. Check that CAPTCHA resets after successful submission

### Troubleshooting
- Check browser console for JavaScript errors
- Verify API keys are correct and active
- Ensure domain is whitelisted in CAPTCHA provider settings
- Check WordPress debug logs for server-side errors

## Browser Compatibility
- Modern browsers with ES6 support
- Graceful degradation for older browsers
- Mobile-responsive CAPTCHA widgets
- Accessibility compliant form controls

This implementation provides robust protection against automated attacks while maintaining a smooth user experience.
