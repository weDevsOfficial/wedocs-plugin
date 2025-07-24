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
    <div className="notice notice-success wedocs-notice flex p-0 relative" id="wedocs-promotion-notice">
        <div className="wedocs-logo-wrapper flex mr-[20px]">
            <img src={promoNotice.logo_url} alt="weDocs Icon" className="max-w-none"/>
        </div>
        <div className="wedocs-notice-content-wrapper pr-[5px]">
            <h3 className="text-lg font-semibold mt-4 mb-2">{ promoNotice.title }</h3>
            <p><b className="text-#3c434a font-[600]">{ promoNotice.content }</b></p>
            <a href={ promoNotice.action_url } className="button button-primary">{ promoNotice.action_title }</a>
        </div>
        <button type="button" className="notice-dismiss" onClick={handleDismiss}><span className="screen-reader-text">{ __( 'Dismiss this notice', 'wedocs' ) }</span></button>
    </div>
  );
}

export default WedocsPromoNotice;