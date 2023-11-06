import { __ } from '@wordpress/i18n';
import Appearance from './Appearance';
import AssistantPanel from '../AssistantPanel';
import PanelBody from '../PanelBody';
import ExploreEnable from './ExploreEnable';
import ExploreSettings from './ExploreSettings';

const ExplorePanel = () => {

	const tabs = [
		__( 'Explore', 'wedocs' ),
		__( 'Appearance', 'wedocs' ),
	];

	const panels = [
		<ExploreSettings />,
		<Appearance />
	];

	return (
		<AssistantPanel>
			<PanelBody
				tabs={ tabs }
				panels={ panels }
			>
				<ExploreEnable />
			</PanelBody>
		</AssistantPanel>
	);
}

export default ExplorePanel;
