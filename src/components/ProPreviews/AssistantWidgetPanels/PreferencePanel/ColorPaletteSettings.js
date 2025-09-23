import { __ } from '@wordpress/i18n';

const ColorPaletteSettings = () => {
    const paletteOptions = [
        {
            key: 'default',
            title: __( 'Default', 'wedocs' ),
            widgetColors: {
                color1: '#6366F1',
                color2: '#4338CA',
                color3: '#C7D2FE',
                color4: '#6B7280',
            },
            paletteColors: {
                widgetBg: { r: 99, g: 102, b: 241, a: 1 },
                activeTabBg: { r: 255, g: 255, b: 255, a: 1 },
                activeTabFont: { r: 55, g: 65, b: 81, a: 1 },
                inactiveTabBg: { r: 67, g: 56, b: 202, a: 1 },
                inactiveTabFont: { r: 199, g: 210, b: 254, a: 1 },
                tabTitleFont: { r: 255, g: 255, b: 255, a: 1 },
                tabDescriptionFont: { r: 199, g: 210, b: 254, a: 1 },
                breadcrumbColor: { r: 67, g: 56, b: 202, a: 1 },
                sendBtnBg: { r: 99, g: 102, b: 241, a: 1 },
                sendBtnFont: { r: 255, g: 255, b: 255, a: 1 },
                bubbleBg: { r: 87, g: 116, b: 241, a: 1 },
                bubbleIcon: { r: 255, g: 255, b: 255, a: 1 },
            },
        },
        {
            key: 'watermelon',
            title: __( 'Watermelon', 'wedocs' ),
            widgetColors: {
                color1: '#FB4570',
                color2: '#932841',
                color3: '#FFFFFF',
                color4: '#FB4570',
            },
            paletteColors: {
                widgetBg: { r: 251, g: 69, b: 112, a: 1 },
                activeTabBg: { r: 255, g: 255, b: 255, a: 1 },
                activeTabFont: { r: 251, g: 69, b: 112, a: 1 },
                inactiveTabBg: { r: 147, g: 40, b: 65, a: 1 },
                inactiveTabFont: { r: 251, g: 69, b: 112, a: 1 },
                tabTitleFont: { r: 255, g: 255, b: 255, a: 1 },
                tabDescriptionFont: { r: 147, g: 40, b: 65, a: 1 },
                breadcrumbColor: { r: 251, g: 69, b: 112, a: 1 },
                sendBtnBg: { r: 251, g: 69, b: 112, a: 1 },
                sendBtnFont: { r: 255, g: 255, b: 255, a: 1 },
                bubbleBg: { r: 251, g: 69, b: 112, a: 1 },
                bubbleIcon: { r: 255, g: 255, b: 255, a: 1 },
            },
        },
        {
            key: 'dark-slate-blue',
            title: __( 'Dark Slate Blue', 'wedocs' ),
            widgetColors: {
                color1: '#4C4486',
                color2: '#362F63',
                color3: '#FF9494',
                color4: '#4E52F3',
            },
            paletteColors: {
                widgetBg: { r: 76, g: 68, b: 134, a: 1 },
                activeTabBg: { r: 255, g: 255, b: 255, a: 1 },
                activeTabFont: { r: 76, g: 68, b: 134, a: 1 },
                inactiveTabBg: { r: 54, g: 47, b: 99, a: 1 },
                inactiveTabFont: { r: 255, g: 148, b: 148, a: 1 },
                tabTitleFont: { r: 255, g: 255, b: 255, a: 1 },
                tabDescriptionFont: { r: 160, g: 150, b: 224, a: 1 },
                breadcrumbColor: { r: 78, g: 82, b: 243, a: 1 },
                sendBtnBg: { r: 76, g: 68, b: 134, a: 1 },
                sendBtnFont: { r: 255, g: 255, b: 255, a: 1 },
                bubbleBg: { r: 255, g: 148, b: 148, a: 1 },
                bubbleIcon: { r: 255, g: 255, b: 255, a: 1 },
            },
        },
        {
            key: 'azure',
            title: __( 'Azure', 'wedocs' ),
            widgetColors: {
                color1: '#0094FF',
                color2: '#0079D1',
                color3: '#00FFF0',
                color4: '#DBDBDB',
            },
            paletteColors: {
                widgetBg: { r: 0, g: 148, b: 255, a: 1 },
                activeTabBg: { r: 255, g: 255, b: 255, a: 1 },
                activeTabFont: { r: 0, g: 148, b: 255, a: 1 },
                inactiveTabBg: { r: 0, g: 121, b: 209, a: 1 },
                inactiveTabFont: { r: 255, g: 255, b: 255, a: 1 },
                tabTitleFont: { r: 255, g: 255, b: 255, a: 1 },
                tabDescriptionFont: { r: 0, g: 255, b: 240, a: 1 },
                breadcrumbColor: { r: 0, g: 148, b: 255, a: 1 },
                sendBtnBg: { r: 0, g: 148, b: 255, a: 1 },
                sendBtnFont: { r: 255, g: 255, b: 255, a: 1 },
                bubbleBg: { r: 0, g: 148, b: 255, a: 1 },
                bubbleIcon: { r: 255, g: 255, b: 255, a: 1 },
            },
        },
        {
            key: 'elephant',
            title: __( 'Elephant', 'wedocs' ),
            widgetColors: {
                color1: '#073B4C',
                color2: '#06D6A0',
                color3: '#9BA8AC',
                color4: '#00212C',
            },
            paletteColors: {
                widgetBg: { r: 7, g: 59, b: 76, a: 1 },
                activeTabBg: { r: 255, g: 255, b: 255, a: 1 },
                activeTabFont: { r: 43, g: 58, b: 85, a: 1 },
                inactiveTabBg: { r: 0, g: 33, b: 44, a: 1 },
                inactiveTabFont: { r: 155, g: 168, b: 172, a: 1 },
                tabTitleFont: { r: 255, g: 255, b: 255, a: 1 },
                tabDescriptionFont: { r: 6, g: 214, b: 160, a: 1 },
                breadcrumbColor: { r: 6, g: 214, b: 160, a: 1 },
                sendBtnBg: { r: 7, g: 59, b: 76, a: 1 },
                sendBtnFont: { r: 255, g: 255, b: 255, a: 1 },
                bubbleBg: { r: 6, g: 214, b: 160, a: 1 },
                bubbleIcon: { r: 255, g: 255, b: 255, a: 1 },
            },
        },
        {
            key: 'atomic-tangerine',
            title: __( 'Atomic Tangerine', 'wedocs' ),
            widgetColors: {
                color1: '#F6A771',
                color2: '#77533A',
                color3: '#FFF2CC',
                color4: '#5C4500',
            },
            paletteColors: {
                widgetBg: { r: 246, g: 167, b: 113, a: 1 },
                activeTabBg: { r: 255, g: 255, b: 255, a: 1 },
                activeTabFont: { r: 92, g: 69, b: 0, a: 1 },
                inactiveTabBg: { r: 224, g: 144, b: 89, a: 1 },
                inactiveTabFont: { r: 255, g: 198, b: 159, a: 1 },
                tabTitleFont: { r: 255, g: 255, b: 255, a: 1 },
                tabDescriptionFont: { r: 101, g: 69, b: 47, a: 1 },
                breadcrumbColor: { r: 99, g: 102, b: 241, a: 1 },
                sendBtnBg: { r: 246, g: 167, b: 113, a: 1 },
                sendBtnFont: { r: 255, g: 255, b: 255, a: 1 },
                bubbleBg: { r: 246, g: 167, b: 113, a: 1 },
                bubbleIcon: { r: 255, g: 255, b: 255, a: 1 },
            },
        },
        {
            key: 'meteorite',
            title: __( 'Meteorite', 'wedocs' ),
            widgetColors: {
                color1: '#3C2474',
                color2: '#FFC329',
                color3: '#CDBCFF',
                color4: '#18083C',
            },
            paletteColors: {
                widgetBg: { r: 60, g: 36, b: 116, a: 1 },
                activeTabBg: { r: 255, g: 195, b: 41, a: 1 },
                activeTabFont: { r: 0, g: 0, b: 0, a: 1 },
                inactiveTabBg: { r: 24, g: 8, b: 60, a: 1 },
                inactiveTabFont: { r: 255, g: 255, b: 255, a: 1 },
                tabTitleFont: { r: 255, g: 255, b: 255, a: 1 },
                tabDescriptionFont: { r: 205, g: 188, b: 255, a: 1 },
                breadcrumbColor: { r: 255, g: 153, b: 0, a: 1 },
                sendBtnBg: { r: 60, g: 36, b: 116, a: 1 },
                sendBtnFont: { r: 255, g: 255, b: 255, a: 1 },
                bubbleBg: { r: 246, g: 195, b: 41, a: 1 },
                bubbleIcon: { r: 0, g: 0, b: 0, a: 1 },
            },
        },
    ];

    return (
        <div className="wedocs-w-80 settings-palette-options">
            <div className="palette-options">
                { paletteOptions?.map( ( palette ) => (
                    <div
                        key={ palette.key }
                        className="palette-option wedocs-flex wedocs-items-center wedocs-justify-between wedocs-mb-4 last:wedocs-mb-0 wedocs-border wedocs-border-[#E2E2E2] wedocs-px-5 wedocs-py-6 wedocs-rounded-lg hover:wedocs-cursor-pointer"
                    >
                        <h4 className="wedocs-flex wedocs-items-center wedocs-font-medium wedocs-text-gray-600 wedocs-text-sm">
                            <input
                                type="radio"
                                id={ palette.key }
                                name="palette-option"
                                defaultChecked={
                                    palette.key === 'default'
                                }
                                className={ `${
                                    palette.key === 'default'
                                        ? 'checked:!wedocs-border-transparent checked:!wedocs-bg-indigo-600 before:!wedocs-hidden'
                                        : '!wedocs-bg-transparent !wedocs-border-[#8c8f94] before:!wedocs-bg-transparent'
                                } wedocs-h-4 wedocs-w-4 wedocs-border-gray-300 wedocs-text-indigo-600 focus:wedocs-ring-indigo-600 !wedocs-mr-2 !wedocs--mt-[0.5px]` }
                            />
                            { palette.title }
                        </h4>
                        <div className="colors wedocs-flex wedocs-items-center wedocs-gap-2">
                            <div
                                className="tooltip wedocs-flex wedocs-cursor-pointer wedocs-ml-2"
                                data-tip={ __(
                                    'Widget Background',
                                    'wedocs'
                                ) }
                            >
                                <span
                                    className={ `palette-first-color wedocs-w-10 wedocs-h-4 wedocs-rounded-[55px] ${
                                        palette.widgetColors.color1 ===
                                        '#FFFFFF'
                                            ? 'wedocs-border wedocs-border-[#DBDBDB]'
                                            : ''
                                    }` }
                                    style={ {
                                        background: palette.widgetColors.color1,
                                    } }
                                ></span>
                            </div>
                            <span
                                className={ `wedocs-w-4 wedocs-h-4 wedocs-rounded-full ${
                                    palette.widgetColors.color2 === '#FFFFFF'
                                        ? 'wedocs-border wedocs-border-[#DBDBDB]'
                                        : ''
                                }` }
                                style={ {
                                    background: palette.widgetColors.color2,
                                } }
                            ></span>
                            <span
                                className={ `wedocs-w-4 wedocs-h-4 wedocs-rounded-full ${
                                    palette.widgetColors.color3 === '#FFFFFF'
                                        ? 'wedocs-border wedocs-border-[#DBDBDB]'
                                        : ''
                                }` }
                                style={ {
                                    background: palette.widgetColors.color3,
                                } }
                            ></span>
                            <span
                                className={ `wedocs-w-4 wedocs-h-4 wedocs-rounded-full ${
                                    palette.widgetColors.color4 === '#FFFFFF'
                                        ? 'wedocs-border wedocs-border-[#DBDBDB]'
                                        : ''
                                }` }
                                style={ {
                                    background: palette.widgetColors.color4,
                                } }
                            ></span>
                        </div>
                    </div>
                ) ) }
            </div>
        </div>
    );
};

export default ColorPaletteSettings;
