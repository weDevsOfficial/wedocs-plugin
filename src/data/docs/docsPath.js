/**
 * Shared builder for the "fetch the whole doc tree" REST path.
 *
 * The admin doc tree only renders a handful of columns, but the collection
 * endpoint returns the full post object for every doc — including the rendered
 * `content`, which is by far the largest field. On a site with a few hundred
 * docs that turned a listing request into a multi-megabyte response, and
 * api-fetch walks `per_page=-1` as sequential 100-item pages, so the cost is
 * paid once per page before the tree can render.
 *
 * Requesting only the fields the tree actually reads keeps the response small.
 * Anything added to the UI must be added here too, otherwise it arrives
 * undefined.
 */

/**
 * Fields consumed by the admin doc tree.
 *
 * - id/parent/menu_order — build and order the tree
 * - title/status/slug    — row label, status pill, permalink editing
 * - modified             — "last updated" column
 * - comment_count        — comment badge
 * - link                 — "View" action
 * - meta                 — vendor-doc gating (`_is_vendor_doc`)
 */
export const DOC_LISTING_FIELDS = [
  'id',
  'parent',
  'menu_order',
  'title',
  'status',
  'slug',
  'modified',
  'comment_count',
  'link',
  'meta',
].join( ',' );

/**
 * Build the doc-tree fetching path.
 *
 * Kept behind the same `wedocs_documentation_fetching_path` filter the callers
 * used before, so Pro can still swap the whole path.
 *
 * @return {string} REST path for the full doc listing.
 */
export const getDocsFetchingPath = () => {
  const isAdmin = typeof weDocsAdminVars !== 'undefined';
  const status = `publish${ isAdmin ? ',draft,private' : '' }`;

  return wp.hooks.applyFilters(
    'wedocs_documentation_fetching_path',
    `/wp/v2/docs?per_page=-1&status=${ status }&_fields=${ DOC_LISTING_FIELDS }`
  );
};

/**
 * Default number of top-level docs shown per page.
 */
export const DEFAULT_PER_PAGE = 20;

/**
 * Per-page choices offered in the pagination controls.
 */
export const PER_PAGE_OPTIONS = [ 10, 20, 50, 100 ];

/**
 * Build the path for a page of top-level docs.
 *
 * Unlike the collection endpoint this returns only root docs, each already
 * carrying its `sections_count` / `articles_count`, so the cards can render
 * their badges without any descendant being fetched.
 *
 * @param {Object} options
 * @param {number} options.page     1-based page number.
 * @param {number} options.perPage  Roots per page.
 * @param {string} options.search   Optional title search.
 *
 * @return {string} REST path for one page of the doc listing.
 */
export const getDocsListingPath = ( {
  page = 1,
  perPage = DEFAULT_PER_PAGE,
  search = '',
} = {} ) => {
  const query = [ `page=${ page }`, `per_page=${ perPage }` ];

  if ( search ) {
    query.push( `search=${ encodeURIComponent( search ) }` );
  }

  return wp.hooks.applyFilters(
    'wedocs_documentation_listing_path',
    `/wp/v2/docs/listing?${ query.join( '&' ) }`
  );
};

/**
 * Build the path that fetches the direct children of one or more docs.
 *
 * @param {number[]} parentIds Docs whose children should be loaded.
 *
 * @return {string} REST path for the children request.
 */
export const getDocsChildrenPath = ( parentIds ) => {
  const query = [ ...new Set( parentIds ) ]
    .map( ( id ) => `parent[]=${ parseInt( id, 10 ) }` )
    .join( '&' );

  return `/wp/v2/docs/children?${ query }`;
};

export default getDocsFetchingPath;
