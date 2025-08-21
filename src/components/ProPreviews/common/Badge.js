import ProSvg from './ProSvg';
import UpgradeTooltip from './UpgradeTooltip';
import { useState } from '@wordpress/element';

const Badge = ({ classes, position = 'relative', heading=null, description=null, top=null,left=null, transform=null }) => {
  const [showTips, setShowTips] = useState(false);

  return (
    <span
      onMouseEnter={() => setShowTips(true)}
      onMouseLeave={() => setShowTips(false)}
      className={`${position} pro-badge cursor-pointer text-white text-[10px] py-[3px] px-[5px] leading-none ml-1.5 ${
        classes ? classes : ''
      }`}
      style={{top: `${top}`, left: `${left}`, transform: `${transform}`}}
    >
      <ProSvg />

      <UpgradeTooltip classes={`${showTips ? 'block' : 'hidden'}`} heading={heading} description={description}/>
    </span>
  );
};

export default Badge;
