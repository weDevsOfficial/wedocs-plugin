const DocsListingPlaceholder = () => {
  return (
    <>
      { [ 0, 1, 2, 3, 4 ].map( ( value, index ) => (
        <div
          key={ index }
          className="wedocs-space-y-4 wedocs-mb-3 animate-pulse wedocs-bg-white wedocs-border-b wedocs-rounded-md hover:wedocs-bg-gray-50"
        >
          <div className="wedocs-bg-white wedocs-shadow sm:wedocs-rounded-md">
            <div className="doc-section wedocs-cursor-pointer wedocs-px-4 wedocs-py-6 sm:wedocs-px-6 wedocs-flex wedocs-justify-between">
              <div className="wedocs-flex wedocs-items-center group wedocs-space-x-10 wedocs-mt-0.5">
                <div className="wedocs-flex wedocs-justify-center wedocs-space-x-2">
                  <span className="animate-pulse wedocs-bg-slate-200 wedocs-rounded wedocs-h-4 wedocs-w-6 wedocs-border-b hover:wedocs-bg-slate-300"></span>
                  <span className="animate-pulse wedocs-bg-slate-200 wedocs-rounded wedocs-h-4 wedocs-w-6 wedocs-border-b hover:wedocs-bg-slate-300"></span>
                  <span className="wedocs-ml-2 animate-pulse wedocs-bg-slate-200 wedocs-rounded wedocs-h-4 wedocs-w-52 wedocs-border-b hover:wedocs-bg-slate-300"></span>
                  <div className="article-counter wedocs-grid wedocs-place-content-center wedocs-text-white wedocs-font-medium wedocs-text-sm wedocs-h-4 wedocs-w-6 wedocs-bg-[#00A1E4] wedocs-rounded"></div>
                </div>
                <div className="wedocs-flex wedocs-items-center group wedocs-space-x-2">
                  <span className="animate-pulse wedocs-bg-slate-200 wedocs-rounded wedocs-h-4 wedocs-w-6 wedocs-border-b hover:wedocs-bg-slate-300"></span>
                  <span className="animate-pulse wedocs-bg-slate-200 wedocs-rounded wedocs-h-4 wedocs-w-6 wedocs-border-b hover:wedocs-bg-slate-300"></span>
                </div>
              </div>
              <span className="animate-pulse wedocs-bg-slate-200 wedocs-rounded wedocs-h-4 wedocs-w-6 wedocs-border-b hover:wedocs-bg-slate-300"></span>
            </div>
          </div>
        </div>
      ) ) }
    </>
  );
};

export default DocsListingPlaceholder;
