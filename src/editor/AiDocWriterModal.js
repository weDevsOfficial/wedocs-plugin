import { __ } from '@wordpress/i18n';
import { useState, useEffect, useMemo } from '@wordpress/element';
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
import { useSelect, useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
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

    // WordPress editor dispatch hooks
    const { insertBlocks, replaceBlocks, insertDefaultBlock } = useDispatch(blockEditorStore);
    const { editPost } = useDispatch(editorStore);

    // Get current post data and editor state with enhanced cursor detection
    const editorData = useSelect((select) => {
        const { getCurrentPost, getEditedPostContent } = select('core/editor');
        const { 
            getSelectedBlockClientId, 
            getBlocks, 
            getSelectedBlock,
            getBlockInsertionPoint,
            getBlockOrder
        } = select('core/block-editor');
        
        return {
            post: getCurrentPost(),
            content: getEditedPostContent(),
            selectedBlockClientId: getSelectedBlockClientId(),
            blocks: getBlocks(),
            selectedBlock: getSelectedBlock(),
            insertionPoint: getBlockInsertionPoint(),
            blockOrder: getBlockOrder()
        };
    }, []);

    // Create stable references using useMemo
    const { currentPost, selectedBlockId, blocks, cursorPosition } = useMemo(() => {
        const post = editorData.post;
        const content = editorData.content;
        const selectedBlockClientId = editorData.selectedBlockClientId;
        const blocks = editorData.blocks || [];
        const selectedBlock = editorData.selectedBlock;
        const insertionPoint = editorData.insertionPoint;
        const blockOrder = editorData.blockOrder || [];
        
        return {
            currentPost: {
                id: post?.id || null,
                title: post?.title || '',
                contentRaw: content || '',
                contentRendered: content || ''
            },
            selectedBlockId: selectedBlockClientId || null,
            blocks: blocks,
            cursorPosition: {
                selectedBlock: selectedBlock,
                insertionPoint: insertionPoint,
                blockOrder: blockOrder,
                hasSelection: !!selectedBlockClientId,
                selectedBlockIndex: selectedBlock ? blockOrder.indexOf(selectedBlock.clientId) : -1
            }
        };
    }, [editorData]);

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

    // Clean AI-generated content
    const cleanGeneratedContent = (content) => {
        if (!content) return content;
        
        // Remove HTML document structure
        let cleaned = content
            .replace(/```html\s*/gi, '') // Remove markdown code blocks
            .replace(/```\s*/g, '') // Remove closing code blocks
            .replace(/<!DOCTYPE[^>]*>/gi, '') // Remove DOCTYPE
            .replace(/<html[^>]*>/gi, '') // Remove html tag
            .replace(/<\/html>/gi, '') // Remove closing html tag
            .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '') // Remove head section
            .replace(/<body[^>]*>/gi, '') // Remove body opening tag
            .replace(/<\/body>/gi, '') // Remove body closing tag
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // Remove style blocks
            .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '') // Remove title
            .replace(/<meta[^>]*>/gi, '') // Remove meta tags
            .trim();
        
        return cleaned;
    };

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
                setError(__('AI service is not configured. Please set up your AI provider settings in weDocs > Settings > AI Control Settings.', 'wedocs'));
                return;
            }

            // Use AI service to generate content
            const systemPrompt = __(
                'You are a professional documentation writer. Generate comprehensive, well-structured documentation content using HTML tags. Use proper heading hierarchy (h2, h3, etc.) and wrap all content in paragraph tags. Highlight important terms with <span class="highlight"> tags. IMPORTANT: Only return the content body without HTML document structure (no <!DOCTYPE>, <html>, <head>, <style>, or <body> tags). Return only the content that should be inserted into the document.',
                'wedocs'
            );

            const selectedModel = aiSettings.providers[aiSettings.default_provider].selected_model;

                const result = await aiService.generateContent(prompt, {
                    provider: aiSettings.default_provider,
                    model: selectedModel,
                    feature: 'ai_doc_writer',
                    systemPrompt: systemPrompt,
                    maxTokens: 2000,
                    temperature: 0.7
                });


                if (!result.content) {
                    throw new Error(__('AI service returned empty content', 'wedocs'));
                }

                // Clean the generated content
                const cleanedContent = cleanGeneratedContent(result.content);

            // Validate the generated content
            const validation = validateGeneratedContent(cleanedContent);

            if (!validation.isValid) {
                setError(validation.errors.join(' '));
                return;
            }

            setGeneratedContent(cleanedContent);
            setShowPreview(true);
        } catch (err) {
            setError(err.message || __('Failed to generate content. Please try again.', 'wedocs'));
        } finally {
            setIsGenerating(false);
        }
    };

    // Sanitize content for security (following BetterDocs Pro pattern)
    const sanitizeContent = (content) => {
        if (!content) return content;
        
        // Remove script tags and their contents
        content = content.replace(/<script[^>]*>.*?<\/script>/gi, '');
        
        // Remove javascript: protocols but keep the anchor tags
        content = content.replace(/href\s*=\s*(["\'])\s*javascript:.*?\1/i, 'href="#"');
        
        // Remove all event handlers (onclick, onload, etc) but keep the elements
        content = content.replace(/\s+on\w+\s*=\s*(["\'])?[^"\']*\1?/i, '');
        
        // Remove any inline javascript: in attributes
        content = content.replace(/javascript\s*:/i, '');
        
        return content;
    };

    // Parse HTML content and create appropriate blocks
    const createContentBlocks = (htmlContent) => {
        const blocks = [];
        
        // Sanitize the content first
        const sanitizedContent = sanitizeContent(htmlContent);
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sanitizedContent;
        
        // Process each top-level element
        Array.from(tempDiv.children).forEach(element => {
            const tagName = element.tagName.toLowerCase();
            
            switch (tagName) {
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    const level = parseInt(tagName.charAt(1));
                    blocks.push(createBlock('core/heading', {
                        content: element.innerHTML,
                        level: level
                    }));
                    break;
                    
                case 'p':
                    blocks.push(createBlock('core/paragraph', {
                        content: element.innerHTML
                    }));
                    break;
                    
                case 'ul':
                case 'ol':
                    const listType = tagName === 'ul' ? 'ul' : 'ol';
                    const listItems = Array.from(element.querySelectorAll('li')).map(li => li.innerHTML);
                    blocks.push(createBlock('core/list', {
                        values: listItems,
                        ordered: listType === 'ol'
                    }));
                    break;
                    
                case 'blockquote':
                    blocks.push(createBlock('core/quote', {
                        value: element.innerHTML
                    }));
                    break;
                    
                default:
                    // For any other HTML content, use HTML block
                    blocks.push(createBlock('core/html', {
                        content: element.outerHTML
                    }));
                    break;
            }
        });
        
        // If no blocks were created (e.g., only text), create a paragraph
        if (blocks.length === 0) {
            blocks.push(createBlock('core/paragraph', {
                content: htmlContent
            }));
        }
        
        return blocks;
    };

    const handleAccept = () => {
        try {
            // Create blocks from the generated content
            const contentBlocks = createContentBlocks(generatedContent);

            if (overwriteContent) {
                // Overwrite Mode: Replace entire post content
                const blockIds = blocks.map(block => block.clientId).filter(id => id);
                
                if (blockIds.length > 0) {
                    replaceBlocks(blockIds, contentBlocks);
                } else {
                    insertBlocks(contentBlocks);
                }
            } else {
                // Insert Mode: Insert at current cursor position
                // Use reliable method that appends to end of document
                const currentBlocks = wp.data.select('core/block-editor').getBlocks();
                const allBlocks = [...currentBlocks, ...contentBlocks];
                const allBlockIds = currentBlocks.map(block => block.clientId);
                wp.data.dispatch('core/block-editor').replaceBlocks(allBlockIds, allBlocks);
            }
            
            // Close modal
            onClose();
            
        } catch (error) {
            setError(__('Failed to insert content. Please try again.', 'wedocs'));
        }
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
                        <CardBody>
                            <VStack spacing={3}>
                                <TextControl
                                    label={__('Documentation Title', 'wedocs')}
                                    value={title}
                                    onChange={setTitle}
                                    placeholder={__('Enter your documentation title here...', 'wedocs')}
                                    help={__('The title will be used to generate relevant content.', 'wedocs')}
                                    __nextHasNoMarginBottom
                                    __next40pxDefaultSize
                                />

                                <TextControl
                                    label={__('Keywords', 'wedocs')}
                                    value={keywords}
                                    onChange={setKeywords}
                                    placeholder={__('Add keywords to guide AI (comma-separated)...', 'wedocs')}
                                    help={__('Enter relevant keywords separated by commas.', 'wedocs')}
                                    __nextHasNoMarginBottom
                                    __next40pxDefaultSize
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
                                    help={__('When enabled, AI content will replace the entire document. When disabled, content will be inserted at the end of the current contents.', 'wedocs')}
                                    __nextHasNoMarginBottom
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
