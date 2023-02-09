import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox, Dialog } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { dispatch } from "@wordpress/data";
import docStore from "../data/docs";

const ComboBox2 = ({ sections }) => {
    const { id } = useParams();

    const docSections = sections.map( ( section ) => ( {
        id: section.id,
        name: section?.title?.rendered,
    } ) );

    const [ newSection, setNewSection ] = useState( {
        title: { raw: '' },
        parent: parseInt( id ),
        status: 'publish',
    } );

    const [ selectedSection, setSelectedSection ] = useState( docSections[0] );
    const [ sectionTitle, setSectionTitle ] = useState( '' );

    const filteredSections =
        sectionTitle === ''
            ? docSections
            : docSections.filter( ( section ) => {
                return section?.name.toLowerCase().includes( sectionTitle.toLowerCase() );
            } )

    const handleArticleSection = () => {
        if ( newSection?.title?.raw === '' ) {
            return;
        }

        dispatch( docStore )
            .createDoc( newSection )
            .then( ( result ) => {
                setNewSection( { ...newSection, title: { raw: '' } } );
            } )
            .catch( ( err ) => { console.log( result ); } );
    };

    const handleSectionTitle = ( e ) => {
        setSectionTitle( e.target.value );
        setNewSection( { ...newSection, title: { raw: e.target.value } } )
    };

    return (
        <Combobox value={ selectedSection } onChange={ setSelectedSection }>
            <Combobox.Input
                placeholder={ __( 'Type a section name', 'wedocs' ) }
                required
                className="h-11 bg-gray-50 cursor-pointer !border-gray-300 text-gray-900 text-base !rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full !py-2 !px-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                onChange={ handleSectionTitle }
            />
            <Combobox.Options>
                { filteredSections.map( ( section ) => (
                    <Combobox.Option key={ section.id } value={ section.name }>
                        { section.name }
                    </Combobox.Option>
                ))}

                <Combobox.Option
                    className="flex items-center bg-gray-100 relative cursor-pointer text-base text-indigo-600 mb-0 select-none py-2 pl-3 pr-9"
                    value={ newSection?.title?.raw }
                    onClick={ handleArticleSection }
                >
                    <span className="dashicons dashicons-plus text-xs mt-1.5"></span>
                    { sprintf( __( 'Create "%s" as a new section', 'wedocs' ), sectionTitle ? sectionTitle : 'How to use' ) }
                </Combobox.Option>
            </Combobox.Options>
        </Combobox>
    );
}

export default ComboBox2;
