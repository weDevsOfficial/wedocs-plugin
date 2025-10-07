import { useState } from '@wordpress/element';
import ArticleItem from './ArticleItem';
import CountBadge from './CountBadge';

const SectionItem = ({ section, attributes, enableNestedSections }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    
    const {
        sectionTitleTag,
        sectionStyles,
        titleStyles
    } = attributes;

    const sectionStyle = {
        backgroundColor: sectionStyles.backgroundColor || '#f8f9fa',
        margin: sectionStyles.margin || '8px 0'
    };

    const headerStyle = {
        padding: sectionStyles.padding || '12px'
    };

    const titleStyle = {
        color: '#333333',
        backgroundColor: titleStyles.backgroundColor || 'transparent',
        padding: titleStyles.padding || '8px'
    };

    const iconStyle = {
        color: '#6c757d',
        fontSize: '16px'
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const TitleTag = sectionTitleTag || 'h3';
    const children = section.children || [];
    const childrenCount = children.length;

    return (
        <div 
            className="wedocs-section border border-gray-200 rounded-md overflow-hidden"
            style={sectionStyle}
        >
            <div 
                className="wedocs-section-header flex items-center justify-between p-3 cursor-pointer transition-colors"
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
                aria-expanded={isExpanded}
                aria-label={`Toggle ${section.post_title} section`}
            >
                <div className="flex items-center space-x-2">
                    <span 
                        className="wedocs-section-icon"
                        style={iconStyle}
                        aria-hidden="true"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                    </span>
                    <TitleTag 
                        className="wedocs-section-title"
                        style={titleStyle}
                    >
                        {section.post_title}
                    </TitleTag>
                </div>
                <CountBadge count={childrenCount} attributes={attributes} />
            </div>
            
            {enableNestedSections && children.length > 0 && (
                <div 
                    className={`wedocs-section-children pl-4 border-l-2 border-gray-200 transition-all duration-300 ${
                        isExpanded ? 'expanded' : 'collapsed'
                    }`}
                >
                    {children.map((article) => (
                        <ArticleItem
                            key={article.ID}
                            article={article}
                            attributes={attributes}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SectionItem;
