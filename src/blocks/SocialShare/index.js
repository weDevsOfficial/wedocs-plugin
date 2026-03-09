import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import Save from "./save";
import metadata from "./block.json";
import "./style.scss";

registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: Save,
});
