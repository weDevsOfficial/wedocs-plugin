+(function($) {

    var pending_ajax = false;

    var weDocs = {
        initialize: function() {
            $('.wedocs-feedback-wrap').on('click', 'a', this.feedback);
            $('#top-search-form .dropdown-menu').on('click', 'a', this.searchForm);
            $('a.wedocs-print-article').on('click', this.printArticle);

            // modal
            $('a#wedocs-stuck-modal').on('click', this.showModal);
            $('a#wedocs-modal-close').on('click', this.closeModal);
            $('#wedocs-modal-backdrop').on('click', this.closeModal);
            $('form#wedocs-contact-modal-form').on('submit', this.contactHelp);
        },

        feedback: function(e) {
            e.preventDefault();

            // return if any request is in process already
            if ( pending_ajax ) {
                return;
            }

            pending_ajax = true;

            var self = $(this),
                wrap = self.closest('.wedocs-feedback-wrap'),
                data = {
                    post_id: self.data('id'),
                    type: self.data('type'),
                    action: 'wedocs_ajax_feedback',
                    _wpnonce: weDocs_Vars.nonce
                };

            wrap.append('&nbsp; <i class="wedocs-icon wedocs-icon-refresh wedocs-icon-spin"></i>');
            $.post(weDocs_Vars.ajaxurl, data, function(resp) {
                wrap.html(resp.data);

                pending_ajax = false;
            });
        },

        searchForm: function(e) {
            e.preventDefault();

            var param = $(this).attr("href").replace("#","");
            var concept = $(this).text();

            $('#top-search-form span#search_concept').text(concept);
            $('.input-group #search_param').val(param);
        },

        printArticle: function(e) {
            e.preventDefault();

            var article = $(this).closest('article');

            var mywindow = window.open('', 'my div', 'height=600,width=800');
            mywindow.document.write('<html><head><title>Print Article</title>');
            mywindow.document.write('<link rel="stylesheet" href="' + weDocs_Vars.style + '" type="text/css" media="all" />');
            mywindow.document.write('</head><body >');
            mywindow.document.write(article.html());
            mywindow.document.write('<div class="powered-by">' + weDocs_Vars.powered + '</div>');
            mywindow.document.write('</body></html>');

            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10

            setTimeout(function() {
                mywindow.print();
                mywindow.close();
            }, 2000);

            return true;
        },

        showModal: function(e) {
            e.preventDefault();

            $('#wedocs-modal-backdrop').show();
            $('#wedocs-contact-modal').show();
            $('body').addClass('wedocs-overflow-hidden');
        },

        closeModal: function(e) {
            e.preventDefault();

            $('#wedocs-modal-backdrop').hide();
            $('#wedocs-contact-modal').hide();
            $('body').removeClass('wedocs-overflow-hidden');
        },

        contactHelp: function(e) {
            e.preventDefault();

            var self = $(this),
                submit = self.find('input[type=submit]'),
                body = self.closest('.wedocs-modal-body'),
                data = self.serialize() + '&_wpnonce=' + weDocs_Vars.nonce;

            submit.prop('disabled', true);

            $.post(weDocs_Vars.ajaxurl, data, function(resp) {
                if ( resp.success === false ) {
                    submit.prop('disabled', false);
                    $('#wedocs-modal-errors', body).empty().append('<div class="wedocs-alert wedocs-alert-danger">' + resp.data + '</div>')
                } else {
                    body.empty().append( '<div class="wedocs-alert wedocs-alert-success">' + resp.data + '</div>' );
                }
            });
        }
    };

    $(function() {
        weDocs.initialize();
    });

    // initialize anchor.js
    anchors.options = {
        icon: '#'
    };
    anchors.add('.wedocs-single-content .entry-content > h2, .wedocs-single-content .entry-content > h3')

})(jQuery);
