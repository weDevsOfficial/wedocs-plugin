import WedocsPromoNotice from "./WedocsPromoNotice";
import { useState, useEffect } from '@wordpress/element';

const Layout = ( { children } ) => {
  const [promoNotices, setPromoNotices] = useState(null);

  useEffect(() => {
    wp.hooks.applyFilters( 'wedocs_promo_notice' ).then((result) => {
      if( false != result ) {
        setPromoNotices(result);
      }
    });
  }, []);
  
  return <div className="pro-docs">
    {promoNotices && <WedocsPromoNotice promos={promoNotices} />}
    { children }
    </div>;
};

export default Layout;
