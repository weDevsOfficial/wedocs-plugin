
  /**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
const isPro = window.weDocsAdminScriptVars?.isPro || false;

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	icon: (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="gradTOC" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#6366F1"/>
				<stop offset="100%" stopColor="#A855F7"/>
			</linearGradient>
		</defs>
		<path d="M4 5h2v2H4V5zm4 1h12V5H8v1zm-4 4h2v2H4V9zm4 1h12V9H8v1zm-4 4h2v2H4v-2zm4 1h12v-1H8v1z" fill="url(#gradTOC)"/>
	</svg>
	),
} );
