import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import {
  CheckIcon,
  ChevronUpDownIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid';
import { Combobox, Dialog } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { dispatch } from '@wordpress/data';
import docStore from '../data/docs';

const ComboBox = ( {
  sections,
  defaultSection,
  selectSectionId,
  isFormError,
  docId,
} ) => {
  const { id } = useParams();

  const classNames = ( ...classes ) => {
    return classes.filter( Boolean ).join( ' ' );
  };

  const docSections = sections.map( ( section ) => ( {
    id: section.id,
    name: section?.title?.rendered,
  } ) );

  const [ newSection, setNewSection ] = useState( {
    title: { raw: '' },
    parent: parseInt( docId ? docId : id ),
    status: 'publish',
  } );

  const [ selectedSection, setSelectedSection ] = useState(
    defaultSection || ''
  );
  const [ sectionTitle, setSectionTitle ] = useState( '' );

  const filteredSections =
    sectionTitle === ''
      ? docSections
      : docSections.filter( ( section ) => {
          return section?.name
            .toLowerCase()
            .includes( sectionTitle.toLowerCase() );
        } );

  const handleArticleSection = () => {
    if ( newSection?.title?.raw === '' ) {
      return;
    }

    dispatch( docStore )
      .createDoc( newSection )
      .then( ( result ) => {
        selectSectionId( result.id );
        setNewSection( { ...newSection, title: { raw: '' } } );
      } )
      .catch( ( err ) => {} );
  };

  const handleOptionSet = ( sectionId ) => {
    selectSectionId( sectionId );
  };

  const handleSectionTitle = ( e ) => {
    setSectionTitle( e.target.value );
    setNewSection( { ...newSection, title: { raw: e.target.value } } );
  };

  return (
    <Combobox
      as="div"
      value={ selectedSection }
      onChange={ setSelectedSection }
    >
      <div className="relative mb-5">
        <Combobox.Input
          placeholder={ __( 'Type a section name', 'wedocs' ) }
          required
          className={ `${
            isFormError
              ? '!border-red-500 focus:ring-red-500 focus:border-red-500'
              : '!border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } h-11 bg-gray-50 text-gray-900 text-base !rounded-md block w-full !py-2 !px-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white` }
          onChange={ handleSectionTitle }
        />

        { isFormError ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : (
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        ) }

        <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base text-left shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          { filteredSections &&
            filteredSections.length > 0 &&
            filteredSections.map( ( section ) => (
              <Combobox.Option
                key={ section.id }
                value={ section.name }
                className={ ( { active } ) =>
                  classNames(
                    'relative cursor-pointer select-none py-2.5 pl-3 pr-9 mb-0',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
                onClick={ () => handleOptionSet( section.id ) }
              >
                { ( { active, selected } ) => (
                  <>
                    <span
                      className={ classNames(
                        'block truncate',
                        selected && 'font-semibold'
                      ) }
                      dangerouslySetInnerHTML={ {
                        __html: section?.name,
                      } }
                    ></span>

                    { selected && (
                      <span
                        className={ classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        ) }
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) }
                  </>
                ) }
              </Combobox.Option>
            ) ) }

          <Combobox.Option
            className="flex items-center bg-gray-100 relative cursor-pointer text-base text-indigo-600 mb-0 select-none py-2 pl-3 pr-9"
            value={ newSection?.title?.raw }
            onClick={ handleArticleSection }
          >
            <span className="dashicons dashicons-plus text-xs mt-1.5"></span>
            { sprintf(
              __( 'Create "%s" as a new section', 'wedocs' ),
              sectionTitle ? sectionTitle : 'How to use'
            ) }
          </Combobox.Option>
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default ComboBox;
