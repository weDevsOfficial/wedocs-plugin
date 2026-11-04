<?php

namespace WeDevs\WeDocs;

/**
 * Move a doc's sections and articles to Trash together with it.
 *
 * WordPress trashes one post at a time, and weDocs used to delete everything
 * under a trashed doc or section for good. Now the content below goes to
 * Trash with it, marked with the ID of the post that took it there, so
 * restoring that post brings it back and deleting it permanently removes it.
 *
 * @since 2.6.2
 */
class DocTrash {

    /**
     * Meta key holding the ID of the doc whose trashing took this post along.
     *
     * @var string
     */
    const META_KEY = '_wedocs_trashed_with';

    /**
     * Whether descendants are being trashed right now.
     *
     * Trashing a section inside the loop fires this hook again; the outer
     * call already covers its articles.
     *
     * @var bool
     */
    private $trashing = false;

    /**
     * Constructor.
     */
    public function __construct() {
        add_action( 'wp_trash_post', [ $this, 'trash_descendants' ] );
        add_action( 'untrashed_post', [ $this, 'untrash_descendants' ] );
        add_filter( 'wp_untrash_post_status', [ $this, 'keep_previous_status' ], 10, 3 );
        add_action( 'before_delete_post', [ $this, 'delete_descendants' ] );
    }

    /**
     * Trash every section and article below a doc that is being trashed.
     *
     * Content already in Trash keeps its own mark, so it stays with whatever
     * was trashed first.
     *
     * @since 2.6.2
     *
     * @param int $post_id Post being trashed.
     *
     * @return void
     */
    public function trash_descendants( $post_id ) {
        if ( $this->trashing || 'docs' !== get_post_type( $post_id ) ) {
            return;
        }

        $this->trashing = true;

        foreach ( wedocs_get_doc_descendant_ids( $post_id ) as $child_id ) {
            update_post_meta( $child_id, self::META_KEY, (int) $post_id );
            wp_trash_post( $child_id );
        }

        $this->trashing = false;
    }

    /**
     * Restore the content that went to Trash with a restored doc.
     *
     * @since 2.6.2
     *
     * @param int $post_id Restored post.
     *
     * @return void
     */
    public function untrash_descendants( $post_id ) {
        if ( 'docs' !== get_post_type( $post_id ) ) {
            return;
        }

        delete_post_meta( $post_id, self::META_KEY );
        $this->restore_slug( $post_id );

        foreach ( $this->trashed_with( $post_id ) as $child_id ) {
            wp_untrash_post( $child_id );
            delete_post_meta( $child_id, self::META_KEY );
            $this->restore_slug( $child_id );
        }
    }

    /**
     * Drop the "__trashed" suffix WordPress can leave on a restored post's slug
     * (e.g. a pending doc with no saved slug).
     *
     * @since 2.6.3
     *
     * @param int $post_id Restored post.
     *
     * @return void
     */
    private function restore_slug( $post_id ) {
        $post = get_post( $post_id );
        if ( ! $post || false === strpos( $post->post_name, '__trashed' ) ) {
            return;
        }

        $slug = preg_replace( '/__trashed(-\d+)?$/', '', $post->post_name );
        if ( '' === $slug ) {
            $slug = sanitize_title( $post->post_title );
        }

        wp_update_post(
            [
                'ID'        => $post->ID,
                'post_name' => wp_unique_post_slug( $slug, $post->ID, $post->post_status, $post->post_type, $post->post_parent ),
            ]
        );
    }

    /**
     * Content restored along with its doc gets its old status back, instead
     * of the draft WordPress gives every restored post.
     *
     * @since 2.6.2
     *
     * @param string $new_status      Status WordPress picked.
     * @param int    $post_id         Post being restored.
     * @param string $previous_status Status before it was trashed.
     *
     * @return string
     */
    public function keep_previous_status( $new_status, $post_id, $previous_status ) {
        if ( 'docs' !== get_post_type( $post_id ) || ! $previous_status ) {
            return $new_status;
        }

        $owner = (int) get_post_meta( $post_id, self::META_KEY, true );

        // Content trashed with a doc that is still in Trash keeps WordPress's draft.
        if ( $owner && 'trash' === get_post_status( $owner ) ) {
            return $new_status;
        }

        // The restored doc itself, and everything trashed with it, gets its
        // old status back; otherwise a published doc came back as a draft.
        return $previous_status;
    }

    /**
     * Permanently delete the content that went to Trash with a doc when that
     * doc is permanently deleted.
     *
     * @since 2.6.2
     *
     * @param int $post_id Post being deleted.
     *
     * @return void
     */
    public function delete_descendants( $post_id ) {
        if ( 'docs' !== get_post_type( $post_id ) ) {
            return;
        }

        foreach ( $this->trashed_with( $post_id ) as $child_id ) {
            wp_delete_post( $child_id, true );
        }
    }

    /**
     * IDs of trashed posts marked as trashed with the given doc.
     *
     * @since 2.6.2
     *
     * @param int $post_id Doc ID.
     *
     * @return int[]
     */
    private function trashed_with( $post_id ) {
        $ids = get_posts(
            [
                'post_type'        => 'docs',
                'post_status'      => 'trash',
                'posts_per_page'   => -1,
                'fields'           => 'ids',
                'no_found_rows'    => true,
                'suppress_filters' => true,
                'meta_key'         => self::META_KEY, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
                'meta_value'       => (int) $post_id, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
                'orderby'          => 'ID',
                'order'            => 'ASC',
            ]
        );

        return array_map( 'intval', $ids );
    }
}
