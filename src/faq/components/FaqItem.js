// DESCRIPTION: Single FAQ item component with collapsed/expanded edit mode.
// Clicking expands inline editing for question, answer, and open-by-default toggle.

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
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

    if ( ! isEditing ) {
        return (
            <div
                onClick={ () => setIsEditing( true ) }
                className="bg-white border border-gray-200 rounded-md p-4 cursor-pointer hover:border-gray-300 transition-colors flex items-center justify-between"
            >
                <h4 className="font-medium text-gray-800 text-sm p-0 m-0">
                    { faq.title.rendered }
                </h4>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 flex-shrink-0 ml-3"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-md">
            <div className="p-5">
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

                <div className="flex items-center space-x-3">
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
                        className="ml-auto text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        aria-label={ __( 'Delete FAQ', 'wedocs' ) }
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                    </button>
                </div>
            </div>

            { /* Footer with open-by-default toggle */ }
            <div className="border-t border-gray-200 px-5 py-3 flex items-center justify-between">
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
