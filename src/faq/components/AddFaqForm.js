// DESCRIPTION: Inline form for creating a new FAQ item within a group.
// Contains a question text field and an answer textarea with cancel/create buttons.

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import TiptapEditor from './TiptapEditor';

const AddFaqForm = ( { groupId, onFaqCreated, onCancel } ) => {
    const [ question, setQuestion ] = useState( '' );
    const [ answer, setAnswer ] = useState( '' );
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
                    'wedocs-faq-groups': [ groupId ],
                },
            } );

            if ( onFaqCreated ) {
                onFaqCreated( faq );
            }

            setQuestion( '' );
            setAnswer( '' );
            setErrors( {} );
        } catch {
            setErrors( { submit: __( 'Failed to create FAQ. Please try again.', 'wedocs' ) } );
        } finally {
            setIsSubmitting( false );
        }
    };

    return (
        <div className="bg-gray-50 rounded-md p-5">
            <div className="mb-4">
                <label
                    htmlFor={ `faq-question-${ groupId }` }
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
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
                    className={ `w-full h-11 bg-white text-gray-900 text-base !rounded-md !py-2 !px-3 ${ errors.question ? '!border-red-500' : '!border-gray-300' }` }
                />
                { errors.question && (
                    <p className="mt-1 text-sm text-red-500">{ errors.question }</p>
                ) }
            </div>

            <div className="mb-5">
                <label
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
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
        </div>
    );
};

export default AddFaqForm;
