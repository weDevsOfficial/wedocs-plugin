const DocsPlaceholder = () => {
  return (
    <div className={ `documentation wedocs-relative wedocs-mx-auto wedocs-grid wedocs-grid-cols-1 sm:wedocs-grid-cols-2 lg:wedocs-grid-cols-3 2xl:wedocs-grid-cols-4 wedocs-gap-7` }>
      { [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ].map( ( value, index ) => (
        <div
          key={ index }
          className="wedocs-animate-pulse wedocs-bg-white wedocs-border-b hover:wedocs-bg-gray-50 wedocs-font-extrabold"
        >
          <div className="wedocs-flex wedocs-w-full wedocs-items-center wedocs-justify-between wedocs-space-x-6 wedocs-p-6 wedocs-pt-5">
            <div className="wedocs-flex-1 wedocs-truncate">
              <div className="wedocs-inline-flex wedocs-items-center wedocs-space-x-3">
                <div className="wedocs-flex wedocs-items-center wedocs-space-x-3 wedocs-flex-1 wedocs-group">
                  <a href="#" className="wedocs-mt-1.5 !wedocs-shadow-none">
                    <h3 className="wedocs-animate-pulse wedocs-bg-slate-200 wedocs-rounded wedocs-h-4 wedocs-w-64 wedocs-border-b hover:wedocs-bg-slate-300"></h3>
                  </a>
                  <a
                    target="_blank"
                    href="#"
                    rel="noreferrer"
                    className="wedocs-mt-[-2px] wedocs-hidden group-hover:wedocs-block !wedocs-shadow-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                    >
                      <path
                        d="M7.118 3.5H3.452c-1.013 0-1.833.821-1.833 1.833V14.5c0 1.012.821 1.833 1.833 1.833h9.167c1.012 0 1.833-.821 1.833-1.833v-3.667m-3.667-9.167h5.5m0 0v5.5m0-5.5l-9.167 9.167"
                        stroke="#4338ca"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="wedocs-flex wedocs-gap-5 wedocs-items-center">
              <div className="documentation-ellipsis-actions wedocs-relative wedocs-h-4 wedocs-w-8">
                <span className="wedocs-animate-pulse wedocs-bg-slate-200 wedocs-w-full wedocs-h-full wedocs-rounded wedocs-absolute wedocs-border-b hover:wedocs-bg-slate-300"></span>
              </div>
            </div>
          </div>
          <div className="wedocs-w-full wedocs-p-6 wedocs-pt-0 wedocs-pb-7">
            <ul role="list" className="wedocs-mb-6 wedocs-rounded-md">
              <li className="wedocs-flex wedocs-items-center wedocs-justify-between wedocs-mb-0 wedocs-py-1.5 wedocs-pl-3 wedocs-pr-4 wedocs-text-sm">
                <div className="wedocs-w-full wedocs-inline-flex wedocs-items-center">
                  <div className="wedocs-w-6 wedocs-flex wedocs-justify-center">
                    <span className="wedocs-mt-0.5 wedocs-animate-pulse wedocs-bg-slate-200 wedocs-rounded wedocs-h-4 wedocs-w-8 wedocs-border-b hover:wedocs-bg-slate-300"></span>
                  </div>
                  <span className="wedocs-ml-2 wedocs-mt-0.5 wedocs-animate-pulse wedocs-bg-slate-200 wedocs-rounded wedocs-h-4 wedocs-w-52 wedocs-border-b hover:wedocs-bg-slate-300"></span>
                </div>
              </li>
              <li className="wedocs-flex wedocs-items-center wedocs-justify-between wedocs-mb-0 wedocs-py-1.5 wedocs-pl-3 wedocs-pr-4 wedocs-text-sm">
                <div className="wedocs-flex wedocs-w-0 wedocs-flex-1 wedocs-items-center">
                  <div className="wedocs-w-6 wedocs-flex wedocs-justify-center">
                    <span className="wedocs-mt-0.5 wedocs-animate-pulse wedocs-bg-slate-200 wedocs-rounded wedocs-h-4 wedocs-w-8 wedocs-border-b hover:wedocs-bg-slate-300"></span>
                  </div>
                  <span className="wedocs-ml-2 wedocs-mt-0.5 wedocs-animate-pulse wedocs-bg-slate-200 wedocs-rounded wedocs-h-4 wedocs-w-52 wedocs-border-b hover:wedocs-bg-slate-300"></span>
                </div>
              </li>
            </ul>
          </div>
          <div className="wedocs-border-t wedocs-border-gray-200">
            <div className="wedocs--mt-px wedocs-flex wedocs-divide-x wedocs-divide-gray-200">
              <div className="wedocs-flex wedocs-w-0 wedocs-flex-1 wedocs-justify-end wedocs-items-center wedocs-py-4 wedocs-px-6">
                <button className="wedocs-py-2 wedocs-inline-flex wedocs-items-center wedocs-h-8 wedocs-w-16 hover:wedocs-text-white wedocs-rounded-md wedocs-border wedocs-border-gray-200 wedocs-ease-in-out wedocs-duration-200 wedocs-shadow-gray-100 wedocs-px-4 wedocs-text-sm wedocs-text-gray wedocs-shadow-sm">
                  <span className="wedocs-animate-pulse wedocs-bg-slate-200 wedocs-w-10 wedocs-h-4 wedocs-rounded wedocs-absolute wedocs-border-b hover:wedocs-bg-slate-300"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) ) }
    </div>
  );
};

export default DocsPlaceholder;
