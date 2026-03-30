import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import Save from "./save";
import metadata from "./block.json";
import "./style.css";

registerBlockType(metadata.name, {
	edit: Edit,
	save: Save,
	icon: (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M3 3h18v18H3V3zm8 16h8V5h-8v14zM5 5v14h4V5H5z" fill="#3B82F6"/>
		</svg>
	),
});
