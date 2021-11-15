/* jshint devel:true */
/* global Vue */
/* global weDocs */
/* global wp */
/* global swal */
/* global ajaxurl */

Vue.directive('sortable', {
  bind: function (el, binding) {
    var $el = jQuery(el);

    $el.sortable({
      handle: '.wedocs-btn-reorder',
      stop: function (event, ui) {
        var ids = [];

        jQuery(ui.item.closest('ul'))
          .children('li')
          .each(function (index, el) {
            ids.push(jQuery(el).data('id'));
          });

        wp.ajax.post({
          action: 'wedocs_sortable_docs',
          ids: ids,
          _wpnonce: weDocs.nonce,
        });
      },
      cursor: 'move',
      // connectWith: ".connectedSortable"
    });
  },
});

new Vue({
  el: '#wedocs-app',
  data: {
    editurl: '',
    viewurl: '',
    docs: [],
  },

  mounted: function () {
    var self = this,
      dom = jQuery(self.$el);

    this.editurl = weDocs.editurl;
    this.viewurl = weDocs.viewurl;

    dom.find('ul.docs').removeClass('not-loaded').addClass('loaded');

    jQuery.get(
      ajaxurl,
      {
        action: 'wedocs_admin_get_docs',
        _wpnonce: weDocs.nonce,
      },
      function (data) {
        dom.find('.spinner').remove();
        dom.find('.no-docs').removeClass('not-loaded');

        self.docs = data.data;
      }
    );
  },

  methods: {
    onError: function (error) {
      alert(error);
    },

    swalInputValidator: function (value) {
      if (!value) {
        return 'You need to write something';
      }
    },

    addDoc: function () {
      var that = this;
      this.docs = this.docs || [];

      Swal.fire({
        title: weDocs.enter_doc_title,
        input: 'text',
        showCancelButton: true,
        inputPlaceholder: weDocs.write_something,
        confirmButtonText: weDocs.confirmBtn,
        cancelButtonText: weDocs.cancelBtn,
        inputValidator: this.swalInputValidator,
      }).then(function (input) {
        if (input.isDismissed) {
          return;
        }

        wp.ajax.send({
          data: {
            action: 'wedocs_create_doc',
            title: input.value.trim(),
            parent: 0,
            _wpnonce: weDocs.nonce,
          },
          success: function (res) {
            that.docs.unshift(res);
          },
          error: this.onError,
        });
      });
    },

    removeDoc: function (doc, docs) {
      var self = this;

      Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure to delete the entire documentation? Sections and articles inside this doc will be deleted too!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: weDocs.delConfirmBtn,
        cancelButtonText: weDocs.cancelBtn,
      }).then(function (action) {
        if (action.isConfirmed) {
          self.removePost(doc, docs, 'The doc has been deleted.');
        }
      });
    },

    addSection: function (doc) {
      Swal.fire({
        title: weDocs.enter_section_title,
        input: 'text',
        showCancelButton: true,
        confirmButtonColor: '#2271b1',
        inputPlaceholder: weDocs.write_something,
        confirmButtonText: weDocs.confirmBtn,
        cancelButtonText: weDocs.cancelBtn,
        inputValidator: this.swalInputValidator,
      }).then(function (input) {
        if (input.isDismissed) {
          return;
        }

        if (input.value) {
          wp.ajax.send({
            data: {
              action: 'wedocs_create_doc',
              title: input.value.trim(),
              parent: doc.post.id,
              order: doc.child.length,
              _wpnonce: weDocs.nonce,
            },
            success: function (res) {
              doc.child.push(res);
            },
            error: this.onError,
          });
        }
      });
    },

    removeSection: function (section, sections) {
      var self = this;

      Swal.fire({
        title: weDocs.delConfirm,
        text: weDocs.delConfirmTxt,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: weDocs.delConfirmBtn,
        cancelButtonText: weDocs.cancelBtn,
      }).then(function (action) {
        if (action.isDismissed) {
          return;
        }

        if (action.isConfirmed) {
          self.removePost(section, sections);
        }
      });
    },

    addArticle: function (section, event) {
      var parentEvent = event;

      Swal.fire({
        title: weDocs.enter_doc_title,
        input: 'text',
        showCancelButton: true,
        inputPlaceholder: weDocs.write_something,
        confirmButtonText: weDocs.confirmBtn,
        cancelButtonText: weDocs.cancelBtn,
        inputValidator: this.swalInputValidator,
      }).then(function (input) {
        if (input.isDismissed) {
          return;
        }

        if (input.value === false || input.value === '') {
          return false;
        }

        wp.ajax.send({
          data: {
            action: 'wedocs_create_doc',
            title: input.value,
            parent: section.post.id,
            status: 'draft',
            order: section.child.length,
            _wpnonce: weDocs.nonce,
          },
          success: function (res) {
            section.child.push(res);

            var articles = jQuery(parentEvent.target)
              .closest('.section-title')
              .next();

            if (articles.hasClass('collapsed')) {
              articles.removeClass('collapsed');
            }
          },
          error: function (error) {
            alert(error);
          },
        });
      });
    },

    removeArticle: function (article, articles) {
      var self = this;

      Swal.fire({
        title: weDocs.delConfirm,
        text: weDocs.delConfirmTxt,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: weDocs.delConfirmBtn,
        cancelButtonText: weDocs.cancelBtn,
      }).then(function (action) {
        if (action.isConfirmed) {
          self.removePost(article, articles);
        }
      });
    },

    removePost: function (index, items, message) {
      message = message || 'This post has been deleted';

      wp.ajax.send({
        data: {
          action: 'wedocs_remove_doc',
          id: items[index].post.id,
          _wpnonce: weDocs.nonce,
        },
        success: function () {
          Vue.delete(items, index);
          Swal.fire({
            title: 'Deleted!',
            text: message,
            icon: 'success',
          });
        },
        error: function (error) {
          alert(error);
        },
      });
    },

    toggleCollapse: function (event) {
      jQuery(event.target).siblings('ul.articles').toggleClass('collapsed');
    },
  },
});
