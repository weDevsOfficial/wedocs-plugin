jQuery(function($) {
    var pending_ajax = false;

    $('.wedocs-feedback-wrap').on('click', 'a', function(e) {
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
                _wpnonce: weDocs.nonce
            };

        wrap.append('&nbsp; <span class="wedocs-spinner"></span>');
        $.post(weDocs.ajaxurl, data, function(resp) {
            wrap.html(resp.data);

            pending_ajax = false;
        });
    });

    $('#top-search-form .dropdown-menu').on('click', 'a', function(e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#","");
        var concept = $(this).text();
        $('#top-search-form span#search_concept').text(concept);
        $('.input-group #search_param').val(param);
    });
});