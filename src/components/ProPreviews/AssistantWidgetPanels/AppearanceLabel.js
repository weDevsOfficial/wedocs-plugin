import { __ } from '@wordpress/i18n';

const AppearanceLabel = () => {
	return (
		<div className={ `appearance-label` }>
			<h3 className={ `text-lg text-[#111827] font-medium leading-5` }>
				{ __( 'Appearance', 'wedocs' ) }
			</h3>
			<hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200 mt-5 mb-6" />
		</div>
	);
}

export default AppearanceLabel;
