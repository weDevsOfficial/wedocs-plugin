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
      if ( 'Success' !== result ) {
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
    <div class="notice notice-success wedocs-notice flex p-0 relative" id="wedocs-promotion-notice">
        <div class="wedocs-logo-wrapper flex mr-[20px]">
            <img src={promoNotice.logo_url} alt="weDocs Icon" class="max-w-none"/>
        </div>
        <div class="wedocs-notice-content-wrapper pr-[5px]">
            <h3 class="text-lg font-semibold mt-4 mb-2">{ promoNotice.title }</h3>
            <p><b class="text-#3c434a font-[600]">{ promoNotice.content }</b></p>
            <a href={ promoNotice.action_url } class="button button-primary">{ promoNotice.action_title }</a>
        </div>
        <button type="button" class="notice-dismiss" onClick={handleDismiss}><span class="screen-reader-text">{ __( 'Dismiss this notice', 'wedocs' ) }</span></button>
    </div>
  );
}

export default WedocsPromoNotice;