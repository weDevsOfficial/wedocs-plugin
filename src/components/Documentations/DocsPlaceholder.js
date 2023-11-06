const DocsPlaceholder = () => {
  return (
    <>
      { [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ].map( ( value, index ) => (
        <div
          key={ index }
          className="animate-pulse bg-white border-b hover:bg-gray-50 font-extrabold"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6 pt-5">
            <div className="flex-1 truncate">
              <div className="inline-flex items-center space-x-3">
                <div className="flex items-center space-x-3 flex-1 group">
                  <a href="#" className="mt-1.5 !shadow-none">
                    <h3 className="animate-pulse bg-slate-200 rounded h-4 w-64 border-b hover:bg-slate-300"></h3>
                  </a>
                  <a
                    target="_blank"
                    href="#"
                    rel="noreferrer"
                    className="mt-[-2px] hidden group-hover:block !shadow-none"
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
            <div className="flex gap-5 items-center">
              <div className="documentation-ellipsis-actions relative h-4 w-8">
                <span className="animate-pulse bg-slate-200 w-full h-full rounded absolute border-b hover:bg-slate-300"></span>
              </div>
            </div>
          </div>
          <div className="w-full p-6 pt-0 pb-7">
            <ul role="list" className="mb-6 rounded-md">
              <li className="flex items-center justify-between mb-0 py-1.5 pl-3 pr-4 text-sm">
                <div className="w-full inline-flex items-center">
                  <div className="w-6 flex justify-center">
                    <span className="mt-0.5 animate-pulse bg-slate-200 rounded h-4 w-8 border-b hover:bg-slate-300"></span>
                  </div>
                  <span className="ml-2 mt-0.5 animate-pulse bg-slate-200 rounded h-4 w-52 border-b hover:bg-slate-300"></span>
                </div>
              </li>
              <li className="flex items-center justify-between mb-0 py-1.5 pl-3 pr-4 text-sm">
                <div className="flex w-0 flex-1 items-center">
                  <div className="w-6 flex justify-center">
                    <span className="mt-0.5 animate-pulse bg-slate-200 rounded h-4 w-8 border-b hover:bg-slate-300"></span>
                  </div>
                  <span className="ml-2 mt-0.5 animate-pulse bg-slate-200 rounded h-4 w-52 border-b hover:bg-slate-300"></span>
                </div>
              </li>
            </ul>
          </div>
          <div className="border-t border-gray-200">
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1 justify-end items-center py-4 px-6">
                <button className="py-2 inline-flex items-center h-8 w-16 hover:text-white rounded-md border border-gray-200 ease-in-out duration-200 shadow-gray-100 px-4 text-sm text-gray shadow-sm">
                  <span className="animate-pulse bg-slate-200 w-10 h-4 rounded absolute border-b hover:bg-slate-300"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) ) }
    </>
  );
};

export default DocsPlaceholder;
