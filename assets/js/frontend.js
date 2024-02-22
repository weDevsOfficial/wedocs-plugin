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
      $( '#wedocs-single-doc-search-modal .doc-search-cancel' ).on( 'click', this.closeSinglePageSearchModal );
      $( '.wedocs-single-search-input' ).on( 'click', '.search-field, .search-submit, .short-key', this.showSinglePageSearchModal );
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
      if ( !weDocs_Vars.isSingleDoc ) {
        return;
      }

      const data = {
        action   : 'wedocs_get_docs',
        _wpnonce : weDocs_Vars.nonce,
      };

      $.ajax({
        data,
        url      : weDocs_Vars.ajaxurl,
        type     : 'POST',
        error    : ( e ) => console.log( e ),
        complete : ( response ) => {
          if ( response?.responseJSON?.data ) {
            this.docs = response?.responseJSON?.data;
          }
        },
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
        .html( `<div class='doc-empty-search'>${ weDocs_Vars.searchBlankMsg }</div>` );
    },

    detectDocSearchInput ( e ) {
      const searchValue = e.target.value,
        searchDocs = this.getSearchDocs( searchValue ),
        searchEmpty = `<div class='doc-empty-search'>${ weDocs_Vars.searchEmptyMsg }</div>`,
        searchKeyEmpty = `<div class='doc-empty-search'>${ weDocs_Vars.searchBlankMsg }</div>`;

      // Searched docs list.
      const $ulNode = this.getListTemplate( searchDocs );

      // Render search cleaner icon.
      $( e.target ).next( '.search-clean' )[0].style.display = `${ searchValue ? 'block' : 'none' }`;

      // Render search list or necessary message.
      $( '.doc-search-dropdown-container .doc-search-hits' ).html(
        ( searchValue ? ( searchDocs.length ? $ulNode : searchEmpty ) : searchKeyEmpty )
      );
    },

    getListTemplate ( searchDocs ) {
      const ulNode = document.createElement( 'ul' );
      ulNode.setAttribute( 'id', 'doc-search-list' );

      searchDocs.forEach( ( data, index ) => {
        let url = data?.article ? data?.article?.permalink :
          ( data?.section ? data?.section?.permalink : data?.parent?.permalink ),
          title = data?.article ? data?.article?.post_title :
            ( data?.section ? data?.section?.post_title : data?.parent?.post_title ),
          parentNavigation = data?.section ?
            `<div class='parent-doc-nav'>
              ${ weDocs_Vars.docNavLabel }
              <span data-url="${ data?.parent?.guid }" class="doc-search-hit-path">
                ${ this.extractedTitle( data?.parent?.post_title, 35 ) }
              </span>
            </div>` : '',
          sectionNavigation = data?.article ?
            `<div class='section-doc-nav'>
              ${ weDocs_Vars.sectionNavLabel }
              <span data-url="${ data?.section?.guid }" class="doc-search-hit-path">
                ${ this.extractedTitle( data?.section?.post_title, 35 ) }
              </span>
            </div>` : '';

        title = this.extractedTitle( title );
        const bootstrapTemplate = $( '.wedocs-single-wrap .doc-nav-list a' ).hasClass( 'bootstrap' ) ? 'bootstrap ' : '',
          tailwindTemplate = $( '.wedocs-single-wrap .doc-nav-list a' ).hasClass( 'tailwind' ) ? 'tailwind ' : '';

        // Make search results as list node.
        const liNode = document.createElement( 'li' );
        liNode.setAttribute( 'class', 'doc-search-hit' );
        liNode.setAttribute( 'id', `doc-search-item-${index}` );
        liNode.setAttribute( 'role', 'option' );
        liNode.setAttribute( 'aria-selected', 'false' );
        liNode.innerHTML = `
          <a
            href="${ url }"
            target="_blank"
            class="${ bootstrapTemplate + tailwindTemplate }doc-search-hit-result"
          >
            <div class="doc-search-hit-container">
              <div class="doc-search-hit-icon">
                <svg width="12" height="18" viewBox="0 0 14 18" fill="none">
                  <path
                    stroke="#3B82F6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.49984 9H9.49984M4.49984 12.3333H9.49984M11.1665 16.5H2.83317C1.9127 16.5 1.1665 15.7538 1.1665 14.8333V3.16667C1.1665 2.24619 1.9127 1.5 2.83317 1.5H7.48799C7.70901 1.5 7.92097 1.5878 8.07725 1.74408L12.5891 6.25592C12.7454 6.4122 12.8332 6.62416 12.8332 6.84518V14.8333C12.8332 15.7538 12.087 16.5 11.1665 16.5Z"
                  />
                </svg>
              </div>
              <div class="doc-search-hit-content-wrapper">
                <div class="doc-search-hit-title">${ title }</div>
                ${ ( parentNavigation || sectionNavigation ) ? '<hr />' : '' }
                <div class='wd-docs-navigation'>
                  ${ parentNavigation + sectionNavigation }
                </div>
              </div>
            </div>
          </a>`;

        // Handle navigation redirection manually.
        liNode.querySelectorAll( '.doc-search-hit-path' ).forEach(
          searchPath => searchPath?.addEventListener( 'click', function ( event ) {
            event.preventDefault();
            window.open( $( this ).data( 'url' ), '_blank' );
          })
        );

        liNode.querySelectorAll( '.doc-search-hit-result' ).forEach(
          list => {
            // Update list icon background & color.
            list.querySelector( '.doc-search-hit-icon' ).style.background = weDocs_Vars?.searchModalColors?.active_shade_color;
            list.querySelector( '.doc-search-hit-icon path' ).style.stroke = weDocs_Vars?.searchModalColors?.active_primary_color;

            const parentDocNav = list.querySelector( '.parent-doc-nav' ),
              sectionDocNav = list.querySelector( '.section-doc-nav' ),
              parentNavSearchHitPath = list.querySelector( '.parent-doc-nav .doc-search-hit-path' ),
              sectionNavSearchHitPath = list.querySelector( '.section-doc-nav .doc-search-hit-path' );

            if ( parentNavSearchHitPath ) {
              // Update parent nav shade color.
              parentNavSearchHitPath.style.background = weDocs_Vars?.searchModalColors?.active_shade_color;
            }

            if ( sectionNavSearchHitPath ) {
              // Update section nav shade color.
              sectionNavSearchHitPath.style.background = weDocs_Vars?.searchModalColors?.active_shade_color;
            }

            if ( parentDocNav ) {
              // Update parent text color on mouse over.
              parentDocNav.addEventListener( 'mouseover', function() {
                parentNavSearchHitPath.style.color = weDocs_Vars?.searchModalColors?.active_primary_color;
              } );

              // Update parent text color on mouse out.
              parentDocNav.addEventListener( 'mouseout', function() {
                parentNavSearchHitPath.style.color = '#6B7280';
              } );
            }

            if ( sectionDocNav ) {
              // Update section text color on mouse over.
              sectionDocNav.addEventListener( 'mouseover', function() {
                sectionNavSearchHitPath.style.color = weDocs_Vars?.searchModalColors?.active_primary_color;
              } );

              // Update section text color on mouse over.
              sectionDocNav.addEventListener( 'mouseout', function() {
                sectionNavSearchHitPath.style.color = '#6B7280';
              } );
            }

            // Update doc lists background color on mouse over.
            list.addEventListener( 'mouseover', function() {
              this.style.background = weDocs_Vars?.searchModalColors?.active_primary_color;
            } );

            // Update doc lists background color on mouse out.
            list.addEventListener( 'mouseout', function() {
              this.style.background = '#fff';
            } );
          }
        );

        ulNode.appendChild(liNode);
      });

      return $( ulNode );
    },

    getSearchDocs( searchValue ) {
      const searchDocs = [];
      const searchResult = this?.docs?.all_docs?.filter( doc => {
        if ( doc?.post_status !== 'publish' ) return;
        return doc?.post_title?.toLowerCase().includes( searchValue?.toLowerCase() );
      } );

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
      $( '#wedocs-single-doc-search-modal' ).addClass( 'active' );
      $( '#wedocs-single-doc-search-modal #doc-search-input' ).focus();
    },

    closeSinglePageSearchModal ( e ) {
      $( '#wedocs-single-doc-search-modal' ).removeClass( 'active' );
    },

    extractedTitle ( title, length = 190 ) {
      const extractedString = title?.substr( 0, length );
      return extractedString?.length >= length ? `${ extractedString }...` : extractedString;
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
