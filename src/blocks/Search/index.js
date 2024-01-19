import { registerBlockType } from '@wordpress/blocks';
import { __ } from  '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';

import attributes from './attributes';

registerBlockType( 'wedocs/wedocs-search', {
    attributes,
    save       : Save,
    edit       : Edit,
    icon       : 'star-empty',
    title      : __( 'weDocs - Search Bar', 'wedocs' ),
    keywords   : [ 'Search', 'weDocs search bar', 'Bar' ],
    category   : 'widgets',
});
