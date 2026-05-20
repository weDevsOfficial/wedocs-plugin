import he from 'he';
import DocActions from '../DocActions';
import { __, sprintf } from '@wordpress/i18n';
import QuickEditModal from './QuickEditModal';
import extractedTitle from '../../utils/extractedTitle';
import UpgradePopup from '../ProPreviews/common/UpgradePopup';

const ArticleChildrens = ( { article, section, sections, setShowArticles, isAllowComments } ) => {
  // Note: Level 3 articles cannot be dragged due to @dnd-kit nested context limitation
  // Drag-and-drop only works for Level 2 articles in the root context

  const { modified: lastModifiedDate, comment_count: commentCount } = article;

  const formattedDateString = () => {
    const date = new Date( lastModifiedDate ),
      options = { day: 'numeric', month: 'short', year: 'numeric' };

    return date?.toLocaleDateString( 'en-US', options );
  };

  const isAdminRestrictedArticle = wp?.hooks?.applyFilters(
    'wedocs_check_is_admin_restricted_article',
    false,
    article?.id
  );

  if ( section ) {
    return (
      <div
        key={ section?.id }
        className="flex items-center bg-white border-b border-[#D9D9D9] py-4"
      >
        <div className="flex items-center w-full group">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center">
              <div className="flex items-center pr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="21"
                  fill="none"
                  className="w-auto pr-3.5"
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
                  className={ `${ ! Boolean( parseInt( isAdminRestrictedArticle ) ) ? 'mr-4' : '' } flex items-center flex-shrink-0 text-base group font-medium text-gray-700 !shadow-none` }
                  rel="noreferrer"
                >
                  <div
                    className="tooltip mr-6 cursor-pointer before:max-w-xl flex items-center flex-shrink-0 text-base font-medium text-gray-700 !shadow-none z-[9999]"
                    data-tip={ he.decode(
                      __( article?.title?.rendered, 'wedocs' )
                    ) }
                  >
                    <span
                      className="hover:underline group-hover:text-black"
                      dangerouslySetInnerHTML={ {
                        __html: extractedTitle( article?.title?.rendered ),
                      } }
                    ></span>
                  </div>

                  { article?.status === 'draft' && (
                    <div className={ `docs-draft-status font-medium text-sm text-gray-800 leading-5 bg-[#E3E5E7] rounded-[42px] py-0.5 px-2.5 mr-5` }>
                      { __( 'Draft', 'wedocs' ) }
                    </div>
                  ) }
                </a>

                { /* Add Nested Article Button - Pro Feature */ }
                { ! Boolean( parseInt( isAdminRestrictedArticle ) ) && (
                  <UpgradePopup className={ `mr-4` }>
                    <div
                      className='tooltip cursor-pointer flex items-center justify-center w-3.5 h-3.5'
                      data-tip={ __( 'Create Nested Article (Pro)', 'wedocs' ) }
                    >
                      <span className="items-center dashicons dashicons-plus-alt2 hidden group-hover:inline-flex text-2xl font-medium text-[#d1d5db] hover:text-indigo-700"></span>
                    </div>
                  </UpgradePopup>
                ) }

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
                  className={ `${ ! Boolean( parseInt( isAdminRestrictedArticle ) ) ? 'mr-4' : '' } flex items-center flex-shrink-0 text-base group font-medium text-gray-700 !shadow-none` }
                  rel="noreferrer"
                >
                  { ! Boolean( parseInt( isAdminRestrictedArticle ) ) && (
                    <>
                      <QuickEditModal
                        type={ `article` }
                        article={ article }
                        sections={ sections }
                        docId={ section?.parent }
                        defaultSection={ section }
                        setShowArticles={ setShowArticles }
                        className={ `hidden group-hover:block mr-4` }
                      >
                        <span
                          className={ `tooltip cursor-pointer` }
                          data-tip={ __( 'Quick Edit', 'wedocs' ) }
                        >
                          <svg
                            width="22"
                            fill="none"
                            height="22"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="tooltip cursor-pointer stroke-gray-300 hover:stroke-indigo-700 -mt-[3px]"
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
                        className="tooltip cursor-pointer flex items-center mr-0.5"
                        data-tip={ __( 'Edit', 'wedocs' ) }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          className="hidden group-hover:block stroke-gray-300 hover:stroke-indigo-700"
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
                  className="tooltip cursor-pointer flex items-center"
                  data-tip={ __( 'View on Web', 'wedocs' ) }
                >
                  <a
                    target="_blank"
                    className="hidden group-hover:block !shadow-none"
                    rel="noreferrer"
                    href={ article?.link }
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
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5 flex-shrink-0 mt-4 sm:mt-0 sm:ml-5">
              <div className="flex items-center gap-10">
                { /* Render admin restriction icon. */ }
                { wp?.hooks?.applyFilters(
                  'wedocs_article_privacy_action',
                  [],
                  article?.id
                ) }

                { ( isAllowComments === 'on' ||
                  ! Boolean( isAllowComments ) ) && (
                  <div className="article-comments flex gap-2 items-center">
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
                    <p className="comments-counter font-medium text-sm text-[#6B7280]">
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
                <div className="article-updated-date w-44 text-sm text-[#969696]">
                  { /* translators: %s: Formatted datetime string */ }
                  { sprintf(
                    __( 'Updated on %s', 'wedocs' ),
                    formattedDateString()
                  ) }
                </div>
              </div>
            </div>
          </div>
          <div className="ml-8 flex-shrink-0 w-5 h-5">
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
    );
  }

  return null;
};

export default ArticleChildrens;
