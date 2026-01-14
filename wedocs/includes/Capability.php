<?php

namespace WeDevs\WeDocs;

/**
 * Post type class
 */
class Capability {
    /**
     * Initialize the class
     */
    public function __construct() {
        add_filter( 'user_has_cap', array( $this, 'grant_delete_capability_to_specific_roles' ), 10, 4 );
    }

    /**
	 * Grant doc delete capabilities to Admin, Editor and
	 * weDocs-pro global permission given roles.
	 *
	 * @param array $all_caps An array of all the user's capabilities.
	 * @param array $caps    Actual capabilities for meta capability.
	 * @param array $args    Optional parameters passed to has_cap(), typically object ID.
	 * @param WP_User $user
     *
	 * @return array
	 */
    public function grant_delete_capability_to_specific_roles( $all_caps, $caps, $args, $user ) {
        if ( ! isset( $_GET['post'] ) || 'docs' !== get_post_type( absint( $_GET['post'] ) ) ) {
			return $all_caps;
		}

        $permitted_roles = array( 'administrator', 'editor' );
        $delete_caps     = array(
            'delete_published_docs' => true,
			'delete_docs' => true,
            'delete_others_docs' => true,
            'delete_private_docs' => true,
        );

		if ( empty( array_intersect( array_keys( $delete_caps ), $caps ) ) ) {
            return $all_caps;
        }

        if ( wedocs_pro_exists() ) {
            $permitted_roles = wedocs_get_permission_settings( 'global_permission', [ 'administrator', 'editor' ] );
        }

        $has_role = array_intersect( $user->roles, $permitted_roles );
        
        if ( ! empty( $user->roles ) && ! empty( $has_role ) ) {
            $all_caps = array_merge( $all_caps, $delete_caps );
        }

        return $all_caps;
    }
}
