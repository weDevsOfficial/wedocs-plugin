// DESCRIPTION: Single FAQ group row component.
// Renders a draggable row with group title, actions, and expandable FAQ list.

import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import FaqConfirmDialog from './FaqConfirmDialog';
import AddFaqForm from './AddFaqForm';
import FaqItem from './FaqItem';
import AddFaqGroupModal from './AddFaqGroupModal';

const FaqGroupRow = ( { group, onGroupDuplicated, onGroupDeleted, onGroupUpdated } ) => {
    const [ isExpanded, setIsExpanded ] = useState( false );
    const [ isActive, setIsActive ] = useState( group.meta?.status !== false );
    const [ isToggling, setIsToggling ] = useState( false );
    const [ isDuplicating, setIsDuplicating ] = useState( false );
    const [ isDeleting, setIsDeleting ] = useState( false );
    const [ showDuplicateConfirm, setShowDuplicateConfirm ] = useState( false );
    const [ showDeleteConfirm, setShowDeleteConfirm ] = useState( false );
    const [ showAddForm, setShowAddForm ] = useState( false );
    const [ showEditModal, setShowEditModal ] = useState( false );
    const [ faqs, setFaqs ] = useState( [] );
    const [ faqsLoaded, setFaqsLoaded ] = useState( false );

    useEffect( () => {
        if ( isExpanded && ! faqsLoaded ) {
            apiFetch( {
                path: `/wp/v2/wedocs-faqs?wedocs-faq-groups=${ group.id }&per_page=100&orderby=menu_order&order=asc`,
            } ).then( ( data ) => {
                setFaqs( data );
                setFaqsLoaded( true );
            } ).catch( () => {
                setFaqsLoaded( true );
            } );
        }
    }, [ isExpanded, faqsLoaded, group.id ] );

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable( { id: group.id } );

    const style = {
        transform: CSS.Transform.toString( transform ),
        zIndex: isDragging ? 9999 : '',
        transition,
    };

    const toggleExpand = () => {
        setIsExpanded( ( prev ) => ! prev );
    };

    const handleToggle = async () => {
        if ( isToggling ) {
            return;
        }

        const nextStatus = ! isActive;
        setIsActive( nextStatus );
        setIsToggling( true );

        try {
            const updated = await apiFetch( {
                path: `/wp/v2/wedocs-faq-groups/${ group.id }`,
                method: 'POST',
                data: {
                    meta: { status: nextStatus },
                },
            } );

            if ( onGroupUpdated ) {
                onGroupUpdated( updated );
            }
        } catch {
            // Revert on failure.
            setIsActive( ! nextStatus );
        } finally {
            setIsToggling( false );
        }
    };

    const handleDuplicate = async () => {
        setIsDuplicating( true );

        try {
            // Create the new group.
            const duplicated = await apiFetch( {
                path: '/wp/v2/wedocs-faq-groups',
                method: 'POST',
                data: {
                    name: group.name + ' ' + __( '(Copy)', 'wedocs' ),
                    meta: {
                        icon: group.meta?.icon || 0,
                        status: isActive,
                    },
                },
            } );

            // Fetch all FAQs in the original group and clone them into the new group.
            const faqs = await apiFetch( {
                path: `/wp/v2/wedocs-faqs?wedocs-faq-groups=${ group.id }&per_page=100&orderby=menu_order&order=asc`,
            } );

            for ( const faq of faqs ) {
                await apiFetch( {
                    path: '/wp/v2/wedocs-faqs',
                    method: 'POST',
                    data: {
                        title: faq.title.raw,
                        content: faq.content.raw,
                        status: faq.status,
                        menu_order: faq.menu_order,
                        meta: {
                            _faq_open_by_default: faq.meta?._faq_open_by_default || false,
                        },
                        'wedocs-faq-groups': [ duplicated.id ],
                    },
                } );
            }

            if ( onGroupDuplicated ) {
                onGroupDuplicated( duplicated );
            }

            setShowDuplicateConfirm( false );
        } catch {
            // Silently fail — group list stays unchanged.
        } finally {
            setIsDuplicating( false );
        }
    };

    const handleDelete = async () => {
        setIsDeleting( true );

        try {
            await apiFetch( {
                path: `/wp/v2/wedocs-faq-groups/${ group.id }?force=true`,
                method: 'DELETE',
            } );

            if ( onGroupDeleted ) {
                onGroupDeleted( group.id );
            }
        } catch {
            setIsDeleting( false );
            setShowDeleteConfirm( false );
        }
    };

    return (
        <div
            ref={ setNodeRef }
            style={ style }
            { ...attributes }
            className={ `bg-white border border-gray-200 rounded-md ${ isDragging ? 'shadow-lg opacity-90' : '' }` }
        >
            <div className="flex items-center justify-between px-5 py-4">
                <div
                    onClick={ toggleExpand }
                    className="flex items-center flex-1 min-w-0 cursor-pointer"
                >
                    { /* Drag handle */ }
                    <button
                        { ...listeners }
                        onClick={ ( e ) => e.stopPropagation() }
                        className="cursor-grab mr-3 text-gray-400 hover:text-gray-600 flex-shrink-0"
                        aria-label={ __( 'Drag to reorder', 'wedocs' ) }
                    >
                        <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
                            <circle cx="2" cy="2" r="1.5" />
                            <circle cx="8" cy="2" r="1.5" />
                            <circle cx="2" cy="8" r="1.5" />
                            <circle cx="8" cy="8" r="1.5" />
                            <circle cx="2" cy="14" r="1.5" />
                            <circle cx="8" cy="14" r="1.5" />
                        </svg>
                    </button>

                    <span className="font-medium text-gray-800 truncate">
                        { group.name }
                    </span>
                </div>

                <div className="flex items-center space-x-3 flex-shrink-0">
                    { /* Add a New FAQ button */ }
                    <button
                        onClick={ () => {
                            setShowAddForm( true );
                            setIsExpanded( true );
                        } }
                        className="inline-flex items-center px-4 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                        { __( 'Add a New FAQ', 'wedocs' ) }
                    </button>

                    { /* Edit icon */ }
                    <button
                        onClick={ () => setShowEditModal( true ) }
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={ __( 'Edit FAQ group', 'wedocs' ) }
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </button>

                    { /* Duplicate icon */ }
                    <button
                        onClick={ () => setShowDuplicateConfirm( true ) }
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={ __( 'Duplicate FAQ group', 'wedocs' ) }
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                    </button>

                    { /* Delete icon */ }
                    <button
                        onClick={ () => setShowDeleteConfirm( true ) }
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={ __( 'Delete FAQ group', 'wedocs' ) }
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                    </button>

                    { /* Toggle switch */ }
                    <button
                        onClick={ handleToggle }
                        disabled={ isToggling }
                        className={ `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ isActive ? 'bg-indigo-600' : 'bg-gray-300' } ${ isToggling ? 'opacity-50 cursor-not-allowed' : '' }` }
                        aria-label={ __( 'Toggle FAQ group', 'wedocs' ) }
                    >
                        <span
                            className={ `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ isActive ? 'translate-x-6' : 'translate-x-1' }` }
                        />
                    </button>

                    { /* Expand/collapse chevron */ }
                    <button
                        onClick={ toggleExpand }
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={ __( 'Expand FAQ group', 'wedocs' ) }
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={ `transform transition-transform ${ isExpanded ? 'rotate-180' : '' }` }
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                </div>
            </div>

            { /* Expanded FAQ list area */ }
            { isExpanded && (
                <div className="border-t border-gray-200 px-5 py-4 space-y-3">
                    { faqs.length === 0 && ! showAddForm && (
                        <p className="text-sm text-gray-500 italic">
                            { __( 'No FAQs in this group yet. Click "Add a New FAQ" to get started.', 'wedocs' ) }
                        </p>
                    ) }

                    { faqs.map( ( faq ) => (
                        <FaqItem
                            key={ faq.id }
                            faq={ faq }
                            onFaqUpdated={ ( updated ) => {
                                setFaqs( ( prev ) =>
                                    prev.map( ( f ) => ( f.id === updated.id ? updated : f ) )
                                );
                            } }
                            onFaqDeleted={ ( id ) => {
                                setFaqs( ( prev ) => prev.filter( ( f ) => f.id !== id ) );
                            } }
                        />
                    ) ) }

                    { showAddForm && (
                        <AddFaqForm
                            groupId={ group.id }
                            onFaqCreated={ ( faq ) => {
                                setFaqs( ( prev ) => [ ...prev, faq ] );
                                setShowAddForm( false );
                            } }
                            onCancel={ () => setShowAddForm( false ) }
                        />
                    ) }
                </div>
            ) }

            { /* Duplicate confirmation dialog */ }
            <FaqConfirmDialog
                isOpen={ showDuplicateConfirm }
                onClose={ () => setShowDuplicateConfirm( false ) }
                onConfirm={ handleDuplicate }
                title={ __( 'Duplicate this FAQ group?', 'wedocs' ) }
                message={ __( 'This will create a copy of this FAQ group along with all the FAQs inside it.', 'wedocs' ) }
                confirmText={ __( 'Duplicate', 'wedocs' ) }
                processingText={ __( 'Duplicating...', 'wedocs' ) }
                isProcessing={ isDuplicating }
                icon={
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                    </div>
                }
            />

            { /* Delete confirmation dialog */ }
            <FaqConfirmDialog
                isOpen={ showDeleteConfirm }
                onClose={ () => setShowDeleteConfirm( false ) }
                onConfirm={ handleDelete }
                title={ __( 'Delete this FAQ group?', 'wedocs' ) }
                message={ __( 'This will permanently delete this FAQ group and all FAQs inside it. This action cannot be undone.', 'wedocs' ) }
                confirmText={ __( 'Delete', 'wedocs' ) }
                processingText={ __( 'Deleting...', 'wedocs' ) }
                confirmClassName="bg-red-600 hover:bg-red-700 text-white"
                isProcessing={ isDeleting }
                icon={
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                    </div>
                }
            />

            { /* Edit FAQ group modal */ }
            <AddFaqGroupModal
                editGroup={ group }
                isOpen={ showEditModal }
                onClose={ () => setShowEditModal( false ) }
                onGroupUpdated={ ( updated ) => {
                    setShowEditModal( false );
                    if ( onGroupUpdated ) {
                        onGroupUpdated( updated );
                    }
                } }
            />
        </div>
    );
};

export default FaqGroupRow;
