import { __ } from '@wordpress/i18n';
import { Button, Notice, Card, CardBody, CardHeader, __experimentalHStack as HStack, __experimentalVStack as VStack } from '@wordpress/components';

const AiDocWriterPreview = ({ content, onAccept, onReject, onClose }) => {
    return (
        <VStack spacing={4}>
            <Card>
                <CardBody>
                    <div 
                        dangerouslySetInnerHTML={{ __html: content }}
                        style={{
                            border: '1px solid #ddd',
                            padding: '16px',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                            maxHeight: '400px',
                            overflowY: 'auto'
                        }}
                    />
                </CardBody>
            </Card>

            <Notice status="info" isDismissible={false}>
                {__(
                    'The content above is formatted with HTML tags. When inserted, it will be properly formatted in your document.',
                    'wedocs'
                )}
            </Notice>

            <HStack justify="flex-end" spacing={2}>
                <Button
                    variant="tertiary"
                    onClick={onClose}
                >
                    {__('Cancel', 'wedocs')}
                </Button>
                <Button
                    variant="secondary"
                    onClick={onReject}
                >
                    {__('Reject & Try Again', 'wedocs')}
                </Button>
                <Button
                    variant="primary"
                    onClick={onAccept}
                >
                    {__('Accept & Insert', 'wedocs')}
                </Button>
            </HStack>
        </VStack>
    );
};

export default AiDocWriterPreview;
