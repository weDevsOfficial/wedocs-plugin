import { useSelect } from '@wordpress/data';
import docsStore from '../../data/docs';
import extractedTitle from '../../utils/extractedTitle';
import { __ } from '@wordpress/i18n';
import he from 'he';
import { Fragment } from '@wordpress/element';

const ListingHeader = ( { id } ) => {
  if ( ! id ) {
    return;
  }

  const doc = useSelect(
    ( select ) => select( docsStore ).getDoc( parseInt( id ) ),
    []
  );

  const loading = useSelect(
    ( select ) => select( docsStore ).getLoading(),
    []
  );

  return (
    <div className="docs-heading flex justify-between items-center mb-3.5">
      <div className="section-heading flex items-center">
        <h1 className="flex items-center font-medium text-[#111827] text-xl space-x-3 relative z-0">
          { ! loading ? (
            <Fragment>
              <a
                target="_blank"
                rel="noreferrer"
                href={ `${ weDocsAdminVars.adminUrl }post.php?post=${ id }&action=edit` }
                className="flex tooltip cursor-pointer items-center group hover:text-black !shadow-none before:max-w-xl z-[90] mr-1"
                data-tip={ he?.decode(
                  __(
                    doc?.title?.rendered ? doc?.title?.rendered : '',
                    'wedocs'
                  )
                ) }
              >
                <span
                  className="group-hover:underline mr-5"
                  dangerouslySetInnerHTML={ {
                    __html: extractedTitle( doc?.title?.rendered, 75 ),
                  } }
                ></span>
                <div
                  className="tooltip cursor-pointer flex items-center"
                  data-tip={ __( 'Edit', 'wedocs' ) }
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    className={ `group` }
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.303 1.322a2.4 2.4 0 1 1 3.394 3.394l-.951.951-3.394-3.394.951-.951zm-2.648 2.649L.6 14.025v3.394h3.394L14.049 7.365l-3.394-3.394z"
                      className="stroke-gray-400 group-hover:stroke-indigo-700"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                className={ `group tooltip cursor-pointer` }
                href={ doc?.link }
                data-tip={ __( 'View on Web', 'wedocs' ) }
              >
                <svg
                  className="stroke-gray-400 group-hover:stroke-indigo-700"
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
              { doc?.status === 'draft' && (
                <div className={ `docs-draft-status font-medium text-sm text-gray-800 leading-5 bg-[#E3E5E7] rounded-[42px] py-0.5 px-2.5 !ml-4` }>
                  { __( 'Draft', 'wedocs' ) }
                </div>
              ) }
            </Fragment>
          ) : (
            <div className="flex items-center group space-x-4">
              <span className="animate-pulse bg-[#94a3b8] rounded h-4 w-56 border-b hover:bg-gray-50"></span>
              <span className="animate-pulse bg-[#cbd5e1] rounded h-4 w-6 border-b hover:bg-gray-50"></span>
              <span className="animate-pulse bg-[#cbd5e1] rounded h-4 w-6 border-b hover:bg-gray-50"></span>
            </div>
          ) }
        </h1>
      </div>
    </div>
  );
};

export default ListingHeader;
