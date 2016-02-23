Vue.directive('sortable', {
    bind: function() {
        var vm  = this.vm;
        var $el = jQuery(this.el);
        var self = this;

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
                })
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
        newSection: '',
        docs: []
    },

    ready: function() {
        var self = this;
        this.editurl = weDocs.editurl;
        this.viewurl = weDocs.viewurl;

        jQuery( this.$el ).find('ul.docs').removeClass('not-loaded').addClass('loaded');

        jQuery.get(ajaxurl, {
            action: 'wedocs_admin_get_docs',
            _wpnonce: weDocs.nonce
        }, function(data) {
            jQuery( self.$el ).find('.spinner').removeClass('is-active');
            self.docs = data.data;
        });
    },

    methods: {

        onError: function(error) {
            alert(error);
        },

        addDoc: function() {
            var text = this.newSection.trim()

            if ( text ) {
                this.docs.unshift( {
                    post: {
                        id: '',
                        title: text,
                        status: 'publish',
                    },
                    child: []
                });

                this.newSection = '';
            } else {
                alert( 'Please enter a title' );
            }
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
            swal({
                title: "Are you sure?",
                text: "Are you sure to delete the entire section? Articles inside this section will be deleted too!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function() {
                wp.ajax.send( {
                    data: {
                        action: 'wedocs_remove_doc',
                        id: section.post.id,
                        _wpnonce: weDocs.nonce
                    },
                    success: function(res) {
                        sections.$remove(section);
                        swal("Deleted!", "The section has been deleted.", "success");
                    },
                    error: function(error) {
                        alert( error );
                    }
                });
            });
        },

        addArticle: function(section) {
            var article = prompt( 'Enter article title' );

            if ( article ) {
                article = article.trim();

                wp.ajax.send( {
                    data: {
                        action: 'wedocs_create_doc',
                        title: article,
                        parent: section.post.id,
                        status: 'draft',
                        _wpnonce: weDocs.nonce
                    },
                    success: function(res) {
                        section.child.push( res );
                    },
                    error: function(error) {
                        alert( error );
                    }
                });
            }
        },

        removeArticle: function(article, articles) {
            swal({
                title: "Are you sure?",
                text: "Are you sure to delete the article?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function(){
                articles.$remove(article);
                swal("Deleted!", "The article has been deleted.", "success");
            });
        },

        toggleCollapse: function(event) {
            jQuery(event.target).siblings('ul.articles').toggleClass('collapsed');
        }
    },
});