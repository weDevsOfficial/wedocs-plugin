import docsStore from '../../data/docs';
import { __ } from '@wordpress/i18n';
import AddDocModal from '../AddDocModal';
import EmptyDocs from './EmptyDocs';
import ParentDocs from './ParentDocs';
import { dispatch, useSelect } from '@wordpress/data';
import SearchFilter from '../SearchFilter';
import { useState, useEffect } from '@wordpress/element';
import DocsPlaceholder from './DocsPlaceholder';
import DraggableDocs from '../DraggableDocs';
import Upgrade from '../Upgrade';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import settingsStore from '../../data/settings';
import Swal from "sweetalert2";
import { userIsAdmin } from "../../utils/helper";
import WedocsPromoNotice from '../WedocsPromoNotice';

const Documentations = () => {
  const docs = useSelect(
    ( select ) => select( docsStore ).getDocs(),
    []
  );

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

  const sortableStatus = useSelect(
    ( select ) => select( docsStore ).getSortingStatus(),
    []
  );

  const needSortableStatus = useSelect(
    ( select ) => select( docsStore ).getNeedSortingStatus(),
    []
  );

  const [ searchValue, setSearchValue ] = useState( '' );
  const [ documentations, setDocumentations ] = useState( [] );
  const [ needSortingStatus, setNeedSortingStatus ] = useState( needSortableStatus );

  const handleChange = ( event, reset = false ) => {
    if ( reset ) {
      setSearchValue( '' );
    } else {
      setSearchValue( event.target.value );
    }
  };

  const isAdmin = userIsAdmin();
  const showActions = wp.hooks.applyFilters(
    'wedocs_show_parent_documentation_addition_actions',
    true
  );

  const showEmptyNotice = wp.hooks.applyFilters(
    'wedocs_show_documentation_empty_label',
    '',
    documentations?.length
  );

  useEffect( () => {
    if (
      typeof isAdmin === 'undefined'
      || isAdmin === null
      || typeof parentDocs === 'undefined'
      || typeof searchValue === 'undefined'
    ) {
      return;
    }

    let filteredDocs = wp.hooks.applyFilters(
      'wedocs_filter_parent_documentations',
      parentDocs?.filter( ( doc ) =>
        doc?.title?.rendered?.toLowerCase().includes( searchValue?.toLowerCase() )
      )
    );

    wp.hooks.doAction(
      'wedocs_after_filter_documentations',
      filteredDocs,
      isAdmin
    );

    setDocumentations( [ ...filteredDocs ] );
  }, [ parentDocs, searchValue, isAdmin ] );

  useEffect( () => {
    if ( needSortingStatus ) {
      dispatch( docsStore )
        .updateSortingStatus( { sortable_status: sortableStatus, documentations } )
        .then( ( result ) => setNeedSortingStatus( result?.sorting ) )
        .catch( ( err ) => {} );
    }
  }, [ needSortingStatus ] );

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
      <div className="documentation-header wedocs-my-7">
        <h1 className="wedocs-w-full !wedocs-flex wedocs-items-center wedocs-justify-between">
          { __( 'All Docs', 'wedocs' ) }
          { showActions && (
            <AddDocModal className="wedocs-ml-5 wedocs-mr-auto wedocs-py-2 wedocs-h-fit wedocs-inline-flex wedocs-items-center wedocs-rounded-md wedocs-border wedocs-border-transparent wedocs-bg-indigo-600 wedocs-ease-in-out wedocs-duration-200 wedocs-px-4 wedocs-text-sm wedocs-text-white wedocs-shadow-sm hover:wedocs-bg-indigo-700 focus:wedocs-outline-none focus:wedocs-ring-2 focus:wedocs-ring-indigo-500 focus:wedocs-ring-offset-2">
              <span className="dashicons dashicons-plus-alt2 wedocs-w-3.5 wedocs-h-3.5 wedocs-mr-2 wedocs-text-base wedocs-flex wedocs-items-center"></span>
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

      <WedocsPromoNotice />

      { !loading && showActions && need_upgrade && <Upgrade status={ status } /> }

      { loading ? <DocsPlaceholder /> : (
        <div
          role="list"
          className={ `${ documentations.length > 0 ? 'wedocs-grid wedocs-grid-cols-1 sm:wedocs-grid-cols-2 lg:wedocs-grid-cols-3 2xl:wedocs-grid-cols-4 wedocs-gap-7' : '' } documentation wedocs-relative wedocs-mx-auto` }
        >
          { searchValue && documentations.length === 0 && (
            <h2 className="wedocs-float-left wedocs-text-lg wedocs-mt-4">
              { __(
                'Oops! It seems that your search did not match any existing documents. Please try again...',
                'wedocs'
              ) }
            </h2>
          ) }
          { documentations && (
            <>
              { documentations.length > 0 ? (
                <>
                  { isAdmin ? (
                    <DraggableDocs
                      setItems={ setDocumentations }
                      setNeedSortingStatus={ setNeedSortingStatus }
                    >
                      <SortableContext
                        items={ documentations }
                        strategy={ rectSortingStrategy }
                      >
                        { documentations?.map( ( doc ) => <ParentDocs key={ doc.id } doc={ doc } /> ) }
                      </SortableContext>
                    </DraggableDocs>
                  ) : (
                    <>
                      { documentations?.map( ( doc ) => <ParentDocs key={ doc.id } doc={ doc } /> ) }
                    </>
                  ) }
                </>
              ) : (
                <>
                  { !searchValue && showActions && <EmptyDocs /> }
                </>
              ) }
            </>
          ) }

          { !loading && !searchValue && showEmptyNotice }
        </div>
      ) }
    </>
  );
};

export default Documentations;
