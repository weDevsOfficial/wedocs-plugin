+( function ( $ ) {
  let pending_ajax = false;
  const anchestorItem = document.querySelector( 'ul.doc-nav-list > li.page_item.current_page_ancestor' );

  const weDocs = {
    initialize() {
      $( '.wedocs-feedback-wrap' ).on( 'click', 'a', this.feedback );
      $( '#top-search-form .dropdown-menu' ).on( 'click', 'a', this.searchForm );
      $( 'a.wedocs-print-article' ).on( 'click', this.printArticle );

      // Sidebar toggle.
      $( 'ul.doc-nav-list .page_item_has_children' ).on( 'click', '.wedocs-caret', this.toggleSidebar );

      // Load single doc page search modal.
      this.loadSingleDocSearchModal();

      // Handle modal actions.
      $( 'a#wedocs-stuck-modal' ).on( 'click', this.showModal );
      $( 'a#wedocs-modal-close' ).on( 'click', this.closeModal );
      $( '#wedocs-modal-backdrop' ).on( 'click', this.closeModal );
      $( 'form#wedocs-contact-modal-form' ).on( 'submit', this.contactHelp );
      $( 'ul.wedocs-doc-sections > li svg' ).on( 'click', this.showSectionArticles );

      // Single documentation page search modal actions.
      $( '#wedocs-single-doc-search-modal' ).on( 'click', this.handleDocSearchModalBackDrop );
      $( '.doc-search-container #doc-search-input' ).on( 'keyup', this.detectDocSearchInput.bind( this ) );
      $( '.doc-search-container .doc-search-field .search-clean' ).on( 'click', this.cleanDocSearchInput );
      $( '.wedocs-single-search-input > .search-field' ).on( 'click', this.showSinglePageSearchModal );
      $( '#wedocs-single-doc-search-modal .doc-search-cancel' ).on( 'click', this.closeSinglePageSearchModal );
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

    toggleSidebar ( e ) {
      e.preventDefault();
      const self = $( this ),
        parent = self.closest( '.page_item' );

      if ( parent.hasClass( 'wd-state-closed' ) ) {
        parent.removeClass( 'wd-state-closed' ).addClass( 'wd-state-open' );
      } else {
        parent.removeClass( 'wd-state-open' ).addClass( 'wd-state-closed' );
      }
    },

    loadSingleDocSearchModal( e ) {
      const data = {
        action   : 'wedocs_get_docs',
        _wpnonce : weDocs_Vars.nonce,
      };

      $.ajax({
        data,
        url      : weDocs_Vars.ajaxurl,
        type     : 'POST',
        complete : ( response ) => {
          if ( response?.responseJSON?.data ) {
            this.docs = response?.responseJSON?.data;
          }
        },
        error    : ( e ) => console.log( e ),
      });

      // Mount doc single page search modal.
      const mountDiv = document.createElement( 'div' );
      mountDiv.setAttribute( 'id', 'wedocs-single-doc-search-modal' );
      mountDiv.innerHTML = weDocs_Vars.searchModal;
      document.body.appendChild( mountDiv );

      document.addEventListener( 'keydown', ( event ) => {
        // Bind single page search modal with (ctrl/command + k).
        if ( ( event.ctrlKey || event.metaKey ) && event.key === 'k' ) {
          this.showSinglePageSearchModal();
        }

        // Bind single page search modal hiding option with escape button.
        if ( event.keyCode === 27 && event.key === 'Escape' ) {
          this.closeSinglePageSearchModal();
        }
      } );
    },

    showSectionArticles ( e ) {
      $( this ).toggleClass( 'active' ).closest( 'li' ).next( '.children' ).toggleClass( 'active' );
    },

    cleanDocSearchInput ( e ) {
      $( this ).hide();
      $( this ).prev( 'input[type="text"]' ).val( null ).focus();
        $( '.doc-search-dropdown-container .doc-search-hits' )
          .html( `<div class='doc-empty-search'>Search key is empty</div>` );
    },

    detectDocSearchInput ( e ) {
      const searchValue = e.target.value,
        searchDocs = this.getSearchDocs( searchValue ),
        searchEmpty = `<div class='doc-empty-search'>Search result is empty</div>`,
        searchKeyEmpty = `<div class='doc-empty-search'>Search key is empty</div>`;

      const ulNode = document.createElement('ul');
      ulNode.setAttribute('id', 'doc-search-list');

      searchDocs.forEach((data, index) => {
        const url = data?.article ? data?.article?.guid :
            ( data?.section ? data?.section?.guid : data?.parent?.guid ),
          title = data?.article ? data?.article?.post_title :
            ( data?.section ? data?.section?.post_title : data?.parent?.post_title ),
          parentNavigation = data?.section ?
            `<span data-url="${ data?.parent?.guid }" class="doc-search-hit-path">${ data?.parent?.post_title }</span>` : '',
          sectionNavigation = data?.article ?
            `<span data-url="${ data?.section?.guid }" class="doc-search-hit-path">${ data?.section?.post_title }</span>` : '';


        const liNode = document.createElement('li');
        liNode.setAttribute('class', 'doc-search-hit');
        liNode.setAttribute('id', `doc-search-item-${index}`);
        liNode.setAttribute('role', 'option');
        liNode.setAttribute('aria-selected', 'false');
        liNode.innerHTML = `
          <a
            href="${ url }"
            target="_blank"
            class="doc-search-hit-result"
          >
            <div class="doc-search-hit-container">
              <div class="doc-search-hit-icon">
                <svg width="14" height="10" fill="none">
                  <path
                    fill="#BAE6FD"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.5 0c1.093 0 2.117.27 3 .743V10a6.344 6.344 0 0 0-3-.743c-1.093 0-2.617.27-3.5.743V.743C.883.27 2.407 0 3.5 0Z"
                  />
                  <path
                    fill="#38BDF8"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.5 0c1.093 0 2.617.27 3.5.743V10c-.883-.473-2.407-.743-3.5-.743s-2.117.27-3 .743V.743a6.344 6.344 0 0 1 3-.743Z"
                  />
                </svg>
              </div>
              <div class="doc-search-hit-content-wrapper">
                <span class="doc-search-hit-title">${ title }</span>
                <div class='docs-navigation'>
                  ${ parentNavigation + sectionNavigation }
                </div>
              </div>
              <div class="doc-search-hit-action">
                <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#475569" class="w-5 h-5 doc-search-hit-select-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            </div>
          </a>
        `;

        liNode.querySelectorAll( '.doc-search-hit-path' ).forEach(
          searchPath => searchPath?.addEventListener( 'click', function ( event ) {
            event.preventDefault();
            window.open( $( this ).data( 'url' ), '_blank' );
          })
        );


        ulNode.appendChild(liNode);
      });

      const $ulNode = $( ulNode );

      // Render search cleaner icon.
      $( e.target ).next( '.search-clean' )[0].style.display = `${ searchValue ? 'block' : 'none' }`;

      // Render search list or necessary message.
      $( '.doc-search-dropdown-container .doc-search-hits' ).html(
        ( searchValue ? ( searchDocs.length ? $ulNode : searchEmpty ) : searchKeyEmpty )
      );

        // <div class='doc-empty-search'><?php _e( 'Search result is empty', 'wedocs' ); ?></div>
        // <ul id='doc-search-list'>
        //     <li class='doc-search-hit' id='doc-search-item-0' role='option' aria-selected='false'>
        //         <a
        //             target="_blank"
        //             class="doc-search-hit-result"
        //             href="https://tailwindui.com/components/ecommerce/components/product-lists"
        //         >
        //             <div class="doc-search-hit-container">
        //                 <div class="doc-search-hit-icon">
        //                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" fill="none">
        //                         <path
        //                             fill="#BAE6FD"
        //                             fill-rule="evenodd"
        //                             clip-rule="evenodd"
        //                             d="M3.5 0c1.093 0 2.117.27 3 .743V10a6.344 6.344 0 0 0-3-.743c-1.093 0-2.617.27-3.5.743V.743C.883.27 2.407 0 3.5 0Z"
        //                         />
        //                         <path
        //                             fill="#38BDF8"
        //                             fill-rule="evenodd"
        //                             clip-rule="evenodd"
        //                             d="M10.5 0c1.093 0 2.617.27 3.5.743V10c-.883-.473-2.407-.743-3.5-.743s-2.117.27-3 .743V.743a6.344 6.344 0 0 1 3-.743Z"
        //                         />
        //                     </svg>
        //                 </div>
        //                 <div class="doc-search-hit-content-wrapper">
        //                                 <span class="doc-search-hit-title">
        //                                     Product Lists
        //                                 </span>
        //                     <div class='docs-navigation'>
        //                         <span class="doc-search-hit-path">Ecommerce / Components</span>
        //                         <span class="doc-search-hit-path">Ecommerce / Components</span>
        //                     </div>
        //                 </div>
        //                 <div class="doc-search-hit-action">
        //                     <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#475569" class="w-5 h-5 doc-search-hit-select-icon">
        //                         <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        //                     </svg>
        //                 </div>
        //             </div>
        //         </a>
        //     </li>
        // </ul>
    },

    getSearchDocs( searchValue ) {
      const searchDocs = [];
      const searchResult = this?.docs?.all_docs?.filter( doc =>
        doc?.post_title?.toLowerCase().includes( searchValue?.toLowerCase() )
      );

      searchResult?.map( doc => {
        const docObj = {};
        if ( doc?.post_parent === 0 ) {
          docObj.parent = doc;
        }

        if ( this?.docs?.sections?.find( sectionDoc => sectionDoc.ID === doc?.ID ) ) {
          docObj.section = doc;
          docObj.parent = this?.docs?.parents?.find( parentDoc => parentDoc?.ID === doc?.post_parent );
        }

        if ( this?.docs?.articles?.find( articleDoc => articleDoc.ID === doc?.ID ) ) {
          docObj.article = doc;
          docObj.section = this?.docs?.sections?.find( sectionDoc => sectionDoc?.ID === doc?.post_parent );
          docObj.parent = this?.docs?.parents?.find( parentDoc => parentDoc?.ID === docObj.section?.post_parent );
        }

        searchDocs.push( docObj );
      } );

      return searchDocs;
    },

    showSinglePageSearchModal ( e ) {
        // console.log( 'before:', this.docs );
      $( '#wedocs-single-doc-search-modal' ).addClass( 'active' );
        // console.log( 'MID:', this.docs );
      $( '#wedocs-single-doc-search-modal #doc-search-input' ).focus();
        // console.log( 'after:', this.docs );
    },

    closeSinglePageSearchModal ( e ) {
      $( '#wedocs-single-doc-search-modal' ).removeClass( 'active' );
    },

    handleDocSearchModalBackDrop ( e ) {
      if ( !e.target.closest( '.doc-search-modal' ) ) {
        $( this ).removeClass( 'active' );
      }
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
