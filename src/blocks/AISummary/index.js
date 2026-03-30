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
			<linearGradient id="gradAI" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#6366F1"/>
				<stop offset="100%" stopColor="#A855F7"/>
			</linearGradient>
		</defs>
		<path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2 9.5h-4v-2h4v2zm0-4h-4V6h4v1.5z" fill="url(#gradAI)"/>
	</svg>
	),
});
