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
    <div className={ `flex items-center space-x-4 text-xl` }>
      <span
        id={ `HW_badge_container` }
        data-tip={ __( 'Changelog', 'weDocs' ) }
        className={ `flex items-center justify-center tooltip` }
      >
        <svg
          fill="none"
          id="HW_badge"
          strokeWidth="1"
          viewBox="0 0 24 24"
          onClick={ openHeadwayWidget }
          className="w-8 h-8 hover:cursor-pointer stroke-indigo-300 absolute mt-0.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
          />
        </svg>
      </span>
      <a
        target={ `_blank` }
        href={ `https://forms.gle/i8HArn6nMqifW4Tk7` }
        className={ `hover:!text-indigo-800 focus:shadow-none` }
      >
        { __( '💡 Feedback', 'wedocs' ) }
      </a>
      <div className="relative rounded-md shadow-sm ml-auto">
        <input
          type="text"
          placeholder={ sprintf(
            __( 'Search by %s', 'wedocs' ),
            listing
              ? __( 'article name', 'wedocs' )
              : __( 'document name', 'wedocs' )
          ) }
          value={ searchValue }
          onChange={ handleChange }
          className="w-80 h-10 text-sm focus:!border-indigo-300 !pl-4 !rounded-md !border-gray-300"
        />
        { searchValue && searchValue.length > 0 && (
          <div
            onClick={ ( e ) => handleChange( e, true ) }
            className="cursor-pointer absolute inset-y-0 right-9 flex items-center pr-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={ 1.5 }
              className="w-5 h-5 stroke-[#6b7280]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        ) }
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={ 1.5 }
            className="w-6 h-6 stroke-[#6b7280]"
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
  );
};

export default SearchFilter;
