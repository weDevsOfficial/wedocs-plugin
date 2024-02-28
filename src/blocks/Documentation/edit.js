import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
    TabPanel,
    PanelBody,
    TextControl,
    RadioControl,
    RangeControl,
    SelectControl,
    ToggleControl,
    FormTokenField,
    __experimentalBoxControl as BoxControl,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import MultiSelect from '../CustomControls/MultiSelect';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();

    const {
        order,
        orderBy,
        hideBlock,
        includeDocs,
        excludeDocs,
        docsPerPage,
        sectionPerDocs,
        articlePerDocs,
        showDocArticles,
        collapseArticles,
        showViewDetailsBtn,
        docsGridColumnStyle,
    } = attributes;

    const [ docs, setDocs ] = useState( [] );
    const [ loading, setLoading ] = useState( false );

    useEffect( () => {
        // Fetch data on component mount
        setLoading( true );
        apiFetch( { path: '/wp/v2/docs?per_page=-1' } )
            .then( response => {
                setDocs( [
                    ...response?.map( doc => {
                        return { title: doc?.title?.rendered, value: doc?.id };
                    } )
                ] );
                setLoading( false );
            } );
    }, [] ); // Empty dependency array means this effect runs once on moun

    const columnOptions = [
        { label: __( '1 Column', 'wedocs' ), value: 'col-1' },
        { label: __( '2 Column', 'wedocs' ), value: 'col-2' },
    ];

    const docOrders = [
        { label: 'weDocs Order', value: 'wedocs' },
        { label: 'Name', value: 'name' },
        { label: 'ID', value: 'id' },
        { label: 'Slug', value: 'slug' },
        { label: 'Tag', value: 'tag' },
    ];

    const docOrderTypes = [
        { label: 'Ascending', value: 'asc' },
        { label: 'Descending', value: 'desc' },
    ];

    const sectionsPerDoc = [ 'all', 1, 2, 3, 4, 5 ]?.map( option => {
        // Make first character uppercase for render label.
        return { label: ( typeof option !== 'string' || option.length === 0 ? option : ( option.charAt(0).toUpperCase() + option.slice(1) ) ), value: option };
    } );

    const articleSPerDoc = [ 'all', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]?.map( option => {
        // Make first character uppercase for render label.
        return { label: ( typeof option !== 'string' || option.length === 0 ? option : ( option.charAt(0).toUpperCase() + option.slice(1) ) ), value: option };
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody>
                    <ToggleControl
                        checked={ hideBlock }
                        className={ 'wedocs-grid-toggle' }
                        label={ __( 'Disable Block', 'wedocs' ) }
                        onChange={ ( newHideBlock ) => setAttributes( { hideBlock: newHideBlock } ) }
                    />
                </PanelBody>
                { !hideBlock && (
                    <PanelBody className={ `wedocs-grid-search-panel` }>
                        <TabPanel
                            activeClass='is-active'
                            orientation='horizontal'
                            initialTabName='general'
                            tabs={ [
                                {
                                    name      : 'general',
                                    title     : __( 'General', 'wedocs' ),
                                    className : 'general-grid-settings',
                                },
                                {
                                    name      : 'style',
                                    title     : __( 'Style', 'wedocs' ),
                                    className : 'style-grid-settings',
                                },
                            ] }>
                            {
                                ( tab ) => (
                                    <PanelBody>
                                        <p>{ tab.title }</p>
                                        { tab.name === 'general' && (
                                            <Fragment>
                                                <RadioControl
                                                    selected={ docsGridColumnStyle }
                                                    options={ [ ...columnOptions ] }
                                                    label={ __( 'Docs Grid Column Style', 'wedocs' ) }
                                                    onChange={ ( newDocsGridColumnStyle ) => setAttributes( { docsGridColumnStyle: newDocsGridColumnStyle } ) }
                                                />
                                                <NumberControl
                                                    min={ 1 }
                                                    step={ 1 }
                                                    max={ 100 }
                                                    isDragEnabled
                                                    shiftStep={ 10 }
                                                    isShiftStepEnabled
                                                    value={ docsPerPage }
                                                    label={ __( 'Docs Per Page', 'wedocs' ) }
                                                    onChange={ ( newDocsPerPage ) => setAttributes( { docsPerPage: parseInt( newDocsPerPage ) } ) }
                                                />
                                                <MultiSelect
                                                    items={ docs }
                                                    name={ `includeDocs` }
                                                    setItems={ setAttributes }
                                                    selectedItems={ includeDocs }
                                                    label={ __( 'Include Docs', 'wedocs' ) }
                                                    placeholder={ loading ? __( 'Loading...', 'wedocs' ) : __( 'Search via doc title', 'wedocs' ) }
                                                />
                                                <MultiSelect
                                                    items={ docs }
                                                    name={ `excludeDocs` }
                                                    setItems={ setAttributes }
                                                    selectedItems={ excludeDocs }
                                                    label={ __( 'Exclude Docs', 'wedocs' ) }
                                                    placeholder={ loading ? __( 'Loading...', 'wedocs' ) : __( 'Search via doc title', 'wedocs' ) }
                                                />
                                                <SelectControl
                                                    value={ orderBy }
                                                    label={ __( 'Order By', 'wedocs' ) }
                                                    options={ [ ...docOrders ] }
                                                    onChange={ ( newOrder ) => setAttributes( { orderBy: newOrder } ) }
                                                />
                                                <SelectControl
                                                    value={ order }
                                                    label={ __( 'Order Type', 'wedocs' ) }
                                                    options={ [ ...docOrderTypes ] }
                                                    onChange={ ( newOrderType ) => setAttributes( { order: newOrderType } ) }
                                                />
                                                <SelectControl
                                                    value={ sectionPerDocs }
                                                    options={ [ ...sectionsPerDoc ] }
                                                    label={ __( 'Section Per Docs', 'wedocs' ) }
                                                    onChange={ ( newSectionPerDocs ) => setAttributes( { sectionPerDocs: newSectionPerDocs } ) }
                                                />
                                                <SelectControl
                                                    value={ articlePerDocs }
                                                    options={ [ ...articleSPerDoc ] }
                                                    label={ __( 'Article Per Docs', 'wedocs' ) }
                                                    onChange={ ( newArticlePerDocs ) => setAttributes( { articlePerDocs: newArticlePerDocs } ) }
                                                />
                                                <ToggleControl
                                                    checked={ showDocArticles }
                                                    className={ 'wedocs-grid-toggle combine' }
                                                    label={ __( 'Show Doc Article', 'wedocs' ) }
                                                    onChange={ ( newShowDocArticles ) => setAttributes( { showDocArticles: newShowDocArticles } ) }
                                                />
                                                { showDocArticles &&
                                                    <ToggleControl
                                                        checked={ collapseArticles }
                                                        className={ 'wedocs-grid-toggle combine' }
                                                        label={ __( 'Keep Articles Collapsed', 'wedocs' ) }
                                                        onChange={ ( newCollapseArticles ) => setAttributes( { collapseArticles: newCollapseArticles } ) }
                                                    />
                                                }
                                                <ToggleControl
                                                    checked={ showViewDetailsBtn }
                                                    className={ 'wedocs-grid-toggle combine' }
                                                    label={ __( 'Show View Details Button', 'wedocs' ) }
                                                    onChange={ ( newShowViewDetailsBtn ) => setAttributes( { showViewDetailsBtn: newShowViewDetailsBtn } ) }
                                                />
                                            </Fragment>
                                        ) }

                                        { tab.name === 'style' && (
                                            <Fragment>
                                                <NumberControl
                                                    onChange={ e => console.log(e) }
                                                    isDragEnabled
                                                    isShiftStepEnabled
                                                    shiftStep={ 10 }
                                                    step={10}
                                                    value={ 10 }
                                                />
                                            </Fragment>
                                        ) }
                                    </PanelBody>
                                )
                            }
                        </TabPanel>
                    </PanelBody>
                ) }
                {/*<PanelBody title={ __( 'General Settings', 'wedocs' ) } initialOpen={true}>*/}
                {/*    <RadioControl*/}
                {/*        selected={ docsGridColumnStyle }*/}
                {/*        options={ [ ...columnOptions ] }*/}
                {/*        label={ __( 'Docs Grid Column Style', 'wedocs' ) }*/}
                {/*        onChange={ ( newDocsGridColumnStyle ) => setAttributes( { docsGridColumnStyle: newDocsGridColumnStyle } ) }*/}
                {/*    />*/}
                {/*    <NumberControl*/}
                {/*        min={ 1 }*/}
                {/*        step={ 1 }*/}
                {/*        max={ 100 }*/}
                {/*        isDragEnabled*/}
                {/*        shiftStep={ 10 }*/}
                {/*        isShiftStepEnabled*/}
                {/*        value={ docsPerPage }*/}
                {/*        label={ __( 'Docs Per Page', 'wedocs' ) }*/}
                {/*        onChange={ ( newDocsPerPage ) => setAttributes( { docsPerPage: parseInt( newDocsPerPage ) } ) }*/}
                {/*    />*/}
                {/*    <MultiSelect*/}
                {/*        items={ docs }*/}
                {/*        name={ `includeDocs` }*/}
                {/*        setItems={ setAttributes }*/}
                {/*        selectedItems={ includeDocs }*/}
                {/*        label={ __( 'Include Docs', 'wedocs' ) }*/}
                {/*        placeholder={ loading ? __( 'Loading...', 'wedocs' ) : __( 'Search via doc title', 'wedocs' ) }*/}
                {/*    />*/}
                {/*    <MultiSelect*/}
                {/*        items={ docs }*/}
                {/*        name={ `excludeDocs` }*/}
                {/*        setItems={ setAttributes }*/}
                {/*        selectedItems={ excludeDocs }*/}
                {/*        label={ __( 'Exclude Docs', 'wedocs' ) }*/}
                {/*        placeholder={ loading ? __( 'Loading...', 'wedocs' ) : __( 'Search via doc title', 'wedocs' ) }*/}
                {/*    />*/}
                {/*    <SelectControl*/}
                {/*        value={ orderBy }*/}
                {/*        label={ __( 'Order By', 'wedocs' ) }*/}
                {/*        options={ [ ...docOrders ] }*/}
                {/*        onChange={ ( newOrder ) => setAttributes( { orderBy: newOrder } ) }*/}
                {/*    />*/}
                {/*    <SelectControl*/}
                {/*        value={ order }*/}
                {/*        label={ __( 'Order Type', 'wedocs' ) }*/}
                {/*        options={ [ ...docOrderTypes ] }*/}
                {/*        onChange={ ( newOrderType ) => setAttributes( { order: newOrderType } ) }*/}
                {/*    />*/}
                {/*    <SelectControl*/}
                {/*        value={ sectionPerDocs }*/}
                {/*        options={ [ ...sectionsPerDoc ] }*/}
                {/*        label={ __( 'Section Per Docs', 'wedocs' ) }*/}
                {/*        onChange={ ( newSectionPerDocs ) => setAttributes( { sectionPerDocs: newSectionPerDocs } ) }*/}
                {/*    />*/}
                {/*    <SelectControl*/}
                {/*        value={ articlePerDocs }*/}
                {/*        options={ [ ...articleSPerDoc ] }*/}
                {/*        label={ __( 'Article Per Docs', 'wedocs' ) }*/}
                {/*        onChange={ ( newArticlePerDocs ) => setAttributes( { articlePerDocs: newArticlePerDocs } ) }*/}
                {/*    />*/}
                {/*    <ToggleControl*/}
                {/*        checked={ showDocArticles }*/}
                {/*        className={ 'wedocs-grid-toggle combine' }*/}
                {/*        label={ __( 'Show Doc Article', 'wedocs' ) }*/}
                {/*        onChange={ ( newShowDocArticles ) => setAttributes( { showDocArticles: newShowDocArticles } ) }*/}
                {/*    />*/}
                {/*    { showDocArticles &&*/}
                {/*        <ToggleControl*/}
                {/*            checked={ collapseArticles }*/}
                {/*            className={ 'wedocs-grid-toggle combine' }*/}
                {/*            label={ __( 'Keep Articles Collapsed', 'wedocs' ) }*/}
                {/*            onChange={ ( newCollapseArticles ) => setAttributes( { collapseArticles: newCollapseArticles } ) }*/}
                {/*        />*/}
                {/*    }*/}
                {/*    <ToggleControl*/}
                {/*        checked={ showViewDetailsBtn }*/}
                {/*        className={ 'wedocs-grid-toggle combine' }*/}
                {/*        label={ __( 'Show View Details Button', 'wedocs' ) }*/}
                {/*        onChange={ ( newShowViewDetailsBtn ) => setAttributes( { showViewDetailsBtn: newShowViewDetailsBtn } ) }*/}
                {/*    />*/}
                {/*</PanelBody>*/}

                {/* Additional PanelBody components for other attribute categories */}
            </InspectorControls>
            <div { ...blockProps } className={ `test-docs` }>
                {/*<div*/}
                {/*    className='wedocs-editor-search-input'*/}
                {/*    style={ {*/}
                {/*        width        : searchWidth + widthUnit,*/}
                {/*        marginTop    : margin?.top,*/}
                {/*        marginLeft   : margin?.left,*/}
                {/*        marginRight  : margin?.right,*/}
                {/*        marginBottom : margin?.bottom,*/}
                {/*    } }*/}
                {/*>*/}
                {/*    <input*/}
                {/*        readOnly={ true }*/}
                {/*        style={ inputStyles }*/}
                {/*        className='search-field'*/}
                {/*        placeholder={ placeholder }*/}
                {/*        onMouseEnter={ () => setHover( true ) }*/}
                {/*        onMouseLeave={ () => setHover( false ) }*/}
                {/*    />*/}
                {/*    <input type='hidden' name='post_type' value='docs' />*/}
                {/*    <button*/}
                {/*        type='submit'*/}
                {/*        style={ searchStyles }*/}
                {/*        className='search-submit'*/}
                {/*        onMouseEnter={ () => setIconHover( true ) }*/}
                {/*        onMouseLeave={ () => setIconHover( false ) }*/}
                {/*    >*/}
                {/*        <svg*/}
                {/*            width='15'*/}
                {/*            height='16'*/}
                {/*            fill='none'*/}
                {/*            onMouseEnter={ () => setSvgHover( true ) }*/}
                {/*            onMouseLeave={ () => setSvgHover( false ) }*/}
                {/*        >*/}
                {/*            <path fill={ svgHover ? svgHoverColor : iconColor } fillRule='evenodd' d='M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z' />*/}
                {/*        </svg>*/}
                {/*    </button>*/}
                {/*</div>*/}
                { hideBlock && <div className='backdrop'></div> }
            </div>
        </Fragment>
    );
}

export default Edit;
