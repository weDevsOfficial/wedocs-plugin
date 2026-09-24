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
import { toastError } from '../utils/toast';
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
        } catch ( error ) {
            setGroups( [] );
            toastError( error, __( 'Could not load the FAQ groups. Please reload the page.', 'wedocs' ) );
        } finally {
            setIsLoading( false );
        }
    };

    useEffect( () => {
        fetchGroups();
    }, [] );

    const handleGroupAdded = ( group ) => {
        const newOrder = groups.length;

        setGroups( ( prev ) => [
            ...prev,
            { ...group, meta: { ...group.meta, order: newOrder } },
        ] );

        // Persist the order meta so the group appears at the end.
        apiFetch( {
            path: `/wp/v2/wedocs-faq-groups/${ group.id }`,
            method: 'POST',
            data: { meta: { order: newOrder } },
        } ).catch( ( error ) => {
            // The group exists either way; only its position is at risk.
            toastError( error, __( 'The group was created but its position could not be saved.', 'wedocs' ) );
        } );
    };

    const handleGroupDeleted = ( groupId ) => {
        setGroups( ( prev ) => prev.filter( ( g ) => g.id !== groupId ) );
    };

    const handleGroupUpdated = ( updated ) => {
        setGroups( ( prev ) =>
            prev.map( ( g ) => ( g.id === updated.id ? updated : g ) )
        );
    };

    const persistGroupOrder = async ( ordered ) => {
        const results = await Promise.allSettled(
            ordered.map( ( group, index ) =>
                apiFetch( {
                    path: `/wp/v2/wedocs-faq-groups/${ group.id }`,
                    method: 'POST',
                    data: { meta: { order: index } },
                } )
            )
        );

        const failed = results.find( ( result ) => result.status === 'rejected' );

        if ( failed ) {
            toastError(
                failed.reason,
                __( 'The new order could not be saved and will reset when you reload.', 'wedocs' )
            );
        }
    };

    const handleDragEnd = ( event ) => {
        const { active, over } = event;

        if ( ! over || active.id === over.id ) {
            return;
        }

        const oldIndex = groups.findIndex( ( g ) => g.id === active.id );
        const newIndex = groups.findIndex( ( g ) => g.id === over.id );

        if ( oldIndex === -1 || newIndex === -1 ) {
            return;
        }

        const reordered = arrayMove( groups, oldIndex, newIndex );

        setGroups( reordered );
        persistGroupOrder( reordered );
    };

    return (
        <>
            <div className="faq-header my-7">
                <h1 className="w-full !flex items-center justify-between">
                    { __( 'All FAQs', 'wedocs' ) }
                    <AddFaqGroupModal
                        onGroupCreated={ handleGroupAdded }
                        className="ml-5 mr-auto py-2 h-fit inline-flex items-center rounded-md border border-transparent bg-indigo-600 ease-in-out duration-200 px-4 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-2 text-base flex items-center"></span>
                        { __( 'New FAQ Group', 'wedocs' ) }
                    </AddFaqGroupModal>
                </h1>
            </div>

            { ! isLoading && groups.length === 0 && <EmptyFaq onGroupCreated={ handleGroupAdded } /> }

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
                                onGroupDuplicated={ handleGroupAdded }
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
