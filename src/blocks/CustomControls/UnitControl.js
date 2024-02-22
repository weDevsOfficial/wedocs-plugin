import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, Flex, FlexBlock, FlexItem } from '@wordpress/components';

const UnitControl = ( { label, value, unit, onValueChange, onUnitChange } ) => {
    return (
        <Flex>
            <FlexBlock>
                <TextControl
                    label={ label }
                    value={ parseInt( value ) }
                    onChange={ ( newValue ) => onValueChange( newValue ) }
                />
            </FlexBlock>
            <FlexItem>
                <SelectControl
                    label={ __( 'Unit', 'wedocs' ) }
                    value={ unit }
                    options={ [
                        { label: 'px', value: 'px' },
                        { label: '%', value: '%' },
                    ] }
                    onChange={ ( newUnit ) => onUnitChange( newUnit ) }
                />
            </FlexItem>
        </Flex>
    );
};

export default UnitControl;
