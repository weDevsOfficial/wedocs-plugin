// DESCRIPTION: Modal component for creating or editing a FAQ group.
// Opens a dialog with title input and icon upload fields.

import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { Dialog, Transition } from '@headlessui/react';
import apiFetch from '@wordpress/api-fetch';

const AddFaqGroupModal = ( {
    className,
    children,
    onGroupCreated,
    onGroupUpdated,
    editGroup = null,
    isOpen: externalIsOpen,
    onClose: externalOnClose,
} ) => {
    const isControlled = typeof externalIsOpen !== 'undefined';
    const [ internalIsOpen, setInternalIsOpen ] = useState( false );
    const isOpen = isControlled ? externalIsOpen : internalIsOpen;

    const [ title, setTitle ] = useState( '' );
    const [ icon, setIcon ] = useState( null );
    const [ formError, setFormError ] = useState( false );
    const [ isSubmitting, setIsSubmitting ] = useState( false );

    const isEditMode = !! editGroup;

    // Pre-fill form when editing.
    useEffect( () => {
        if ( isOpen && editGroup ) {
            setTitle( editGroup.name || '' );

            if ( editGroup.meta?.icon && editGroup.meta.icon > 0 ) {
                // Fetch the attachment to get URL.
                apiFetch( { path: `/wp/v2/media/${ editGroup.meta.icon }` } )
                    .then( ( media ) => {
                        setIcon( {
                            id: media.id,
                            url: media.source_url,
                            alt: media.alt_text || media.title?.rendered || '',
                        } );
                    } )
                    .catch( () => {
                        setIcon( null );
                    } );
            } else {
                setIcon( null );
            }
        }
    }, [ isOpen, editGroup ] );

    const closeModal = () => {
        if ( isControlled && externalOnClose ) {
            externalOnClose();
        } else {
            setInternalIsOpen( false );
        }
        setTitle( '' );
        setIcon( null );
        setFormError( false );
    };

    const openModal = () => {
        if ( ! isControlled ) {
            setInternalIsOpen( true );
        }
    };

    const onTitleChange = ( e ) => {
        setTitle( e.target.value );
        setFormError( e.target.value.length === 0 );
    };

    const openMediaUploader = () => {
        const mediaUploader = wp.media( {
            title: __( 'Select FAQ Group Icon', 'wedocs' ),
            button: { text: __( 'Use this icon', 'wedocs' ) },
            multiple: false,
            library: { type: [ 'image/svg+xml', 'image/png', 'image/jpeg', 'image/gif' ] },
        } );

        mediaUploader.on( 'select', () => {
            const attachment = mediaUploader.state().get( 'selection' ).first().toJSON();
            setIcon( {
                id: attachment.id,
                url: attachment.url,
                alt: attachment.alt || attachment.title,
            } );
        } );

        mediaUploader.open();
    };

    const removeIcon = () => {
        setIcon( null );
    };

    const handleSubmit = async () => {
        if ( title.trim() === '' ) {
            setFormError( true );
            return;
        }

        setIsSubmitting( true );

        try {
            if ( isEditMode ) {
                const updated = await apiFetch( {
                    path: `/wp/v2/wedocs-faq-groups/${ editGroup.id }`,
                    method: 'POST',
                    data: {
                        name: title.trim(),
                        meta: {
                            icon: icon ? icon.id : 0,
                        },
                    },
                } );

                if ( onGroupUpdated ) {
                    onGroupUpdated( updated );
                }
            } else {
                const group = await apiFetch( {
                    path: '/wp/v2/wedocs-faq-groups',
                    method: 'POST',
                    data: {
                        name: title.trim(),
                        meta: {
                            icon: icon ? icon.id : 0,
                        },
                    },
                } );

                if ( onGroupCreated ) {
                    onGroupCreated( group );
                }
            }

            closeModal();
        } catch ( error ) {
            setFormError( true );
        } finally {
            setIsSubmitting( false );
        }
    };

    return (
        <Fragment>
            { ! isControlled && (
                <button onClick={ openModal } className={ className }>
                    { children }
                </button>
            ) }

            <Transition appear show={ isOpen } as={ Fragment }>
                <Dialog as="div" className="wedocs-document relative z-[9999]" onClose={ closeModal }>
                    <Transition.Child
                        as={ Fragment }
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 z-[50]"></div>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto z-[9999]">
                        <div className="flex min-h-full items-center justify-center p-4 text-center z-[9999]">
                            <Transition.Child
                                as={ Fragment }
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all overflow-visible">
                                    <div className="flex items-center justify-between mb-6 border-b border-gray-200 px-8">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-bold text-gray-900"
                                        >
                                            { isEditMode
                                                ? __( 'Edit FAQ Group', 'wedocs' )
                                                : __( 'Create New FAQ Group', 'wedocs' )
                                            }
                                        </Dialog.Title>
                                        <button
                                            onClick={ closeModal }
                                            className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-1"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    <div className="p-8">
                                        <div className="mb-5">
                                            <label
                                                htmlFor="faq-group-title"
                                                className="block text-sm font-semibold text-gray-700 mb-2"
                                            >
                                                { __( 'FAQ Group Title', 'wedocs' ) }
                                            </label>
                                            <input
                                                type="text"
                                                id="faq-group-title"
                                                placeholder={ __( 'FAQ Group Title...', 'wedocs' ) }
                                                required
                                                className={ `${
                                                    formError
                                                        ? '!border-red-500 focus:ring-red-500 focus:border-red-500'
                                                        : '!border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                } h-11 bg-gray-50 text-gray-900 text-base !rounded-md block w-full !py-2 !px-3` }
                                                value={ title }
                                                onChange={ onTitleChange }
                                            />
                                            { formError && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    { __( 'Title is required.', 'wedocs' ) }
                                                </p>
                                            ) }
                                        </div>

                                        <div className="mb-6">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                { __( 'FAQ Group Icon', 'wedocs' ) }
                                            </label>
                                            { icon ? (
                                                <div className="relative inline-block border border-gray-200 rounded-lg p-4">
                                                    <img
                                                        src={ icon.url }
                                                        alt={ icon.alt }
                                                        className="w-20 h-20 object-contain"
                                                    />
                                                    <button
                                                        onClick={ removeIcon }
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none hover:bg-red-600"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={ openMediaUploader }
                                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 cursor-pointer bg-white"
                                                >
                                                    <span className="dashicons dashicons-cloud-upload text-gray-400 text-3xl mb-2"></span>
                                                    <span className="text-emerald-500 font-medium text-sm">
                                                        { __( 'Click to upload', 'wedocs' ) }
                                                    </span>
                                                    <span className="text-gray-400 text-xs mt-1">
                                                        { __( 'SVG, PNG, JPG or GIF', 'wedocs' ) }
                                                    </span>
                                                </button>
                                            ) }
                                        </div>

                                        <div className="flex items-center justify-end space-x-3.5">
                                            <button
                                                className="bg-white hover:bg-gray-50 text-red-500 font-medium text-base py-2 px-5 border border-red-300 rounded-md"
                                                onClick={ closeModal }
                                            >
                                                { __( 'Cancel', 'wedocs' ) }
                                            </button>
                                            <button
                                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-base py-2 px-5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={ handleSubmit }
                                                disabled={ isSubmitting }
                                            >
                                                { isSubmitting
                                                    ? ( isEditMode ? __( 'Saving...', 'wedocs' ) : __( 'Creating...', 'wedocs' ) )
                                                    : ( isEditMode ? __( 'Save Changes', 'wedocs' ) : __( 'Create FAQ Group', 'wedocs' ) )
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </Fragment>
    );
};

export default AddFaqGroupModal;
