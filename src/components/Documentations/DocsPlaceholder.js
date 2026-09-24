// Loading state for the docs grid. It mirrors the real doc card in
// ParentDocs.js (white rounded card, 4.5rem header, two count rows, the
// contributor avatars and a footer holding the Add button) so the page does not jump when the docs
// arrive. Colours are set explicitly: in Tailwind 4 a bare `border-*`
// takes `currentColor`, which drew a dark line under every placeholder.
const Bar = ( { className = '' } ) => (
  <span className={ `block animate-pulse rounded bg-gray-200 ${ className }` } />
);

const DocsPlaceholder = () => {
  return (
    <div
      className="documentation relative mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7"
      aria-hidden="true"
    >
      { [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ].map( ( index ) => (
        <div key={ index } className="col-span-1 rounded bg-white shadow">
          <div className="flex w-full items-center justify-between px-6 h-[4.5rem]">
            <Bar className="h-5 w-40" />
            <div className="flex items-center gap-6">
              <Bar className="h-4 w-4" />
              <Bar className="h-4 w-1.5" />
            </div>
          </div>
          <div className="w-full p-6 pt-0 pb-7">
            <ul role="list" className="mb-6">
              { [ 0, 1 ].map( ( row ) => (
                <li key={ row } className="flex h-8 items-center mb-0 py-1.5 pl-3 pr-4">
                  <Bar className="h-4 w-5" />
                  <Bar className="ml-2 h-4 w-24" />
                </li>
              ) ) }
            </ul>
            <div className="ml-4 flex -space-x-2 h-7">
              { [ 0, 1, 2 ].map( ( avatar ) => (
                <Bar key={ avatar } className="h-7 w-7 rounded-full ring-2 ring-white" />
              ) ) }
            </div>
          </div>
          <div className="border-t border-gray-200">
            <div className="flex justify-end py-4 px-6">
              <Bar className="h-[38px] w-20 rounded-md" />
            </div>
          </div>
        </div>
      ) ) }
    </div>
  );
};

export default DocsPlaceholder;
