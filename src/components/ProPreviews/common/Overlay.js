import UpgradePopup from './UpgradePopup';

const Overlay = ( { classes } ) => {
  return (
    <div className={ `${classes} pro-content-overlay wedocs-w-full wedocs-h-full wedocs-absolute wedocs-top-0 wedocs-left-0 wedocs-bg-[#00000080]` }>
      <UpgradePopup />
    </div>
  );
};

export default Overlay;
