import { registerPlugin } from '@wordpress/plugins';
import AiDocWriterIcon from '../icons';
import AiDocWriterPanel from './AiDocWriterPanel';

registerPlugin('wedocs-ai-doc-writer', {
    icon: AiDocWriterIcon,
    render: AiDocWriterPanel,
});
