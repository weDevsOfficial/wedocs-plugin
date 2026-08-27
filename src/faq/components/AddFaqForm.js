// DESCRIPTION: Inline form for creating a new FAQ item within a group.
// Contains a question text field and an answer textarea with cancel/create buttons.

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import TiptapEditor from './TiptapEditor';
import ToggleSwitch from './ToggleSwitch';
import { toastSuccess, toastError } from '../utils/toast';

const AddFaqForm = ( { groupId, nextMenuOrder = 0, onFaqCreated, onCancel } ) => {
    const [ question, setQuestion ] = useState( '' );
    const [ answer, setAnswer ] = useState( '' );
    const [ openByDefault, setOpenByDefault ] = useState( false );
    const [ isSubmitting, setIsSubmitting ] = useState( false );
    const [ errors, setErrors ] = useState( {} );

    const validate = () => {
        const newErrors = {};

        if ( question.trim() === '' ) {
            newErrors.question = __( 'Question is required.', 'wedocs' );
        }

        if ( answer.trim() === '' ) {
            newErrors.answer = __( 'Answer is required.', 'wedocs' );
        }

        setErrors( newErrors );
        return Object.keys( newErrors ).length === 0;
    };

    const handleSubmit = async () => {
        if ( ! validate() || isSubmitting ) {
            return;
        }

        setIsSubmitting( true );

        try {
            const faq = await apiFetch( {
                path: '/wp/v2/wedocs-faqs',
                method: 'POST',
                data: {
                    title: question.trim(),
                    content: answer.trim(),
                    status: 'publish',
                    // Without this the FAQ stores menu_order 0 and jumps to the
                    // top of every ordered list instead of landing at the end.
                    menu_order: nextMenuOrder,
                    'wedocs-faq-groups': [ groupId ],
                    meta: {
                        _faq_open_by_default: openByDefault,
                    },
                },
            } );

            if ( onFaqCreated ) {
                onFaqCreated( faq );
            }

            setQuestion( '' );
            setAnswer( '' );
            setOpenByDefault( false );
            setErrors( {} );
            toastSuccess(
                __( 'FAQ added!', 'wedocs' ),
                __( 'The new FAQ has been created.', 'wedocs' )
            );
        } catch ( error ) {
            const message =
                error?.message || __( 'Failed to create FAQ. Please try again.', 'wedocs' );

            setErrors( { submit: message } );
            toastError( message );
        } finally {
            setIsSubmitting( false );
        }
    };

    return (
        <div className="border border-gray-300 rounded-md p-5">
            <div className="mb-4">
                <label
                    htmlFor={ `faq-question-${ groupId }` }
                    className="block text-sm font-medium text-gray-600 mb-1.5"
                >
                    { __( 'Question', 'wedocs' ) }
                    <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                    type="text"
                    id={ `faq-question-${ groupId }` }
                    placeholder={ __( 'Add New Question', 'wedocs' ) }
                    value={ question }
                    onChange={ ( e ) => {
                        setQuestion( e.target.value );
                        if ( errors.question ) {
                            setErrors( ( prev ) => ( { ...prev, question: undefined } ) );
                        }
                    } }
                    className={ `w-full h-11 bg-gray-50 text-gray-900 text-base !rounded-md !py-2 !px-3 ${ errors.question ? '!border-red-500 focus:ring-red-500 focus:border-red-500' : '!border-gray-300 focus:ring-blue-500 focus:border-blue-500' }` }
                />
                { errors.question && (
                    <p className="mt-1 text-sm text-red-500">{ errors.question }</p>
                ) }
            </div>

            <div className="mb-5">
                <label
                    className="block text-sm font-medium text-gray-600 mb-1.5"
                >
                    { __( 'Answer', 'wedocs' ) }
                    <span className="text-red-500 ml-0.5">*</span>
                </label>
                <TiptapEditor
                    id={ `faq-answer-${ groupId }` }
                    content={ answer }
                    onChange={ ( html ) => {
                        setAnswer( html );
                        if ( errors.answer ) {
                            setErrors( ( prev ) => ( { ...prev, answer: undefined } ) );
                        }
                    } }
                    placeholder={ __( 'Write your Answer here.', 'wedocs' ) }
                    hasError={ !! errors.answer }
                />
                { errors.answer && (
                    <p className="mt-1 text-sm text-red-500">{ errors.answer }</p>
                ) }
            </div>

            { errors.submit && (
                <p className="mb-4 text-sm text-red-500">{ errors.submit }</p>
            ) }

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={ onCancel }
                        disabled={ isSubmitting }
                        className="bg-white hover:bg-gray-50 text-red-500 font-medium text-sm py-2 px-5 border border-red-300 rounded-md transition-colors"
                    >
                        { __( 'Cancel', 'wedocs' ) }
                    </button>
                    <button
                        onClick={ handleSubmit }
                        disabled={ isSubmitting }
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-2 px-5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        { isSubmitting
                            ? __( 'Creating...', 'wedocs' )
                            : __( 'Create', 'wedocs' )
                        }
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                        { __( 'Keep It Open By Default', 'wedocs' ) }
                    </span>
                    <ToggleSwitch
                        checked={ openByDefault }
                        onChange={ () => setOpenByDefault( ( prev ) => ! prev ) }
                        label={ __( 'Toggle open by default', 'wedocs' ) }
                    />
                </div>
            </div>
        </div>
    );
};

export default AddFaqForm;
