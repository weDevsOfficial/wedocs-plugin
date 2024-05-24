import { __ } from '@wordpress/i18n';
import { cog, shadow } from '@wordpress/icons';
import { Fragment, useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

import UnitControl from '../CustomControls/UnitControl';
import RadioImageControl from '../CustomControls/RadioImageControl';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    RangeControl,
    SelectControl,
    ToggleControl,
    __experimentalBoxControl as BoxControl
} from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();

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
        hideSearch,
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

    console.log( 'editor panel:', bgColor );

    const alignmentOptions = [
        {
            value : 'left',
            label : __( 'Align left', 'wedocs' ),
            svg   : <svg width='24' height='25' fill='none' strokeWidth='2' strokeLinecap='round'
                stroke={ alignment === 'left' ? '#007cba' : '#939494' } strokeLinejoin='round'>
                <path d='M8 9.462h12m-12 6h6m-10-9v12' />
            </svg>
        },
        {
            value : 'center',
            label : __( 'Align center', 'wedocs' ),
            svg   : <svg width='24' height='25' fill='none' strokeWidth='2' strokeLinecap='round'
                stroke={ alignment === 'center' ? '#007cba' : '#939494' } strokeLinejoin='round'>
                <path d='M18 9.462H6m8.99 6h-6' />
                <path d='M12 6.462v12' />
            </svg>
        },
        {
            value : 'right',
            label : __( 'Align right', 'wedocs' ),
            svg   : <svg width='24' height='25' fill='none' strokeWidth='2' strokeLinecap='round'
                stroke={ alignment === 'right' ? '#007cba' : '#939494' } strokeLinejoin='round'>
                <path d='M16 9.462H4m12 6h-6m10-9v12' />
            </svg>
        },
    ];

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

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody>
                    <ToggleControl
                        checked={ hideSearch }
                        className={ 'wedocs-search-toggle' }
                        label={ __( 'Disable Block', 'wedocs' ) }
                        onChange={ ( newHideSearch ) => setAttributes( { hideSearch: newHideSearch } ) }
                    />
                </PanelBody>
                { !hideSearch && (
                    <Fragment>
                        <PanelBody title={__('Color Settings', 'wedocs')} icon={ shadow }
                            initialOpen={ false } className={ `wedocs-search-color-settings` } >
                            <PanelColorSettings
                                colors={ colors }
                                colorSettings={ [
                                    {
                                        value    : bgColor,
                                        label    : __( 'Field Background Color', 'wedocs' ),
                                        onChange : ( newBgColor ) => setAttributes( { bgColor: newBgColor } ),
                                    },
                                    {
                                        value    : hoverColor,
                                        label    : __( 'Field Hover Color', 'wedocs' ),
                                        onChange : ( newHoverColor ) => setAttributes( { hoverColor: newHoverColor } ),
                                    },
                                    {
                                        value    : borderColor,
                                        label    : __('Border Color', 'wedocs'),
                                        onChange : ( newBorderColor ) => setAttributes( { borderColor: newBorderColor } ),
                                    },
                                    {
                                        value    : iconColor,
                                        label    : __( 'Icon Color', 'wedocs' ),
                                        onChange : ( newIconColor ) => setAttributes( { iconColor: newIconColor } ),
                                    },
                                    {
                                        value    : iconBgColor,
                                        label    : __( 'Button Color', 'wedocs' ),
                                        onChange : ( newIconBgColor ) => setAttributes( { iconBgColor: newIconBgColor } ),
                                    },
                                    {
                                        value    : iconHoverColor,
                                        label    : __( 'Button Hover Color', 'wedocs' ),
                                        onChange : ( newIconHoverColor ) => setAttributes( { iconHoverColor: newIconHoverColor } ),
                                    },
                                    {
                                        value    : svgHoverColor,
                                        label    : __( 'Icon Hover Color', 'wedocs' ),
                                        onChange : ( newSvgHoverColor ) => setAttributes( { svgHoverColor: newSvgHoverColor } ),
                                    },
                                ] }
                            />
                        </PanelBody>
                        <PanelBody title={ __('Search Bar Settings', 'wedocs' ) } icon={ cog }>
                            <UnitControl
                                unit={ widthUnit }
                                value={ searchWidth }
                                label={ __( 'Field Width', 'wedocs' ) }
                                onUnitChange={ ( newWidthUnit ) => setAttributes( { widthUnit: newWidthUnit } ) }
                                onValueChange={ ( newSearchWidth ) => setAttributes( { searchWidth: newSearchWidth ? parseInt( newSearchWidth ) : 0 } ) }
                            />
                            <TextControl
                                value={ placeholder }
                                label={ __( 'Placeholder', 'wedocs' ) }
                                placeholder={ __(  'Search bar placeholder', 'wedocs' ) }
                                onChange={ ( newPlaceholder ) => setAttributes( { placeholder: newPlaceholder } ) }
                            />
                            <p style={ { fontSize: 11 } }>{ __( 'POSITION', 'wedocs' ) }</p>
                            <RadioImageControl
                                selected={ alignment }
                                options={ alignmentOptions }
                                onChange={ ( newAlignment ) => setAttributes( { alignment: newAlignment } ) }
                            />
                            <BoxControl
                                resetValues={ {
                                    top: '14px',
                                    left: '22px',
                                    right: '22px',
                                    bottom: '14px',
                                } }
                                values={ padding }
                                label={ __( 'Field Padding', 'wedocs' ) }
                                onChange={ ( newPadding ) => setAttributes( { padding: newPadding } ) }
                            />
                            <BoxControl
                                resetValues={ {
                                    top: '0px',
                                    left: '0px',
                                    right: '0px',
                                    bottom: '0px',
                                } }
                                values={ margin }
                                label={ __( 'Field Margin', 'wedocs' ) }
                                onChange={ ( newMargin ) => setAttributes( { margin: newMargin } ) }
                            />
                            <RangeControl
                                min={ 0 }
                                max={ 10 }
                                value={ borderWidth }
                                label={ __( 'Border Width', 'wedocs' ) }
                                onChange={ ( newBorderWidth ) => setAttributes( { borderWidth: newBorderWidth } ) }
                            />
                            <RangeControl
                                min={ 0 }
                                max={ 100 }
                                value={ borderRadius }
                                label={ __( 'Border Radius', 'wedocs' ) }
                                onChange={ ( newBorderRadius ) => setAttributes( { borderRadius: newBorderRadius } ) }
                            />
                            <SelectControl
                                value={ borderType }
                                options={ borderOptions }
                                label={ __( 'Border Type', 'wedocs' ) }
                                onChange={ ( newBorderType ) => setAttributes( { borderType: newBorderType } ) }
                            />
                            <BoxControl
                                resetValues={ {
                                    top: '24px',
                                    left: '26px',
                                    right: '26px',
                                    bottom: '24px',
                                } }
                                values={ btnPadding }
                                label={ __( 'Button Padding', 'wedocs' ) }
                                onChange={ ( newBtnPadding ) => setAttributes( { btnPadding: newBtnPadding } ) }
                            />
                            <BoxControl
                                resetValues={ {
                                    top: '0px',
                                    right: '0px',
                                    bottom: '10px',
                                } }
                                values={ btnPosition }
                                label={ __( 'Button Margin', 'wedocs' ) }
                                onChange={ ( newBtnPosition ) => setAttributes( { btnPosition: newBtnPosition } ) }
                            />
                            <RangeControl
                                min={ 0 }
                                max={ 100 }
                                value={ btnRadius }
                                label={ __( 'Button Radius', 'wedocs' ) }
                                onChange={ ( newBtnRadius ) => setAttributes( { btnRadius: newBtnRadius } ) }
                            />
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
                { hideSearch && <div className='backdrop'></div> }
            </div>
        </Fragment>
    );
}

export default Edit;
