import { Fragment, useEffect, useState } from '@wordpress/element';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

const SelectBox = ( {
	options,
	classes,
	fieldName,
	setSettings,
	settingsName,
	settingsData,
	defaultValue,
} ) => {
	const [ selected, setSelected ] = useState( defaultValue );

	const handleOptionSelection = ( selectedObj ) => {
		setSelected( { ...selectedObj } );

		setSettings( {
			...settingsData,
			assistant: {
				...settingsData?.assistant,
				preference: {
					...settingsData?.assistant?.preference,
					[ settingsName ]: {
						...settingsData?.assistant?.preference?.[ settingsName ],
						[ fieldName ]: selectedObj?.key,
					},
				},
			},
		} );
	};

	useEffect( () => {
		if (
			Boolean( settingsData?.assistant?.preference?.[ settingsName ]?.[ fieldName ] )
		) {
			setSelected( {
				...options?.find(
					( option ) =>
						option?.key ===
						settingsData?.assistant?.preference?.[ settingsName ]?.[ fieldName ]
				),
			} );
		}
	}, [ settingsData?.assistant?.preference?.[ settingsName ]?.[ fieldName ] ] );

	return (
		<div className={ `${ classes } wedocs-h-8` }>
			<Listbox
				value={ selected }
				onChange={ ( selectedObj ) =>
					handleOptionSelection( selectedObj )
				}
			>
				<div className="wedocs-relative">
					<Listbox.Button className="wedocs-relative wedocs-w-full wedocs-cursor-pointer wedocs-rounded-md wedocs-border wedocs-border-gray-300 wedocs-bg-white wedocs-py-2 wedocs-pl-3 wedocs-pr-10 wedocs-text-left wedocs-shadow-sm focus:wedocs-border-indigo-500 focus:wedocs-outline-none focus:wedocs-ring-1 focus:wedocs-ring-indigo-500 sm:wedocs-text-sm">
						<span className="wedocs-block wedocs-truncate">
							{ selected.value }
						</span>
						<span className="wedocs-pointer-events-none wedocs-absolute wedocs-inset-y-0 wedocs-right-0 wedocs-flex wedocs-items-center wedocs-pr-2">
							<ChevronUpDownIcon
								className="wedocs-h-5 wedocs-w-5 wedocs-text-gray-400"
								aria-hidden="true"
							/>
						</span>
					</Listbox.Button>
					<Transition
						as={ Fragment }
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="wedocs-absolute wedocs-z-10 wedocs-mt-1 wedocs-max-h-60 wedocs-w-full wedocs-overflow-auto wedocs-rounded-md wedocs-bg-white wedocs-py-1 wedocs-text-base wedocs-shadow-lg wedocs-ring-1 wedocs-ring-black wedocs-ring-opacity-5 focus:wedocs-outline-none sm:wedocs-text-sm">
							{ options.map( ( option ) => (
								<Listbox.Option
									key={ option?.key }
									className={ ( { active } ) =>
										`wedocs-relative wedocs-cursor-pointer wedocs-select-none wedocs-py-2 wedocs-px-4 wedocs-pr-4 ${
											active
												? 'wedocs-bg-indigo-700 wedocs-text-white'
												: 'wedocs-text-gray-900'
										}`
									}
									value={ option }
								>
									<span className="wedocs-block wedocs-truncate wedocs-text-sm wedocs-font-normal">
										{ option?.value }
									</span>
								</Listbox.Option>
							) ) }
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
};

export default SelectBox;
