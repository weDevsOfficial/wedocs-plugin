import he from 'he';
import DocActions from '../DocActions';
import { __, sprintf } from '@wordpress/i18n';
import QuickEditModal from './QuickEditModal';
import extractedTitle from '../../utils/extractedTitle';

const ArticleChildrens = ( { article, section, sections, setShowArticles, isAllowComments } ) => {
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
      <div key={ section?.id } className="wedocs-flex wedocs-items-center wedocs-bg-white wedocs-border-b wedocs-border-[#D9D9D9] wedocs-py-4">
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
                  className={ `${ ! Boolean( parseInt( isAdminRestrictedArticle ) ) ? 'wedocs-mr-4' : '' } wedocs-flex wedocs-items-center wedocs-flex-shrink-0 wedocs-text-base group wedocs-font-medium wedocs-text-gray-700 !wedocs-shadow-none` }
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

                  { article?.status === 'draft' && (
                    <div className={ `docs-draft-status wedocs-font-medium wedocs-text-sm wedocs-text-gray-800 wedocs-leading-5 wedocs-bg-[#E3E5E7] wedocs-rounded-[42px] wedocs-py-0.5 wedocs-px-2.5 wedocs-mr-5` }>
                      { __( 'Draft', 'wedocs' ) }
                    </div>
                  ) }

                  { ! Boolean( parseInt( isAdminRestrictedArticle ) ) && (
                    <>
                      <QuickEditModal
                        type={ `article` }
                        article={ article }
                        sections={ sections }
                        docId={ section?.parent }
                        defaultSection={ section }
                        setShowArticles={ setShowArticles }
                        className={ `wedocs-hidden group-hover:wedocs-block wedocs-mr-4` }
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
              <div className="wedocs-flex wedocs-items-center wedocs-gap-10">
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
    );
  }

  return null;
};

export default ArticleChildrens;
