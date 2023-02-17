import { useState } from '@wordpress/element';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ item }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable( { id: item.id } );

    const style = {
        transform: CSS.Transform.toString( transform ),
        transition,
    };

    return (
        <div className={ `grid-item ${ item.classed }` } ref={ setNodeRef } style={ style } { ...attributes } { ...listeners }>
            { item?.title?.rendered }
        </div>
    );
}

export default SortableItem;
