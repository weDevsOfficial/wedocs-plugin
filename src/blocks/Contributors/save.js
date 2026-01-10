import { useBlockProps } from '@wordpress/block-editor';
import { getBlockClasses, getInlineStyles } from '../block-helpers';

const Save = () => {
	const blockProps = useBlockProps.save();

	// Since this is a dynamic block that uses PHP rendering,
	// we return null to let the server-side render function handle the output
	return null;
};

export default Save;
