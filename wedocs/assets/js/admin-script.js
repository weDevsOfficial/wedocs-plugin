jQuery( document ).ready( function () {
  jQuery( '#wedocs-pro-notice' ).on( 'click', '#try-now, #no-thanks, .notice-dismiss', ( event ) => {
    event.preventDefault();
    // Set user meta to hide the admin notice for lifetime.
    jQuery.ajax( {
      url: ajaxurl,
      type: 'POST',
      data: {
        action: 'hide_wedocs_pro_notice'
      }
    } );

    if ( event?.target?.id === 'try-now' ) {
      window.open('//wedocs.co', '_blank' );
    }

    // Hide the admin notice.
    jQuery( '#wedocs-pro-notice' ).remove();
  });
});
