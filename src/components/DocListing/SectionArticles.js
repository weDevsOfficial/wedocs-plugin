import drag from '../../assets/img/drag.png';
import { __, sprintf } from '@wordpress/i18n';
import file from '../../assets/img/file.png';
import DocActions from '../DocActions';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SectionArticles = ( { article } ) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable( { id: article.id } );

  const style = {
    transform: CSS.Transform.toString( transform ),
    transition,
  };

  const { modified: lastModifiedDate, comment_count: commentCount } = article;

  const formattedDateString = () => {
    const date = new Date( lastModifiedDate ),
      options = { day: 'numeric', month: 'short', year: 'numeric' };

    return date.toLocaleDateString( 'en-US', options );
  };

  return (
    <div
      className="flex items-center bg-white border-b border-[#D9D9D9] py-4"
      ref={ setNodeRef }
      style={ style }
      { ...attributes }
      { ...listeners }
    >
      <img src={ drag } alt={ __( 'Docs Link Icon', 'wedocs' ) } />
      <div className="flex items-center w-full group">
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="truncate flex items-center">
            <div className="flex items-center pr-5">
              <img
                src={ file }
                className="w-full h-full px-3.5"
                alt={ __( 'Docs Link Icon', 'wedocs' ) }
              />
              <a
                href={ `${ window.location.origin }/?p=${ article?.id }` }
                className="flex items-center flex-shrink-0 text-base font-medium text-gray-700"
              >
                <span
                  className="hover:underline group-hover:text-black"
                  dangerouslySetInnerHTML={ {
                    __html: article?.title?.rendered,
                  } }
                ></span>

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
                href={ `${ window.location.origin }/wp-admin/post.php?post=${ article?.id }&action=edit` }
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
            </div>
          </div>
          <div className="flex items-center gap-5 flex-shrink-0 mt-4 sm:mt-0 sm:ml-5">
            <div className="flex items-center gap-10">
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
              <div className="article-updated-date w-40 text-sm text-[#969696]">
                { /* translators: %s: Formatted datetime string */ }
                { sprintf(
                  __( 'Updated at %s', 'wedocs' ),
                  formattedDateString
                ) }
              </div>
            </div>
          </div>
        </div>
        <div className="ml-8 flex-shrink-0">
          <DocActions docId={ article?.id } />
        </div>
      </div>
    </div>
  );
};

export default SectionArticles;
