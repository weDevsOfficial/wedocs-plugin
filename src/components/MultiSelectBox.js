import { __, sprintf, _n } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import ProSvg from "./ProPreviews/common/ProSvg"
import Badge from './ProPreviews/common/Badge';

const MultiSelectBox = ( {
	options
} ) => {
	const [ show, setShow ] = useState( false );

	return (
		<div  className="multiSelectBox">
			<div className="relative mb-2">
				<button
					onClick={ () => setShow( ! show ) }
					className="w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
				>
				
						<span className="block multiSelectBox truncate">
							{ __( '1 role selected', 'wedocs-pro' ) }
						</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
							className="h-5 w-5 text-gray-400"
						>
							<path
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</span>
				</button>
			</div>

			{ show && options && (
				<div className="relative" onClick={ () => setShow( true ) }>
					<ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{ Object.entries( options ).map( ( option ) => (
							<li
							key={option[1]}
								className={ `${ option[1] === 'Administrator relative' ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-[#F9FAFB]' } group cursor-pointer text-gray-900 flex items-center select-none py-2 px-4` }
							>
								<input
									type="checkbox"
									defaultChecked={ option[1] === 'Administrator' ?	
										true:false
									}
									disabled={option[1] !== 'Administrator'}
									style={ {
										boxShadow: 'none',
										borderColor: '#8c8f94',
										backgroundImage: 'none',
									} }
									className={ `${
										( option[1] === 'Administrator' )
											? `${ option[1] === 'Administrator' ? '!bg-indigo-700 !border-indigo-400' : '!bg-indigo-700 !border-indigo-700' } before:!content-white-checked before:block before:!-mt-[1px] checked:before:!ml-0 checked:before:items-center checked:before:flex checked:before:justify-center checked:before:!w-full`
											: '!bg-gray-100 !border-gray-300 before:!content-none checked:bg-none'
									} w-4 h-4 !mt-0 !rounded-full` }
								/>
							{
								option[1] === "Administrator" && 	(<svg className='absolute' width="16px" height="16px" fill='#fff' xmlns='http://www.w3.org/2000/svg'><path d='M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z'/></svg>)
							}

								<label
									htmlFor="multi-select"
									className={`pl-2.5 font-normal block truncate d-block w-full ${option[1]  !== 'Administrator' ? "text-gray-400":""}`}
								>
									{ sprintf(
										__( '%s', 'wedocs' ),
										option[ 1 ]
									) }
								</label>
								<ProSvg classes="opacity-0 group-hover:opacity-100 transition-opacity"/>
							</li>
						) ) }
					{/* <ProSvg position='absolute' top="50%" left="85%" transform="translateY(-50%)"/> */}
					</ul>
				</div>
			) }
		</div>
	);
};

export default MultiSelectBox;
