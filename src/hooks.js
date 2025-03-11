import apiFetch from '@wordpress/api-fetch';

wp.hooks.addFilter(
  'wedocs_promo_notice',
  'wedocs_promo_notice_callback',
  function () {
    return apiFetch({
        path: '/wp/v2/docs/promotion-notice',
        })
        .then((result) => {
            // if (false != result) {
                // return result;
            // }

            return result;
        })
        .catch((err) => {});
  }
);
