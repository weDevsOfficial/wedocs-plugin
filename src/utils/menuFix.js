function menuFix( slug ) {
  const $ = jQuery;

  const menuRoot = $( '#toplevel_page_' + slug );
  const currentUrl = window.location.href;

  menuRoot.on( 'click', 'a', function () {
    const self = $( this );

    $( 'ul.wp-submenu li', menuRoot ).removeClass( 'current' );

    if ( self.hasClass( 'wp-has-submenu' ) ) {
      $( 'li.wp-first-item', menuRoot ).addClass( 'current' );
    } else {
      self.parents( 'li' ).addClass( 'current' );
    }
  } );

  $( 'ul.wp-submenu a', menuRoot ).each( function ( index, el ) {
    if ( $( el ).attr( 'href' ) === currentUrl ) {
      $( el ).parent().addClass( 'current' );
    }
  } );
}

export default menuFix;
