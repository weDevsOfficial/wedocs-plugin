import { Link } from 'react-router-dom';
import DocActions from '../DocActions';
import extractedTitle from '../../utils/extractedTitle';
import { __ } from '@wordpress/i18n';
import he from 'he';

const DocumentationHeader = ( { doc, showActions } ) => {
  const { id, title } = doc;

  const privacyIcon = wp.hooks.applyFilters(
    'wedocs_documentation_privacy_action',
    [],
    id
  );

  return (
    <div className="flex w-full items-center justify-between space-x-6 p-6 pt-5 cursor-grab">
      <div className="flex-1">
        <div className="inline-flex items-center space-x-3">
          <div className="flex items-center space-x-3 flex-1 group">
            <div
              className="tooltip cursor-pointer before:max-w-xl z-[9]"
              data-tip={ he.decode( __( title?.rendered, 'wedocs' ) ) }
            >
              <Link to={ `/section/${ id }` }>
                <h3
                  className="truncate hover:underline text-lg font-medium text-[#3B3F4A]"
                  dangerouslySetInnerHTML={ {
                    __html: extractedTitle( title?.rendered, 25 ),
                  } }
                ></h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        { /* Render private documentation icon */ }
        { privacyIcon }
        { showActions && <DocActions docId={ id } type="doc" disabled /> }
      </div>
    </div>
  );
};

export default DocumentationHeader;
