import UpgradeTooltip from './UpgradeTooltip';
import { useState } from '@wordpress/element';

const Badge = ( { classes } ) => {
  const [ showTips, setShowTips ] = useState( false );

  return (
    <span
      onMouseEnter={ () => setShowTips( true ) }
      onMouseLeave={ () => setShowTips( false ) }
      className={ `pro-badge cursor-pointer relative text-white text-[10px] py-[3px] px-[5px] leading-none ml-1.5 ${ classes ? classes : '' }` }
    >
      <svg className='crown-icon hover:fill-[#cf7500]' xmlns="http://www.w3.org/2000/svg" width="20" fill="#ff9000" height="15">
        <path d="M19.213 4.116c.003.054-.001.108-.015.162l-1.234 6.255a.56.56 0 0 1-.541.413l-7.402.036h-.003-7.402c-.257 0-.482-.171-.544-.414L.839 4.295a.53.53 0 0 1-.015-.166C.347 3.983 0 3.548 0 3.036c0-.632.528-1.145 1.178-1.145s1.178.514 1.178 1.145a1.13 1.13 0 0 1-.43.884L3.47 5.434c.39.383.932.602 1.486.602.655 0 1.28-.303 1.673-.81l2.538-3.272c-.213-.207-.345-.494-.345-.809C8.822.514 9.351 0 10 0s1.178.514 1.178 1.145c0 .306-.125.584-.327.79l.002.003 2.52 3.281c.393.512 1.02.818 1.677.818a2.11 2.11 0 0 0 1.481-.597l1.554-1.512c-.268-.21-.44-.531-.44-.892 0-.632.528-1.145 1.177-1.145S20 2.405 20 3.036c0 .498-.329.922-.787 1.079zm-1.369 8.575c0-.301-.251-.545-.561-.545H2.779c-.31 0-.561.244-.561.545V14c0 .301.251.546.561.546h14.505c.31 0 .561-.244.561-.546v-1.309z"/>
      </svg>
      <UpgradeTooltip classes={ `${ showTips ? 'block' : 'hidden' }` } />
    </span>
  );
};

export default Badge;
