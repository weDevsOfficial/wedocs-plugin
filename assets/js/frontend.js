+( function ( $ ) {
  let pending_ajax = false;
  const anchestorItem = document.querySelector( 'ul.doc-nav-list > li.page_item.current_page_ancestor' );

  const weDocs = {
    initialize() {
      $( '.wedocs-feedback-wrap' ).on( 'click', 'a', this.feedback );
      $( '#top-search-form .dropdown-menu' ).on(
        'click',
        'a',
        this.searchForm
      );
      $( 'a.wedocs-print-article' ).on( 'click', this.printArticle );

      // sidebar toggle
      $( 'ul.doc-nav-list .page_item_has_children' ).on(
        'click',
        '.wedocs-caret',
        function ( event ) {
          event.preventDefault();
          const self = $( this ),
            parent = self.closest( '.page_item' );

          if ( parent.hasClass( 'wd-state-closed' ) ) {
            parent.removeClass( 'wd-state-closed' ).addClass( 'wd-state-open' );
          } else {
            parent.removeClass( 'wd-state-open' ).addClass( 'wd-state-closed' );
          }
        }
      );

      // modal
      $( 'a#wedocs-stuck-modal' ).on( 'click', this.showModal );
      $( 'a#wedocs-modal-close' ).on( 'click', this.closeModal );
      $( '#wedocs-modal-backdrop' ).on( 'click', this.closeModal );
      $( 'form#wedocs-contact-modal-form' ).on( 'submit', this.contactHelp );
      $( 'ul.wedocs-doc-sections > li span' ).on( 'click', this.showDocumentationSections );
    },

    feedback ( e ) {
      e.preventDefault();

      // return if any request is in process already
      if ( pending_ajax ) {
        return;
      }

      pending_ajax = true;

      const self = $( this ),
        wrap = self.closest( '.feedback-content' ),
        data = {
          post_id: self.data( 'id' ),
          type: self.data( 'type' ),
          action: 'wedocs_ajax_feedback',
          _wpnonce: weDocs_Vars.nonce,
        };

      $.post( weDocs_Vars.ajaxurl, data, function ( resp ) {
        wrap.html( resp.data );

        pending_ajax = false;
      } );
    },

    searchForm ( e ) {
      e.preventDefault();

      const param = $( this ).attr( 'href' ).replace( '#', '' );
      const concept = $( this ).text();

      $( '#top-search-form span#search_concept' ).text( concept );
      $( '.input-group #search_param' ).val( param );
    },

    printArticle ( e ) {
      e.preventDefault();

      const article = $( this ).closest( 'article' );

      const mywindow = window.open( '', 'my div', 'height=600,width=800' );
      mywindow.document.write( '<html><head><title>Print Article</title>' );
      mywindow.document.write(
        '<link rel="stylesheet" href="' +
          weDocs_Vars.style +
          '" type="text/css" media="all" />'
      );
      mywindow.document.write( '</head><body >' );
      mywindow.document.write( article.html() );
      mywindow.document.write(
        '<div class="powered-by">' + weDocs_Vars.powered + '</div>'
      );
      mywindow.document.write( '</body></html>' );

      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10

      // setTimeout( function () {
      //   mywindow.print();
      //   mywindow.close();
      // }, 2000 );

      return true;
    },

    showModal ( e ) {
      e.preventDefault();

      $( '#wedocs-modal-backdrop' ).show();
      $( '#wedocs-contact-modal' ).show();
      $( 'body' ).addClass( 'wedocs-overflow-hidden' );
    },

    closeModal ( e ) {
      e.preventDefault();

      $( '#wedocs-modal-backdrop' ).hide();
      $( '#wedocs-contact-modal' ).hide();
      $( 'body' ).removeClass( 'wedocs-overflow-hidden' );
    },

    contactHelp ( e ) {
      e.preventDefault();

      const self = $( this ),
        submit = self.find( 'input[type=submit]' ),
        body = self.closest( '.wedocs-modal-body' ),
        data = self.serialize() + '&_wpnonce=' + weDocs_Vars.nonce;

      submit.prop( 'disabled', true );

      $.post( weDocs_Vars.ajaxurl, data, function ( resp ) {
        if ( resp.success === false ) {
          submit.prop( 'disabled', false );
          $( '#wedocs-modal-errors', body )
            .empty()
            .append(
              '<div class="wedocs-alert wedocs-alert-danger">' +
                resp.data +
                '</div>'
            );
        } else {
          body
            .empty()
            .append(
              '<div class="wedocs-alert wedocs-alert-success">' +
                resp.data +
                '</div>'
            );
        }
      } );
    },

    showDocumentationSections ( e ) {
      $( this ).toggleClass( 'active' ).closest( 'li' ).next( '.children' ).toggleClass( 'active' );
    },
  };

  $( function () {
    // Handle hash router.
    if ( window.location.hash ) {
      window.location = window.location.pathname;
    }

    // Handle navigation caret.
    if ( ! anchestorItem?.classList.contains( 'wd-state-open' ) ) {
      anchestorItem?.classList.add( 'wd-state-open' );
      anchestorItem?.classList.remove( 'wd-state-closed' );
    }

    weDocs.initialize();
  } );

  // initialize anchor.js
  anchors.options = {
    icon: '#',
  };
  anchors.add(
    '.wedocs-single-content .entry-content > h2, .wedocs-single-content .entry-content > h3'
  );
} )( jQuery );
