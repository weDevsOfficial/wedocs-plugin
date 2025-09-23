import { __, sprintf } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

const SearchFilter = ( { handleChange, searchValue, listing } ) => {
  useEffect( () => {
    // Dynamically load the Headway script and initialize with your public key
    const script = document.createElement( 'script' );
    script.src = 'https://cdn.headwayapp.co/widget.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Headway with your public key.
      window.Headway.init({
        selector: "#HW_badge_container",
        account: '7kzePx'
      });
    };

    // Clean up the script when the component unmounts
    return () => document.body.removeChild( script );
  }, [] );

  const openHeadwayWidget = () => {
    // Open the Headway widget
    window.Headway.show();
  };

  return (
    <>
      <span
        id={ `HW_badge_container` }
        onClick={ openHeadwayWidget }
        className={ `wedocs-flex wedocs-items-center wedocs-justify-center tooltip wedocs-ml-auto` }
      ></span>
      <div className={ `wedocs-flex wedocs-items-center wedocs-space-x-4 wedocs-text-xl` }>
        <a
          target={ `_blank` }
          href={ `https://wedocs.canny.io/ideas` }
          className={ `hover:!wedocs-text-indigo-800 focus:wedocs-shadow-none` }
        >
          { __( '💡 Feedback', 'wedocs' ) }
        </a>
        <div className="wedocs-relative wedocs-rounded-md wedocs-shadow-sm wedocs-ml-auto">
          <input
            type="text"
            placeholder={ sprintf(
              __( 'Search by %s', 'wedocs' ),
              listing ? __( 'article name', 'wedocs' ) : __( 'document name', 'wedocs' )
            ) }
            value={ searchValue }
            onChange={ handleChange }
            className="wedocs-w-80 wedocs-h-10 wedocs-text-sm focus:!wedocs-border-indigo-300 !wedocs-pl-4 !wedocs-rounded-md !wedocs-border-gray-300"
          />
          { searchValue && searchValue.length > 0 && (
            <div
              onClick={ ( e ) => handleChange( e, true ) }
              className="wedocs-cursor-pointer wedocs-absolute wedocs-inset-y-0 wedocs-right-9 wedocs-flex wedocs-items-center wedocs-pr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={ 1.5 }
                className="wedocs-w-5 wedocs-h-5 wedocs-stroke-[#6b7280]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          ) }
          <div className="wedocs-pointer-events-none wedocs-absolute wedocs-inset-y-0 wedocs-right-0 wedocs-flex wedocs-items-center wedocs-pr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={ 1.5 }
              className="wedocs-w-6 wedocs-h-6 wedocs-stroke-[#6b7280]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
