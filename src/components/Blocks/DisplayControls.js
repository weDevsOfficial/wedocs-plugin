import { __ } from '@wordpress/i18n';
import { Button, Card, Flex, FlexItem, Icon } from '@wordpress/components';
import { desktop, tablet, mobile, seen, unseen } from '@wordpress/icons';

const DisplayControls = ({ attributes, setAttributes }) => {
	// Configuration for each device type
	const deviceConfig = [
		{
			key: 'mobile',
			icon: mobile,
			label: __('Hide on mobile', 'block-responsive'),
		},
		{
			key: 'tablet',
			icon: tablet,
			label: __('Hide on tablet', 'block-responsive'),
		},
		{
			key: 'desktop',
			icon: desktop,
			label: __('Hide on desktop', 'block-responsive'),
		},
	];

	// Common styles
	const cardStyle = {
		padding: '4px 4px 4px 10px',
		borderRadius: '2px',
		borderColor: '#ddd',
	};

	const flexItemStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '4px',
		flexGrow: 1,
		borderRight: '1px solid #ddd',
	};

	const labelStyle = {
		fontSize: '12px',
		fontWeight: '600',
		lineHeight: '1.4',
		display: 'block',
		marginBottom: '16px',
		padding: '0px',
	};

	// Handler for toggling device visibility
	const toggleDeviceVisibility = (deviceKey) => {
		setAttributes({
			displayControls: {
				...attributes.displayControls,
				[deviceKey]: !attributes.displayControls[deviceKey],
			},
		});
	};

	// Render individual device control card
	const renderDeviceCard = ({ key, icon, label }) => {
		const isHidden = attributes.displayControls[key];

		return (
			<Card key={key} style={cardStyle}>
				<Flex gap="0">
					<FlexItem
						style={{
							...flexItemStyle,
							opacity: isHidden ? 0.5 : 1,
						}}
					>
						<Icon icon={icon} size={24} style={{ flexShrink: 0 }} />
						{label}
					</FlexItem>
					<FlexItem>
						<Button
							__next40pxDefaultSize
							onClick={() => toggleDeviceVisibility(key)}
							icon={isHidden ? unseen : seen}
						/>
					</FlexItem>
				</Flex>
			</Card>
		);
	};

	return (
		<div className="block-responsive-display-controls">
			<p style={{ ...labelStyle }}>
				{__('Display Options', 'block-responsive')}
			</p>
			<Flex
				style={{ gap: '8px', marginBottom: '16px', height: 'auto' }}
				direction="column"
			>
				{deviceConfig.map(renderDeviceCard)}
			</Flex>
		</div>
	);
};

export default DisplayControls;
