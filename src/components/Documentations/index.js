import docsStore from '../../data/docs';
import { __ } from '@wordpress/i18n';
import AddDocModal from '../AddDocModal';
import EmptyDocs from './EmptyDocs';
import ParentDocs from './ParentDocs';
import {dispatch, useSelect} from '@wordpress/data';
import SearchFilter from '../SearchFilter';
import { useState, useEffect } from '@wordpress/element';
import DocsPlaceholder from './DocsPlaceholder';
import DraggableDocs from '../DraggableDocs';
import Upgrade from '../Upgrade';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import settingsStore from '../../data/settings';
import Swal from "sweetalert2";

const Documentations = () => {
  const parentDocs = useSelect(
    ( select ) => select( docsStore ).getParentDocs(),
    []
  );

  const loading = useSelect(
    ( select ) => select( docsStore ).getLoading(),
    []
  );

  const { need_upgrade, status } = useSelect(
    ( select ) => select( settingsStore ).getUpgradeInfo(),
    []
  );

  const [ searchValue, setSearchValue ] = useState( '' );
  const [ documentations, setDocumentations ] = useState( [] );

  const handleChange = ( event, reset = false ) => {
    if ( reset ) {
      setSearchValue( '' );
    } else {
      setSearchValue( event.target.value );
    }
  };

  let filteredDocs = parentDocs?.filter( ( doc ) =>
    doc?.title?.rendered?.toLowerCase().includes( searchValue?.toLowerCase() )
  );

  filteredDocs = wp.hooks.applyFilters(
    'wedocs_filter_parent_documentations',
    filteredDocs
  );

  const showActions = wp.hooks.applyFilters(
    'wedocs_show_documentation_actions',
    true
  );

  const showEmptyNotice = wp.hooks.applyFilters(
    'wedocs_show_documentation_empty_label',
    '',
    documentations?.length
  );

  const isAdmin = wp.hooks.applyFilters( 'wedocs_check_is_admin_user', true );

  useEffect( () => {
    setDocumentations( [ ...filteredDocs ] );
  }, [ parentDocs, searchValue ] );

  if ( status === 'done' ) {
    dispatch( settingsStore )
      .makeUpdateDone()
      .then( ( result ) => {
        if ( result ) {
          Swal.fire( {
            icon: 'success',
            text: __( 'weDocs database has been updated successfully', 'wedocs' ),
            title: __( 'Database Updated!', 'wedocs' ),
            toast: true,
            timer: 3000,
            position: 'bottom-end',
            showConfirmButton: false,
          } );
        }
      } )
      .catch( ( err ) => {} );
  }

  return (
    <>
      <div className="documentation-header my-7">
        <h1 className="w-full flex items-center">
          { __( 'All Docs', 'wedocs' ) }
          { showActions && (
            <AddDocModal className="ml-5 mr-auto py-2 h-fit inline-flex items-center rounded-md border border-transparent bg-indigo-600 ease-in-out duration-200 px-4 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-2 text-base flex items-center"></span>
              { __( `New doc`, 'wedocs' ) }
            </AddDocModal>
          ) }
          { parentDocs && parentDocs.length > 0 && (
            <SearchFilter
              handleChange={ handleChange }
              searchValue={ searchValue }
            />
          ) }
        </h1>
      </div>

      { ! loading && showActions && need_upgrade && <Upgrade status={ status } /> }

      <div
        role="list"
        className="documentation relative mx-auto grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      >
        { ! loading && documentations.length > 0 && (
          <>
            { isAdmin ? (
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
            ) : (
              <>
                { documentations?.map( ( doc ) => (
                  <ParentDocs key={ doc.id } doc={ doc } />
                ) ) }
              </>
            ) }
          </>
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

      { ! loading && ! searchValue && isAdmin && documentations && documentations?.length === 0 && (
        <EmptyDocs />
      ) }

      { ! loading && showEmptyNotice }
    </>
  );
};

export default Documentations;
