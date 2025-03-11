import { __ } from '@wordpress/i18n';

const WedocsPromoNotice = ({ promos }) => {
  return (
    <div class="notice notice-success wedocs-notice flex p-0 relative h-32" id="wedocs-promotion-notice">
        <div class="wedocs-logo-wrapper flex mr-5 h-32">
            <img src={promos.logo_url} alt="weDocs Icon" />
        </div>
        <div class="wedocs-notice-content-wrapper">
            <h3 class="text-base font-semibold mt-4 mt-2">{ promos.title }</h3>
            <p><b>{ promos.content }</b></p>
            <a href={ promos.action_url } class="button button-primary">{ promos.action_title }</a>
        </div>
        <button type="button" class="notice-dismiss"><span class="screen-reader-text">{ __( 'Dismiss this notice', 'wedocs' ) }</span></button>
    </div>
  );
}

export default WedocsPromoNotice;