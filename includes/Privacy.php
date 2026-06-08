<?php
// DESCRIPTION: WordPress Privacy API integration for weDocs messages.
// Registers data exporter and eraser for GDPR compliance.

namespace WeDevs\WeDocs;

/**
 * Privacy class for WordPress Privacy API integration.
 *
 * @since WEDOCS_SINCE
 */
class Privacy {

    /**
     * Initialize privacy hooks.
     *
     * @since WEDOCS_SINCE
     */
    public function __construct() {
        add_filter( 'wp_privacy_personal_data_exporters', [ $this, 'register_exporter' ] );
        add_filter( 'wp_privacy_personal_data_erasers', [ $this, 'register_eraser' ] );
    }

    /**
     * Register the data exporter for weDocs messages.
     *
     * @since WEDOCS_SINCE
     *
     * @param array $exporters Existing exporters.
     *
     * @return array
     */
    public function register_exporter( $exporters ) {
        $exporters['wedocs-messages'] = [
            'exporter_friendly_name' => __( 'weDocs Messages', 'wedocs' ),
            'callback'               => [ $this, 'export_messages' ],
        ];

        return $exporters;
    }

    /**
     * Register the data eraser for weDocs messages.
     *
     * @since WEDOCS_SINCE
     *
     * @param array $erasers Existing erasers.
     *
     * @return array
     */
    public function register_eraser( $erasers ) {
        $erasers['wedocs-messages'] = [
            'eraser_friendly_name' => __( 'weDocs Messages', 'wedocs' ),
            'callback'             => [ $this, 'erase_messages' ],
        ];

        return $erasers;
    }

    /**
     * Export personal data for the given email address.
     *
     * @since WEDOCS_SINCE
     *
     * @param string $email_address Email address to export data for.
     * @param int    $page          Page number for batched export.
     *
     * @return array
     */
    public function export_messages( $email_address, $page = 1 ) {
        global $wpdb;

        $table_name  = $wpdb->prefix . 'wedocs_messages';
        $per_page    = 100;
        $offset      = ( $page - 1 ) * $per_page;
        $export_items = [];

        // Check if table exists.
        $table_exists = $wpdb->get_var(
            $wpdb->prepare( 'SHOW TABLES LIKE %s', $table_name )
        );

        if ( ! $table_exists ) {
            return [
                'data' => [],
                'done' => true,
            ];
        }

        $messages = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM $table_name WHERE email = %s ORDER BY submitted_at DESC LIMIT %d OFFSET %d",
                $email_address,
                $per_page,
                $offset
            )
        );

        foreach ( $messages as $message ) {
            $data = [
                [
                    'name'  => __( 'Name', 'wedocs' ),
                    'value' => $message->name,
                ],
                [
                    'name'  => __( 'Email', 'wedocs' ),
                    'value' => $message->email,
                ],
                [
                    'name'  => __( 'Subject', 'wedocs' ),
                    'value' => $message->subject,
                ],
                [
                    'name'  => __( 'Message', 'wedocs' ),
                    'value' => $message->message,
                ],
                [
                    'name'  => __( 'Source', 'wedocs' ),
                    'value' => $message->source,
                ],
                [
                    'name'  => __( 'Date', 'wedocs' ),
                    'value' => $message->submitted_at,
                ],
                [
                    'name'  => __( 'IP Address', 'wedocs' ),
                    'value' => $message->ip_address,
                ],
            ];

            $export_items[] = [
                'group_id'          => 'wedocs-messages',
                'group_label'       => __( 'weDocs Messages', 'wedocs' ),
                'group_description' => __( 'Messages submitted through weDocs contact forms.', 'wedocs' ),
                'item_id'           => "wedocs-message-{$message->id}",
                'data'              => $data,
            ];
        }

        return [
            'data' => $export_items,
            'done' => count( $messages ) < $per_page,
        ];
    }

    /**
     * Erase personal data for the given email address.
     *
     * @since WEDOCS_SINCE
     *
     * @param string $email_address Email address to erase data for.
     * @param int    $page          Page number for batched erasure.
     *
     * @return array
     */
    public function erase_messages( $email_address, $page = 1 ) {
        global $wpdb;

        $table_name = $wpdb->prefix . 'wedocs_messages';

        // Check if table exists.
        $table_exists = $wpdb->get_var(
            $wpdb->prepare( 'SHOW TABLES LIKE %s', $table_name )
        );

        if ( ! $table_exists ) {
            return [
                'items_removed'  => 0,
                'items_retained' => 0,
                'messages'       => [],
                'done'           => true,
            ];
        }

        $deleted = $wpdb->query(
            $wpdb->prepare(
                "DELETE FROM $table_name WHERE email = %s LIMIT 1000",
                $email_address
            )
        );

        $items_removed = $deleted ? $deleted : 0;

        // Check if there are more to delete.
        $remaining = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM $table_name WHERE email = %s",
                $email_address
            )
        );

        return [
            'items_removed'  => $items_removed,
            'items_retained' => 0,
            'messages'       => [],
            'done'           => (int) $remaining === 0,
        ];
    }
}
