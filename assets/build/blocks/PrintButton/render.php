<?php
/**
 * Server-side rendering for the Print Button block.
 *
 * @param array $attributes Block attributes.
 * @return string
 */

if ( ! function_exists( 'render_wedocs_print_button' ) ) {
	function render_wedocs_print_button( $attributes, $content = '' ) {
		if ( $attributes === null ) {
			$attributes = [];
		}

		// Only render on weDocs docs post type.
		global $post;
		if ( ! $post || $post->post_type !== 'docs' ) {
			return '';
		}

		ob_start();

		// ── Content attributes ────────────────────────────────────────────────────
		$layout           = isset( $attributes['layout'] ) ? $attributes['layout'] : 'layout1';
		$button_text      = isset( $attributes['buttonText'] ) ? $attributes['buttonText'] : __( 'Print', 'wedocs' );
		$show_icon        = isset( $attributes['showIcon'] ) ? $attributes['showIcon'] : true;
		$additional_classes = isset( $attributes['additionalClasses'] ) ? $attributes['additionalClasses'] : '';

		// ── Helper: resolve responsive value (returns desktop → tablet → mobile) ─
		$resolve = function( $attr, $device = 'desktop' ) use ( $attributes ) {
			if ( ! isset( $attributes[ $attr ] ) ) {
				return null;
			}
			$val = $attributes[ $attr ];
			if ( ! is_array( $val ) ) {
				return $val; // plain scalar (legacy fallback)
			}
			// For responsive objects: prefer requested device, fall back up chain.
			$chain = [ $device, 'tablet', 'desktop' ];
			foreach ( $chain as $d ) {
				if ( ! empty( $val[ $d ] ) ) {
					return $val[ $d ];
				}
			}
			return null;
		};

		// ── Resolve desktop values ────────────────────────────────────────────────
		$padding_d = wp_parse_args( $resolve( 'padding' ) ?: [], [
			'top' => '10px', 'right' => '15px', 'bottom' => '10px', 'left' => '15px',
		] );
		$margin_d  = wp_parse_args( $resolve( 'margin' ) ?: [], [
			'top' => '0px', 'right' => '0px', 'bottom' => '10px', 'left' => '0px',
		] );

		$typography_d = wp_parse_args( $resolve( 'typography' ) ?: [], [
			'fontSize' => '16px', 'fontWeight' => 'normal',
		] );
		$border_d = wp_parse_args( $resolve( 'border' ) ?: [], [
			'radius' => '4px', 'width' => '1px', 'color' => '#0073aa', 'style' => 'solid',
		] );

		// Colors: AdvancedColors stores { color: '#...' } per device.
		$bg_raw    = $resolve( 'backgroundColor' );
		$text_raw  = $resolve( 'textColor' );
		$hbg_raw   = $resolve( 'hoverBackgroundColor' );
		$htxt_raw  = $resolve( 'hoverTextColor' );

		$bg_color    = is_array( $bg_raw )   ? ( $bg_raw['color']   ?? '#0073aa' ) : ( $bg_raw   ?: '#0073aa' );
		$text_color  = is_array( $text_raw )  ? ( $text_raw['color']  ?? '#ffffff' ) : ( $text_raw  ?: '#ffffff' );
		$hover_bg    = is_array( $hbg_raw )  ? ( $hbg_raw['color']  ?? '#005177' ) : ( $hbg_raw  ?: '#005177' );
		$hover_text  = is_array( $htxt_raw ) ? ( $htxt_raw['color'] ?? '#ffffff' ) : ( $htxt_raw ?: '#ffffff' );

		// ── Unique block ID ──────────────────────────────────────────────────────
		$block_id = 'wedocs-print-btn-' . substr( md5( uniqid( '', true ) ), 0, 8 );

		// ── Build button HTML ────────────────────────────────────────────────────
		$icon_svg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">'
		          . '<path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3z'
		          . 'm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z'
		          . 'm-1-9H6v4h12V3z"/></svg>';

		$icon_html  = $show_icon ? $icon_svg : '';
		$layout_cls = esc_attr( $layout );
		$btn_class  = trim( 'wedocs-print-article wedocs-print-button ' . esc_attr( $additional_classes ) );
		$btn_title  = esc_attr( __( 'Print this article', 'wedocs' ) );
		$btn_text   = esc_html( $button_text );

		$button_html = sprintf(
			'<a href="#" id="%s" class="%s %s" title="%s">%s<span>%s</span></a>',
			esc_attr( $block_id ),
			$btn_class,
			$layout_cls,
			$btn_title,
			$icon_html,
			$btn_text
		);

		// ── Build responsive CSS ─────────────────────────────────────────────────
		$spacing = function( $s ) {
			return sprintf(
				'%s %s %s %s',
				esc_attr( $s['top'] ?? '0' ),
				esc_attr( $s['right'] ?? '0' ),
				esc_attr( $s['bottom'] ?? '0' ),
				esc_attr( $s['left'] ?? '0' )
			);
		};

		$build_rules = function( $padding, $margin, $typography, $border, $bg, $text ) use ( $show_icon, $layout, $block_id, $hover_bg, $hover_text, $spacing ) {
			$gap = ( $layout === 'layout3' ) ? '4px' : ( $show_icon ? '8px' : '0' );
			$flex_dir = ( $layout === 'layout3' ) ? 'column' : 'row';
			return sprintf(
				'#%1$s {
					padding: %2$s !important;
					margin: %3$s !important;
					font-size: %4$s !important;
					font-weight: %5$s !important;
					font-family: %6$s;
					line-height: %7$s;
					letter-spacing: %8$s;
					background-color: %9$s !important;
					color: %10$s !important;
					border: %11$s %12$s %13$s !important;
					border-radius: %14$s !important;
					display: inline-flex !important;
					align-items: center !important;
					justify-content: center !important;
					flex-direction: %15$s !important;
					gap: %16$s !important;
					text-decoration: none !important;
					cursor: pointer !important;
					transition: all 0.2s ease-in-out !important;
					line-height: 1.4 !important;
				}
				#%1$s:hover {
					background-color: %17$s !important;
					color: %18$s !important;
				}',
				esc_attr( $block_id ),
				$spacing( $padding ),
				$spacing( $margin ),
				esc_attr( $typography['fontSize'] ?? '16px' ),
				esc_attr( $typography['fontWeight'] ?? 'normal' ),
				esc_attr( $typography['fontFamily'] ?? '' ),
				esc_attr( $typography['lineHeight'] ?? '' ),
				esc_attr( $typography['letterSpacing'] ?? '' ),
				esc_attr( $bg ),
				esc_attr( $text ),
				esc_attr( $border['width'] ?? '1px' ),
				esc_attr( $border['style'] ?? 'solid' ),
				esc_attr( $border['color'] ?? 'transparent' ),
				esc_attr( $border['radius'] ?? '4px' ),
				$flex_dir,
				$gap,
				esc_attr( $hover_bg ),
				esc_attr( $hover_text )
			);
		};

		// Desktop rules
		$desktop_css = $build_rules( $padding_d, $margin_d, $typography_d, $border_d, $bg_color, $text_color );

		// Tablet rules (only if overrides exist)
		$padding_t    = $resolve( 'padding', 'tablet' );
		$margin_t     = $resolve( 'margin', 'tablet' );
		$typography_t = $resolve( 'typography', 'tablet' );
		$border_t     = $resolve( 'border', 'tablet' );
		$bg_t_raw     = $resolve( 'backgroundColor', 'tablet' );
		$text_t_raw   = $resolve( 'textColor', 'tablet' );
		$bg_t         = is_array( $bg_t_raw )   ? ( $bg_t_raw['color']   ?? $bg_color )   : ( $bg_t_raw   ?: $bg_color );
		$text_t       = is_array( $text_t_raw ) ? ( $text_t_raw['color'] ?? $text_color ) : ( $text_t_raw ?: $text_color );

		$tablet_css = '';
		if ( $padding_t || $margin_t || $typography_t || $border_t || $bg_t_raw || $text_t_raw ) {
			$tablet_css = sprintf(
				'@media (max-width: 1024px) { %s }',
				$build_rules(
					wp_parse_args( $padding_t ?: [], $padding_d ),
					wp_parse_args( $margin_t ?: [], $margin_d ),
					wp_parse_args( $typography_t ?: [], $typography_d ),
					wp_parse_args( $border_t ?: [], $border_d ),
					$bg_t,
					$text_t
				)
			);
		}

		// Mobile rules (only if overrides exist)
		$padding_m    = $resolve( 'padding', 'mobile' );
		$margin_m     = $resolve( 'margin', 'mobile' );
		$typography_m = $resolve( 'typography', 'mobile' );
		$border_m     = $resolve( 'border', 'mobile' );
		$bg_m_raw     = $resolve( 'backgroundColor', 'mobile' );
		$text_m_raw   = $resolve( 'textColor', 'mobile' );
		$bg_m         = is_array( $bg_m_raw )   ? ( $bg_m_raw['color']   ?? $bg_t )   : ( $bg_m_raw   ?: $bg_t );
		$text_m       = is_array( $text_m_raw ) ? ( $text_m_raw['color'] ?? $text_t ) : ( $text_m_raw ?: $text_t );

		$mobile_css = '';
		if ( $padding_m || $margin_m || $typography_m || $border_m || $bg_m_raw || $text_m_raw ) {
			$mobile_css = sprintf(
				'@media (max-width: 767px) { %s }',
				$build_rules(
					wp_parse_args( $padding_m ?: [], $padding_t ?: $padding_d ),
					wp_parse_args( $margin_m ?: [], $margin_t ?: $margin_d ),
					wp_parse_args( $typography_m ?: [], $typography_t ?: $typography_d ),
					wp_parse_args( $border_m ?: [], $border_t ?: $border_d ),
					$bg_m,
					$text_m
				)
			);
		}

		?>
		<style>
			<?php echo $desktop_css; ?>
			<?php echo $tablet_css; ?>
			<?php echo $mobile_css; ?>
			@media print {
				#<?php echo esc_attr( $block_id ); ?>,
				.wp-block-wedocs-print-button {
					display: none !important;
				}
			}
		</style>
		<div class="wp-block-wedocs-print-button wedocs-print-button-wrapper">
			<?php echo $button_html; ?>
		</div>
		<?php
		return ob_get_clean();
	}
}

echo render_wedocs_print_button( $attributes );
