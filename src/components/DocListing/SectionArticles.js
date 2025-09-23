import he from 'he';
import DocActions from '../DocActions';
import { CSS } from '@dnd-kit/utilities';
import { __, sprintf } from '@wordpress/i18n';
import QuickEditModal from './QuickEditModal';
import { useSortable } from '@dnd-kit/sortable';
import extractedTitle from '../../utils/extractedTitle';
import { Fragment, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import docStore from '../../data/docs';
import ArticleChildrens from './ArticleChildrens';
import AddArticleModal from '../AddArticleModal';

const SectionArticles = ( { article, articles, isAdmin, section, sections, searchValue, setShowArticles, isAllowComments } ) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable( { id: article?.id } );

  const style = {
    transform: CSS?.Transform?.toString( transform ),
    zIndex: isDragging ? 9999 : 100,
    position: isDragging ? 'relative' : '',
    transition,
  };

  const { modified: lastModifiedDate, comment_count: commentCount } = article;

  const formattedDateString = () => {
    const date = new Date( lastModifiedDate ),
      options = { day: 'numeric', month: 'short', year: 'numeric' };

    return date?.toLocaleDateString( 'en-US', options );
  };

  const articleChildrens = useSelect(
    ( select ) => select( docStore ).getArticleChildrens( parseInt( article?.id ) ),
    []
  );

  const filteredArticleChildrens = articleChildrens?.filter(
    ( children ) => children?.title?.rendered?.toLowerCase().includes( searchValue.toLowerCase() )
  );

  const isAdminRestrictedArticle = wp?.hooks?.applyFilters(
    'wedocs_check_is_admin_restricted_article',
    false,
    article?.id
  );

  if ( section ) {
    return (
      <Fragment>
        <div
          className="wedocs-flex wedocs-items-center !wedocs-bg-white wedocs-border-b wedocs-border-[#D9D9D9] wedocs-py-4"
          style={ style }
          { ...attributes }
          ref={ setNodeRef }
        >
          <div className={ `wedocs-pr-3.5 wedocs-py-0.5 wedocs-cursor-grab` }>
            <svg
              width="20"
              height="21"
              fill="none"
              { ...listeners }
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8.5 7.498c0-1.075-.872-1.947-1.947-1.947s-1.947.872-1.947 1.947.872 1.947 1.947 1.947S8.5 8.573 8.5 7.498zm0 6.894c0-1.075-.872-1.947-1.947-1.947s-1.947.872-1.947 1.947.872 1.947 1.947 1.947S8.5 15.467 8.5 14.392zm3-6.894c0-1.075.871-1.947 1.947-1.947s1.947.872 1.947 1.947-.872 1.947-1.947 1.947S11.5 8.573 11.5 7.498zm3.893 6.894c0-1.075-.872-1.947-1.947-1.947s-1.947.872-1.947 1.947.871 1.947 1.947 1.947 1.947-.872 1.947-1.947z"
                fill="#d9d9d9"
              />
            </svg>
          </div>
          <div className="wedocs-flex wedocs-items-center wedocs-w-full group">
            <div className="wedocs-min-w-0 wedocs-flex-1 sm:wedocs-flex sm:wedocs-items-center sm:wedocs-justify-between">
              <div className="wedocs-flex wedocs-items-center">
                <div className="wedocs-flex wedocs-items-center wedocs-pr-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="21"
                    fill="none"
                    className="wedocs-w-auto wedocs-pr-3.5"
                  >
                    <path
                      strokeWidth="2"
                      stroke="#6b7280"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 10.02h6m-6 4h6m2 5H3a2 2 0 0 1-2-2v-14a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707v9.586a2 2 0 0 1-2 2z"
                    />
                  </svg>
                  <a
                    target="_blank"
                    href={
                      ! Boolean( parseInt( wp?.hooks?.applyFilters(
                        'wedocs_check_is_admin_restricted_article',
                        false,
                        article?.id
                      ) ) ) ?
                        `${ weDocsAdminVars.adminUrl }post.php?post=${ article?.id }&action=edit` :
                        `${ window.location.origin }/?p=${ article?.id }`
                    }
                    className={ `wedocs-flex wedocs-items-center wedocs-flex-shrink-0 wedocs-text-base group wedocs-font-medium wedocs-text-gray-700 !wedocs-shadow-none` }
                    rel="noreferrer"
                  >
                    <div
                      className="tooltip wedocs-mr-6 wedocs-cursor-pointer before:wedocs-max-w-xl wedocs-flex wedocs-items-center wedocs-flex-shrink-0 wedocs-text-base wedocs-font-medium wedocs-text-gray-700 !wedocs-shadow-none wedocs-z-[9999]"
                      data-tip={ he.decode(
                        __( article?.title?.rendered, 'wedocs' )
                      ) }
                    >
                      <span
                        className="hover:wedocs-underline group-hover:wedocs-text-black"
                        dangerouslySetInnerHTML={ {
                          __html: extractedTitle( article?.title?.rendered ),
                        } }
                      ></span>
                    </div>
                  </a>

                  { article?.status === 'draft' && (
                    <div className={ `docs-draft-status wedocs-font-medium wedocs-text-sm wedocs-text-gray-800 wedocs-leading-5 wedocs-bg-[#E3E5E7] wedocs-rounded-[42px] wedocs-py-0.5 wedocs-px-2.5 wedocs-mr-5` }>
                      { __( 'Draft', 'wedocs' ) }
                    </div>
                  ) }

                  <AddArticleModal
                    sections={ articles }
                    className={ `wedocs-mr-4` }
                    defaultSection={ article }
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
                    href={
                      ! Boolean( parseInt( wp?.hooks?.applyFilters(
                        'wedocs_check_is_admin_restricted_article',
                        false,
                        article?.id
                      ) ) ) ?
                        `${ weDocsAdminVars.adminUrl }post.php?post=${ article?.id }&action=edit` :
                        `${ window.location.origin }/?p=${ article?.id }`
                    }
                    className={ `${ ! Boolean( parseInt( isAdminRestrictedArticle ) ) ? 'wedocs-mr-4' : '' } wedocs-flex wedocs-items-center wedocs-flex-shrink-0 wedocs-text-base group wedocs-font-medium wedocs-text-gray-700 !wedocs-shadow-none` }
                    rel="noreferrer"
                  >
                    { ! Boolean( parseInt( isAdminRestrictedArticle ) ) && (
                      <>
                        <QuickEditModal
                          article={ article }
                          sections={ sections }
                          className={ `wedocs-hidden group-hover:wedocs-block wedocs-mr-4` }
                          defaultSection={ section }
                          setShowArticles={ setShowArticles }
                        >
                          <span
                            className={ `tooltip wedocs-cursor-pointer` }
                            data-tip={ __( 'Quick Edit', 'wedocs' ) }
                          >
                            <svg
                              width="22"
                              fill="none"
                              height="22"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="tooltip wedocs-cursor-pointer wedocs-stroke-gray-300 hover:wedocs-stroke-indigo-700 wedocs--mt-[3px]"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </span>
                        </QuickEditModal>
                        <div
                          className="tooltip wedocs-cursor-pointer wedocs-flex wedocs-items-center wedocs-mr-0.5"
                          data-tip={ __( 'Edit', 'wedocs' ) }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            className="wedocs-hidden group-hover:wedocs-block wedocs-stroke-gray-300 hover:wedocs-stroke-indigo-700"
                          >
                            <path
                              d="M13.303 1.322a2.4 2.4 0 1 1 3.394 3.394l-.951.951-3.394-3.394.951-.951zm-2.648 2.649L.6 14.025v3.394h3.394L14.049 7.365l-3.394-3.394z"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </>
                    ) }
                  </a>
                  <div
                    className="tooltip wedocs-cursor-pointer wedocs-flex wedocs-items-center"
                    data-tip={ __( 'View on Web', 'wedocs' ) }
                  >
                    <a
                      target="_blank"
                      className="wedocs-hidden group-hover:wedocs-block !wedocs-shadow-none"
                      rel="noreferrer"
                      href={ article?.link }
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
                    </a>
                  </div>
                </div>
              </div>
              <div className="wedocs-flex wedocs-items-center wedocs-gap-5 wedocs-flex-shrink-0 wedocs-mt-4 sm:wedocs-mt-0 sm:wedocs-ml-5">
                <div className="wedocs-flex wedocs-items-center wedocs-gap-0">
                  { /* Render admin restriction icon. */ }
                  { wp?.hooks?.applyFilters(
                    'wedocs_article_privacy_action',
                    [],
                    article?.id
                  ) }

                  { ( isAllowComments === 'on' ||
                    ! Boolean( isAllowComments ) ) && (
                    <div className="article-comments wedocs-flex wedocs-gap-2 wedocs-items-center">
                      <svg
                        width="20"
                        height="19"
                        viewBox="0 0 20 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9.01904H6.01M10 9.01904H10.01M14 9.01904H14.01M19 9.01904C19 13.4373 14.9706 17.019 10 17.019C8.46073 17.019 7.01172 16.6756 5.74467 16.0701L1 17.019L2.39499 13.2991C1.51156 12.0614 1 10.5933 1 9.01904C1 4.60077 5.02944 1.01904 10 1.01904C14.9706 1.01904 19 4.60077 19 9.01904Z"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="comments-counter wedocs-font-medium wedocs-text-sm wedocs-text-[#6B7280]">
                        { commentCount }
                      </p>
                    </div>
                  ) }
                  { /* Render article contributors. */ }
                  { wp?.hooks?.applyFilters(
                    'wedocs_article_contributors',
                    '',
                    article?.id
                  ) }
                  <div className="article-updated-date wedocs-w-44 wedocs-text-sm wedocs-text-[#969696]">
                    { /* translators: %s: Formatted datetime string */ }
                    { sprintf(
                      __( 'Updated on %s', 'wedocs' ),
                      formattedDateString
                    ) }
                  </div>
                </div>
              </div>
            </div>
            <div className="wedocs-ml-8 wedocs-flex-shrink-0 wedocs-w-5 wedocs-h-5">
              { ! Boolean( parseInt( wp?.hooks?.applyFilters(
                'wedocs_check_is_admin_restricted_article',
                false,
                article?.id
              ) ) ) && (
                <DocActions
                  type="article"
                  doc={ article }
                  section={ section }
                  sections={ sections }
                  setShowArticles={ setShowArticles }
                />
              ) }
            </div>
          </div>
        </div>

        { !isDragging && ( filteredArticleChildrens?.length > 0 ) && (
          <div
            style={ style }
            className={ `wedocs-my-1 article-children wedocs-pl-4 sm:wedocs-pl-16 wedocs-bg-white` }
          >
            { filteredArticleChildrens?.map( ( childrenDoc ) => (
              <ArticleChildrens
                section={ article }
                sections={ articles }
                key={ childrenDoc.id }
                article={ childrenDoc }
                setShowArticles={ setShowArticles }
                isAllowComments={ isAllowComments }
              />
            ) ) }
          </div>
        ) }
      </Fragment>
    );
  }

  return null;
};

export default SectionArticles;
