import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import {
  CheckIcon,
  ChevronUpDownIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { dispatch } from '@wordpress/data';
import docStore from '../data/docs';
import he from 'he';

const ComboBox = ( {
  type,
  docId,
  sections,
  isFormError,
  defaultSection,
  selectSectionId,
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

  const [ selectedSection, setSelectedSection ] = useState( defaultSection || '' );
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

  useEffect( () => {
    setNewSection( { ...newSection, menu_order: sections?.length } );
  }, [ sections ] );

  return (
    <Combobox
      as="div"
      value={ selectedSection }
      onChange={ setSelectedSection }
    >
      <div className="wedocs-relative wedocs-mb-5">
        <Combobox.Input
          placeholder={
            type && type === 'article' ? __( 'Type an article name', 'wedocs' ) :
            __( 'Type a section name', 'wedocs' )
          }
          required
          className={ `${
            isFormError
              ? '!wedocs-border-red-500 focus:wedocs-ring-red-500 focus:wedocs-border-red-500'
              : '!wedocs-border-gray-300 focus:wedocs-ring-blue-500 focus:wedocs-border-blue-500'
          } wedocs-h-11 wedocs-bg-gray-50 wedocs-text-gray-900 wedocs-text-base !wedocs-rounded-md wedocs-block wedocs-w-full !wedocs-py-2 !wedocs-px-3 dark:wedocs-bg-gray-600 dark:wedocs-border-gray-500 dark:wedocs-placeholder-gray-400 dark:wedocs-text-white` }
          onChange={ handleSectionTitle }
          displayValue={ ( title ) => he.decode( title ) }
        />

        { isFormError ? (
          <div className="wedocs-pointer-events-none wedocs-absolute wedocs-inset-y-0 wedocs-right-0 wedocs-flex wedocs-items-center wedocs-pr-3">
            <ExclamationCircleIcon
              className="wedocs-h-5 wedocs-w-5 wedocs-text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : (
          <Combobox.Button className="wedocs-absolute wedocs-inset-y-0 wedocs-right-0 wedocs-flex wedocs-items-center wedocs-rounded-r-md wedocs-px-2 focus:wedocs-outline-none">
            <ChevronUpDownIcon
              className="wedocs-h-5 wedocs-w-5 wedocs-text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        ) }

        <Combobox.Options className="wedocs-absolute wedocs-z-50 wedocs-mt-1 wedocs-max-h-60 wedocs-w-full wedocs-overflow-auto wedocs-rounded-md wedocs-bg-white wedocs-text-base wedocs-text-left wedocs-shadow-lg wedocs-ring-1 wedocs-ring-black wedocs-ring-opacity-5 focus:wedocs-outline-none sm:wedocs-text-sm">
          { filteredSections &&
            filteredSections.length > 0 &&
            filteredSections.map( ( section ) => (
              <Combobox.Option
                key={ section.id }
                value={ section.name }
                className={ ( { active } ) =>
                  classNames(
                    'wedocs-relative wedocs-cursor-pointer wedocs-select-none wedocs-py-2.5 wedocs-pl-3 wedocs-pr-9 wedocs-mb-0',
                    active ? 'wedocs-bg-indigo-600 wedocs-text-white' : 'wedocs-text-gray-900'
                  )
                }
                onClick={ () => handleOptionSet( section.id ) }
              >
                { ( { active, selected } ) => (
                  <>
                    <span
                      className={ classNames(
                        'wedocs-block wedocs-truncate',
                        selected && 'wedocs-font-semibold'
                      ) }
                      dangerouslySetInnerHTML={ {
                        __html: section?.name,
                      } }
                    ></span>

                    { selected && (
                      <span
                        className={ classNames(
                          'wedocs-absolute wedocs-inset-y-0 wedocs-right-0 wedocs-flex wedocs-items-center wedocs-pr-4',
                          active ? 'wedocs-text-white' : 'wedocs-text-indigo-600'
                        ) }
                      >
                        <CheckIcon className="wedocs-h-5 wedocs-w-5" aria-hidden="true" />
                      </span>
                    ) }
                  </>
                ) }
              </Combobox.Option>
            ) ) }

          <Combobox.Option
            className="wedocs-flex wedocs-items-center wedocs-bg-gray-100 wedocs-relative wedocs-cursor-pointer wedocs-text-base wedocs-text-indigo-600 wedocs-mb-0 wedocs-select-none wedocs-py-2 wedocs-pl-3 wedocs-pr-9"
            value={ newSection?.title?.raw }
            onClick={ handleArticleSection }
          >
            { sectionTitle ? (
              <>
                <span className="dashicons dashicons-plus wedocs-text-xs wedocs-mt-1.5"></span>
                { sectionTitle }
              </>
            ) : (
              <>
                { type && type === 'article' ? __( 'Type to write the name of new article', 'wedocs' ) :
                  __( 'Type to write the name of new section', 'wedocs' )
                }
              </>
            ) }
          </Combobox.Option>
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default ComboBox;
