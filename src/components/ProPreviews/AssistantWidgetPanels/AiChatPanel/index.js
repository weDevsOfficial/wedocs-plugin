import { __ } from '@wordpress/i18n';
import IntegrateAiSettings from './IntegrateAiSettings';
import Appearance from './Appearance';
import AssistantPanel from '../AssistantPanel';
import PanelBody from '../PanelBody';
import AiEnable from './AiEnable';

const IntegrateAi = () => {

	const tabs = [
		__( 'Ai Chat', 'wedocs' ),
		__( 'Appearance', 'wedocs' ),
	];

	const panels = [
		<IntegrateAiSettings />,
		<Appearance />
	];

	return (
		<AssistantPanel>
			<PanelBody
				tabs={ tabs }
				panels={ panels }
			>
				<AiEnable />
			</PanelBody>
		</AssistantPanel>
	);
}

export default IntegrateAi;
