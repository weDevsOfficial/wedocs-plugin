import { registerBlockType } from "@wordpress/blocks";
import Edit from "./edit";
import metadata from "./block.json";
import "./style.scss";
import { Icon } from '@wordpress/components';
import { starFilled } from '@wordpress/icons';

registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: () => null,

    icon: {
        src:() => (
            <span style={{ position: 'relative', display: 'inline-block' }}>
                <Icon icon={ starFilled } />
                <span
                    style={{
                        position: 'absolute',
                        top: '22px',
                        right: '-2px',
                        background: '#4f47e6',
                        color: 'white',
                        fontSize: '9px',
                        padding: '2px 3px',
                        borderRadius: '3px',
                        fontWeight: 'bold',
                        lineHeight: 1
                    }}
                >
                    PRO
                </span>
            </span>
        ),
    }
});


