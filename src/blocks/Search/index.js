import { registerBlockType } from '@wordpress/blocks';
import { __ } from  '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';

import attributes from './attributes';

registerBlockType( 'wedocs/wedocs-search', {
    attributes,
    icon        : <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M8.91421 1.5H5.5C4.39543 1.5 3.5 2.39543 3.5 3.5V6.91421V9.02779V15.5C3.5 16.6046 4.39543 17.5 5.5 17.5H7.02779C6.07771 16.4385 5.5 15.0367 5.5 13.5C5.5 10.1863 8.18629 7.5 11.5 7.5C13.0367 7.5 14.4385 8.07771 15.5 9.02779V8.5V6.91421C15.5 6.38378 15.2893 5.87507 14.9142 5.5L11.5 2.08579C11.1249 1.71071 10.6162 1.5 10.0858 1.5H8.91421ZM15.5 13.5C15.5 11.2909 13.7091 9.5 11.5 9.5C9.29086 9.5 7.5 11.2909 7.5 13.5C7.5 15.7091 9.29086 17.5 11.5 17.5C12.2414 17.5 12.9364 17.2977 13.5318 16.946L14.7929 18.2071C15.1834 18.5976 15.8166 18.5976 16.2071 18.2071C16.5976 17.8166 16.5976 17.1834 16.2071 16.7929L14.946 15.5318C15.2977 14.9364 15.5 14.2414 15.5 13.5ZM11.5 11.5C12.6046 11.5 13.5 12.3954 13.5 13.5C13.5 14.0526 13.2772 14.5512 12.9142 14.9142C12.5512 15.2772 12.0526 15.5 11.5 15.5C10.3954 15.5 9.5 14.6046 9.5 13.5C9.5 12.3954 10.3954 11.5 11.5 11.5Z" fill="#111827" />
    </svg>,
    title       : __( 'weDocs -  Searchbar', 'wedocs' ),
    keywords    : [ 'Search', 'weDocs search bar', 'Bar' ],
    category    : 'widgets',
    description : __( 'Simple search forms for easy user guidance for your documentation', 'wedocs' ),
    edit        : Edit,
    save        : Save,
});
