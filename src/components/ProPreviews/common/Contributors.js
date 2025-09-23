import { __ } from '@wordpress/i18n';
import avatarOne from '../../../assets/img/avatar-one.jpg';
import avatarTwo from '../../../assets/img/avatar-two.jpg';
import avatarThree from '../../../assets/img/avatar-three.jpg';
import avatarFour from '../../../assets/img/avatar-four.jpg';

const Contributors = () => {
  const handleUpgradeClick = ( event ) => {
    event.preventDefault();
    event.stopPropagation();
    window.open( '//wedocs.co', '_blank' );
  };

  return (
    <div className="wedocs-isolate wedocs-relative wedocs-w-[108px] wedocs-ml-4 wedocs-flex wedocs--space-x-2 wedocs-h-7">
      <img
        src={ avatarOne }
        alt={ __( 'Fourth Contributor', 'wedocs' ) }
        className="wedocs-relative wedocs-z-0 wedocs-inline-block wedocs-h-full wedocs-w-7 wedocs-rounded-full wedocs-ring-2 wedocs-ring-white"
      />
      <img
        src={ avatarTwo }
        alt={ __( 'Fourth Contributor', 'wedocs' ) }
        className="wedocs-relative wedocs-z-0 wedocs-inline-block wedocs-h-full wedocs-w-7 wedocs-rounded-full wedocs-ring-2 wedocs-ring-white"
      />
      <img
        src={ avatarThree }
        alt={ __( 'Fourth Contributor', 'wedocs' ) }
        className="wedocs-relative wedocs-z-0 wedocs-inline-block wedocs-h-full wedocs-w-7 wedocs-rounded-full wedocs-ring-2 wedocs-ring-white"
      />
      <img
        src={ avatarFour }
        alt={ __( 'Fourth Contributor', 'wedocs' ) }
        className="wedocs-relative wedocs-z-0 wedocs-inline-block wedocs-h-full wedocs-w-7 wedocs-rounded-full wedocs-ring-2 wedocs-ring-white"
      />
      <div className="wedocs-relative wedocs-z-0 wedocs-inline-block wedocs-h-full wedocs-w-7 wedocs-rounded-full wedocs-ring-2 wedocs-ring-white wedocs-bg-indigo-700 wedocs-text-white">
        <span className="wedocs-absolute wedocs-top-1/2 wedocs-left-1/2 wedocs-transform wedocs--translate-x-1/2 wedocs--translate-y-1/2 wedocs--mt-[1px]">+5</span>
      </div>
      <div className={ `overlay wedocs-absolute wedocs-opacity-0 hover:wedocs-opacity-100 wedocs-flex wedocs-items-center wedocs-justify-center wedocs-w-[160px] wedocs-h-[50px] wedocs--mt-3 !wedocs-ml-[-26px] wedocs-rounded wedocs-bg-[#00000080]` }>
        <span
          onClick={ ( event ) => handleUpgradeClick( event ) }
          className={ `upgrade-button wedocs-text-white hover:wedocs-text-white wedocs-px-4 wedocs-py-1.5 focus:wedocs-text-white focus:wedocs-ring-0 wedocs-inline-flex wedocs-items-center wedocs-rounded-md wedocs-bg-[#ff9000] hover:wedocs-bg-[#cf7500] wedocs-font-semibold wedocs-text-[13px] wedocs-gap-2.5` }
        >
          { __( 'Upgrade', 'wedocs' ) }
          <svg className='crown-icon' width='20' fill='#fff' height='15'>
            <path d='M19.213 4.116c.003.054-.001.108-.015.162l-1.234 6.255a.56.56 0 0 1-.541.413l-7.402.036h-.003-7.402c-.257 0-.482-.171-.544-.414L.839 4.295a.53.53 0 0 1-.015-.166C.347 3.983 0 3.548 0 3.036c0-.632.528-1.145 1.178-1.145s1.178.514 1.178 1.145a1.13 1.13 0 0 1-.43.884L3.47 5.434c.39.383.932.602 1.486.602.655 0 1.28-.303 1.673-.81l2.538-3.272c-.213-.207-.345-.494-.345-.809C8.822.514 9.351 0 10 0s1.178.514 1.178 1.145c0 .306-.125.584-.327.79l.002.003 2.52 3.281c.393.512 1.02.818 1.677.818a2.11 2.11 0 0 0 1.481-.597l1.554-1.512c-.268-.21-.44-.531-.44-.892 0-.632.528-1.145 1.177-1.145S20 2.405 20 3.036c0 .498-.329.922-.787 1.079zm-1.369 8.575c0-.301-.251-.545-.561-.545H2.779c-.31 0-.561.244-.561.545V14c0 .301.251.546.561.546h14.505c.31 0 .561-.244.561-.546v-1.309z' />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default Contributors;
