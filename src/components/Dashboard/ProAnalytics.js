/**
 * Advanced-analytics slot.
 *
 *  - Pro OFF -> nothing is rendered (the section is hidden).
 *  - Pro ON  -> whatever weDocs Pro injects through the
 *               `wedocs_dashboard_pro_section` filter. The Pro UI lives in the
 *               Pro plugin, NOT here — free only provides the slot.
 */
const ProAnalytics = ( { proActive, stats } ) => {
  if ( ! proActive ) {
    return null;
  }

  const proSection = wp.hooks.applyFilters(
    'wedocs_dashboard_pro_section',
    null,
    stats
  );

  return proSection || null;
};

export default ProAnalytics;
