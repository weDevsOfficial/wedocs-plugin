<?php

/**
 * Class MultiByteTruncationTest
 *
 * @package WeDocs
 */

/**
 * Test multibyte string truncation functions.
 */
class MultiByteTruncationTest extends WP_UnitTestCase {

	/**
	 * Test wedocs_apply_short_content with Cyrillic characters.
	 */
	public function test_apply_short_content_with_cyrillic() {
		// Test string: "Как добраться до школы" (How to get to the school)
		$cyrillic_text = 'Как добраться до школы';
		
		// Truncate to 10 characters - should get "Как добрат..."
		$result = wedocs_apply_short_content( $cyrillic_text, 10 );
		$this->assertEquals( 'Как добрат...', $result );
		
		// Verify character count, not byte count
		// "Как добрат" is 10 characters (not counting the ellipsis)
		$truncated_part = mb_substr( $result, 0, -3 ); // Remove '...'
		$this->assertEquals( 10, mb_strlen( $truncated_part ) );
	}

	/**
	 * Test wedocs_apply_short_content with short Cyrillic text.
	 */
	public function test_apply_short_content_with_short_cyrillic() {
		// Test with text shorter than limit
		$cyrillic_text = 'Виза'; // Visa
		$result = wedocs_apply_short_content( $cyrillic_text, 10 );
		
		// Should return the full string without ellipsis
		$this->assertEquals( 'Виза', $result );
		$this->assertEquals( 4, mb_strlen( $result ) );
	}

	/**
	 * Test wedocs_apply_short_content with English text.
	 */
	public function test_apply_short_content_with_english() {
		$english_text = 'How to Get to the School';
		
		// Truncate to 15 characters
		$result = wedocs_apply_short_content( $english_text, 15 );
		$this->assertEquals( 'How to Get to t...', $result );
	}

	/**
	 * Test wedocs_apply_short_content with mixed characters.
	 */
	public function test_apply_short_content_with_mixed_characters() {
		// Test with mixed English and Cyrillic
		$mixed_text = 'Документы Documents Документы';
		$result = wedocs_apply_short_content( $mixed_text, 20 );
		
		// Should truncate at 20 characters
		$truncated_part = mb_substr( $result, 0, -3 );
		$this->assertEquals( 20, mb_strlen( $truncated_part ) );
	}

	/**
	 * Test wedocs_apply_extracted_content with Cyrillic characters.
	 */
	public function test_apply_extracted_content_with_cyrillic() {
		// Test string: "Оформление визы" (Visa processing)
		$cyrillic_text = 'Оформление визы';
		
		// Truncate to 10 characters
		$result = wedocs_apply_extracted_content( $cyrillic_text, 10 );
		$this->assertEquals( 'Оформление...', $result );
		
		// Verify character count
		$truncated_part = mb_substr( $result, 0, -3 );
		$this->assertEquals( 10, mb_strlen( $truncated_part ) );
	}

	/**
	 * Test wedocs_apply_extracted_content with English text.
	 */
	public function test_apply_extracted_content_with_english() {
		$english_text = 'Visa processing information';
		
		// Truncate to 15 characters
		$result = wedocs_apply_extracted_content( $english_text, 15 );
		$this->assertEquals( 'Visa processing...', $result );
	}

	/**
	 * Test exact boundary case for Cyrillic.
	 */
	public function test_exact_boundary_cyrillic() {
		// Text that is exactly the limit
		$cyrillic_text = 'Документ'; // Exactly 8 characters
		$result = wedocs_apply_short_content( $cyrillic_text, 8 );
		
		// Should return without ellipsis
		$this->assertEquals( 'Документ', $result );
	}

	/**
	 * Test one character over boundary for Cyrillic.
	 */
	public function test_one_over_boundary_cyrillic() {
		// Text that is one character over the limit
		$cyrillic_text = 'Документы'; // 9 characters
		$result = wedocs_apply_short_content( $cyrillic_text, 8 );
		
		// Should truncate with ellipsis
		$this->assertEquals( 'Документ...', $result );
		$truncated_part = mb_substr( $result, 0, -3 );
		$this->assertEquals( 8, mb_strlen( $truncated_part ) );
	}

	/**
	 * Test with emoji and special characters.
	 */
	public function test_with_emoji_and_special_chars() {
		// Test with emoji which are also multibyte
		$text_with_emoji = 'Документация 📚 Школа 🏫';
		$result = wedocs_apply_short_content( $text_with_emoji, 15 );
		
		// Should handle emoji properly
		$truncated_part = mb_substr( $result, 0, -3 );
		$this->assertEquals( 15, mb_strlen( $truncated_part ) );
	}
}
