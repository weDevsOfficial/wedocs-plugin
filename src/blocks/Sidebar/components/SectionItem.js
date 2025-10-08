import { useState } from '@wordpress/element';
import ArticleItem from './ArticleItem';
import CountBadge from './CountBadge';

const SectionItem = ({ section, attributes, level = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    
    const {
        sectionTitleTag,
        sectionStyles,
        titleStyles,
        treeStyles
    } = attributes;

    // Helper function to get color value or fallback
    const getColorValue = (colorValue, fallback = '') => {
        return colorValue && colorValue.trim() !== '' ? colorValue : fallback;
    };

    // Tree-specific styles
    const indentation = level * parseInt(treeStyles?.indentation?.replace('px', '') || 20);
    
    const sectionStyle = {
        marginLeft: level > 0 ? `${indentation}px` : '0',
        marginBottom: treeStyles?.itemSpacing || '4px',
        position: 'relative',
        // Apply section box styling
        backgroundColor: getColorValue(sectionStyles.backgroundColor),
        padding: sectionStyles.padding || '',
        margin: sectionStyles.margin || '',
        borderRadius: sectionStyles.borderRadius || ''
    };

    const headerStyle = {
        backgroundColor: level === 0 ? getColorValue(treeStyles?.headerBackgroundColor) : 'transparent',
        color: level === 0 ? getColorValue(treeStyles?.headerTextColor) : 'inherit',
        padding: level === 0 ? (treeStyles?.headerPadding || '') : '',
        borderRadius: level === 0 ? (treeStyles?.headerBorderRadius || '') : '',
        border: level > 0 && treeStyles?.connectorColor ? `1px solid ${treeStyles.connectorColor}` : 'none',
        borderLeft: level > 0 && treeStyles?.connectorColor ? `2px solid ${treeStyles.connectorColor}` : 'none'
    };

    const titleStyle = {
        color: level === 0 ? getColorValue(titleStyles?.color) : getColorValue(titleStyles?.color),
        backgroundColor: level === 0 ? getColorValue(titleStyles?.backgroundColor) : 'transparent',
        padding: level === 0 ? (titleStyles?.padding || '0') : '0',
        margin: '0'
    };


    const iconStyle = {
        color: level === 0 ? getColorValue(titleStyles?.color, '#6c757d') : getColorValue(titleStyles?.color, '#6c757d'),
        fontSize: '16px',
        marginRight: '8px'
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const TitleTag = sectionTitleTag || 'h3';
    const children = section.children || [];
    const childrenCount = children.length;

    return (
        <div 
            className="wedocs-section transition-colors duration-200"
            style={sectionStyle}
            onMouseEnter={(e) => {
                const hoverBg = getColorValue(sectionStyles.backgroundColorHover);
                if (hoverBg) {
                    e.currentTarget.style.backgroundColor = hoverBg;
                }
            }}
            onMouseLeave={(e) => {
                const normalBg = getColorValue(sectionStyles.backgroundColor);
                e.currentTarget.style.backgroundColor = normalBg || '';
            }}
        >
            {/* Visual connector line for nested items */}
            {level > 0 && (
                <div 
                    className="wedocs-connector-line"
                    style={{
                        position: 'absolute',
                        left: `-${parseInt(treeStyles?.indentation?.replace('px', '') || 20) / 2}px`,
                        top: '0',
                        bottom: '0',
                        width: treeStyles?.connectorWidth || '1px',
                        backgroundColor: getColorValue(treeStyles?.connectorColor, '#e5e7eb')
                    }}
                />
            )}
            
            <div 
                className="wedocs-section-header flex items-center justify-between cursor-pointer transition-colors"
                style={headerStyle}
                onClick={toggleExpanded}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleExpanded();
                    }
                }}
                onMouseEnter={(e) => {
                    if (level === 0) {
                        // For top-level sections, apply Section Title Styling hover
                        const titleElement = e.currentTarget.querySelector('.wedocs-section-title');
                        const hoverBg = getColorValue(titleStyles?.backgroundColorHover);
                        if (titleElement && hoverBg) {
                            titleElement.style.backgroundColor = hoverBg;
                        }
                    } else {
                        // For nested sections, apply Article Title Styling hover
                        const titleElement = e.currentTarget.querySelector('.wedocs-section-title');
                        const hoverBg = getColorValue(titleStyles?.backgroundColorHover);
                        if (titleElement && hoverBg) {
                            titleElement.style.backgroundColor = hoverBg;
                        }
                    }
                }}
                onMouseLeave={(e) => {
                    if (level === 0) {
                        // For top-level sections, reset Section Title Styling
                        const titleElement = e.currentTarget.querySelector('.wedocs-section-title');
                        const normalBg = getColorValue(titleStyles?.backgroundColor);
                        if (titleElement) {
                            titleElement.style.backgroundColor = normalBg || 'transparent';
                        }
                    } else {
                        // For nested sections, reset Article Title Styling
                        const titleElement = e.currentTarget.querySelector('.wedocs-section-title');
                        const normalBg = getColorValue(titleStyles?.backgroundColor);
                        if (titleElement) {
                            titleElement.style.backgroundColor = normalBg || 'transparent';
                        }
                    }
                }}
                aria-expanded={isExpanded}
                aria-label={`Toggle ${section.post_title} section`}
            >
                <div className="flex items-center space-x-2">
                    <span 
                        className="wedocs-section-icon"
                        style={iconStyle}
                        aria-hidden="true"
                    >
                        {level === 0 ? (
                            // Blue folder icon for top-level sections
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                            </svg>
                        ) : (
                            // Simple folder icon for nested sections
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '16px', height: '16px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                            </svg>
                        )}
                    </span>
                    <TitleTag 
                        className="wedocs-section-title"
                        style={titleStyle}
                    >
                        {section.post_title}
                    </TitleTag>
                </div>
                
                {/* Expand/collapse button - only show on section title level (level 0) */}
                {level === 0 && (
                    <button
                        className="wedocs-expand-toggle transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded();
                        }}
                        aria-expanded={isExpanded}
                        aria-label={`Toggle ${section.post_title} section`}
                        style={{
                            color: getColorValue(titleStyles?.color, '#6c757d'),
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px'
                        }}
                    >
                        {isExpanded ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '16px', height: '16px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '16px', height: '16px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
            
            {children.length > 0 && isExpanded && (
                <div 
                    className="wedocs-section-children"
                    style={{
                        marginLeft: level > 0 ? `${parseInt(treeStyles?.indentation?.replace('px', '') || 20)}px` : '0',
                        borderLeft: level > 0 && treeStyles?.connectorColor ? `${treeStyles?.connectorWidth || '1px'} solid ${treeStyles.connectorColor}` : 'none',
                        paddingLeft: level > 0 ? '8px' : '0'
                    }}
                >
                    {children.map((article) => (
                        <ArticleItem
                            key={article.ID}
                            article={article}
                            attributes={attributes}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SectionItem;
