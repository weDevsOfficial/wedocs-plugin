/* jshint devel:true */
/* global Vue */
/* global weDocs */
/* global wp */
/* global swal */
/* global ajaxurl */

Vue.directive('sortable', {
    bind: function() {
        var $el = jQuery(this.el);

        $el.sortable({
            handle: '.wedocs-btn-reorder',
            stop: function(event, ui) {
                var ids = [];

                jQuery( ui.item.closest('ul') ).children('li').each(function(index, el) {
                    ids.push( jQuery(el).data('id'));
                });

                wp.ajax.post({
                    action: 'wedocs_sortable_docs',
                    ids: ids,
                    _wpnonce: weDocs.nonce
                });
            },
            cursor: 'move'
        });
    }
});

new Vue({
    el: '#wedocs-app',
    data: {
        editurl: '',
        viewurl: '',
        docs: []
    },

    ready: function() {
        var self = this,
            dom = jQuery( self.$el );

        this.editurl = weDocs.editurl;
        this.viewurl = weDocs.viewurl;

        dom.find('ul.docs').removeClass('not-loaded').addClass('loaded');

        jQuery.get(ajaxurl, {
            action: 'wedocs_admin_get_docs',
            _wpnonce: weDocs.nonce
        }, function(data) {
            dom.find('.spinner').remove();
            dom.find('.no-docs').removeClass('not-loaded');

            self.docs = data.data;
        });
    },

    methods: {

        onError: function(error) {
            alert(error);
        },

        addDoc: function() {

            var that = this;
            this.docs = this.docs || [];

            swal({
                title: "Enter doc title",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: true,
                animation: "slide-from-top",
                inputPlaceholder: "Write something"
            }, function(inputValue){
                if (inputValue === false) {
                    return false;
                }

                wp.ajax.send( {
                    data: {
                        action: 'wedocs_create_doc',
                        title: inputValue,
                        parent: 0,
                        _wpnonce: weDocs.nonce
                    },
                    success: function(res) {
                        that.docs.unshift( res );
                    },
                    error: this.onError
                });

            });
        },

        removeDoc: function(doc, docs) {
            var self = this;

            swal({
                title: "Are you sure?",
                text: "Are you sure to delete the entire documentation? Sections and articles inside this doc will be deleted too!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function() {
                self.removePost(doc, docs);
            });
        },

        addSection: function(doc) {
            swal({
                title: "Enter section title",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: true,
                animation: "slide-from-top",
                inputPlaceholder: "Write something"
            }, function(inputValue){
                if (inputValue === false) {
                    return false;
                }

                inputValue = inputValue.trim();

                if ( inputValue ) {
                    wp.ajax.send( {
                        data: {
                            action: 'wedocs_create_doc',
                            title: inputValue,
                            parent: doc.post.id,
                            order: doc.child.length,
                            _wpnonce: weDocs.nonce
                        },
                        success: function(res) {
                            doc.child.push( res );
                        },
                        error: this.onError
                    });
                }
            });
        },

        removeSection: function(section, sections) {
            var self = this;

            swal({
                title: "Are you sure?",
                text: "Are you sure to delete the entire section? Articles inside this section will be deleted too!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function() {
                self.removePost(section, sections);
            });
        },

        addArticle: function(section) {
            var parentEvent = event;

            swal({
                title: "Enter doc title",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: true,
                animation: "slide-from-top",
                inputPlaceholder: "Write something"
            }, function(inputValue){
                if (inputValue === false) {
                    return false;
                }

                wp.ajax.send( {
                    data: {
                        action: 'wedocs_create_doc',
                        title: inputValue,
                        parent: section.post.id,
                        status: 'draft',
                        order: section.child.length,
                        _wpnonce: weDocs.nonce
                    },
                    success: function(res) {
                        section.child.push( res );

                        var articles = jQuery( parentEvent.target ).closest('.section-title').next();

                        if ( articles.hasClass('collapsed') ) {
                            articles.removeClass('collapsed');
                        }
                    },
                    error: function(error) {
                        alert( error );
                    }
                });
            });
        },

        removeArticle: function(article, articles) {
            var self = this;

            swal({
                title: "Are you sure?",
                text: "Are you sure to delete the article?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function(){
                self.removePost(article, articles);
            });
        },

        removePost: function(item, items, message) {
            message = message || 'This post has been deleted';

            wp.ajax.send( {
                data: {
                    action: 'wedocs_remove_doc',
                    id: item.post.id,
                    _wpnonce: weDocs.nonce
                },
                success: function() {
                    items.$remove(item);
                    swal( 'Deleted!', message, 'success' );
                },
                error: function(error) {
                    alert( error );
                }
            });
        },

        toggleCollapse: function(event) {
            jQuery(event.target).siblings('ul.articles').toggleClass('collapsed');
        }
    },
});