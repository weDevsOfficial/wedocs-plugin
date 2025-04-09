import { __ } from '@wordpress/i18n';
import { dispatch, select } from '@wordpress/data';
import docStore from '../data/docs';
import { useState } from '@wordpress/element';
import settingsStore from '../data/settings';


const WedocsPromoNotice = ({ promos }) => {
  const [ hideNotice, setHideNotice ] = useState( false );
  const handleDismiss = () => {
    setHideNotice( true );

    dispatch(docStore)
    .dismissPromoNotice(promos.key)
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
            <img src={promos.logo_url} alt="weDocs Icon" class="max-w-none"/>
        </div>
        <div class="wedocs-notice-content-wrapper pr-[5px]">
            <h3 class="text-lg font-semibold mt-4 mb-2">{ promos.title }</h3>
            <p><b class="text-#3c434a font-[600]">{ promos.content }</b></p>
            <a href={ promos.action_url } class="button button-primary">{ promos.action_title }</a>
        </div>
        <button type="button" class="notice-dismiss" onClick={handleDismiss}><span class="screen-reader-text">{ __( 'Dismiss this notice', 'wedocs' ) }</span></button>
    </div>
  );
}

export default WedocsPromoNotice;