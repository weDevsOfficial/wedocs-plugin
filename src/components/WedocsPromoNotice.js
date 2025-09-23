import { __ } from '@wordpress/i18n';
import { dispatch, select, useSelect } from '@wordpress/data';
import docStore from '../data/docs';
import { useState } from '@wordpress/element';
import settingsStore from '../data/settings';

const WedocsPromoNotice = () => {
  const [ hideNotice, setHideNotice ] = useState( false );
  const promoNotice = useSelect(
    ( select ) => select( settingsStore ).getPromoNotice(),
    []
  );
  
  if ( ! promoNotice ) {
    return null;
  }

  const handleDismiss = () => {
    setHideNotice( true );

    dispatch(docStore)
    .dismissPromoNotice(promoNotice.key)
    .then( (result) => {
      if ( ! result.success ) {
        return;
      }
      
      dispatch('wedocs/settings').invalidateResolution(
        'getPromoNotice'
       );
    
      const promo = select( settingsStore ).getPromoNotice();
    } );
  }

  if ( hideNotice ) {
    return null;
  }

  return (
    <div className="notice notice-success wedocs-notice wedocs-flex wedocs-p-0 wedocs-relative" id="wedocs-promotion-notice">
        <div className="wedocs-logo-wrapper wedocs-flex wedocs-mr-[20px]">
            <img src={promoNotice.logo_url} alt="weDocs Icon" className="wedocs-max-w-none"/>
        </div>
        <div className="wedocs-notice-content-wrapper wedocs-pr-[5px]">
            <h3 className="wedocs-text-lg wedocs-font-semibold wedocs-mt-4 wedocs-mb-2">{ promoNotice.title }</h3>
            <p><b className="wedocs-text-#3c434a wedocs-font-[600]">{ promoNotice.content }</b></p>
            <a href={ promoNotice.action_url } className="button button-primary">{ promoNotice.action_title }</a>
        </div>
        <button type="button" className="notice-dismiss" onClick={handleDismiss}><span className="screen-reader-text">{ __( 'Dismiss this notice', 'wedocs' ) }</span></button>
    </div>
  );
}

export default WedocsPromoNotice;