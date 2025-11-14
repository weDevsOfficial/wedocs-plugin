import { __ } from '@wordpress/i18n';
import { useState, Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { store as coreStore } from '@wordpress/core-data';
import { Button } from '@wordpress/components';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import AiDocWriterIcon from '../icons';
import AiDocWriterModal from './AiDocWriterModal';

const AiDocWriterPanel = () => {
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
        <Fragment>
            <PluginSidebarMoreMenuItem target="wedocs-ai-doc-writer" icon={AiDocWriterIcon}>
                {__('weDocs AI Doc Writer', 'wedocs')}
            </PluginSidebarMoreMenuItem>
            <PluginSidebar name="wedocs-ai-doc-writer" title={__('weDocs AI Doc Writer', 'wedocs')}>
                <div style={{ padding: '16px' }}>
                    <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
                        {__('Generate AI-powered documentation content with advanced language models.', 'wedocs')}
                    </p>
                    
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        variant="primary"
                        style={{ 
                            width: '100%',
                            height: '40px',
                            fontSize: '14px',
                            fontWeight: '500',
                            backgroundColor: '#4338CA',
                            borderColor: '#4338CA'
                        }}
                    >
                        {__('Open AI Doc Writer', 'wedocs')}
                    </Button>
                </div>
            </PluginSidebar>

            {isModalOpen && (
                <AiDocWriterModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </Fragment>
    );
};

export default AiDocWriterPanel;
