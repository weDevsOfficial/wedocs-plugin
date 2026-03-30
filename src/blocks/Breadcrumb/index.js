import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import metadata from "./block.json";
import "./style.scss";

registerBlockType(metadata, {
	edit: Edit,
	save: () => null,
	icon: (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#3B82F6"/>
		</svg>
	),
});
