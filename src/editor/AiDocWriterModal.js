import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import {
    Modal,
    Button,
    TextControl,
    TextareaControl,
    ToggleControl,
    Notice,
    Spinner,
    PanelBody,
    PanelRow,
    Card,
    CardBody,
    CardHeader,
    Flex,
    FlexItem,
    __experimentalHStack as HStack,
    __experimentalVStack as VStack,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import AiDocWriterPreview from './AiDocWriterPreview';

const AiDocWriterModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [prompt, setPrompt] = useState('');
    const [keywords, setKeywords] = useState('');
    const [overwriteContent, setOverwriteContent] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [error, setError] = useState('');

    // Get current post data
    const currentPost = useSelect((select) => {
        const { getCurrentPost, getEditedPostContent } = select('core/editor');
        const post = getCurrentPost();
        const content = getEditedPostContent();
        
        console.log('Post from getCurrentPost:', post);
        console.log('Content from getEditedPostContent:', content);
        
        return {
            ...post,
            content: {
                raw: content,
                rendered: content
            }
        };
    }, []);

    // Pre-fill title with current post title
    useEffect(() => {
        if (currentPost?.title && !title) {
            setTitle(currentPost.title);
        }
    }, [currentPost, title]);

    // Generate dynamic prompt from title and keywords
    const generateDynamicPrompt = (docTitle, docKeywords) => {
        if (!docTitle && !docKeywords) {
            return __(
                "Generate documentation using HTML heading tags for the title. Include details on {Documentation Keywords} and wrap all content in <p> tags. Highlight headings and keywords with <span class='highlight'>.",
                'wedocs'
            );
        }

        let dynamicPrompt = __(
            "Generate documentation using HTML heading tags for '{title}'. Include relevant details on {keywords} in the documentation. Wrap all content in <p> tags. Highlight headings and keywords with <span class='highlight'>.",
            'wedocs'
        );

        // Replace placeholders with actual values
        if (docTitle) {
            dynamicPrompt = dynamicPrompt.replace('{title}', docTitle);
        } else {
            dynamicPrompt = dynamicPrompt.replace("for '{title}'", 'for the title');
        }

        if (docKeywords) {
            dynamicPrompt = dynamicPrompt.replace('{keywords}', docKeywords);
        } else {
            dynamicPrompt = dynamicPrompt.replace('Include relevant details on {keywords} in the documentation.', 'Include relevant details in the documentation.');
        }

        return dynamicPrompt;
    };

    // Update prompt when title or keywords change
    useEffect(() => {
        const dynamicPrompt = generateDynamicPrompt(title, keywords);
        setPrompt(dynamicPrompt);
    }, [title, keywords]);

    const handleGenerate = async () => {
        if (!title.trim()) {
            setError(__('Please enter a documentation title.', 'wedocs'));
            return;
        }

        if (!keywords.trim()) {
            setError(__('Please enter keywords to guide the AI.', 'wedocs'));
            return;
        }

        setError('');
        setIsGenerating(true);

        try {
            // Simulate AI generation (static content for now)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const mockContent = `
                <h2><span class="highlight">Introduction</span></h2>
                <p>This is AI-generated content for: <strong>${title}</strong></p>
                <p>Keywords: <span class="highlight">${keywords}</span></p>
                <p>Overwrite mode: <strong>${overwriteContent ? 'Enabled' : 'Disabled'}</strong></p>
                <p>Prompt used: <em>${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}</em></p>
                <h2><span class="highlight">Key Features</span></h2>
                <p>Based on your keywords and instructions, here's the generated content...</p>
                <h2><span class="highlight">Conclusion</span></h2>
                <p>This content was generated using AI and can be customized as needed.</p>
            `;
            
            setGeneratedContent(mockContent);
            setShowPreview(true);
        } catch (err) {
            setError(__('Failed to generate content. Please try again.', 'wedocs'));
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAccept = () => {
        // TODO: Implement content insertion logic
        console.log('Accepting content:', generatedContent);
        console.log('Overwrite mode:', overwriteContent);
        onClose();
    };

    const handleReject = () => {
        setShowPreview(false);
        setGeneratedContent('');
    };

    const handleClose = () => {
        setShowPreview(false);
        setGeneratedContent('');
        setError('');
        onClose();
    };

    return (
        <Modal
            title={__('AI Doc Writer', 'wedocs')}
            onRequestClose={handleClose}
            className="wedocs-ai-doc-writer-modal"
            size="large"
        >
            {!showPreview ? (
                <VStack spacing={4}>
                    <Card>
                        <CardHeader>
                            <h3>{__('Content Generation Settings', 'wedocs')}</h3>
                        </CardHeader>
                        <CardBody>
                            <VStack spacing={3}>
                                <TextControl
                                    label={__('Documentation Title', 'wedocs')}
                                    value={title}
                                    onChange={setTitle}
                                    placeholder={__('Enter your documentation title here...', 'wedocs')}
                                    help={__('The title will be used to generate relevant content.', 'wedocs')}
                                    __nextHasNoMarginBottom
                                />

                                <TextControl
                                    label={__('Keywords', 'wedocs')}
                                    value={keywords}
                                    onChange={setKeywords}
                                    placeholder={__('Add keywords to guide AI (comma-separated)...', 'wedocs')}
                                    help={__('Enter relevant keywords separated by commas.', 'wedocs')}
                                    __nextHasNoMarginBottom
                                />

                                <TextareaControl
                                    label={__('AI Instructions', 'wedocs')}
                                    value={prompt}
                                    onChange={setPrompt}
                                    rows={4}
                                    placeholder={__('AI instructions will be auto-generated from title and keywords...', 'wedocs')}
                                    help={__('Instructions are automatically generated from your title and keywords. You can edit them manually if needed.', 'wedocs')}
                                    __nextHasNoMarginBottom
                                />

                                <ToggleControl
                                    label={__('Overwrite your existing Doc', 'wedocs')}
                                    checked={overwriteContent}
                                    onChange={setOverwriteContent}
                                    help={__('When enabled, AI content will replace the entire document. When disabled, content will be inserted at the current cursor position.', 'wedocs')}
                                />
                            </VStack>
                        </CardBody>
                    </Card>

                    {error && (
                        <Notice status="error" isDismissible={false}>
                            {error}
                        </Notice>
                    )}

                    <HStack justify="flex-end" spacing={2}>
                        <Button variant="secondary" onClick={handleClose}>
                            {__('Cancel', 'wedocs')}
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleGenerate}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <Spinner />
                                    {__('Generating...', 'wedocs')}
                                </>
                            ) : (
                                __('Generate Content', 'wedocs')
                            )}
                        </Button>
                    </HStack>
                </VStack>
            ) : (
                <AiDocWriterPreview
                    content={generatedContent}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    onClose={handleClose}
                />
            )}
        </Modal>
    );
};

export default AiDocWriterModal;
