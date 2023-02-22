import docsStore from '../../data/docs';
import { __ } from '@wordpress/i18n';
import AddPostModal from '../AddPostModal';
import EmptyDocs from './EmptyDocs';
import ParentDocs from './ParentDocs';
import { useSelect } from '@wordpress/data';
import SearchFilter from '../SearchFilter';
import { useState, useEffect } from '@wordpress/element';
import DocsPlaceholder from './DocsPlaceholder';
import DraggableDocs from '../DraggableDocs';
import Upgrade from '../Upgrade';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import settingsStore from '../../data/settings';

const Documentations = () => {
  const parentDocs = useSelect(
    ( select ) => select( docsStore ).getParentDocs(),
    []
  );

  const loading = useSelect(
    ( select ) => select( docsStore ).getLoading(),
    []
  );

  const wedocsVersion = useSelect(
    ( select ) => select( settingsStore ).getWedocsVersion(),
    []
  );

  const upgradeVersion = useSelect(
    ( select ) => select( settingsStore ).getUpgradeVersion(),
    []
  );

  const [ searchValue, setSearchValue ] = useState( '' );

  const handleChange = ( event, reset = false ) => {
    if ( reset ) {
      setSearchValue( '' );
    } else {
      setSearchValue( event.target.value );
    }
  };

  const sortableDocs =
    parentDocs?.sort( ( a, b ) => a.menu_order - b.menu_order ) || [];

  const filteredDocs = sortableDocs?.filter( ( doc ) =>
    doc?.title?.rendered?.toLowerCase().includes( searchValue.toLowerCase() )
  );

  const [ documentations, setDocumentations ] = useState( [] );

  useEffect( () => {
    setDocumentations( [ ...filteredDocs ] );
  }, [ parentDocs, searchValue ] );

  return (
    <>
      <div className="documentation-header flex justify-between items-center my-7">
        <div className="flex items-center">
          <h1>{ __( 'All Docs', 'wedocs' ) }</h1>
          <AddPostModal className="ml-5 py-2 h-fit inline-flex items-center rounded-md border border-transparent bg-indigo-600 ease-in-out duration-200 px-4 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span className="dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-4 text-base flex items-center"></span>
            { __( `Add doc`, 'wedocs' ) }
          </AddPostModal>
        </div>
        <SearchFilter
          handleChange={ handleChange }
          searchValue={ searchValue }
        />
      </div>

      { ! loading && upgradeVersion > wedocsVersion && <Upgrade /> }

      <div
        role="list"
        className="documentation relative mx-auto grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
      >
        { ! loading && documentations.length > 0 && (
          <DraggableDocs setItems={ setDocumentations }>
            <SortableContext
              items={ documentations }
              strategy={ rectSortingStrategy }
            >
              { documentations?.map( ( doc ) => (
                <ParentDocs key={ doc.id } doc={ doc } />
              ) ) }
            </SortableContext>
          </DraggableDocs>
        ) }

        { loading && <DocsPlaceholder /> }
      </div>

      { ! loading && searchValue && documentations.length === 0 && (
        <h2 className="float-left text-lg mt-4">
          { __(
            'Your searching documentation not available at this moment…',
            'wedocs'
          ) }
        </h2>
      ) }

      { ! loading && parentDocs && ! parentDocs.length && <EmptyDocs /> }
    </>
  );
};

export default Documentations;
