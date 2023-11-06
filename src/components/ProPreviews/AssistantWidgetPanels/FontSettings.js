import SelectBox from './SelectBox';
import { __ } from '@wordpress/i18n';

const FontSettings = ( { name, classes, setSettings, settingsData } ) => {
	const fontWeights = [
		{ key: 'normal', value: __( 'Normal', 'wedocs' ) },
		{ key: 'medium', value: __( 'Medium', 'wedocs' ) },
		{ key: 'semibold', value: __( 'Semi bold', 'wedocs' ) },
		{ key: 'bold', value: __( 'Bold', 'wedocs' ) },
		{ key: 'extrabold', value: __( 'Extra bold', 'wedocs' ) },
	];

	const fontSizes = [
		{ key: 'xs', value: 12 },
		{ key: 'sm', value: 14 },
		{ key: 'base', value: 16 },
		{ key: 'lg', value: 18 },
		{ key: 'xl', value: 20 },
		{ key: '2xl', value: 24 },
		{ key: '3xl', value: 30 },
	];

	const defaultSize = 'widget_title_font' === name ? fontSizes[3] : fontSizes[2];
	const defaultWeight = 'widget_title_font' === name ? fontWeights[1] : fontWeights[0];

	const handleResetFonts = () => {
		setSettings( {
			...settingsData,
			assistant: {
				...settingsData?.assistant,
				preference: {
					...settingsData?.assistant?.preference,
					[ name ]: {
						...settingsData?.assistant?.preference?.[ name ],
						size:
							'widget_title_font' === name
								? fontSizes[ 3 ]?.key
								: fontSizes[ 2 ]?.key,
						weight:
							'widget_title_font' === name
								? fontWeights[ 1 ]?.key
								: fontWeights[ 0 ]?.key,
					},
				},
			},
		} );
	};

	return (
		<div className={ `${ classes ? classes : '' } flex space-x-2.5` }>
			<SelectBox
				classes="w-[108px]"
				options={ fontWeights }
				fieldName={ 'weight' }
				setSettings={ setSettings }
				settingsName={ name }
				settingsData={ settingsData }
				defaultValue={ defaultWeight }
			/>
			<SelectBox
				classes="w-[72px]"
				options={ fontSizes }
				fieldName={ 'size' }
				setSettings={ setSettings }
				settingsName={ name }
				settingsData={ settingsData }
				defaultValue={ defaultSize }
			/>
			<button
				onClick={ handleResetFonts }
				className="relative cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-3 text-left shadow-sm hover:bg-indigo-700 hover:text-white sm:text-sm"
			>
				{ __( 'Reset', 'wedocs' ) }
			</button>
		</div>
	);
};

export default FontSettings;
