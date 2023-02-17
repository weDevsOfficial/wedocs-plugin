import {useState} from '@wordpress/element';

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

import ParentDocs from "./Documentations/ParentDocs";
import {dispatch} from "@wordpress/data";
import docsStore from "../data/docs";
import DocSections from "./DocListing/DocSections";
import SectionArticles from "./DocListing/SectionArticles";

const DraggableDocs = ({docs, docType, searchValue}) => {
    const [items, setItems] = useState(docs);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            // Require the mouse to move by 10 pixels before activating
            activationConstraint: {
                delay: 150,
                tolerance: 5,
            },
        }),

        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const {active, over} = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldItem = items.find(item => item.id === active.id);
                const newItem = items.find(item => item.id === over.id);

                const oldIndex = items.indexOf(oldItem);
                const newIndex = items.indexOf(newItem);

                const updatedOrder = arrayMove(items, oldIndex, newIndex);

                updatedOrder.forEach((item, index) => {
                    dispatch(docsStore)
                        .updateDoc(item.id, {menu_order: index})
                        .then((result) => {
                        })
                        .catch((err) => {
                        });
                });

                return updatedOrder;
            });
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={rectSortingStrategy}
            >
                {/*{ children }*/}
                {/*{ items.map( item =>*/}
                {/*    docType === 'Documentation' ? ( <ParentDocs key={ item.id } doc={ item } /> ) :*/}
                {/*    ( docType === 'Section' ? ( <DocSections key={ item.id } sections={ items } section={ item } searchValue={ searchValue } /> ) :*/}
                {/*    ( <SectionArticles key={ item.id } article={ item }/> )*/}
                {/*) ) }*/}

                {items.map(item => <ParentDocs key={item.id} doc={item}/>)}
            </SortableContext>
        </DndContext>
    );
};

export default DraggableDocs;
