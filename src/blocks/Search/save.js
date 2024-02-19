import { Fragment } from '@wordpress/element';

const Save = ({ attributes } ) => {
    const {
        margin,
        bgColor,
        padding,
        btnRadius,
        alignment,
        iconColor,
        widthUnit,
        hoverColor,
        borderType,
        showSearch,
        btnPadding,
        searchWidth,
        btnPosition,
        placeholder,
        borderColor,
        borderWidth,
        iconBgColor,
        borderRadius,
        svgHoverColor,
        iconHoverColor,
    } = attributes;

    if ( ! showSearch ) {
        return;
    }

    const containerStyles = {
        display        : 'flex',
        justifyContent : alignment,
    };

    const inputStyles = {
        border        : `${borderWidth}px ${borderType} ${borderColor}`,
        paddingTop    : padding?.top,
        paddingLeft   : padding?.left,
        paddingRight  : padding?.right,
        borderRadius  : `${borderRadius}px`,
        paddingBottom : padding?.bottom,
    };

    const searchStyles = {
        top           : btnPosition?.top,
        left          : btnPosition?.left,
        right         : btnPosition?.right,
        bottom        : btnPosition?.bottom,
        height        : 'auto',
        paddingTop    : btnPadding?.top,
        paddingLeft   : btnPadding?.left,
        borderRadius  : btnRadius,
        paddingRight  : btnPadding?.right,
        paddingBottom : btnPadding?.bottom,
    };

    return (
        <Fragment>
            <style>
                {`
                    .wedocs-search-input .search-field {
                        background-color: ${bgColor}; /* Default background color */
                    }
                    .wedocs-search-input .search-field:hover {
                        background-color: ${hoverColor}; /* Color changes on hover */
                    }
                    .wedocs-search-input .search-submit {
                        background-color: ${iconBgColor}; /* Default background color */
                    }
                    .wedocs-search-input .search-submit:hover {
                        background-color: ${iconHoverColor}; /* Default background color */
                    }
                    .wedocs-search-input .search-submit svg path {
                        fill: ${iconColor}; /* Default background color */
                    }
                    .wedocs-search-input .search-submit svg:hover path {
                        fill: ${svgHoverColor}; /* Default hover color */
                    }
                `}
            </style>
            <form role='search' method='get' className='search-form wedocs-search-form' action={ weDocsBlockVars?.siteUrl }>
                <div style={ containerStyles }>
                    <div
                        className='wedocs-search-input'
                        style={ {
                            width        : searchWidth + widthUnit,
                            marginTop    : margin?.top,
                            marginLeft   : margin?.left,
                            marginRight  : margin?.right,
                            marginBottom : margin?.bottom,
                        } }
                    >
                        <input
                            name='s'
                            type='search'
                            style={ inputStyles }
                            className='search-field'
                            placeholder={ placeholder }
                        />
                        <input type='hidden' name='post_type' value='docs' />
                        <button
                            type='submit'
                            style={ searchStyles }
                            className='search-submit'
                        >
                            <svg width='15' height='16' fill='none'>
                                <path fillRule='evenodd' d='M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z' />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
}

export default Save;
