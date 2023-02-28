const DocsListingPlaceholder = () => {
  return (
    <>
      { [ 0, 1, 2, 3, 4 ].map( ( value, index ) => (
        <div
          key={ index }
          className="space-y-4 mb-3 animate-pulse bg-white border-b rounded-md hover:bg-gray-50"
        >
          <div className="bg-white shadow sm:rounded-md">
            <div className="doc-section cursor-pointer px-4 py-6 sm:px-6 flex justify-between">
              <div className="flex items-center group space-x-10 mt-0.5">
                <div className="flex justify-center space-x-2">
                  <span className="animate-pulse bg-slate-200 rounded h-4 w-6 border-b hover:bg-slate-300"></span>
                  <span className="animate-pulse bg-slate-200 rounded h-4 w-6 border-b hover:bg-slate-300"></span>
                  <span className="ml-2 animate-pulse bg-slate-200 rounded h-4 w-52 border-b hover:bg-slate-300"></span>
                  <div className="article-counter grid place-content-center text-white font-medium text-sm h-4 w-6 bg-[#00A1E4] rounded"></div>
                </div>
                <div className="flex items-center group space-x-2">
                  <span className="animate-pulse bg-slate-200 rounded h-4 w-6 border-b hover:bg-slate-300"></span>
                  <span className="animate-pulse bg-slate-200 rounded h-4 w-6 border-b hover:bg-slate-300"></span>
                </div>
              </div>
              <span className="animate-pulse bg-slate-200 rounded h-4 w-6 border-b hover:bg-slate-300"></span>
            </div>
          </div>
        </div>
      ) ) }
    </>
  );
};

export default DocsListingPlaceholder;
