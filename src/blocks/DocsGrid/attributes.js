import { __ } from '@wordpress/i18n';

const attributes = {
    hideDocGrid: {
        type: 'boolean',
        default: false, // Default value when the block is first inserted
    },
    docStyles: {
        type: 'string',
        default: '1x1',
    },
    searchWidth: {
        type: 'number',
        default: 50, // Default width in pixels
    },
    widthUnit: {
        type: 'string',
        default: '%', // Default unit in percent
    },
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
        default: '#FFFFFF' // Default background color
    },
    hoverColor: {
        type: 'string',
        default: '#FFFFFF' // Default background color
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
            bottom: 0,
        }, // Default padding.
    },
    borderColor: {
        type: 'string',
        default: '#cccccc' // Default border color
    },
    borderWidth: {
        type: 'number',
        default: 1 // Default border width
    },
    borderRadius: {
        type: 'number',
        default: 30 // Default border radius
    },
    iconColor: {
        type: 'string',
        default: '#FFFFFF' // Default icon color
    },
    iconBgColor: {
        type: 'string',
        default: '#3b82f6' // Default icon background color
    },
    iconHoverColor: {
        type: 'string',
        default: '#2563eb' // Default icon hover color
    },
    svgHoverColor: {
        type: 'string',
        default: '#FFFFFF' // Default icon hover color
    },
    btnPadding: {
        type: 'object',
        default: {
            top: 24,
            left: 26,
            right: 26,
            bottom: 24,
        }, // Default padding.
    },
    btnPosition: {
        type: 'object',
        default: {
            top: 0,
            right: 0,
            bottom: 10,
        }, // Default padding.
    },
    btnRadius: {
        type: 'number',
        default: 30 // Default border radius
    },
}

export default attributes;
