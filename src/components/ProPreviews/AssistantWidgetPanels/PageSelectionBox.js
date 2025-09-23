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
			<div className="wedocs-relative wedocs-mb-2">
				<button
					onClick={ () => setShow( ! show ) }
					className="wedocs-w-full wedocs-cursor-pointer wedocs-rounded-md wedocs-border wedocs-border-gray-300 wedocs-bg-white wedocs-py-2 wedocs-pl-3 wedocs-pr-10 wedocs-text-left wedocs-shadow-sm focus:wedocs-border-indigo-500 focus:wedocs-outline-none focus:wedocs-ring-1 focus:wedocs-ring-indigo-500 sm:wedocs-text-sm"
				>
					{ selected?.length > 0 ? (
						<div className="active-roles wedocs-inline-flex wedocs-flex-wrap wedocs-items-center wedocs-gap-2.5">
							{ selected.map( ( page ) => (
								<span
									key={ page?.id }
									className="wedocs-inline-flex wedocs-items-center wedocs-gap-1 wedocs-rounded-md wedocs-bg-gray-100 wedocs-px-2.5 wedocs-py-0.5 wedocs-text-sm wedocs-text-gray-800"
								>
									{ page?.title }
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={ 3.5 }
										stroke="currentColor"
										className="wedocs-w-3 wedocs-h-3 wedocs-cursor-pointer wedocs-text-gray-400"
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
							<span className="wedocs-block multiSelectBox wedocs-truncate">
								{ __( 'Select page', 'wedocs' ) }
							</span>
							<span className="wedocs-pointer-events-none wedocs-absolute wedocs-inset-y-0 wedocs-right-0 wedocs-flex wedocs-items-center wedocs-pr-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									className="wedocs-h-5 wedocs-w-5 wedocs-text-gray-400"
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
				<div className="wedocs-relative" onClick={ () => setShow( true ) }>
					<ul className="wedocs-absolute wedocs-z-10 wedocs-mt-1 wedocs-max-h-60 wedocs-w-full wedocs-overflow-auto wedocs-rounded-md wedocs-bg-white wedocs-py-1 wedocs-text-base wedocs-shadow-lg wedocs-ring-1 wedocs-ring-black wedocs-ring-opacity-5 focus:wedocs-outline-none sm:wedocs-text-sm">
						{ options?.map( ( page ) => (
							<li
								key={ page?.id }
								onClick={ () => handleSelectBox( page ) }
								className="wedocs-cursor-pointer wedocs-text-gray-900 wedocs-flex hover:wedocs-bg-[#F9FAFB] wedocs-items-center wedocs-select-none wedocs-py-2 wedocs-px-4"
							>
								<label
									htmlFor="multi-select"
									className="wedocs-pl-2.5 wedocs-font-normal wedocs-block wedocs-truncate d-block wedocs-w-full"
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
										className="wedocs-h-5 wedocs-w-5 wedocs-ml-auto wedocs-text-indigo-700"
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
