import { useState, useEffect } from '@wordpress/element';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import ParentDocs from './Documentations/ParentDocs';
import { dispatch } from '@wordpress/data';
import docsStore from '../data/docs';
import DocSections from './DocListing/DocSections';
import SectionArticles from './DocListing/SectionArticles';

const DraggableDocs = ( { docs, docType } ) => {
  const [ items, setItems ] = useState( [ ...docs ] );

  console.log( 'nextFilter:', items, docs );

  const sensors = useSensors(
    useSensor( PointerSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    } ),

    useSensor( KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
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

        // const arr = [];
        updatedOrder.forEach( ( doc, index ) => {
          dispatch( docsStore )
            .updateDoc( doc.id, { menu_order: index } )
            .then( ( result ) => {
              // arr.push( result );
              // console.log( arr );
              // setAllDocs( arr );
            } )
            .catch( ( err ) => {} );
        } );

        return updatedOrder;
      } );
    }
  };

  useEffect( () => {
    setItems( [ ...docs ] );
  }, [ docs ] );

  return (
    <DndContext
      sensors={ sensors }
      collisionDetection={ closestCenter }
      onDragEnd={ handleDragEnd }
    >
      <SortableContext items={ items } strategy={ rectSortingStrategy }>
        { /*{ children }*/ }
        { /*{ items.map( item =>*/ }
        { /*    docType === 'Documentation' ? ( <ParentDocs key={ item.id } doc={ item } /> ) :*/ }
        { /*    ( docType === 'Section' ? ( <DocSections key={ item.id } sections={ items } section={ item } searchValue={ searchValue } /> ) :*/ }
        { /*    ( <SectionArticles key={ item.id } article={ item }/> )*/ }
        { /*) ) }*/ }

        { items.map( ( item ) => (
          <ParentDocs key={ item.id } doc={ item } />
        ) ) }
      </SortableContext>
    </DndContext>
  );
};

export default DraggableDocs;
