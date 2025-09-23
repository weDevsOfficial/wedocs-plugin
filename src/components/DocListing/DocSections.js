import { __ } from '@wordpress/i18n';
import { dispatch, useSelect } from '@wordpress/data';
import docStore from '../../data/docs';
import SectionArticles from './SectionArticles';
import { useEffect, useState } from '@wordpress/element';
import AddArticleModal from '../AddArticleModal';
import RestrictionModal from '../RestrictionModal';

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DraggableDocs from '../DraggableDocs';
import extractedTitle from '../../utils/extractedTitle';
import settingsStore from '../../data/settings';
import he from 'he';
import docsStore from '../../data/docs';

const DocSections = ( { docs, section, sections, searchValue } ) => {
  const isAdmin = weDocsAdminVars?.hasManageCap;
  const { id, title } = section;
  const [ showArticles, setShowArticles ] = useState( id === sections?.[0]?.id );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable( { id: section.id } );

  const style = {
    transform: CSS?.Transform?.toString( transform ),
    zIndex: isDragging ? 9999 : 0,
    position: isDragging ? 'relative' : '',
    transition,
  };

  const sectionArticles = useSelect(
    ( select ) => select( docStore ).getSectionArticles( parseInt( id ) ),
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

  const filteredArticles =
    sectionArticles?.filter( ( article ) => {
      let matched = article?.title?.rendered?.toLowerCase().includes( searchValue.toLowerCase() );
      if ( ! matched ) {
        docs?.map( doc => {
          if ( doc?.parent !== article?.id ) return;
          let childMatched = doc?.title?.rendered?.toLowerCase().includes( searchValue.toLowerCase() );
          if ( childMatched ) return matched = childMatched;
        } );
      }
      return matched;
    }) || [];

  const [ articles, setArticles ] = useState( [] );
  const [ needSortingStatus, setNeedSortingStatus ] = useState( needSortableStatus );

  useEffect( () => {
    setArticles( [ ...filteredArticles ] );
  }, [ sectionArticles, searchValue ] );

  useEffect( () => {
    if ( needSortingStatus ) {
      dispatch( docsStore )
        .updateSortingStatus( { sortable_status: sortableStatus, documentations: articles } )
        .then( ( result ) => setNeedSortingStatus( result?.sorting ) )
        .catch( ( err ) => {} );
    }
  }, [ needSortingStatus ] );

  const settings = useSelect(
    ( select ) => select( settingsStore ).getSettings(),
    []
  );

  const {
    general: { comments: isCommentsAllowed },
  } = settings;

  return (
    <div
      className="wedocs-space-y-4 wedocs-mb-3"
      style={ style }
      { ...attributes }
    >
      <div className="wedocs-bg-white wedocs-shadow sm:wedocs-rounded-md">
        <div className="doc-section wedocs-cursor-pointer wedocs-px-4 wedocs-py-5 sm:wedocs-px-6">
          <div
            className="wedocs-flex wedocs-items-center group"
            onClick={ () => setShowArticles( ! showArticles ) }
          >
            <div className={ `wedocs-pr-3.5 wedocs-py-0.5 wedocs-cursor-grab` }>
              <svg
                width="20"
                height="21"
                fill="none"
                { ...listeners }
                ref={ setNodeRef }
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#d9d9d9"
                  fillRule="evenodd"
                  d="M8.5 7.498c0-1.075-.872-1.947-1.947-1.947s-1.947.872-1.947 1.947.872 1.947 1.947 1.947S8.5 8.573 8.5 7.498zm0 6.894c0-1.075-.872-1.947-1.947-1.947s-1.947.872-1.947 1.947.872 1.947 1.947 1.947S8.5 15.467 8.5 14.392zm3-6.894c0-1.075.871-1.947 1.947-1.947s1.947.872 1.947 1.947-.872 1.947-1.947 1.947S11.5 8.573 11.5 7.498zm3.893 6.894c0-1.075-.872-1.947-1.947-1.947s-1.947.872-1.947 1.947.871 1.947 1.947 1.947 1.947-.872 1.947-1.947z"
                />
              </svg>
            </div>
            <div className="wedocs-flex wedocs-items-center wedocs-w-full">
              <div className="wedocs-min-w-0 wedocs-flex-1 sm:wedocs-flex sm:wedocs-items-center sm:wedocs-justify-between">
                <div className="wedocs-flex wedocs-items-center">
                  <div className="wedocs-flex wedocs-items-center wedocs-text-sm wedocs-pr-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="wedocs-w-auto wedocs-pr-3.5"
                      width="20"
                      height="17"
                      fill="none"
                    >
                      <path
                        d="M1 3.945v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-6l-2-2H3a2 2 0 0 0-2 2z"
                        stroke="#6b7280"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <a
                      target="_blank"
                      href={ `${ weDocsAdminVars.adminUrl }post.php?post=${ id }&action=edit` }
                      className="tooltip wedocs-cursor-pointer before:wedocs-max-w-xl wedocs-flex wedocs-items-center wedocs-flex-shrink-0 wedocs-text-base wedocs-font-medium wedocs-text-black !wedocs-shadow-none wedocs-z-[9980]"
                      data-tip={ he.decode( __( title?.rendered, 'wedocs' ) ) }
                      rel="noreferrer"
                    >
                      <span
                        className="hover:wedocs-underline group-hover:wedocs-text-black"
                        dangerouslySetInnerHTML={ {
                          __html: extractedTitle( title?.rendered ),
                        } }
                      ></span>
                    </a>
                  </div>
                  <div
                    className={ `${
                      showArticles ? 'wedocs-bg-[#00A1E4]' : 'wedocs-bg-gray-400'
                    } article-counter wedocs-grid wedocs-place-content-center wedocs-text-white wedocs-font-medium wedocs-text-sm wedocs-w-7 wedocs-h-7 group-hover:wedocs-bg-[#00A1E4] wedocs-rounded-full` }
                  >
                    { filteredArticles.length }
                  </div>
                  { section?.status === 'draft' && (
                    <div className={ `docs-draft-status wedocs-font-medium wedocs-text-sm wedocs-text-gray-800 wedocs-leading-5 wedocs-bg-[#E3E5E7] wedocs-rounded-[42px] wedocs-py-0.5 wedocs-px-2.5 !wedocs-ml-5` }>
                      { __( 'Draft', 'wedocs' ) }
                    </div>
                  ) }
                  <AddArticleModal
                    sections={ sections }
                    className={ `wedocs-ml-6 wedocs-mr-1` }
                    defaultSection={ section }
                    setShowArticles={ setShowArticles }
                  >
                    <div
                      className='tooltip wedocs-cursor-pointer wedocs-flex wedocs-items-center wedocs-justify-center wedocs-w-3.5 wedocs-h-3.5'
                      data-tip={ __( 'Create', 'wedocs' ) }
                    >
                      <span className="wedocs-flex wedocs-items-center dashicons dashicons-plus-alt2 wedocs-hidden group-hover:wedocs-inline-flex wedocs-text-2xl wedocs-font-medium wedocs-text-[#d1d5db] hover:wedocs-text-indigo-700"></span>
                    </div>
                  </AddArticleModal>
                  <a
                    target="_blank"
                    className="wedocs-ml-4 wedocs-hidden group-hover:wedocs-block !wedocs-shadow-none"
                    rel="noreferrer"
                    href={ `${ weDocsAdminVars.adminUrl }post.php?post=${ id }&action=edit` }
                  >
                    <span
                      className={ `tooltip wedocs-cursor-pointer` }
                      data-tip={ __( 'Edit', 'wedocs' ) }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        className="tooltip wedocs-cursor-pointer wedocs-stroke-gray-300 hover:wedocs-stroke-indigo-700"
                      >
                        <path
                          d="M13.303 1.322a2.4 2.4 0 1 1 3.394 3.394l-.951.951-3.394-3.394.951-.951zm-2.648 2.649L.6 14.025v3.394h3.394L14.049 7.365l-3.394-3.394z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={ section?.link }
                    className="wedocs-flex wedocs-items-center wedocs-flex-shrink-0 wedocs-text-base wedocs-font-medium wedocs-text-black !wedocs-shadow-none wedocs-ml-4"
                  >
                    <span
                      className={ `tooltip wedocs-cursor-pointer wedocs-flex wedocs-items-center` }
                      data-tip={ __( 'View on Web', 'wedocs' ) }
                    >
                      <svg
                        className="wedocs-hidden group-hover:wedocs-block wedocs-stroke-gray-300 hover:wedocs-stroke-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                      >
                        <path
                          d="M7.118 3.5H3.452c-1.013 0-1.833.821-1.833 1.833V14.5c0 1.012.821 1.833 1.833 1.833h9.167c1.012 0 1.833-.821 1.833-1.833v-3.667m-3.667-9.167h5.5m0 0v5.5m0-5.5l-9.167 9.167"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>

                  <RestrictionModal
                    docId={ section.id }
                    type="section"
                    classes="wedocs-ml-4 wedocs-hidden group-hover:wedocs-block"
                  >
                    <span
                      className={ `tooltip wedocs-cursor-pointer wedocs-flex wedocs-items-center` }
                      data-tip={ __( 'Delete', 'wedocs' ) }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="wedocs-w-5 wedocs-h-5 wedocs-stroke-gray-300 hover:wedocs-stroke-red-700"
                      >
                        <path
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </span>
                  </RestrictionModal>
                </div>
              </div>

              { articles && articles.length > 0 && (
                <div className="wedocs-ml-5 wedocs-flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className={ `${
                      showArticles ? 'wedocs-rotate-90 wedocs-transform' : ''
                    } group-hover:wedocs-text-[#00A1E4] wedocs-h-5 wedocs-w-5 wedocs-text-gray-400` }
                  >
                    <path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
                  </svg>
                </div>
              ) }
            </div>
          </div>

          { showArticles && ! Boolean( isDragging ) && (
            <div className={ `wedocs-mt-3 section-article wedocs-pl-4 sm:wedocs-pl-6` }>
              { ( articles?.length > 0 ) ? (
                <DraggableDocs
                  setItems={ setArticles }
                  setNeedSortingStatus={ setNeedSortingStatus }
                >
                  <SortableContext
                    items={ articles }
                    strategy={ verticalListSortingStrategy }
                  >
                    { articles?.map( ( article ) => (
                      <SectionArticles
                        key={ article.id }
                        article={ article }
                        isAdmin={ isAdmin }
                        section={ section }
                        articles={ articles }
                        sections={ sections }
                        searchValue={ searchValue }
                        setShowArticles={ setShowArticles }
                        isAllowComments={ isCommentsAllowed }
                      />
                    ) ) }
                  </SortableContext>
                </DraggableDocs>
              ): null }

              <AddArticleModal
                sections={ sections }
                defaultSection={ section }
                setShowArticles={ setShowArticles }
                className="wedocs-py-2.5 wedocs-px-4 wedocs-mt-7 wedocs-mb-2 wedocs-h-fit wedocs-inline-flex wedocs-items-center wedocs-rounded-md wedocs-border wedocs-border-transparent wedocs-bg-indigo-600 wedocs-px-4 wedocs-text-sm wedocs-text-white hover:wedocs-text-white wedocs-shadow-sm hover:wedocs-bg-indigo-700 focus:wedocs-outline-none focus:wedocs-ring-2 focus:wedocs-ring-indigo-500 focus:wedocs-ring-offset-2"
              >
                <span className="dashicons dashicons-plus-alt2 wedocs-w-3.5 wedocs-h-3.5 wedocs-mr-3 wedocs-text-base wedocs-flex wedocs-items-center"></span>
                { __( 'Add article', 'wedocs' ) }
              </AddArticleModal>
            </div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default DocSections;
