import { __ } from '@wordpress/i18n';

const attributes = {
    placeholder: {
        type: 'string',
        default: __( 'Search for a top or question', 'wedocs' ),
    },
    alignment: {
        type: 'string',
        default: 'left'
    },
    bgColor: {
        type: 'string',
        default: '#ffffff' // Default background color
    },
    hoverColor: {
        type: 'string'
    },
    padding: {
        type: 'number',
        default: 10 // Default padding
    },
    margin: {
        type: 'number',
        default: 10 // Default margin
    },
    borderColor: {
        type: 'string',
        default: '#cccccc' // Default border color
    },
    borderType: {
        type: 'string',
        default: 'solid' // Default border type
    },
    borderWidth: {
        type: 'number',
        default: 1 // Default border width
    },
    borderRadius: {
        type: 'number',
        default: 5 // Default border radius
    },
    iconColor: {
        type: 'string',
        default: '#333333' // Default icon color
    },
    iconBgColor: {
        type: 'string',
        default: '#ffffff' // Default icon background color
    },
    iconHoverColor: {
        type: 'string',
        default: '#666666' // Default icon hover color
    }
}

export default attributes;
