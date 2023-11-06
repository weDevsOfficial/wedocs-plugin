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
		<div className={ `${ classes } h-8` }>
			<Listbox
				value={ selected }
				onChange={ ( selectedObj ) =>
					handleOptionSelection( selectedObj )
				}
			>
				<div className="relative">
					<Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
						<span className="block truncate">
							{ selected.value }
						</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronUpDownIcon
								className="h-5 w-5 text-gray-400"
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
						<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{ options.map( ( option ) => (
								<Listbox.Option
									key={ option?.key }
									className={ ( { active } ) =>
										`relative cursor-pointer select-none py-2 px-4 pr-4 ${
											active
												? 'bg-indigo-700 text-white'
												: 'text-gray-900'
										}`
									}
									value={ option }
								>
									<span className="block truncate text-sm font-normal">
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
