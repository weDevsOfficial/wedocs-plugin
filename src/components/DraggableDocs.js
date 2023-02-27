import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { arrayMove } from '@dnd-kit/sortable';

import { dispatch } from '@wordpress/data';
import docsStore from '../data/docs';

const DraggableDocs = ( { setItems, children } ) => {
  const sensors = useSensors(
    useSensor( PointerSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    } )
  );

  const handleDragEnd = ( event ) => {
    const { active, over } = event;

    if ( active.id !== over.id ) {
      setItems( ( elements ) => {
        const oldItem = elements.find(
          ( element ) => element.id === active.id
        );
        const newItem = elements.find( ( element ) => element.id === over.id );

        const oldIndex = elements.indexOf( oldItem );
        const newIndex = elements.indexOf( newItem );

        const updatedOrder = arrayMove( elements, oldIndex, newIndex );

        updatedOrder.forEach( ( doc, index ) => {
          dispatch( docsStore )
            .updateDoc( doc.id, { menu_order: index } )
            .then( ( result ) => {} )
            .catch( ( err ) => {} );
        } );

        return updatedOrder;
      } );
    }
  };

  return (
    <DndContext
      sensors={ sensors }
      collisionDetection={ closestCenter }
      onDragEnd={ handleDragEnd }
    >
      { children }
    </DndContext>
  );
};

export default DraggableDocs;
