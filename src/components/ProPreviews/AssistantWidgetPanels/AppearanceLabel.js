import { __ } from '@wordpress/i18n';

const AppearanceLabel = () => {
	return (
		<div className={ `appearance-label` }>
			<h3 className={ `wedocs-text-lg wedocs-text-[#111827] wedocs-font-medium wedocs-leading-5` }>
				{ __( 'Appearance', 'wedocs' ) }
			</h3>
			<hr className="wedocs-h-px !wedocs-bg-gray-200 wedocs-border-0 dark:!wedocs-bg-gray-200 wedocs-mt-5 wedocs-mb-6" />
		</div>
	);
}

export default AppearanceLabel;
