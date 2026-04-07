// DESCRIPTION: Main FAQ app component.
// Renders the FAQ page header, groups list, and empty state.

import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import EmptyFaq from './EmptyFaq';
import AddFaqGroupModal from './AddFaqGroupModal';
import FaqGroupRow from './FaqGroupRow';

const FaqApp = () => {
    const [ groups, setGroups ] = useState( [] );
    const [ isLoading, setIsLoading ] = useState( true );

    const sensors = useSensors(
        useSensor( PointerSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 5,
            },
        } )
    );

    const fetchGroups = async () => {
        try {
            const data = await apiFetch( {
                path: '/wp/v2/wedocs-faq-groups?per_page=100',
            } );
            setGroups( data );
        } catch {
            setGroups( [] );
        } finally {
            setIsLoading( false );
        }
    };

    useEffect( () => {
        fetchGroups();
    }, [] );

    const handleGroupCreated = ( group ) => {
        setGroups( ( prev ) => [ ...prev, group ] );
    };

    const handleGroupDuplicated = ( group ) => {
        setGroups( ( prev ) => [ ...prev, group ] );
    };

    const handleGroupDeleted = ( groupId ) => {
        setGroups( ( prev ) => prev.filter( ( g ) => g.id !== groupId ) );
    };

    const handleGroupUpdated = ( updated ) => {
        setGroups( ( prev ) =>
            prev.map( ( g ) => ( g.id === updated.id ? updated : g ) )
        );
    };

    const handleDragEnd = ( event ) => {
        const { active, over } = event;

        if ( ! over || active.id === over.id ) {
            return;
        }

        setGroups( ( prev ) => {
            const oldIndex = prev.findIndex( ( g ) => g.id === active.id );
            const newIndex = prev.findIndex( ( g ) => g.id === over.id );

            return arrayMove( prev, oldIndex, newIndex );
        } );
    };

    return (
        <>
            <div className="faq-header my-7">
                <h1 className="w-full !flex items-center justify-between">
                    { __( 'All FAQs', 'wedocs' ) }
                    <AddFaqGroupModal
                        onGroupCreated={ handleGroupCreated }
                        className="ml-5 mr-auto py-2 h-fit inline-flex items-center rounded-md border border-transparent bg-indigo-600 ease-in-out duration-200 px-4 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-2 text-base flex items-center"></span>
                        { __( 'New FAQ', 'wedocs' ) }
                    </AddFaqGroupModal>
                </h1>
            </div>

            { ! isLoading && groups.length === 0 && <EmptyFaq onGroupCreated={ handleGroupCreated } /> }

            { ! isLoading && groups.length > 0 && (
                <DndContext
                    sensors={ sensors }
                    collisionDetection={ closestCenter }
                    onDragEnd={ handleDragEnd }
                >
                    <SortableContext
                        items={ groups.map( ( g ) => g.id ) }
                        strategy={ verticalListSortingStrategy }
                    >
                        <div className="space-y-3">
                            { groups.map( ( group ) => (
                                <FaqGroupRow
                                key={ group.id }
                                group={ group }
                                onGroupDuplicated={ handleGroupDuplicated }
                                onGroupDeleted={ handleGroupDeleted }
                                onGroupUpdated={ handleGroupUpdated }
                            />
                            ) ) }
                        </div>
                    </SortableContext>
                </DndContext>
            ) }
        </>
    );
};

export default FaqApp;
