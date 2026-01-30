(function($) {
    'use strict';

    /**
     * WeDocs Elementor Widgets Frontend Scripts
     */
    var WeDocsElementorWidgets = {

        init: function() {
            this.bindEvents();
        },

        bindEvents: function() {
            // Handle search form submissions
            $(document).on('submit', '.wedocs-search-form form', this.handleSearch);

            // Handle section toggle in docs grid
            $(document).on('click', '.wedocs-docs-grid__section-title', this.handleSectionToggle);
        },

        handleSearch: function(e) {
            // Let the form submit naturally - just add any validation if needed
            var searchInput = $(this).find('.wedocs-search-input');
            var searchValue = searchInput.val().trim();

            if (searchValue === '') {
                e.preventDefault();
                searchInput.focus();
                return false;
            }
        },

        handleSectionToggle: function(e) {
            // Ignore clicks on links
            if (e.target.tagName.toLowerCase() === 'a') {
                return;
            }

            e.preventDefault();

            var $section = $(this).closest('.wedocs-docs-grid__section');
            var $articlesList = $section.find('.wedocs-docs-grid__articles');
            var $toggleIcon = $(this).find('svg');

            if ($articlesList.length) {
                $articlesList.toggleClass('collapsed');
                $toggleIcon.toggleClass('active');
            }
        }
    };

    // Initialize when DOM is ready
    $(document).ready(function() {
        WeDocsElementorWidgets.init();
    });

    // Re-initialize when Elementor preview loads
    $(window).on('elementor/frontend/init', function() {
        WeDocsElementorWidgets.init();
    });

})(jQuery);
