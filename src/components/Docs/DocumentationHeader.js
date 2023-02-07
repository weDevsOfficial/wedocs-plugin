import { Link } from 'react-router-dom';
import DocActions from '../DocActions';

const DocumenationHeader = ( { doc } ) => {
	return (
		<div className="flex w-full items-center justify-between space-x-6 p-6 pt-5">
			<div className="flex-1 truncate">
				<div className="inline-flex items-center space-x-3">
					<div className="flex items-center space-x-3 flex-1 group">
						<Link to={ `/section/${ doc.id }` }>
							<h3 className="truncate hover:underline text-lg font-medium text-[#3B3F4A]">
								{ doc?.title?.rendered }
							</h3>
						</Link>
						<a
							target="_blank"
							href={ `${ window.location.origin }/?p=${ doc.id }` }
							rel="noreferrer"
							className="mt-[-2px] hidden group-hover:block"
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
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
			<div className="flex gap-5 items-center">
				<DocActions />
			</div>
		</div>
	);
};

export default DocumenationHeader;
