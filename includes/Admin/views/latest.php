<div class="wrap" id="wedocs-app">
	<h1><?php _e( 'Recent Update', 'wedocs' ); ?> </h1>
	<table style="background-color:#FFFFFF;width:100%;padding:2%;">
		<tr>
			<td width="50%" valign="top">
				<h2><?php _e( 'Recent Posts', 'wedocs' ); ?> </h2>
				<?php

				/**
				 * Get modified author by post id.
				 * Maybe this function can replace with the WordPress original get_the_modified_author()
				 * But I try the original, it doesnot work and return null always.
				 *
				 * @param string $post_id
				 *
				 * @return string $author_display_name
				 */
				function my_get_the_modified_author( $post_id ) {
					$author_display_name = '';
					$last_id             = get_post_meta( $post_id, '_edit_last', true );
					if ( $last_id ) {
						$last_user           = get_userdata( $last_id );
						$author_display_name = apply_filters( 'the_modified_author', $last_user->display_name );
					}

					return $author_display_name;
				}

				$args         = array(
					'post_type'      => 'docs',
					'posts_per_page' => 20,              // Total number of posts to retrieve
					'post_status'    => 'publish',
					'order'          => 'DESC',
					'orderby'        => 'modified',
				);
				$recent_posts = get_posts( $args );

				$list_items_markup = '';
				foreach ( $recent_posts as $post ) {

					$list_items_markup .= '<li style="margin-bottom:10px;">';

					// title
					$post_link = esc_url( get_permalink( $post ) );
					$title     = get_the_title( $post );
					if ( ! $title ) {
						$title = __( '(no title)' );
					}
					$list_items_markup .= sprintf(
						'<a href="%1$s">%2$s</a>',
						$post_link,
						$title
					);

					$list_items_markup .= '<br>';

					// info
					// if modified，show (modified by $modified_author on date)，or show (created by $post_author on date)
					$is_modified = ( $post->post_date != $post->post_modified ) ? true : false;

					if ( $is_modified ) {
						$author_display_name = my_get_the_modified_author( $post->ID );
						$byline              = sprintf( __( 'modified by %1$s on %2$s' ), $author_display_name, $post->post_modified );
					} else {
						$author_display_name = get_the_author_meta( 'display_name', $post->post_author );
						$byline              = sprintf( __( 'created by %1$s on %2$s' ), $author_display_name, $post->post_date );
					}
					$list_items_markup .= sprintf( '%1$s', esc_html( $byline ) );

					$list_items_markup .= '</li>';
				}

				echo sprintf(
					'<ul style="font-size:14px;">%1$s</ul>',
					$list_items_markup
				);

				?>
			</td>
			<td width="50%" valign="top">
				<h2><?php _e( 'Recent Comments', 'wedocs' ); ?> </h2>
				<?php

				$args            = array(
					'post_type'      => 'docs',
					'posts_per_page' => 20,
					'order'          => 'DESC',
					'orderby'        => 'modified',
				);
				$recent_comments = get_comments( $args );

				$list_items_markup = '';
				foreach ( $recent_comments as $comment ) {

					$list_items_markup .= '<li style="margin-bottom:10px;">';

					// excerpt
					$comment_link    = esc_url( get_comment_link( $comment ) );
					$comment_content = get_comment_excerpt( $comment->comment_ID );
					var_dump( $comment_content );

					$list_items_markup .= sprintf(
						'<a href="%1$s">%2$s</a>',
						$comment_link,
						$comment_content
					);

					$list_items_markup .= '<br>';

					// info
					// if reply，show ($comment_author replied $post_title on date)，or show ($comment_author commented $post_title on date)
					$is_reply = ( $comment->comment_parent != '0' ) ? true : false;

					$post_title = get_the_title( $comment->comment_post_ID );
					if ( $is_reply ) {
						$list_items_markup .= sprintf( __( '%1$s replied %2$s on %3$s' ), $comment->comment_author, $post_title, $comment->comment_date );
					} else {
						$list_items_markup .= sprintf( __( '%1$s commented %2$s on %3$s' ), $comment->comment_author, $post_title, $comment->comment_date );
					}

					$list_items_markup .= '</li>';
				}

				echo sprintf(
					'<ul style="font-size:14px;">%1$s</ul>',
					$list_items_markup
				);

				?>
			</td>
		</tr>
	</table>
</div>
