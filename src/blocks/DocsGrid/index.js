import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import metadata from "./block.json";
import "./style.scss";

registerBlockType(metadata.name, {
	edit: Edit,
	save: () => null,
	icon: (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M3 3h8v8H3zm0 10h8v8H3zm10-10h8v8h-8zm0 10h8v8h-8z" fill="#3B82F6"/>
		</svg>
	),
});
