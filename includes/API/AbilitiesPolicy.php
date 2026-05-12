<?php

namespace WeDevs\WeDocs\API;

/**
 * Abilities Policy Class
 *
 * Centralizes all weDocs permission/ability checks.
 *
 * Used by AbilitiesApi to report current-user abilities and referenced by REST
 * permission_callback functions so that a single source of truth drives both
 * what is reported and what is enforced.
 *
 * The abilities are organized into the following domains:
 *
 *  - docs.*       – CRUD and management actions on doc posts.
 *  - settings.*   – Read/write access to plugin settings.
 *  - ai.*         – AI content generation and configuration.
 *  - summary.*    – AI summary read/write for docs.
 *  - notices.*    – Admin promo/notice management.
 *  - helpfulness.* – Voting on doc helpfulness.
 *  - feedback.*   – Submitting feedback on docs.
 *  - contributors.* – Reading contributor data.
 *  - pro_active   – Whether weDocs Pro is active.
 *
 * Filters `wedocs_global_abilities` and `wedocs_doc_abilities` allow third-party
 * code (including weDocs Pro) to extend or override the reported abilities.
 *
 * @since 2.2.2
 */
class AbilitiesPolicy {

    /**
     * Returns all global abilities for the current user.
     *
     * Global abilities reflect what the user can do across the plugin
     * independent of any specific resource (doc post).
     *
     * @since 2.2.2
     *
     * @return array<string, bool> Keyed ability map.
     */
    public static function global_abilities() {
        $abilities = [
            // ── Docs ────────────────────────────────────────────────────────
            // Published docs are always readable by anyone.
            'docs.read'          => true,
            // Reading docs that are in private status.
            'docs.read_private'  => current_user_can( 'read_private_docs' ),
            // Creating new doc posts (requires edit_docs which admins/editors get).
            'docs.create'        => current_user_can( 'edit_docs' ),
            // Editing own doc posts.
            'docs.edit'          => current_user_can( 'edit_docs' ),
            // Editing doc posts authored by other users.
            'docs.edit_others'   => current_user_can( 'edit_others_docs' ),
            // Deleting doc posts (uses the same capability gate as the delete endpoint).
            'docs.delete'        => current_user_can( 'edit_docs' ),
            // Publishing doc posts.
            'docs.publish'       => current_user_can( 'publish_docs' ),
            // Reordering / sorting docs via drag-and-drop.
            'docs.sort'          => current_user_can( 'edit_docs' ),
            // Searching published docs (always allowed).
            'docs.search'        => true,

            // ── Settings ────────────────────────────────────────────────────
            // Reading plugin settings.
            'settings.read'      => current_user_can( 'manage_options' ),
            // Saving plugin settings.
            'settings.write'     => current_user_can( 'manage_options' ),

            // ── AI ──────────────────────────────────────────────────────────
            // Generating AI-written documentation content.
            'ai.generate'        => current_user_can( 'edit_docs' ),
            // Uploading images for AI vision analysis (Pro feature).
            'ai.upload_image'    => wedocs_is_pro_active()
                                    && current_user_can( 'edit_docs' )
                                    && current_user_can( 'upload_files' ),
            // Configuring AI provider credentials.
            'ai.configure'       => current_user_can( 'manage_options' ),

            // ── Summary ─────────────────────────────────────────────────────
            // Reading an AI-generated summary (publicly accessible).
            'summary.read'       => true,
            // Saving a manually provided AI summary.
            'summary.save'       => current_user_can( 'edit_docs' ),
            // Deleting a stored AI summary.
            'summary.delete'     => current_user_can( 'edit_docs' ),
            // Triggering on-demand AI summary generation (publicly accessible;
            // the underlying generate endpoint returns an error if AI is not configured).
            'summary.generate'   => true,

            // ── Admin notices ───────────────────────────────────────────────
            // Viewing and dismissing promotional / admin notices.
            'notices.manage'     => current_user_can( 'manage_options' ),

            // ── Social / interaction ─────────────────────────────────────────
            // Casting a helpful/not-helpful vote on a doc.
            'helpfulness.vote'   => is_user_logged_in(),
            // Submitting feedback (open to guests with name + email).
            'feedback.submit'    => true,
            // Reading documentation contributor data.
            'contributors.read'  => true,

            // ── Meta ────────────────────────────────────────────────────────
            // Whether weDocs Pro is active on this installation.
            'pro_active'         => wedocs_is_pro_active(),
        ];

        /**
         * Filters the global abilities map.
         *
         * Use this filter to add, remove, or override abilities. weDocs Pro uses
         * it to expose additional permission-gated features.
         *
         * @since 2.2.2
         *
         * @param array<string, bool> $abilities Keyed ability map.
         */
        return apply_filters( 'wedocs_global_abilities', $abilities );
    }

    /**
     * Returns abilities for the current user scoped to a specific doc post.
     *
     * Per-doc abilities take the post status into account so MCP clients can
     * determine fine-grained access before attempting an operation.
     *
     * @since 2.2.2
     *
     * @param int $doc_id The doc post ID.
     *
     * @return array<string, bool>|\WP_Error Abilities map, or WP_Error if invalid.
     */
    public static function doc_abilities( $doc_id ) {
        $doc_id = absint( $doc_id );
        $post   = get_post( $doc_id );

        if ( ! $post || 'docs' !== $post->post_type ) {
            return new \WP_Error(
                'wedocs_invalid_doc',
                __( 'Invalid documentation post.', 'wedocs' ),
                [ 'status' => 404 ]
            );
        }

        // Read access is the base for most other abilities.
        $can_read = self::resolve_read_access( $post );

        // edit_post / delete_post map through map_meta_cap so WordPress applies
        // the custom capability_type registered for 'docs'.
        $can_edit   = current_user_can( 'edit_post', $doc_id );
        $can_delete = current_user_can( 'delete_post', $doc_id );

        $abilities = [
            'read'             => $can_read,
            'edit'             => $can_edit,
            'delete'           => $can_delete,
            'publish'          => current_user_can( 'publish_docs' ),

            // AI summary abilities for this specific doc.
            'summary.read'     => $can_read,
            'summary.save'     => $can_edit && current_user_can( 'edit_docs' ),
            'summary.delete'   => $can_edit && current_user_can( 'edit_docs' ),
            // Summary generation shares public access (same as the /generate endpoint).
            'summary.generate' => $can_read,
        ];

        /**
         * Filters the per-doc abilities map.
         *
         * @since 2.2.2
         *
         * @param array<string, bool> $abilities Keyed ability map.
         * @param int                 $doc_id    The doc post ID.
         * @param \WP_Post            $post      The doc post object.
         */
        return apply_filters( 'wedocs_doc_abilities', $abilities, $doc_id, $post );
    }

    /**
     * Resolves whether the current user can read a specific doc post.
     *
     * Mirrors the status-aware logic in `API::get_parents_permissions_check()`.
     *
     * | Post status                        | Who can read?                                    |
     * |------------------------------------|--------------------------------------------------|
     * | publish                            | Everyone                                         |
     * | private                            | Users with `read_private_docs`                   |
     * | draft / pending / future           | Users with `edit_docs` **or** the post author    |
     * | trash                              | Nobody via the REST API                          |
     *
     * @since 2.2.2
     *
     * @param \WP_Post $post The doc post object.
     *
     * @return bool
     */
    public static function resolve_read_access( $post ) {
        $status = get_post_status( $post );

        if ( 'trash' === $status ) {
            return false;
        }

        if ( 'publish' === $status ) {
            return true;
        }

        if ( ! is_user_logged_in() ) {
            return false;
        }

        if ( 'private' === $status ) {
            return (bool) current_user_can( 'read_private_docs' );
        }

        // draft, pending, future – editors or the post author.
        if ( current_user_can( 'edit_docs' ) ) {
            return true;
        }

        return (int) get_current_user_id() === (int) $post->post_author;
    }

    /**
     * Helper to check a single named global ability for the current user.
     *
     * Useful inside `permission_callback` functions so that the REST endpoint
     * enforcement always delegates to the same logic that is *reported* by the
     * abilities API:
     *
     * ```php
     * if ( ! AbilitiesPolicy::can( 'ai.generate' ) ) {
     *     return new WP_Error( 'wedocs_permission_failure', ... );
     * }
     * ```
     *
     * @since 2.2.2
     *
     * @param string $ability An ability key returned by `global_abilities()`.
     *
     * @return bool `true` if the current user has the ability, `false` otherwise.
     */
    public static function can( $ability ) {
        $abilities = self::global_abilities();
        return isset( $abilities[ $ability ] ) ? (bool) $abilities[ $ability ] : false;
    }
}
