import { __ } from '@wordpress/i18n';
import { useRef, useState } from '@wordpress/element';
import extractedTitle from '../../../../utils/extractedTitle';

const MessagePreview = ( { settings, previewColors } ) => {
    const dummyDocs = [
        __( 'How to Install', 'wedocs' ),
        __( 'Activating & Deactivating WPUF Modules', 'wedocs' ),
    ];

    const {
        widgetBg,
        activeTabBg,
        activeTabFont,
        inactiveTabBg,
        inactiveTabFont,
        tabTitleFont,
        tabDescriptionFont,
        breadcrumbColor,
        bubbleIcon,
        bubbleBg,
    } = previewColors;

    const tabStyleRef = useRef( {
            color: `rgba(${ inactiveTabFont?.r }, ${ inactiveTabFont?.g }, ${ inactiveTabFont?.b }, ${ inactiveTabFont?.a })`,
        } ),
        activeTabStyleRef = useRef( {
            color: `rgba(${ activeTabFont?.r }, ${ activeTabFont?.g }, ${ activeTabFont?.b }, ${ activeTabFont?.a })`,
            background: `rgba(${ activeTabBg?.r }, ${ activeTabBg?.g }, ${ activeTabBg?.b }, ${ activeTabBg?.a })`,
        } );

    const tabSvgStyleRef = useRef( {
            fill: `rgba(${ inactiveTabFont?.r }, ${ inactiveTabFont?.g }, ${ inactiveTabFont?.b }, ${ inactiveTabFont?.a })`,
        } ),
        activeTabSvgStyleRef = useRef( {
            fill: `rgba(${ activeTabFont?.r }, ${ activeTabFont?.g }, ${ activeTabFont?.b }, ${ activeTabFont?.a })`,
        } );

    const [ selectedTab, setSelectedTab ] = useState( 'explore' );

    const tabs = [
        {
            key: 'integrate_ai',
            name: __( 'Ai Chatbot', 'wedocs' ),
            enable: settings?.integrate_ai?.ai_enabled !== 'off',
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="18"
                style={
                    selectedTab === 'integrate_ai'
                      ? activeTabSvgStyleRef.current
                      : tabSvgStyleRef.current
                }
              >
                  <path d="M1.161 2.514a2 2 0 0 1 2-2h4.586a2 2 0 0 1 1.414.586l3.414 3.414a2 2 0 0 1 .586 1.414v8.586a2 2 0 0 1-2 2H9.633c.95-1.062 1.528-2.463 1.528-4a6 6 0 0 0-6-6c-1.537 0-2.938.578-4 1.528V2.514z" />
                  <path
                    fillRule="evenodd"
                    d="M5.161 8.514a4 4 0 0 0-4 4c0 .741.202 1.436.554 2.032L.454 15.807a1 1 0 0 0 0 1.414 1 1 0 0 0 1.414 0l1.261-1.261c.595.352 1.29.554 2.032.554a4 4 0 1 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-2 2 1.99 1.99 0 0 1-1.414-.586 1.99 1.99 0 0 1-.586-1.414z"
                  />
              </svg>
            ),
        },
        {
            key: 'explore',
            name: __( 'Explore', 'wedocs' ),
            enable: settings?.explore?.explore_enable !== 'off',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="18"
                    style={
                        selectedTab === 'explore'
                            ? activeTabSvgStyleRef.current
                            : tabSvgStyleRef.current
                    }
                >
                    <path d="M1.161 2.514a2 2 0 0 1 2-2h4.586a2 2 0 0 1 1.414.586l3.414 3.414a2 2 0 0 1 .586 1.414v8.586a2 2 0 0 1-2 2H9.633c.95-1.062 1.528-2.463 1.528-4a6 6 0 0 0-6-6c-1.537 0-2.938.578-4 1.528V2.514z" />
                    <path
                        fillRule="evenodd"
                        d="M5.161 8.514a4 4 0 0 0-4 4c0 .741.202 1.436.554 2.032L.454 15.807a1 1 0 0 0 0 1.414 1 1 0 0 0 1.414 0l1.261-1.261c.595.352 1.29.554 2.032.554a4 4 0 1 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-2 2 1.99 1.99 0 0 1-1.414-.586 1.99 1.99 0 0 1-.586-1.414z"
                    />
                </svg>
            ),
        },
        {
            key: 'messaging',
            name: __( 'Messaging', 'wedocs' ),
            enable: settings?.message?.messaging_enable !== 'off',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="15"
                    style={
                        selectedTab === 'message'
                            ? activeTabSvgStyleRef.current
                            : tabSvgStyleRef.current
                    }
                >
                    <path
                        fillRule="evenodd"
                        d="M16.161 7.514c0 3.866-3.582 7-8 7-1.492 0-2.888-.357-4.083-.979l-3.917.979 1.338-3.123C.654 10.281.161 8.948.161 7.514c0-3.866 3.582-7 8-7s8 3.134 8 7zm-11-1h-2v2h2v-2zm8 0h-2v2h2v-2zm-6 0h2v2h-2v-2z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <div className={ `w-[26rem] relative` }>
            <div className={ `palette-preview-content transition-all` }>
                <div className={ `pb-6 palette-preview bg-white rounded-[10px] shadow-xl mb-5 overflow-hidden` }>
                    <div
                        className="preview-header flex items-center justify-center h-48"
                        style={ {
                            background: `rgba(${ widgetBg?.r }, ${ widgetBg?.g }, ${ widgetBg?.b }, ${ widgetBg?.a })`,
                        } }
                    >
                        <div className="text-center">
                            <div
                                className="tabs flex items-center font-medium text-sm leading-5 w-fit h-10 shadow-sm rounded-[10px] mb-5 mx-auto"
                                style={ {
                                    color: `rgba(${ inactiveTabFont?.r }, ${ inactiveTabFont?.g }, ${ inactiveTabFont?.b }, ${ inactiveTabFont?.a })`,
                                    background: `rgba(${ inactiveTabBg?.r }, ${ inactiveTabBg?.g }, ${ inactiveTabBg?.b }, ${ inactiveTabBg?.a })`,
                                } }
                            >
                                { tabs?.map( ( tab ) => (
                                    <div
                                        key={ tab?.key }
                                        className={ `tab flex items-center justify-center mx-auto gap-2 py-2.5 px-5 rounded-[10px] cursor-pointer outline-none h-[100%] leading-4` }
                                        style={
                                            selectedTab === tab?.key
                                                ? activeTabStyleRef.current
                                                : tabStyleRef.current
                                        }
                                    >
                                        { settings?.[ tab?.key ]?.[ `${ tab.key }_tab_icon` ]
                                            ?.src ? (
                                            <img
                                                src={
                                                    settings?.[ tab?.key ]?.[
                                                        `${ tab.key }_tab_icon`
                                                    ]?.src
                                                }
                                                alt={
                                                    settings?.[ tab?.key ]?.[
                                                        `${ tab.key }_tab_icon`
                                                    ]?.name
                                                }
                                                className="max-h-5 max-w-5"
                                            />
                                        ) : (
                                            tab?.icon
                                        ) }
                                        { settings?.[ tab?.key ]?.[ `${ tab?.key }_title` ]
                                            ? extractedTitle(
                                                settings?.[
                                                    `${ tab?.key }_title`
                                                ],
                                                10
                                            )
                                            : __( tab?.name, 'wedocs' ) }
                                    </div>
                                ) ) }
                            </div>
                            <div
                                className={ `preview-heading mb-1.5 ${
                                    settings?.preference?.widget_title_font?.size
                                        ? `text-${ settings?.preference?.widget_title_font?.size }`
                                        : 'text-lg'
                                } ${
                                    settings?.preference?.widget_title_font?.weight
                                        ? `font-${ settings?.preference?.widget_title_font?.weight }`
                                        : 'font-medium'
                                }` }
                                style={ {
                                    color: `rgba(${ tabTitleFont?.r }, ${ tabTitleFont?.g }, ${ tabTitleFont?.b }, ${ tabTitleFont?.a })`,
                                } }
                            >
                                { settings?.explore?.[ `${ selectedTab }_subtitle_one` ]
                                    ? extractedTitle(
                                        settings?.explore?.[
                                            `${ selectedTab }_subtitle_one`
                                            ],
                                        20
                                    )
                                    : __( 'Explore Feature', 'wedocs' ) }
                            </div>
                            <div
                                className={ `preview-description w-80 ${
                                    settings?.preference?.widget_description_font?.size
                                        ? `text-${ settings?.preference?.widget_description_font?.size }`
                                        : 'text-sm'
                                } ${
                                    settings?.preference?.widget_description_font?.weight
                                        ? `font-${ settings?.preference?.widget_description_font?.weight }`
                                        : 'font-normal'
                                }` }
                                style={ {
                                    color: `rgba(${ tabDescriptionFont?.r }, ${ tabDescriptionFont?.g }, ${ tabDescriptionFont?.b }, ${ tabDescriptionFont?.a })`,
                                } }
                            >
                                { settings?.explore?.[ `${ selectedTab }_subtitle_two` ]
                                    ? extractedTitle(
                                        settings?.explore?.[
                                            `${ selectedTab }_subtitle_two`
                                            ],
                                        80
                                    )
                                    : __(
                                        'Search with keywords for quick answers',
                                        'wedocs'
                                    ) }
                            </div>
                        </div>
                    </div>

                    <div
                        className={ `${
                            selectedTab !== 'explore' && 'hidden'
                        } explore-tab -mt-5` }
                    >
                        <div className={ `listing-docs` }>
                            <div className={ `px-3 py-1 doc-search-panel relative flex items-center justify-center border border-[#D1D5DB] bg-white rounded-md w-80 mx-auto shadow-sm mb-8` }>
                                <input
                                    id="doc-search"
                                    type="text"
                                    className="!border-0 !border-transparent !bg-white text-sm text-gray-900 placeholder-gray-400 w-full focus:!shadow-transparent !px-0 !py-0 disabled:shadow-none"
                                    placeholder={ __( 'Search', 'wedocs' ) }
                                    readOnly={ true }
                                    value=''
                                />
                                <label htmlFor="doc-search">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        fill="none"
                                        className="cursor-pointer"
                                    >
                                        <path
                                            d="M16.661 16.094l-5-5m1.667-4.167c0 3.222-2.612 5.833-5.833 5.833s-5.833-2.612-5.833-5.833 2.612-5.833 5.833-5.833 5.833 2.612 5.833 5.833z"
                                            stroke="#6b7280"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </label>
                            </div>

                            <div
                                className={ `h-80 explore-docs` }
                            >
                                { dummyDocs?.map( ( docTitle, index ) => (
                                    <div
                                        key={ index }
                                        className={ `${
                                            selectedTab !== 'explore' &&
                                            'hidden'
                                        } doc-section border border-[#D1D5DB] box-border p-4 mb-2.5 last:mb-0 rounded-md w-[340px] mx-auto` }
                                    >
                                        <div
                                            className="breadcrumbs text-sm mb-2 p-0"
                                            style={ {
                                                color: `rgba(${ breadcrumbColor?.r }, ${ breadcrumbColor?.g }, ${ breadcrumbColor?.b }, ${ breadcrumbColor?.a })`,
                                            } }
                                        >
                                            { __(
                                                'WP User Frontend… > Getting Started',
                                                'wedocs'
                                            ) }
                                        </div>
                                        <div className="doc-heading text-lg text-gray-900 mb-1.5">
                                            { docTitle }
                                        </div>
                                        <div className="doc-description text-sm font-normal text-gray-500 leading-5">
                                            { __(
                                                'Here you will find everything about WP User Frontend, what it offers and its',
                                                'wedocs'
                                            ) }
                                        </div>
                                    </div>
                                ) ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={ `msg-icon w-16 h-16 rounded-full ml-auto flex items-center justify-center` }
                style={ {
                    background: `rgba(${ bubbleBg?.r }, ${ bubbleBg?.g }, ${ bubbleBg?.b }, ${ bubbleBg?.a })`,
                } }
            >
                <svg
                    width="25"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="rotate-360 transition-all"
                    style={ {
                        fill: `rgba(${ bubbleIcon?.r }, ${ bubbleIcon?.g }, ${ bubbleIcon?.b }, ${ bubbleIcon?.a })`,
                    } }
                >
                    <path d="M2.157 23.042a1.2 1.2 0 0 1-1.198-1.187V6.481A5.91 5.91 0 0 1 6.871.569h11.835a5.91 5.91 0 0 1 5.912 5.912v7.099a5.91 5.91 0 0 1-5.912 5.912H7.27L2.833 22.82c-.198.141-.434.219-.677.222zM6.882 2.943a3.55 3.55 0 0 0-3.549 3.549v13l2.84-2.13c.205-.152.454-.234.71-.233h11.824a3.55 3.55 0 0 0 3.55-3.549V6.481a3.55 3.55 0 0 0-3.55-3.549l-11.824.011zm8.264 5.934H8.058c-.165.016-.331-.003-.488-.055s-.302-.136-.424-.248-.221-.247-.288-.398-.102-.315-.102-.481.035-.329.102-.481.165-.287.288-.398.267-.196.424-.248.323-.071.488-.055h7.088c.165-.016.331.003.488.055s.302.136.424.248.221.247.288.398.102.315.102.481-.035.329-.102.481-.165.287-.288.398a1.19 1.19 0 0 1-.424.248c-.157.052-.323.071-.488.055zm-7.088 4.725h3.549c.165.016.331-.003.488-.055s.302-.136.424-.248.22-.247.287-.398a1.19 1.19 0 0 0 0-.961c-.067-.151-.165-.287-.287-.398s-.267-.196-.424-.248-.323-.071-.488-.055H8.058c-.165-.016-.331.003-.488.055s-.302.136-.424.248-.221.247-.288.398-.102.315-.102.481.035.329.102.481.165.287.288.398.267.196.424.248.323.071.488.055z" />
                </svg>
            </div>
        </div>
    );
};

export default MessagePreview;
