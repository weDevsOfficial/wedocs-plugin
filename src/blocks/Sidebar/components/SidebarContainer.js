import { __ } from '@wordpress/i18n';
import SectionItem from './SectionItem';

const SidebarContainer = ({ sections, attributes }) => {
    const {
        enableNestedSections
    } = attributes;

    return (
        <>
            {sections && sections.length > 0 ? (
                <div className="wedocs-sections">
                    {sections.map((section) => (
                        <SectionItem
                            key={section.ID}
                            section={section}
                            attributes={attributes}
                            enableNestedSections={enableNestedSections}
                            level={0}
                        />
                    ))}
                </div>
            ) : (
                <p className="wedocs-no-content text-gray-500 italic text-center py-4">
                    {__('No documentation sections found.', 'wedocs')}
                </p>
            )}
        </>
    );
};

export default SidebarContainer;
