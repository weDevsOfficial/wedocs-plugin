<?php

/**
 * Class UpgradePopupContentTest
 *
 * @package WeDocs
 */

/**
 * Test wedocs_get_upgrade_popup_content function.
 */
class UpgradePopupContentTest extends WP_UnitTestCase {

	/**
	 * Test default popup content structure.
	 */
	public function test_default_content_structure() {
		$content = wedocs_get_upgrade_popup_content();

		// Test that all required keys exist
		$this->assertArrayHasKey( 'title', $content );
		$this->assertArrayHasKey( 'subtitle', $content );
		$this->assertArrayHasKey( 'features', $content );
		$this->assertArrayHasKey( 'button_text', $content );
		$this->assertArrayHasKey( 'button_url', $content );
		$this->assertArrayHasKey( 'footer_features', $content );

		// Test data types
		$this->assertIsString( $content['title'] );
		$this->assertIsString( $content['subtitle'] );
		$this->assertIsArray( $content['features'] );
		$this->assertIsString( $content['button_text'] );
		$this->assertIsString( $content['button_url'] );
		$this->assertIsArray( $content['footer_features'] );
	}

	/**
	 * Test default content values.
	 */
	public function test_default_content_values() {
		$content = wedocs_get_upgrade_popup_content();

		// Test default title
		$this->assertEquals( 'Upgrade to', $content['title'] );

		// Test default subtitle contains expected text
		$this->assertStringContainsString( 'Powerful features', $content['subtitle'] );

		// Test default button text
		$this->assertEquals( 'Get weDocs Pro', $content['button_text'] );

		// Test default button URL
		$this->assertStringContainsString( 'wedocs.co/pricing', $content['button_url'] );

		// Test features array is not empty
		$this->assertNotEmpty( $content['features'] );

		// Test footer features array is not empty
		$this->assertNotEmpty( $content['footer_features'] );
	}

	/**
	 * Test features array structure.
	 */
	public function test_features_structure() {
		$content = wedocs_get_upgrade_popup_content();
		
		// Test that features is an array with items
		$this->assertIsArray( $content['features'] );
		$this->assertGreaterThan( 0, count( $content['features'] ) );

		// Test each feature has title and description keys
		foreach ( $content['features'] as $feature ) {
			$this->assertIsArray( $feature );
			$this->assertArrayHasKey( 'title', $feature );
			$this->assertArrayHasKey( 'description', $feature );
			$this->assertIsString( $feature['title'] );
			$this->assertIsString( $feature['description'] );
		}
	}

	/**
	 * Test filter can modify content.
	 */
	public function test_filter_modifies_content() {
		add_filter( 'wedocs_upgrade_popup_content', function( $content ) {
			$content['title'] = 'Custom Title';
			$content['subtitle'] = 'Custom Subtitle';
			$content['button_text'] = 'Custom Button';
			$content['button_url'] = 'https://example.com/custom';
			return $content;
		} );

		$content = wedocs_get_upgrade_popup_content();

		$this->assertEquals( 'Custom Title', $content['title'] );
		$this->assertEquals( 'Custom Subtitle', $content['subtitle'] );
		$this->assertEquals( 'Custom Button', $content['button_text'] );
		$this->assertEquals( 'https://example.com/custom', $content['button_url'] );

		// Clean up
		remove_all_filters( 'wedocs_upgrade_popup_content' );
	}

	/**
	 * Test filter can modify features.
	 */
	public function test_filter_modifies_features() {
		add_filter( 'wedocs_upgrade_popup_content', function( $content ) {
			$content['features'] = array(
				array(
					'title' => 'Custom Feature 1',
					'description' => 'Description 1',
				),
				array(
					'title' => 'Custom Feature 2',
					'description' => 'Description 2',
				),
			);
			return $content;
		} );

		$content = wedocs_get_upgrade_popup_content();

		$this->assertCount( 2, $content['features'] );
		$this->assertEquals( 'Custom Feature 1', $content['features'][0]['title'] );
		$this->assertEquals( 'Description 1', $content['features'][0]['description'] );
		$this->assertEquals( 'Custom Feature 2', $content['features'][1]['title'] );
		$this->assertEquals( 'Description 2', $content['features'][1]['description'] );

		// Clean up
		remove_all_filters( 'wedocs_upgrade_popup_content' );
	}

	/**
	 * Test filter can modify footer features.
	 */
	public function test_filter_modifies_footer_features() {
		add_filter( 'wedocs_upgrade_popup_content', function( $content ) {
			$content['footer_features'] = array(
				'Custom footer 1',
				'Custom footer 2',
			);
			return $content;
		} );

		$content = wedocs_get_upgrade_popup_content();

		$this->assertCount( 2, $content['footer_features'] );
		$this->assertEquals( 'Custom footer 1', $content['footer_features'][0] );
		$this->assertEquals( 'Custom footer 2', $content['footer_features'][1] );

		// Clean up
		remove_all_filters( 'wedocs_upgrade_popup_content' );
	}

	/**
	 * Test campaign example from documentation.
	 */
	public function test_campaign_example() {
		add_filter( 'wedocs_upgrade_popup_content', function( $content ) {
			$content['title'] = 'Special Black Friday Offer!';
			$content['subtitle'] = 'Get 30% OFF weDocs Pro - Limited Time Only!';
			$content['button_text'] = 'Claim Your 30% Discount Now';
			$content['button_url'] = 'https://wedocs.co/pricing/?discount=BLACKFRIDAY30';
			return $content;
		} );

		$content = wedocs_get_upgrade_popup_content();

		$this->assertStringContainsString( 'Black Friday', $content['title'] );
		$this->assertStringContainsString( '30%', $content['subtitle'] );
		$this->assertStringContainsString( 'Discount', $content['button_text'] );
		$this->assertStringContainsString( 'BLACKFRIDAY30', $content['button_url'] );

		// Clean up
		remove_all_filters( 'wedocs_upgrade_popup_content' );
	}

	/**
	 * Test multiple filters can be chained.
	 */
	public function test_multiple_filters() {
		add_filter( 'wedocs_upgrade_popup_content', function( $content ) {
			$content['title'] = 'Modified by Filter 1';
			return $content;
		}, 10 );

		add_filter( 'wedocs_upgrade_popup_content', function( $content ) {
			$content['title'] .= ' and Filter 2';
			return $content;
		}, 20 );

		$content = wedocs_get_upgrade_popup_content();

		$this->assertEquals( 'Modified by Filter 1 and Filter 2', $content['title'] );

		// Clean up
		remove_all_filters( 'wedocs_upgrade_popup_content' );
	}
}
