import { __, sprintf } from '@wordpress/i18n';

const SearchFilter = ( { handleChange, searchValue, listing } ) => {
  return (
    <div className="relative rounded-md shadow-sm ml-auto">
      <input
        type="text"
        placeholder={ sprintf(
          __( 'Search by %s…', 'wedocs' ),
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
  );
};

export default SearchFilter;
