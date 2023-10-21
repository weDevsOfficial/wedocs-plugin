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

const DraggableDocs = ( { setItems, children, setNeedSortingStatus } ) => {
  const sensors = useSensors(
    useSensor( PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    } )
  );

  const handleDragEnd = ( event ) => {
    const { active, over } = event;

    if ( active?.id !== over?.id ) {
      setItems( ( elements ) => {
        const oldItem = elements.find(
          ( element ) => element?.id === active?.id
        );

        const newItem = elements.find(
          ( element ) => element?.id === over?.id
        );
        const oldIndex = elements.indexOf( oldItem );
        const newIndex = elements.indexOf( newItem );
        const updatedOrder = arrayMove( elements, oldIndex, newIndex );

        { updatedOrder &&
          dispatch( docsStore )
            ?.updateNeedSortingStatus( { need_sortable_status: true } )
            ?.then( ( result ) => {
              setNeedSortingStatus( result?.needSorting );
            } );
        }

        return updatedOrder;
      } );
    }
  };

  return (
    <DndContext
      sensors={ sensors }
      collisionDetection={ closestCenter }
      onDragEnd={ handleDragEnd }
      class="z-10"
    >
      { children }
    </DndContext>
  );
};

export default DraggableDocs;
