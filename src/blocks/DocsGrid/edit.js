import { __ } from '@wordpress/i18n';
import { grid } from '@wordpress/icons';
import { Fragment, useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    PanelRow,
    FormTokenField
} from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const { useSelect } = wp.data;
    const { pages } = useSelect( ( select ) => {
        const { getEntityRecords } = select( 'core' );

        // Query args
        const query = {
            status: 'publish',
            per_page: -1,
            parent: 0,
        }

        return {
            pages: getEntityRecords( 'postType', 'docs', query ),
        }
    } )

    // populate options for <SelectControl>
    let options = [];
    if( pages ) {
        options = pages.map( page => page.title.rendered )
    }else {
        options = [ 'Loading...' ]
    }

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
        hideDocGrid,
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

    const [ hover, setHover ] = useState( false );
    const [ svgHover, setSvgHover ] = useState( false );
    const [ iconHover, setIconHover ] = useState( false );

    const containerStyles = {
        display        : 'flex',
        justifyContent : alignment,
    };

    const colors = [
        { name: 'Sweet', color: '#F43F5E' },
        { name: 'Orange', color: '#F97316' },
        { name: 'Yellow', color: '#FACC15' },
        { name: 'Purple', color: '#8B5CF6' },
        { name: 'Light Blue', color: '#3B82F6' },
        { name: 'Light Green', color: '#10B981' },
    ];

    const inputStyles = {
        border        : `${borderWidth}px ${borderType} ${borderColor}`,
        paddingTop    : padding?.top,
        background    : hover ? hoverColor : bgColor,
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
        background    : iconHover ? iconHoverColor : iconBgColor,
        paddingTop    : btnPadding?.top,
        paddingLeft   : btnPadding?.left,
        borderRadius  : btnRadius,
        paddingRight  : btnPadding?.right,
        paddingBottom : btnPadding?.bottom,
    };

    const borderOptions = [
        { label: __( 'Solid', 'wedocs' ), value: 'solid' },
        { label: __( 'Dotted', 'wedocs' ), value: 'dotted' },
        { label: __( 'Dashed', 'wedocs' ), value: 'dashed' },
        { label: __( 'Double', 'wedocs' ), value: 'double' },
        { label: __( 'Groove', 'wedocs' ), value: 'groove' },
        { label: __( 'Ridge', 'wedocs' ), value: 'ridge' },
        { label: __( 'Inset', 'wedocs' ), value: 'inset' },
        { label: __( 'Outset', 'wedocs' ), value: 'outset' },
        { label: __( 'None', 'wedocs' ), value: 'none' },
        { label: __( 'Hidden', 'wedocs' ), value: 'hidden' },
    ];

    const docStyles = [
        {label: '1x1', value: '1x1'},
        {label: '1x2', value: '1x2'},
    ]
    const docsPerPage = [
        {label: 'All', value: 'all'},
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
    ]

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody>
                    <ToggleControl
                        checked={ hideDocGrid }
                        className={ 'wedocs-search-toggle' }
                        label={ __( 'Disable Doc Grid', 'wedocs' ) }
                        onChange={ ( newHideSearch ) => setAttributes( { hideDocGrid: newHideSearch } ) }
                    />
                </PanelBody>
                { !hideDocGrid && (
                    <Fragment>
                        <PanelBody title={__('Doc list styles', 'wedocs')} icon={grid}
                            initialOpen={ false } className="" >
                            <SelectControl
                                value={ borderType }
                                options={ docStyles }
                                label={ __( 'Doc Styles', 'wedocs' ) }
                                onChange={ ( newBorderType ) => setAttributes( { borderType: newBorderType } ) }
                            />
                            <SelectControl
                                value={ borderType }
                                options={ docsPerPage }
                                label={ __( 'Docs per page', 'wedocs' ) }
                                onChange={ ( newBorderType ) => setAttributes( { borderType: newBorderType } ) }
                            />
                            <FormTokenField
                                value={ options }
                                options={ docsPerPage }
                                multiple={ true }
                                label={ __( 'Exclude Docs', 'wedocs' ) }
                                onChange={ ( newBorderType ) => setAttributes( { borderType: newBorderType } ) }
                            />
                            <SelectControl
                                value={ borderType }
                                options={ docsPerPage }
                                label={ __( 'Order by', 'wedocs' ) }
                                onChange={ ( newBorderType ) => setAttributes( { borderType: newBorderType } ) }
                            />
                            <SelectControl
                                value={ borderType }
                                options={ docsPerPage }
                                label={ __( 'Sections per doc', 'wedocs' ) }
                                onChange={ ( newBorderType ) => setAttributes( { borderType: newBorderType } ) }
                            />
                            <SelectControl
                                value={ borderType }
                                options={ docsPerPage }
                                label={ __( 'Articles per section', 'wedocs' ) }
                                onChange={ ( newBorderType ) => setAttributes( { borderType: newBorderType } ) }
                            />
                            <PanelRow>
                                <ToggleControl
                                    checked={ hideDocGrid }
                                    className={ 'wedocs-search-toggle' }
                                    label={ __( 'Enable pagination', 'wedocs' ) }
                                    onChange={ ( newHideSearch ) => setAttributes( { hideDocGrid: newHideSearch } ) }
                                />
                            </PanelRow>
                            <PanelRow>
                                <ToggleControl
                                    checked={ hideDocGrid }
                                    className={ 'wedocs-search-toggle' }
                                    label={ __( 'Show doc article count', 'wedocs' ) }
                                    onChange={ ( newHideSearch ) => setAttributes( { hideDocGrid: newHideSearch } ) }
                                />
                            </PanelRow>
                            <PanelRow>
                                <ToggleControl
                                    checked={ hideDocGrid }
                                    className={ 'wedocs-search-toggle' }
                                    label={ __( 'Keep article collapsed', 'wedocs' ) }
                                    onChange={ ( newHideSearch ) => setAttributes( { hideDocGrid: newHideSearch } ) }
                                />
                            </PanelRow>
                            <PanelRow>
                                <ToggleControl
                                    checked={ hideDocGrid }
                                    className={ 'wedocs-search-toggle' }
                                    label={ __( 'Show view details button', 'wedocs' ) }
                                    onChange={ ( newHideSearch ) => setAttributes( { hideDocGrid: newHideSearch } ) }
                                />
                            </PanelRow>
                        </PanelBody>
                    </Fragment>
                ) }
            </InspectorControls>
            <div { ...blockProps } style={ containerStyles }>
                <div
                    className='wedocs-editor-search-input'
                    style={ {
                        width        : searchWidth + widthUnit,
                        marginTop    : margin?.top,
                        marginLeft   : margin?.left,
                        marginRight  : margin?.right,
                        marginBottom : margin?.bottom,
                    } }
                >
                    <input
                        readOnly={ true }
                        style={ inputStyles }
                        className='search-field'
                        placeholder={ placeholder }
                        onMouseEnter={ () => setHover( true ) }
                        onMouseLeave={ () => setHover( false ) }
                    />
                    <input type='hidden' name='post_type' value='docs' />
                    <button
                        type='submit'
                        style={ searchStyles }
                        className='search-submit'
                        onMouseEnter={ () => setIconHover( true ) }
                        onMouseLeave={ () => setIconHover( false ) }
                    >
                        <svg
                            width='15'
                            height='16'
                            fill='none'
                            onMouseEnter={ () => setSvgHover( true ) }
                            onMouseLeave={ () => setSvgHover( false ) }
                        >
                            <path fill={ svgHover ? svgHoverColor : iconColor } fillRule='evenodd' d='M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z' />
                        </svg>
                    </button>
                </div>
                { hideDocGrid && <div className='backdrop'></div> }
            </div>
        </Fragment>
    );
}

export default Edit;
