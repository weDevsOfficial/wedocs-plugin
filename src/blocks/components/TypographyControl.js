import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
	__experimentalSpacer as Spacer
} from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';

const TypographyControl = ({
	label,
	value = {},
	onChange,
	colorValue,
	onColorChange,
	hoverColorValue,
	onHoverColorChange,
	showHoverColor = true,
	showLineHeight = true,
	showLetterSpacing = true,
	showTextTransform = true,
	showTextDecoration = true
}) => {
	const updateTypography = (key, newValue) => {
		onChange({
			...value,
			[key]: newValue
		});
	};

	return (
		<PanelBody title={label} initialOpen={false}>
			{/* Color Settings */}
			<PanelColorSettings
				title={__('Colors', 'wedocs')}
				colorSettings={[
					{
						value: colorValue,
						onChange: onColorChange,
						label: __('Text Color', 'wedocs')
					},
					...(showHoverColor ? [{
						value: hoverColorValue,
						onChange: onHoverColorChange,
						label: __('Hover Color', 'wedocs')
					}] : [])
				]}
			/>

			<Spacer marginTop={4} marginBottom={4} />

			{/* Font Family */}
			<SelectControl
				label={__('Font Family', 'wedocs')}
				value={value.fontFamily || 'default'}
				options={[
					{ label: __('Default', 'wedocs'), value: 'default' },
					{ label: 'Arial', value: 'Arial, sans-serif' },
					{ label: 'Georgia', value: 'Georgia, serif' },
					{ label: 'Helvetica', value: 'Helvetica, sans-serif' },
					{ label: 'Times New Roman', value: '"Times New Roman", serif' },
					{ label: 'Verdana', value: 'Verdana, sans-serif' },
					{ label: 'Roboto', value: 'Roboto, sans-serif' },
					{ label: 'Open Sans', value: '"Open Sans", sans-serif' },
					{ label: 'Lato', value: 'Lato, sans-serif' },
					{ label: 'Montserrat', value: 'Montserrat, sans-serif' }
				]}
				onChange={(newValue) => updateTypography('fontFamily', newValue === 'default' ? undefined : newValue)}
			/>

			{/* Font Size */}
			<UnitControl
				label={__('Font Size', 'wedocs')}
				value={value.fontSize || '14px'}
				onChange={(newValue) => updateTypography('fontSize', newValue)}
				units={[
					{ value: 'px', label: 'px' },
					{ value: 'em', label: 'em' },
					{ value: 'rem', label: 'rem' },
					{ value: '%', label: '%' }
				]}
			/>

			{/* Font Weight */}
			<SelectControl
				label={__('Font Weight', 'wedocs')}
				value={value.fontWeight || '400'}
				options={[
					{ label: __('100 - Thin', 'wedocs'), value: '100' },
					{ label: __('200 - Extra Light', 'wedocs'), value: '200' },
					{ label: __('300 - Light', 'wedocs'), value: '300' },
					{ label: __('400 - Normal', 'wedocs'), value: '400' },
					{ label: __('500 - Medium', 'wedocs'), value: '500' },
					{ label: __('600 - Semi Bold', 'wedocs'), value: '600' },
					{ label: __('700 - Bold', 'wedocs'), value: '700' },
					{ label: __('800 - Extra Bold', 'wedocs'), value: '800' },
					{ label: __('900 - Black', 'wedocs'), value: '900' }
				]}
				onChange={(newValue) => updateTypography('fontWeight', newValue)}
			/>

			{/* Font Style */}
			<SelectControl
				label={__('Font Style', 'wedocs')}
				value={value.fontStyle || 'normal'}
				options={[
					{ label: __('Normal', 'wedocs'), value: 'normal' },
					{ label: __('Italic', 'wedocs'), value: 'italic' },
					{ label: __('Oblique', 'wedocs'), value: 'oblique' }
				]}
				onChange={(newValue) => updateTypography('fontStyle', newValue)}
			/>

			{/* Line Height */}
			{showLineHeight && (
				<UnitControl
					label={__('Line Height', 'wedocs')}
					value={value.lineHeight || 'normal'}
					onChange={(newValue) => updateTypography('lineHeight', newValue)}
					units={[
						{ value: 'px', label: 'px' },
						{ value: 'em', label: 'em' },
						{ value: '', label: 'unitless' }
					]}
				/>
			)}

			{/* Letter Spacing */}
			{showLetterSpacing && (
				<UnitControl
					label={__('Letter Spacing', 'wedocs')}
					value={value.letterSpacing || 'normal'}
					onChange={(newValue) => updateTypography('letterSpacing', newValue)}
					units={[
						{ value: 'px', label: 'px' },
						{ value: 'em', label: 'em' }
					]}
				/>
			)}

			{/* Text Transform */}
			{showTextTransform && (
				<SelectControl
					label={__('Text Transform', 'wedocs')}
					value={value.textTransform || 'none'}
					options={[
						{ label: __('None', 'wedocs'), value: 'none' },
						{ label: __('Uppercase', 'wedocs'), value: 'uppercase' },
						{ label: __('Lowercase', 'wedocs'), value: 'lowercase' },
						{ label: __('Capitalize', 'wedocs'), value: 'capitalize' }
					]}
					onChange={(newValue) => updateTypography('textTransform', newValue)}
				/>
			)}

			{/* Text Decoration */}
			{showTextDecoration && (
				<SelectControl
					label={__('Text Decoration', 'wedocs')}
					value={value.textDecoration || 'none'}
					options={[
						{ label: __('None', 'wedocs'), value: 'none' },
						{ label: __('Underline', 'wedocs'), value: 'underline' },
						{ label: __('Overline', 'wedocs'), value: 'overline' },
						{ label: __('Line Through', 'wedocs'), value: 'line-through' }
					]}
					onChange={(newValue) => updateTypography('textDecoration', newValue)}
				/>
			)}
		</PanelBody>
	);
};

export default TypographyControl;