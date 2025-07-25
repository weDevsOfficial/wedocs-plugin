import ListingHeader from './ListingHeader';
import DocSections from './DocSections';
import { useParams } from 'react-router-dom';
import { dispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import docsStore from '../../data/docs';
import BackToDocsPage from '../BackToDocsPage';
import ListingButtons from './ListingButtons';
import DocsListingPlaceholder from './DocsListingPlaceholder';
import { Fragment, useEffect, useState } from '@wordpress/element';
import DraggableDocs from '../DraggableDocs';
import SearchFilter from '../SearchFilter';
import Upgrade from '../Upgrade';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import settingsStore from '../../data/settings';
import Swal from "sweetalert2";
import { userIsAdmin } from "../../utils/helper";
import NotFound from '../NotFound';
import WedocsPromoNotice from "../WedocsPromoNotice";

const ListingPage = () => {
  const { id } = useParams();

  const docs = useSelect( ( select ) => {
    return select( docsStore ).getDocs();
  }, [] );

  const parentDoc = docs?.find( doc => doc?.id === parseInt( id ) );

  const sectionsData = useSelect( ( select ) => {
    return select( docsStore ).getSectionsDocs( parseInt( id ) );
  }, [] );

  const loading = useSelect(
    ( select ) => select( docsStore ).getLoading(),
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
  const [ needSortingStatus, setNeedSortingStatus ] = useState( needSortableStatus );

  const handleChange = ( event, reset = false ) => {
    if ( reset ) {
      setSearchValue( '' );
    } else {
      setSearchValue( event.target.value );
    }
  };

  const docArticles = useSelect(
    ( select ) => select( docsStore ).getDocArticles( parseInt( id ) ),
    []
  );

  const filteredArticles = docArticles?.filter( ( article ) => {
    let matched = article?.title?.rendered?.toLowerCase().includes( searchValue.toLowerCase() );
    if ( ! matched ) {
      docs?.map( doc => {
        if ( doc?.parent !== article?.id ) return;
        let childMatched = doc?.title?.rendered?.toLowerCase().includes( searchValue.toLowerCase() );
        if ( childMatched ) return matched = childMatched;
      } );
    }
    return matched;
  } );

  const { need_upgrade, status } = useSelect(
    ( select ) => select( settingsStore ).getUpgradeInfo(),
    []
  );

  const searchFilter = ( section ) => {
    const parentIds = [];
    filteredArticles?.forEach( ( article ) =>
      ! parentIds.includes( article.parent )
        ? parentIds.push( article.parent )
        : ''
    );

    if ( parentIds.includes( section.id ) ) {
      return section;
    }

    return section?.title?.rendered
      ?.toLowerCase()
      .includes( searchValue.toLowerCase() );
  };

  const filteredSections = sectionsData?.filter( searchFilter ) || [];
  const [ sections, setSections ] = useState( [] );

  useEffect( () => {
    setSections( [ ...filteredSections ] );
  }, [ sectionsData, searchValue ] );

  const showActions = wp.hooks.applyFilters(
    'wedocs_show_documentation_actions',
    true
  );

  const parentDocIds = useSelect(
    ( select ) => select( 'wedocs/docs' ).getUserDocIds(),
    []
  );

  const isAdmin = userIsAdmin();

  const validParam = wp.hooks.applyFilters(
    'wedocs_validate_listing_params',
    true,
    parentDocIds,
    isAdmin,
    id
  );

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

  useEffect( () => {
    if ( needSortingStatus ) {
      dispatch( docsStore )
        .updateSortingStatus( { sortable_status: sortableStatus, documentations: sections } )
        .then( ( result ) => setNeedSortingStatus( result?.sorting ) )
        .catch( ( err ) => {} );
    }
  }, [ needSortingStatus ] );

  return (
    <Fragment>
      { validParam ? (
        <div className="docs-section-listing wrap py-5">
          { ! loading && showActions && need_upgrade && <Upgrade status={ status } /> }

          <div className="flex items-center justify-between mb-7">
            <BackToDocsPage />
            <SearchFilter
              listing={ true }
              searchValue={ searchValue }
              handleChange={ handleChange }
            />
          </div>

          <WedocsPromoNotice />

          <ListingHeader doc={ parentDoc } />

          { loading && <DocsListingPlaceholder /> }

          { ! loading && (
            <>
            { sections.length > 0 ? (
              <DraggableDocs
                setItems={ setSections }
                setNeedSortingStatus={ setNeedSortingStatus }
              >
                <SortableContext
                  items={ sections }
                  strategy={ verticalListSortingStrategy }
                >
                  { sections?.map( ( section ) => (
                    <DocSections
                      docs={ docs }
                      key={ section.id }
                      section={ section }
                      sections={ sections }
                      searchValue={ searchValue }
                    />
                  ) ) }
                </SortableContext>
              </DraggableDocs>
            ) : (
              <div className="space-y-4 mb-3">
                <div className="bg-white shadow sm:rounded-md">
                  <div className="flex items-center cursor-pointer text-base px-4 py-5 sm:px-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                    { __(
                      'No section or article found for this documentation',
                      'wedocs'
                    ) }
                  </div>
                </div>
              </div>
            ) }
            </>
          ) }

          <ListingButtons sections={ sections } />
        </div>
      ) : <NotFound/> }
    </Fragment>
  );
};

export default ListingPage;
