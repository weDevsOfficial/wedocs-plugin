import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { store as coreStore } from '@wordpress/core-data';
import AiDocWriterModal from './AiDocWriterModal';

const AiDocWriter = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Check if we're in the docs post type
    const { isViewable, postTypeName } = useSelect((select) => {
        const postType = select(editorStore).getCurrentPostType();
        const postTypeObject = select(coreStore).getPostType(postType);
        return {
            isViewable: postTypeObject?.viewable,
            postTypeName: postType,
        };
    }, []);

    // Only show for docs post type
    if (!isViewable || postTypeName !== 'docs') {
        return null;
    }


    return (
        <>
            <PluginSidebar
                name="wedocs-ai-doc-writer"
                title={__('AI Doc Writer', 'wedocs')}
                icon="edit"
            >
                <div style={{ padding: '16px' }}>
                    <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
                        {__('Generate AI-powered documentation content with advanced language models.', 'wedocs')}
                    </p>
                    
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="button button-primary"
                        style={{ 
                            width: '100%',
                            height: '40px',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        {__('Open AI Doc Writer', 'wedocs')}
                    </button>
                </div>
            </PluginSidebar>

            {isModalOpen && (
                <AiDocWriterModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};

// Register the plugin
registerPlugin('wedocs-ai-doc-writer', {
    render: AiDocWriter,
    icon: 'edit',
});