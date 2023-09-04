import { __ } from '@wordpress/i18n';
import Appearance from './Appearance';
import AssistantPanel from '../AssistantPanel';
import PanelBody from '../PanelBody';
import MessageEnable from './MessageEnable';
import MessageSettings from './MessageSettings';

const MessagePanel = () => {

	const tabs = [
		__( 'Messaging', 'wedocs' ),
		__( 'Appearance', 'wedocs' ),
	];

	const panels = [
		<MessageSettings />,
		<Appearance />
	];

	return (
		<AssistantPanel>
			<PanelBody
				tabs={ tabs }
				panels={ panels }
			>
				<MessageEnable />
			</PanelBody>
		</AssistantPanel>
	);
}

export default MessagePanel;
