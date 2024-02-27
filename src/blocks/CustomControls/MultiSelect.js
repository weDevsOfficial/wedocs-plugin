import { useState } from '@wordpress/element';
import { FormTokenField } from '@wordpress/components';

const MultiSelect = ( { name, items, label, setItems, placeholder, selectedItems } ) => {
    const [ availableItems, setAvailableItems ] = useState( [ ...selectedItems ] );

    // Transform items objects to suggestions format
    const postSuggestions = items.map( item => item?.title );

    // When tokens change, find the items objects that match by title.
    const handleTokenChange = ( tokens ) => {
        const newSelectedItems = tokens.map( token => {
            const foundPost = items.find( item => item?.title === token );
            return foundPost || token; // return the found post or the token itself if not found
        } );

        setItems( { [name]: [ ...newSelectedItems ] } );
        setAvailableItems( [ ...newSelectedItems ] )
    };

    // Transform selected items to the format expected by FormTokenField.
    const tokenValue = availableItems.map(
        ( item ) => ( typeof item === 'object' ? item?.title : item )
    );

    return (
        <FormTokenField
            label={ label }
            value={ tokenValue }
            placeholder={ placeholder }
            onChange={ handleTokenChange }
            suggestions={ postSuggestions }
        />
    );
};

export default MultiSelect;
