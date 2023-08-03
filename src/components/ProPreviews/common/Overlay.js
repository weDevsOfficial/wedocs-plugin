import UpgradePopup from './UpgradePopup';

const Overlay = ( { classes } ) => {
  return (
    <div className={ `${classes} pro-content-overlay w-full h-full absolute top-0 left-0 z-50 bg-[#00000080]` }>
      <UpgradePopup />
    </div>
  );
};

export default Overlay;
