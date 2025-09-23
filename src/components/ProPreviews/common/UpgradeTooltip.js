import { __ } from '@wordpress/i18n';
import UpgradeButton from './UpgradeButton';

const UpgradeTooltip = ( { classes } ) => {
  const features = [
    __( 'Role-based permission management', 'wedocs' ),
    __( 'Auto & manual content arrangement', 'wedocs' ),
    __( 'Customizable doc & messaging tab' , 'wedocs' ),
    __( 'Pre-built & custom colors', 'wedocs' ),
    __( 'Assistant widget and A.I. Powered Chatbot', 'wedocs' ),
  ];

  return (
    <div className={ `${classes} pro-badge-tooltip wedocs-w-[270px] wedocs-z-[2000] wedocs-py-8 wedocs-px-6 wedocs-bg-black wedocs-left-[50%] wedocs-text-left wedocs-absolute wedocs--translate-x-1/2 wedocs-translate-y-[4%] wedocs-rounded-md wedocs-text-center after:wedocs-content-[''] before:wedocs-content[''] before:wedocs-absolute before:wedocs-w-full before:wedocs-h-4 before:wedocs-left-0 before:wedocs--top-4 after:wedocs-w-4 after:wedocs-h-4 after:wedocs-left-1/2 after:wedocs-top-0.5 after:wedocs-rounded-sm after:wedocs-absolute after:wedocs--translate-x-1/2 after:wedocs--translate-y-1/2 after:wedocs-rotate-[45deg] after:wedocs-bg-black` }>
      <h3 className='tooltip-header wedocs-text-white wedocs-text-sm wedocs-mb-4 wedocs-leading-3 wedocs-font-semibold'>{ __( 'Available in Pro. Unlock & enjoy:', 'wedocs' ) }</h3>
      { features && (
        <ul className={ `wedocs-text-left wedocs-mb-7` }>
          { features?.map( ( featureName, index ) => (
            <li key={ index } className='wedocs-flex wedocs-items-center wedocs-text-sm wedocs-space-x-2.5 wedocs-font-normal wedocs-leading-6 wedocs-whitespace-break-spaces'>
              <span className='tooltip-check'>
                <svg xmlns='http://www.w3.org/2000/svg' width='10' height='8' fill='#139F84'>
                  <path fillRule='evenodd' d='M8.927 1.134c-.33-.33-.865-.33-1.195 0L3.374 5.492 1.897 4.015c-.33-.33-.865-.33-1.195 0s-.33.865 0 1.195l2.075 2.075c.33.33.865.33 1.195 0l4.955-4.955c.33-.33.33-.865 0-1.195zM.992 4.853c.01.012.02.024.031.035l2.075 2.075a.39.39 0 0 0 .552 0l4.955-4.955a.39.39 0 0 0 .031-.517.39.39 0 0 1-.031.517L3.65 6.963a.39.39 0 0 1-.552 0L1.023 4.888c-.011-.011-.022-.023-.031-.035z' />
                </svg>
              </span>
              <span>{ featureName }</span>
            </li>
          ) ) }
        </ul>
      ) }
      <UpgradeButton />
    </div>
  );
}

export default UpgradeTooltip;
