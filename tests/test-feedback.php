<?php

/*
 * This file is part of weDocs.
 *
 * (c) Tareq Hasan <tareq@wedevs.com>
 *
 * This source file is subject to the GNU GPL v2 or later
 * that is bundled with this source code in the file LICENSE.
 */

/**
 * Sample test case.
 */
class FeedbackTest extends WP_Ajax_UnitTestCase {
    protected static $doc_id;

    public static function wpSetUpBeforeClass( $factory ) {
        new WeDevs\WeDocs\Ajax();

        self::$doc_id = $factory->post->create( [
            'post_status' => 'publish',
            'post_type'   => 'docs',
        ] );
    }

    public function test_should_submit_positive_comment() {
        $_POST['_wpnonce'] = wp_create_nonce( 'wedocs-ajax' );
        $_POST['type']     = 'positive';
        $_POST['post_id']  = self::$doc_id;

        try {
            $this->_handleAjax( 'wedocs_ajax_feedback' );
        } catch ( WPAjaxDieContinueException $e ) {
            unset( $e );
        }

        $template   = '<div class="wedocs-alert wedocs-alert-%s">%s</div>';
        $message    = __( 'Thanks for your feedback!', 'wedocs' );
        $expected   = sprintf( $template, 'success', $message );
        $vote_count = (int) get_post_meta( self::$doc_id, $_POST['type'], true );

        $response = json_decode( $this->_last_response );

        $this->assertEquals( $expected, $response->data );
        $this->assertEquals( 1, $vote_count );
    }

    public function test_invalid_nonce_should_throw_error() {
        $_POST['_wpnonce'] = '';

        $this->setExpectedException( 'WPAjaxDieStopException', '-1' );

        try {
            $this->_handleAjax( 'wedocs_ajax_feedback' );
        } catch ( WPAjaxDieContinueException $e ) {
            unset( $e );
        }
    }
}
