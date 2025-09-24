import { useSelect } from '@wordpress/data';
import docsStore from '../../data/docs';
import extractedTitle from '../../utils/extractedTitle';
import { __ } from '@wordpress/i18n';
import he from 'he';
import { Fragment } from '@wordpress/element';

const ListingHeader = ( { doc } ) => {
  if ( ! doc ) {
    return;
  }

  const loading = useSelect(
    ( select ) => select( docsStore ).getLoading(),
    []
  );

  return (
    <div className="docs-heading wedocs-flex wedocs-justify-between wedocs-items-center wedocs-mb-3.5">
      <div className="section-heading wedocs-flex wedocs-items-center">
        <h1 className="wedocs-flex wedocs-items-center wedocs-font-medium wedocs-text-[#111827] wedocs-text-xl wedocs-space-x-3 wedocs-relative wedocs-z-0">
          { ! loading ? (
            <Fragment>
              <a
                target="_blank"
                rel="noreferrer"
                href={ `${ weDocsAdminVars.adminUrl }post.php?post=${ doc?.id }&action=edit` }
                className="wedocs-flex tooltip wedocs-cursor-pointer wedocs-items-center group hover:wedocs-text-black !wedocs-shadow-none before:wedocs-max-w-xl wedocs-z-[90] wedocs-mr-1"
                data-tip={ he?.decode(
                  __(
                    doc?.title?.rendered ? doc?.title?.rendered : '',
                    'wedocs'
                  )
                ) }
              >
                <span
                  className="group-hover:wedocs-underline wedocs-mr-5"
                  dangerouslySetInnerHTML={ {
                    __html: extractedTitle( doc?.title?.rendered, 75 ),
                  } }
                ></span>
                <div
                  className="tooltip wedocs-cursor-pointer wedocs-flex wedocs-items-center"
                  data-tip={ __( 'Edit', 'wedocs' ) }
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    className={ `wedocs-group` }
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.303 1.322a2.4 2.4 0 1 1 3.394 3.394l-.951.951-3.394-3.394.951-.951zm-2.648 2.649L.6 14.025v3.394h3.394L14.049 7.365l-3.394-3.394z"
                      className="wedocs-stroke-gray-400 group-hover:wedocs-stroke-indigo-700"
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
                className={ `wedocs-group tooltip cursor-pointer` }
                href={ doc?.link }
                data-tip={ __( 'View on Web', 'wedocs' ) }
              >
                <svg
                  className="wedocs-stroke-gray-400 group-hover:wedocs-stroke-indigo-700"
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
                <div className={ `docs-draft-status wedocs-font-medium wedocs-text-sm wedocs-text-gray-800 wedocs-leading-5 wedocs-bg-[#E3E5E7] wedocs-rounded-[42px] wedocs-py-0.5 wedocs-px-2.5 !wedocs-ml-4` }>
                  { __( 'Draft', 'wedocs' ) }
                </div>
              ) }
            </Fragment>
          ) : (
            <div className="wedocs-flex wedocs-items-center group wedocs-space-x-4">
              <span className="animate-pulse wedocs-bg-[#94a3b8] wedocs-rounded wedocs-h-4 wedocs-w-56 wedocs-border-b hover:wedocs-bg-gray-50"></span>
              <span className="animate-pulse wedocs-bg-[#cbd5e1] wedocs-rounded wedocs-h-4 wedocs-w-6 wedocs-border-b hover:wedocs-bg-gray-50"></span>
              <span className="animate-pulse wedocs-bg-[#cbd5e1] wedocs-rounded wedocs-h-4 wedocs-w-6 wedocs-border-b hover:wedocs-bg-gray-50"></span>
            </div>
          ) }
        </h1>
      </div>
    </div>
  );
};

export default ListingHeader;
