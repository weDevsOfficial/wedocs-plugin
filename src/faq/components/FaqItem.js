// DESCRIPTION: Single FAQ item component with collapsed/expanded edit mode.
// Clicking expands inline editing for question, answer, and open-by-default toggle.

import { __ } from '@wordpress/i18n';
import { useState, useRef, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TiptapEditor from './TiptapEditor';
import FaqConfirmDialog from './FaqConfirmDialog';

const FaqItem = ( { faq, onFaqUpdated, onFaqDeleted } ) => {
    const [ isEditing, setIsEditing ] = useState( false );
    const [ question, setQuestion ] = useState( faq.title.rendered );
    const [ answer, setAnswer ] = useState( faq.content.rendered );
    const [ openByDefault, setOpenByDefault ] = useState( faq.meta?._faq_open_by_default || false );
    const [ isSaving, setIsSaving ] = useState( false );
    const [ isDeleting, setIsDeleting ] = useState( false );
    const [ showDeleteConfirm, setShowDeleteConfirm ] = useState( false );
    const [ editHeight, setEditHeight ] = useState( '0px' );
    const editRef = useRef( null );

    useEffect( () => {
        const el = editRef.current;
        if ( ! el ) {
            return;
        }

        if ( isEditing ) {
            setEditHeight( `${ el.scrollHeight }px` );

            const onEnd = () => {
                setEditHeight( 'none' );
                el.removeEventListener( 'transitionend', onEnd );
            };
            el.addEventListener( 'transitionend', onEnd );

            return () => el.removeEventListener( 'transitionend', onEnd );
        }

        setEditHeight( `${ el.scrollHeight }px` );
        void el.offsetHeight;
        setEditHeight( '0px' );
    }, [ isEditing ] );

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable( { id: faq.id } );

    const style = {
        transform: CSS.Transform.toString( transform ),
        zIndex: isDragging ? 9999 : '',
        transition,
    };

    const handleSave = async () => {
        if ( question.trim() === '' || isSaving ) {
            return;
        }

        setIsSaving( true );

        try {
            const updated = await apiFetch( {
                path: `/wp/v2/wedocs-faqs/${ faq.id }`,
                method: 'POST',
                data: {
                    title: question.trim(),
                    content: answer.trim(),
                    meta: {
                        _faq_open_by_default: openByDefault,
                    },
                },
            } );

            if ( onFaqUpdated ) {
                onFaqUpdated( updated );
            }

            setIsEditing( false );
        } catch {
            // Stay in edit mode on failure.
        } finally {
            setIsSaving( false );
        }
    };

    const handleDelete = async () => {
        if ( isDeleting ) {
            return;
        }

        setIsDeleting( true );

        try {
            await apiFetch( {
                path: `/wp/v2/wedocs-faqs/${ faq.id }?force=true`,
                method: 'DELETE',
            } );

            if ( onFaqDeleted ) {
                onFaqDeleted( faq.id );
            }
        } catch {
            setIsDeleting( false );
        }
    };

    const handleCancel = () => {
        setQuestion( faq.title.rendered );
        setAnswer( faq.content.rendered );
        setOpenByDefault( faq.meta?._faq_open_by_default || false );
        setIsEditing( false );
    };

    const handleToggleOpenByDefault = async ( nextValue ) => {
        setOpenByDefault( nextValue );

        try {
            const updated = await apiFetch( {
                path: `/wp/v2/wedocs-faqs/${ faq.id }`,
                method: 'POST',
                data: {
                    meta: { _faq_open_by_default: nextValue },
                },
            } );

            if ( onFaqUpdated ) {
                onFaqUpdated( updated );
            }
        } catch {
            // Revert on failure.
            setOpenByDefault( ! nextValue );
        }
    };

    return (
        <div
            ref={ setNodeRef }
            style={ style }
            { ...attributes }
            className={ `border border-gray-200 rounded-md ${ isEditing ? 'bg-gray-50' : 'cursor-pointer hover:border-gray-300' } transition-colors ${ isDragging ? 'shadow-lg opacity-90' : '' }` }
        >
            { /* Collapsed header — always visible */ }
            <div className="flex items-center justify-between">
                { /* Drag handle */ }
                <button
                    { ...listeners }
                    onClick={ ( e ) => e.stopPropagation() }
                    className="cursor-grab text-gray-400 hover:text-gray-600 flex-shrink-0 px-4"
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
                <div className="flex items-center flex-1 min-w-0">
                    <h4
                        onClick={ () => setIsEditing( ( prev ) => ! prev ) }
                        className="font-medium text-gray-800 text-sm flex-1 truncate !m-0 py-4"
                    >
                        { faq.title.rendered }
                    </h4>
                </div>
                <div
                    onClick={ () => setIsEditing( ( prev ) => ! prev ) }
                    className="flex-shrink-0 ml-3 px-4"
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
                        className={ `text-gray-400 transform transition-transform duration-300 ${ isEditing ? 'rotate-180' : '' }` }
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </div>

            { /* Expandable edit area with smooth transition */ }
            <div
                ref={ editRef }
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={ { maxHeight: isEditing ? editHeight : '0px' } }
            >
                <div className="border-t border-gray-200 p-5">
                    <div className="mb-4">
                        <label
                            htmlFor={ `faq-edit-question-${ faq.id }` }
                            className="block text-sm font-semibold text-gray-700 mb-1.5"
                        >
                            { __( 'Question', 'wedocs' ) }
                            <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                            type="text"
                            id={ `faq-edit-question-${ faq.id }` }
                            value={ question }
                            onChange={ ( e ) => setQuestion( e.target.value ) }
                            className="w-full h-11 bg-white text-gray-900 text-base !rounded-md !py-2 !px-3 !border-gray-300"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            className="block text-sm font-semibold text-gray-700 mb-1.5"
                        >
                            { __( 'Answer', 'wedocs' ) }
                        </label>
                        <TiptapEditor
                            id={ `faq-edit-answer-${ faq.id }` }
                            content={ answer }
                            onChange={ ( html ) => setAnswer( html ) }
                            placeholder={ __( 'Write your answer here...', 'wedocs' ) }
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={ handleCancel }
                                disabled={ isSaving }
                                className="bg-white hover:bg-gray-50 text-red-500 font-medium text-sm py-2 px-5 border border-red-300 rounded-md transition-colors"
                            >
                                { __( 'Cancel', 'wedocs' ) }
                            </button>
                            <button
                                onClick={ handleSave }
                                disabled={ isSaving || question.trim() === '' }
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-2 px-5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                { isSaving
                                    ? __( 'Saving...', 'wedocs' )
                                    : __( 'Save', 'wedocs' )
                                }
                            </button>
                            <button
                                onClick={ () => setShowDeleteConfirm( true ) }
                                disabled={ isDeleting }
                                className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 p-1"
                                aria-label={ __( 'Delete FAQ', 'wedocs' ) }
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                                { __( 'Keep It Open By Default', 'wedocs' ) }
                            </span>
                            <button
                                onClick={ () => handleToggleOpenByDefault( ! openByDefault ) }
                                className={ `relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${ openByDefault ? 'bg-indigo-600' : 'bg-gray-300' }` }
                                aria-label={ __( 'Toggle open by default', 'wedocs' ) }
                            >
                                <span
                                    className={ `inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${ openByDefault ? 'translate-x-[18px]' : 'translate-x-0.5' }` }
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <FaqConfirmDialog
                isOpen={ showDeleteConfirm }
                onClose={ () => setShowDeleteConfirm( false ) }
                onConfirm={ () => {
                    setShowDeleteConfirm( false );
                    handleDelete();
                } }
                title={ __( 'Delete FAQ', 'wedocs' ) }
                message={ __( 'Are you sure you want to delete this FAQ? This action cannot be undone.', 'wedocs' ) }
                confirmText={ __( 'Delete', 'wedocs' ) }
                confirmClassName="bg-red-600 hover:bg-red-700 text-white"
                isProcessing={ isDeleting }
                processingText={ __( 'Deleting...', 'wedocs' ) }
                icon={
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                }
            />
        </div>
    );
};

export default FaqItem;
