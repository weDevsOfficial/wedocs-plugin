import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

const isPro = window.weDocsAdminScriptVars?.isPro || false;

registerBlockType(metadata.name, {
	edit: Edit,
	save,
	icon: (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="gradReading" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#6366F1"/>
				<stop offset="100%" stopColor="#A855F7"/>
			</linearGradient>
		</defs>
		<path d="M4 4h16v3H4zm0 6.5h10v3H4zm0 6.5h7v3H4z" fill="url(#gradReading)"/>
	</svg>
	),
});
