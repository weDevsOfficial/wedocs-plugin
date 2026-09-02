<?php

namespace WeDevs\WeDocs\Admin;

/**
 * Free "Glossaries" submenu - a Pro upsell.
 *
 * Everything but the slug, the label, the panel and where it sits is the same
 * as the changelog upsell, so it extends it rather than repeating it.
 */
class GlossaryUpsell extends ChangelogUpsell {

    /**
     * The submenu slug. Pro registers the real screen at the same one.
     */
    const PAGE = 'wedocs-glossaries';

    /**
     * Which ProPreviews panel this screen renders.
     */
    const PANEL = 'glossary';

    /**
     * @return string
     */
    protected function page_title() {
        return __( 'Glossaries', 'wedocs' );
    }

    /**
     * Sit after Tags, which is where Pro puts the real screen.
     *
     * @return string
     */
    protected function anchor_slug() {
        return 'edit-tags.php?taxonomy=doc_tag&post_type=docs';
    }
}
