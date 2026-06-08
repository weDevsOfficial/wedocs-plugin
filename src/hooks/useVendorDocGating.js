// DESCRIPTION: Custom hook that encapsulates the pro-gating logic for vendor docs.
// DESCRIPTION: Returns whether the upgrade popup should be shown when adding a vendor doc.

import { useSelect } from '@wordpress/data';
import { DOCS_STORE } from '../data/docs';

/**
 * Returns pro-gating state for vendor docs.
 *
 * When weDocs Pro is not active and the user already has one vendor doc,
 * any attempt to add another should be blocked and the upgrade popup shown.
 *
 * @return {{ isProLoaded: boolean, vendorDocCount: number, isGated: boolean }}
 */
const useVendorDocGating = () => {
  const isProLoaded = wp.hooks.applyFilters( 'wedocs_pro_loaded', false );

  const vendorDocCount = useSelect( ( select ) => {
    const docs = select( DOCS_STORE ).getDocs();
    return docs.filter( ( doc ) => doc.parent === 0 && doc.meta?._is_vendor_doc === '1' ).length;
  } );

  return {
    isProLoaded,
    vendorDocCount,
    isGated: ! isProLoaded && vendorDocCount >= 1,
  };
};

export default useVendorDocGating;
