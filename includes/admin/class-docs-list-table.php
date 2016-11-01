<?php

/**
 * Modifier functions in docs list table
 */
class weDocs_Docs_List_Table {

    public function __construct() {
        add_filter( 'manage_docs_posts_columns', array( $this, 'docs_list_columns' ) );
        add_action( 'manage_docs_posts_custom_column', array( $this, 'docs_list_columns_row' ), 10, 2 );
        add_filter( 'manage_edit-docs_sortable_columns', array( $this, 'docs_sortable_columns' ) );

        //
        add_action( 'load-edit.php', array( $this, 'edit_docs_load' ) );
        add_action( 'load-post.php', array( $this, 'add_meta_box' ) );

        // load css
        add_action( 'admin_print_styles-post.php', array( $this, 'helpfulness_css' ) );
        add_action( 'admin_print_styles-edit.php', array( $this, 'helpfulness_css' ) );
    }

    function add_meta_box() {
        add_meta_box( 'op-menu-meta-box-id', __( 'Helpfulness', 'wedocs' ), array( $this, 'helpfulness_metabox' ), 'docs', 'side', 'core' );
    }

    public function helpfulness_css() {
        if ( get_current_screen()->post_type != 'docs' ) {
            return;
        }
        ?>
        <style type="text/css">
            .wedocs-positive { color: green; }
            .wedocs-negative { color: red; text-align: right; }
        </style>
        <?php
    }

    function helpfulness_metabox() {
        global $post;

        ?>
        <table style="width: 100%;">
            <tr>
                <td class="wedocs-positive">
                    <span class="dashicons dashicons-thumbs-up"></span>
                    <?php printf( '%d', get_post_meta( $post->ID, 'positive', true ) ); ?>
                </td>

                <td class="wedocs-negative">
                    <span class="dashicons dashicons-thumbs-down"></span>
                    <?php printf( '%d', get_post_meta( $post->ID, 'negative', true ) ); ?>
                </td>
            </tr>
        </table>
        <?php
    }

    /**
     * Vote column in the class UI
     *
     * @param  array $column
     *
     * @return array
     */
    public function docs_list_columns( $columns ) {
        $vote  = array( 'votes' => __( 'Votes', 'wedocs' ) );

        // insert before last element, date
        $first_items = array_splice( $columns, 0, 3 ); // remove first 3 items and store to $first_items, date remains to $columns
        $new_columns = array_merge ($first_items, $vote, $columns); // merge all those

        return $new_columns;
    }

    public function docs_sortable_columns( $columns ) {
        $columns['votes'] = array( 'votes', true );

        return $columns;
    }

    public function docs_list_columns_row( $column_name, $post_id ) {
        if ( 'votes' == $column_name ) {
            $positive = get_post_meta( $post_id, 'positive', true );
            $negative = get_post_meta( $post_id, 'negative', true );

            printf( '<span class="wedocs-positive">%d</span>/<span class="wedocs-negative">%d</span>', $positive, $negative );
        }
    }

    function edit_docs_load() {
        add_filter( 'request', array( $this, 'sort_docs' ) );
    }

    /* Sorts the movies. */
    function sort_docs( $vars ) {

        /* Check if we're viewing the 'movie' post type. */
        if ( isset( $vars['post_type'] ) && 'docs' == $vars['post_type'] ) {

            /* Check if 'orderby' is set to 'duration'. */
            if ( isset( $vars['orderby'] ) && 'votes' == $vars['orderby'] ) {

                $vars = array_merge(
                    $vars,
                    array(
                        'meta_key' => 'positive',
                        'orderby' => 'meta_value_num'
                    )
                );
            }
        }

        return $vars;
    }
}
