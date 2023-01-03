import Section from "./Section";
import DocHeader from "./DocHeader";
import AddSection from "./AddSection";
import {useEffect, useState} from '@wordpress/element';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TestDragFeature = ({ docs }) => {
    const [ documentation, setDocumentation ] = useState( [] );

    const handleOnDragEnd = ( result ) => {
        if ( ! result.destination ){
            return;
        }

        const items           = Array.from( documentation ),
            [ reorderedItem ] = items.splice( result.source.index, 1 );

        items.splice( result.destination.index, 0, reorderedItem );
        setDocumentation( items );
    }

    useEffect(() => {
        if (!docs) { return}
        setDocumentation( docs );
    }, [docs]);

    return (
        <>
            { documentation.length > 0 && <DragDropContext onDragEnd={ handleOnDragEnd }>
                <Droppable droppableId="documentation">
                    { ( provided ) => (
                        <ul className="docs ui-sortable loaded" { ...provided.droppableProps } ref={ provided.innerRef }>
                            { documentation && documentation.map( ( doc, index ) => {
                                return (
                                    <Draggable key={ doc.id } draggableId={ String(doc.id) } index={ index }>
                                        { ( provided ) => (
                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="single-doc">
                                                <DocHeader doc={ doc } />
                                                <Section docID={ doc.id } />
                                                <AddSection />
                                            </li>
                                        ) }
                                    </Draggable>
                                );
                            } ) }
                        </ul>
                    ) }
                </Droppable>
            </DragDropContext> }
        </>
    );
}

export default TestDragFeature;
