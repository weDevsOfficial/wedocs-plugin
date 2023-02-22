import drag from '../../assets/img/drag.png';
import { __, sprintf } from '@wordpress/i18n';
import folder from '../../assets/img/folder.png';
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

const DocSections = ( { section, sections, searchValue } ) => {
  const { id, title } = section;
  const [ showArticles, setShowArticles ] = useState( false );

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

  const sortableArticles =
    sectionArticles?.sort( ( a, b ) => a.menu_order - b.menu_order ) || [];

  const filteredArticles =
    sortableArticles?.filter( ( doc ) =>
      doc?.title?.rendered?.toLowerCase().includes( searchValue.toLowerCase() )
    ) || [];

  const [ articles, setArticles ] = useState( [] );

  useEffect( () => {
    setArticles( [ ...filteredArticles ] );
  }, [ sectionArticles, searchValue ] );

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
            <img src={ drag } alt={ __( 'Docs Link Icon', 'wedocs' ) } />
            <div className="flex items-center w-full">
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="truncate flex items-center">
                  <div className="flex items-center text-sm pr-5">
                    <img
                      src={ folder }
                      className="w-full h-full px-3.5"
                      alt={ __( 'Docs Link Icon', 'wedocs' ) }
                    />
                    <a
                      href={ `${ window.location.origin }/?p=${ id }` }
                      className="flex items-center flex-shrink-0 text-base font-medium text-black"
                    >
                      <span
                        className="hover:underline group-hover:text-black"
                        dangerouslySetInnerHTML={ { __html: title?.rendered } }
                      ></span>
                    </a>
                  </div>
                  <div className="article-counter grid place-content-center text-white font-medium text-sm w-7 h-7 bg-[#00A1E4] rounded-full">
                    { filteredArticles.length }
                  </div>
                  <a
                    href={ `${ window.location.origin }/?p=${ id }` }
                    className="flex items-center flex-shrink-0 text-base font-medium text-black"
                  >
                    <svg
                      className="hidden group-hover:block ml-6 stroke-gray-500 hover:stroke-indigo-700"
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
                  </a>
                  <a
                    target="_blank"
                    className="ml-4 hidden group-hover:block"
                    rel="noreferrer"
                    href={ `${ window.location.origin }/wp-admin/post.php?post=${ id }&action=edit` }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      className="stroke-gray-500 hover:stroke-indigo-700"
                    >
                      <path
                        d="M13.303 1.322a2.4 2.4 0 1 1 3.394 3.394l-.951.951-3.394-3.394.951-.951zm-2.648 2.649L.6 14.025v3.394h3.394L14.049 7.365l-3.394-3.394z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>

                  <RestictionModal
                    docId={ section.id }
                    className="ml-4 hidden group-hover:block"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 stroke-gray-500 hover:stroke-red-700"
                    >
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </RestictionModal>
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
            <div className="section-article mt-3 pl-4 sm:pl-6">
              { articles && articles.length > 0 && (
                <DraggableDocs setItems={ setArticles }>
                  <SortableContext
                    items={ articles }
                    strategy={ verticalListSortingStrategy }
                  >
                    { articles?.map( ( article ) => (
                      <SectionArticles key={ article.id } article={ article } />
                    ) ) }
                  </SortableContext>
                </DraggableDocs>
              ) }

              <AddArticleModal
                sections={ sections }
                defaultSection={ section }
                className="py-2.5 px-4 mt-7 mb-2 h-fit inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 text-sm text-white hover:text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-3 text-base flex items-center"></span>
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
