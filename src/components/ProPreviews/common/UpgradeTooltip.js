import { __ } from '@wordpress/i18n';
import UpgradeButton from './UpgradeButton';

const UpgradeTooltip = ( { classes, heading, description } ) => {
  const features = [
    __( 'Role-based permission management', 'wedocs' ),
    __( 'Auto & manual content arrangement', 'wedocs' ),
    __( 'Customizable doc & messaging tab' , 'wedocs' ),
    __( 'Pre-built & custom colors', 'wedocs' ),
    __( 'Assistant widget and A.I. Powered Chatbot', 'wedocs' ),
  ];

  return (
    <div className={ `${classes} pro-badge-tooltip w-[270px] z-[2000] py-8 px-6 bg-black left-[50%] text-left absolute -translate-x-1/2 translate-y-[4%] rounded-md text-center after:content-[''] before:content[''] before:absolute before:w-full before:h-4 before:left-0 before:-top-4 after:w-4 after:h-4 after:left-1/2 after:top-0.5 after:rounded-sm after:absolute after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-[45deg] after:bg-black` }>
     {
      heading ? <h3 className='tooltip-header text-white text-sm text-left leading-[20px] mb-4 font-bold'>{ __( heading, 'wedocs' ) }</h3>:  <h3 className='tooltip-header text-white text-sm mb-4 leading-3 font-semibold'>{ __( 'Available in Pro. Unlock & enjoy:', 'wedocs' ) }</h3>
     }
      { description ? <p className='text-sm text-white text-left leading-[21px] font-normal mb-6'>{__(description,'wedocs')}</p> : features && (
        <ul className={ `text-left mb-7` }>
          { features?.map( ( featureName, index ) => (
            <li key={ index } className='flex items-center text-sm space-x-2.5 font-normal leading-6 whitespace-break-spaces'>
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
      <UpgradeButton/>
    </div>
  );
}

export default UpgradeTooltip;
