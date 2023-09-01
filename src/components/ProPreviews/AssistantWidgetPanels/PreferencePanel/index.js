import AssistantPanel from '../AssistantPanel';
import PreferenceSettings from './PreferenceSettings';

const PreferencePanel = ( { settingsData, setSettings } ) => {
	return (
		<AssistantPanel>
			<PreferenceSettings
				settingsData={ settingsData }
				setSettings={ setSettings }
			/>
		</AssistantPanel>
	);
}

export default PreferencePanel;
