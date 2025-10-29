import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Button, ButtonGroup, __experimentalSpacer as Spacer } from '@wordpress/components';

const TabSystem = ({ children, defaultTab = 'setup' }) => {
	const [activeTab, setActiveTab] = useState(defaultTab);

	const tabs = [
		{ key: 'setup', label: __('Setup', 'wedocs'), icon: 'admin-settings' },
		{ key: 'style', label: __('Style', 'wedocs'), icon: 'admin-appearance' }
	];

	return (
		<div className="contributors-tab-system">
			{/* Tab Navigation */}
			<div style={{
				borderBottom: '1px solid #ddd',
				marginBottom: '16px',
				paddingBottom: '8px'
			}}>
				<ButtonGroup>
					{tabs.map(tab => (
						<Button
							key={tab.key}
							variant={activeTab === tab.key ? 'primary' : 'secondary'}
							onClick={() => setActiveTab(tab.key)}
							style={{
								marginRight: '4px',
								display: 'flex',
								alignItems: 'center',
								gap: '4px'
							}}
						>
							<span className={`dashicons dashicons-${tab.icon}`} style={{ fontSize: '16px' }}></span>
							{tab.label}
						</Button>
					))}
				</ButtonGroup>
			</div>

			{/* Tab Content */}
			<div className="tab-content">
				{children.map((child, index) => {
					const tabKey = index === 0 ? 'setup' : 'style';
					return (
						<div
							key={tabKey}
							style={{
								display: activeTab === tabKey ? 'block' : 'none'
							}}
						>
							{child}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TabSystem;