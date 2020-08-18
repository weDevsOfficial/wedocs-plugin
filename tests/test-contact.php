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
class ContactTest extends WP_Ajax_UnitTestCase {
    public static function wpSetUpBeforeClass( $factory ) {
        new WeDevs\WeDocs\Ajax();
    }

    public function test_invalid_nonce_should_throw_error() {
        $_POST['_wpnonce'] = '';

        $this->setExpectedException( 'WPAjaxDieStopException', '-1' );

        try {
            $this->_handleAjax( 'wedocs_contact_feedback' );
        } catch ( WPAjaxDieContinueException $e ) {
            unset( $e );
        }
    }

    public function test_invalid_guest_email_should_throw_error() {
        $_POST['_wpnonce'] = wp_create_nonce( 'wedocs-ajax' );
        $_POST['email']    = 'hello';

        try {
            $this->_handleAjax( 'wedocs_contact_feedback' );
        } catch ( WPAjaxDieContinueException $e ) {
            unset( $e );
        }

        $response = json_decode( $this->_last_response );

        $this->assertFalse( $response->success );
        $this->assertEquals( $response->data, __( 'Please enter a valid email address.', 'wedocs' ) );
    }

    public function test_subject_should_be_required() {
        $_POST['_wpnonce'] = wp_create_nonce( 'wedocs-ajax' );
        $_POST['email']    = 'hello@example.com';
        $_POST['subject']  = '';

        try {
            $this->_handleAjax( 'wedocs_contact_feedback' );
        } catch ( WPAjaxDieContinueException $e ) {
            unset( $e );
        }

        $response = json_decode( $this->_last_response );

        $this->assertFalse( $response->success );
        $this->assertEquals( $response->data, __( 'Please provide a subject line.', 'wedocs' ) );
    }

    public function test_logged_in_user_should_not_require_email() {
        $this->_setRole( 'subscriber' );

        $doc_id = self::factory()->post->create( [
            'post_status' => 'publish',
            'post_type'   => 'docs',
        ] );

        $_POST['_wpnonce'] = wp_create_nonce( 'wedocs-ajax' );
        $_POST['subject']  = 'Hello There';
        $_POST['message']  = 'Hello There';
        $_POST['doc_id']   = $doc_id;

        try {
            $this->_handleAjax( 'wedocs_contact_feedback' );
        } catch ( WPAjaxDieContinueException $e ) {
            unset( $e );
        }

        $response = json_decode( $this->_last_response );

        $this->assertTrue( $response->success );
        $this->assertEquals( $response->data, __( 'Thanks for your feedback.', 'wedocs' ) );
    }
}
