import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import docStore from '../../data/docs';
import SectionArticles from './SectionArticles';
import { useEffect, useState } from '@wordpress/element';
import AddArticleModal from '../AddArticleModal';
import RestictionModal from '../RestrictionModal';

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
import { userIsAdmin } from "../../utils/helper";

const DocSections = ( { section, sections, searchValue } ) => {
  const isAdmin = userIsAdmin();
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
    transform: CSS.Transform.toString( transform ),
    transition,
  };

  const sectionArticles = useSelect(
    ( select ) => select( docStore ).getSectionArticles( parseInt( id ) ),
    []
  );

  const filteredArticles =
    sectionArticles?.filter( ( doc ) =>
      doc?.title?.rendered?.toLowerCase().includes( searchValue?.toLowerCase() )
    ) || [];

  const [ articles, setArticles ] = useState( [] );

  useEffect( () => {
    setArticles( [ ...filteredArticles ] );
  }, [ sectionArticles, searchValue ] );

  const settings = useSelect(
    ( select ) => select( settingsStore ).getSettings(),
    []
  );

  const {
    general: { comments: isCommentsAllowed },
  } = settings;

  return (
    <div
      className="space-y-4 mb-3"
      ref={ setNodeRef }
      style={ style }
      { ...attributes }
      { ...listeners }
    >
      <div className="bg-white shadow sm:rounded-md">
        <div className="doc-section cursor-pointer px-4 py-5 sm:px-6">
          <div
            className="flex items-center group"
            onClick={ () => setShowArticles( ! showArticles ) }
          >
            { isAdmin && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  d="M8.5 7.498c0-1.075-.872-1.947-1.947-1.947s-1.947.872-1.947 1.947.872 1.947 1.947 1.947S8.5 8.573 8.5 7.498zm0 6.894c0-1.075-.872-1.947-1.947-1.947s-1.947.872-1.947 1.947.872 1.947 1.947 1.947S8.5 15.467 8.5 14.392zm3-6.894c0-1.075.871-1.947 1.947-1.947s1.947.872 1.947 1.947-.872 1.947-1.947 1.947S11.5 8.573 11.5 7.498zm3.893 6.894c0-1.075-.872-1.947-1.947-1.947s-1.947.872-1.947 1.947.871 1.947 1.947 1.947 1.947-.872 1.947-1.947z"
                  fill="#d9d9d9"
                />
              </svg>
            ) }
            <div className="flex items-center w-full">
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center">
                  <div className="flex items-center text-sm pr-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full px-3.5"
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
                      href={ `${ window.location.origin }/wp-admin/post.php?post=${ id }&action=edit` }
                      className="tooltip cursor-pointer before:max-w-xl flex items-center flex-shrink-0 text-base font-medium text-black !shadow-none z-[9999]"
                      data-tip={ he.decode( __( title?.rendered, 'wedocs' ) ) }
                      rel="noreferrer"
                    >
                      <span
                        className="hover:underline group-hover:text-black"
                        dangerouslySetInnerHTML={ {
                          __html: extractedTitle( title?.rendered ),
                        } }
                      ></span>
                    </a>
                  </div>
                  <div
                    className={ `${
                      showArticles ? 'bg-[#00A1E4]' : 'bg-gray-400'
                    } article-counter grid place-content-center text-white font-medium text-sm w-7 h-7 group-hover:bg-[#00A1E4] rounded-full` }
                  >
                    { filteredArticles.length }
                  </div>
                  { isAdmin && (
                    <AddArticleModal
                      sections={ sections }
                      className={ `ml-6 mr-1` }
                      defaultSection={ section }
                      setShowArticles={ setShowArticles }
                    >
                      <div
                        className='tooltip cursor-pointer flex items-center justify-center w-3.5 h-3.5'
                        data-tip={ __( 'Create', 'wedocs' ) }
                      >
                        <span className="flex items-center dashicons dashicons-plus-alt2 hidden group-hover:inline-flex text-2xl font-medium text-[#d1d5db] hover:text-indigo-700"></span>
                      </div>
                    </AddArticleModal>
                  ) }
                  <a
                    target="_blank"
                    className="ml-4 hidden group-hover:block !shadow-none"
                    rel="noreferrer"
                    href={ `${ window.location.origin }/wp-admin/post.php?post=${ id }&action=edit` }
                  >
                    <span
                      className={ `tooltip cursor-pointer` }
                      data-tip={ __( 'Edit', 'wedocs' ) }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        className="tooltip cursor-pointer stroke-gray-300 hover:stroke-indigo-700"
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
                    href={ `${ window.location.origin }/?p=${ id }` }
                    className="flex items-center flex-shrink-0 text-base font-medium text-black !shadow-none ml-4"
                  >
                    <span
                      className={ `tooltip cursor-pointer flex items-center` }
                      data-tip={ __( 'View on Web', 'wedocs' ) }
                    >
                      <svg
                        className="hidden group-hover:block stroke-gray-300 hover:stroke-indigo-700"
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

                  { isAdmin && (
                    <RestictionModal
                      docId={ section.id }
                      type="section"
                      classes="ml-4 hidden group-hover:block"
                    >
                      <span
                        className={ `tooltip cursor-pointer flex items-center` }
                        data-tip={ __( 'Delete', 'wedocs' ) }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 stroke-gray-300 hover:stroke-red-700"
                        >
                          <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </span>
                    </RestictionModal>
                  ) }
                </div>
              </div>

              { articles && articles.length > 0 && (
                <div className="ml-5 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className={ `${
                      showArticles ? 'rotate-90 transform' : ''
                    } group-hover:text-[#00A1E4] h-5 w-5 text-gray-400` }
                  >
                    <path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
                  </svg>
                </div>
              ) }
            </div>
          </div>

          { showArticles && ! Boolean( isDragging ) && (
            <div
              className={ `${
                isAdmin ? 'mt-3' : ''
              } section-article pl-4 sm:pl-6` }
            >
              { articles && articles.length > 0 && (
                <DraggableDocs setItems={ setArticles }>
                  <SortableContext
                    items={ articles }
                    strategy={ verticalListSortingStrategy }
                  >
                    { articles?.map( ( article ) => (
                      <SectionArticles
                        key={ article.id }
                        article={ article }
                        isAdmin={ isAdmin }
                        isAllowComments={ isCommentsAllowed }
                      />
                    ) ) }
                  </SortableContext>
                </DraggableDocs>
              ) }

              { isAdmin && (
                <AddArticleModal
                  sections={ sections }
                  defaultSection={ section }
                  setShowArticles={ setShowArticles }
                  className="py-2.5 px-4 mt-7 mb-2 h-fit inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 text-sm text-white hover:text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-3 text-base flex items-center"></span>
                  { __( 'Add article', 'wedocs' ) }
                </AddArticleModal>
              ) }
            </div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default DocSections;
