import { __ } from '@wordpress/i18n';
import UpgradeTooltip from './UpgradeTooltip';
import { useState } from '@wordpress/element';

const ProBadge = ( { classes } ) => {
  const [ showTips, setShowTips ] = useState( false );

  return (
    <span
      onMouseEnter={ () => setShowTips( true ) }
      onMouseLeave={ () => setShowTips( false ) }
      className={ `pro-badge cursor-pointer text-white text-[10px] py-[3px] leading-none ${ classes ? classes : '' }` }
    >
      <div
        className='inline relative'
      >
        <img
          className='inline ml-3 h-5'
          src={ weDocsAdminVars?.weDocsProBadgeUrl }
          alt={ __( 'weDocs Logo', 'wedocs' ) }
        />
        <UpgradeTooltip classes={ `${ showTips ? 'block' : 'hidden' }` } />
      </div>
    </span>
  );
};

export default ProBadge;
