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

  const [promoNotices, setPromoNotices] = useState(null);

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

  useEffect(() => {
    wp.hooks.applyFilters( 'wedocs_promo_notice' ).then((result) => {
      if( false != result ) {
        setPromoNotices(result);
      }
    });
  }, []);

  return (
    <>
      <div className="documentation-header my-7">
        <h1 className="w-full !flex items-center justify-between">
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

      {promoNotices && <WedocsPromoNotice promos={promoNotices} />}

      { !loading && showActions && need_upgrade && <Upgrade status={ status } /> }

      { loading ? <DocsPlaceholder /> : (
        <div
          role="list"
          className={ `${ documentations.length > 0 ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7' : '' } documentation relative mx-auto` }
        >
          { searchValue && documentations.length === 0 && (
            <h2 className="float-left text-lg mt-4">
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
