import { __, sprintf } from '@wordpress/i18n';
import { PER_PAGE_OPTIONS } from '../../data/docs/docsPath';

/**
 * Pagination controls for the top-level documentation list.
 *
 * Rendered only when there is more than one page, or when the per-page choice
 * is still worth offering, so small sites see no extra chrome.
 *
 * @param {Object}   props
 * @param {number}   props.page        Current 1-based page.
 * @param {number}   props.perPage     Docs shown per page.
 * @param {number}   props.total       Total docs available.
 * @param {number}   props.totalPages  Total number of pages.
 * @param {Function} props.onPageChange    Called with the requested page.
 * @param {Function} props.onPerPageChange Called with the requested page size.
 */
const DocsPagination = ( {
  page,
  perPage,
  total,
  totalPages,
  onPageChange,
  onPerPageChange,
} ) => {
  if ( ! total || ( totalPages <= 1 && total <= PER_PAGE_OPTIONS[ 0 ] ) ) {
    return null;
  }

  const first = total === 0 ? 0 : ( page - 1 ) * perPage + 1;
  const last = Math.min( page * perPage, total );

  const buttonClass =
    'relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <div className="wedocs-docs-pagination mt-7 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <label htmlFor="wedocs-per-page">{ __( 'Docs per page', 'wedocs' ) }</label>
        <select
          id="wedocs-per-page"
          value={ perPage }
          onChange={ ( event ) => onPerPageChange( parseInt( event.target.value, 10 ) ) }
          className="rounded-md border border-gray-300 bg-white py-1.5 pl-2 pr-8 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          { PER_PAGE_OPTIONS.map( ( option ) => (
            <option key={ option } value={ option }>
              { option }
            </option>
          ) ) }
        </select>
      </div>

      <p className="text-sm text-gray-700 m-0">
        { sprintf(
          // translators: 1: first doc on page, 2: last doc on page, 3: total docs.
          __( 'Showing %1$d–%2$d of %3$d docs', 'wedocs' ),
          first,
          last,
          total
        ) }
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className={ buttonClass }
          disabled={ page <= 1 }
          onClick={ () => onPageChange( page - 1 ) }
        >
          { __( 'Previous', 'wedocs' ) }
        </button>

        <span className="text-sm text-gray-700">
          { sprintf(
            // translators: 1: current page, 2: total pages.
            __( 'Page %1$d of %2$d', 'wedocs' ),
            page,
            totalPages
          ) }
        </span>

        <button
          type="button"
          className={ buttonClass }
          disabled={ page >= totalPages }
          onClick={ () => onPageChange( page + 1 ) }
        >
          { __( 'Next', 'wedocs' ) }
        </button>
      </div>
    </div>
  );
};

export default DocsPagination;
