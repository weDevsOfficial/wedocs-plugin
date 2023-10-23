import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { CheckIcon } from '@heroicons/react/20/solid';

const PageSelectionBox = ( { boxId, options, settingsData, setSettings } ) => {
	const [ show, setShow ] = useState( false );
	const { assistant: assistantSettings } = settingsData;

	const [ selected, setSelected ] = useState(
		assistantSettings?.preference?.[ boxId ] || []
	);

	const handleSelectBox = ( page ) => {
		const hasSelected = selected?.find(
			( select ) => select?.id === page?.id
		);

		if ( typeof hasSelected === 'undefined' ) {
			setSelected( [ ...selected, page ] );
		} else {
			const pageList = selected.filter(
				( selectedPage ) => selectedPage?.id !== page?.id
			);
			setSelected( [ ...pageList ] );
		}
	};

	useEffect( () => {
		setSettings( {
			...settingsData,
			assistant: {
				...assistantSettings,
				preference: {
					...settingsData?.assistant?.preference,
					[ boxId ]: [ ...selected ]
				},
			},
		} );
	}, [ selected ] );

	useEffect( () => {
		const element = document.querySelector( `#${ boxId }` );

		document.addEventListener( 'click', function ( event ) {
			if ( ! element?.contains( event.target ) ) {
				setShow( false );
			}
		} );
	}, [ show ] );

	return (
		<div id={ boxId } className="pageSelectionBox">
			<div className="relative mb-2">
				<button
					onClick={ () => setShow( ! show ) }
					className="w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
				>
					{ selected?.length > 0 ? (
						<div className="active-roles inline-flex flex-wrap items-center gap-2.5">
							{ selected.map( ( page ) => (
								<span
									key={ page?.id }
									className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-0.5 text-sm text-gray-800"
								>
									{ page?.title }
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={ 3.5 }
										stroke="currentColor"
										className="w-3 h-3 cursor-pointer text-gray-400"
										onClick={ () =>
											handleSelectBox( page )
										}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</span>
							) ) }
						</div>
					) : (
						<>
							<span className="block multiSelectBox truncate">
								{ __( 'Select page', 'wedocs' ) }
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
						</>
					) }
				</button>
			</div>

			{ show && options && (
				<div className="relative" onClick={ () => setShow( true ) }>
					<ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{ options?.map( ( page ) => (
							<li
								key={ page?.id }
								onClick={ () => handleSelectBox( page ) }
								className="cursor-pointer text-gray-900 flex hover:bg-[#F9FAFB] items-center select-none py-2 px-4"
							>
								<label
									htmlFor="multi-select"
									className="pl-2.5 font-normal block truncate d-block w-full"
								>
									{ sprintf(
										__( '%s', 'wedocs' ),
										page?.title
									) }
								</label>

								{ selected
									?.map( ( pageObj ) => pageObj?.id )
									.includes( page?.id ) && (
									<CheckIcon
										className="h-5 w-5 ml-auto text-indigo-700"
										aria-hidden="true"
									/>
								) }
							</li>
						) ) }
					</ul>
				</div>
			) }
		</div>
	);
};

export default PageSelectionBox;
