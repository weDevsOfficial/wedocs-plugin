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
import aiService from '../utils/aiService';

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

    // Validate AI-generated content
    const validateGeneratedContent = (content) => {
        const errors = [];
        
        // Check if content is empty
        if (!content || content.trim().length === 0) {
            errors.push(__('Generated content is empty.', 'wedocs'));
            return { isValid: false, errors };
        }

        // Check for basic HTML structure
        const hasParagraphs = /<p[^>]*>.*?<\/p>/i.test(content);
        const hasHeadings = /<h[1-6][^>]*>.*?<\/h[1-6]>/i.test(content);
        
        if (!hasParagraphs && !hasHeadings) {
            errors.push(__('Generated content should contain at least paragraphs or headings.', 'wedocs'));
        }

        // Check for potentially dangerous HTML (basic XSS prevention)
        const dangerousPatterns = [
            /<script[^>]*>.*?<\/script>/gi,
            /<iframe[^>]*>.*?<\/iframe>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi
        ];

        for (const pattern of dangerousPatterns) {
            if (pattern.test(content)) {
                errors.push(__('Generated content contains potentially unsafe HTML elements.', 'wedocs'));
                break;
            }
        }

        // Check for minimum content length
        const textContent = content.replace(/<[^>]*>/g, '').trim();
        if (textContent.length < 50) {
            errors.push(__('Generated content is too short. Please try again with more specific keywords.', 'wedocs'));
        }

        // Check for maximum content length (prevent extremely long content)
        if (textContent.length > 10000) {
            errors.push(__('Generated content is too long. Please try again with more focused keywords.', 'wedocs'));
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    };

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
            // Get AI settings to determine provider and model
            const aiSettings = await aiService.getAiSettings();
            
            // Check if AI is properly configured
            if (!aiSettings.providers[aiSettings.default_provider]?.api_key) {
                // Fall back to mock content if AI is not configured
                console.warn('AI not configured, using mock content');
                const mockContent = `
                    <h2><span class="highlight">Introduction</span></h2>
                    <p>This is AI-generated content for: <strong>${title}</strong></p>
                    <p>Keywords: <span class="highlight">${keywords}</span></p>
                    <p>Overwrite mode: <strong>${overwriteContent ? 'Enabled' : 'Disabled'}</strong></p>
                    <p>Prompt used: <em>${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}</em></p>
                    <h2><span class="highlight">Key Features</span></h2>
                    <p>Based on your keywords and instructions, here's the generated content. This is a comprehensive guide that covers all the important aspects of the topic you've specified. The content is structured with proper headings and paragraphs to ensure good readability and organization.</p>
                    <h2><span class="highlight">Detailed Information</span></h2>
                    <p>This section provides more detailed information about the topic. The AI has generated relevant content based on your keywords and title. The content follows proper HTML structure with headings and paragraphs as requested.</p>
                    <h2><span class="highlight">Conclusion</span></h2>
                    <p>This content was generated using AI and can be customized as needed. The validation ensures that the content meets quality standards and is safe to use in your documentation.</p>
                `;
                
                const validation = validateGeneratedContent(mockContent);
                if (!validation.isValid) {
                    setError(validation.errors.join(' '));
                    return;
                }
                
                setGeneratedContent(mockContent);
                setShowPreview(true);
                return;
            }

            // Use AI service to generate content
            const systemPrompt = __(
                'You are a professional documentation writer. Generate comprehensive, well-structured documentation content using HTML tags. Use proper heading hierarchy (h2, h3, etc.) and wrap all content in paragraph tags. Highlight important terms with <span class="highlight"> tags.',
                'wedocs'
            );

            const result = await aiService.generateContent(prompt, {
                provider: aiSettings.default_provider,
                model: aiSettings.providers[aiSettings.default_provider].selected_model,
                feature: 'ai_doc_writer',
                systemPrompt: systemPrompt,
                maxTokens: 2000,
                temperature: 0.7
            });

            if (!result.content) {
                throw new Error(__('AI service returned empty content', 'wedocs'));
            }

            // Validate the generated content
            const validation = validateGeneratedContent(result.content);
            
            if (!validation.isValid) {
                setError(validation.errors.join(' '));
                return;
            }
            
            setGeneratedContent(result.content);
            setShowPreview(true);
        } catch (err) {
            console.error('AI generation error:', err);
            setError(err.message || __('Failed to generate content. Please try again.', 'wedocs'));
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
