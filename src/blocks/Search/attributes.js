import { __ } from '@wordpress/i18n';

const attributes = {
    placeholder: {
        type: 'string',
        default: __( 'Search for a top or question', 'wedocs' ),
    },
    alignment: {
        type: 'string',
        default: 'right'
    },
    bgColor: {
        type: 'string',
        default: '#ffffff' // Default background color
    },
    hoverColor: {
        type: 'string',
        default: '#ffffff' // Default background color
    },
    padding: {
        type: 'object',
        default: {
            top: 14,
            left: 22,
            right: 22,
            bottom: 14,
        }, // Default padding.
    },
    margin: {
        type: 'object',
        default: {
            top: 0,
            left: 0,
            right: 0,
            bottom: '4%',
        }, // Default padding.
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
        default: 100 // Default border radius
    },
    iconColor: {
        type: 'string',
        default: '#ffffff' // Default icon color
    },
    iconBgColor: {
        type: 'string',
        default: '#3b82f6' // Default icon background color
    },
    iconHoverColor: {
        type: 'string',
        default: '#2563eb' // Default icon hover color
    }
}

export default attributes;
