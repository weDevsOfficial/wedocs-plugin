import { registerBlockType } from '@wordpress/blocks';
import { __ } from  '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';

import attributes from './attributes';

registerBlockType( 'wedocs/wedocs-docs-grid', {
    attributes,
    save        : Save,
    edit        : Edit,
    icon        : 'grid-view',
    title       : __( 'weDocs -  Docs Grid', 'wedocs' ),
    keywords    : [ 'weDocs', 'Docs', 'Grid' ],
    category    : 'widgets',
    description : __( 'Display all the docs in a grid view', 'wedocs' ),
});
