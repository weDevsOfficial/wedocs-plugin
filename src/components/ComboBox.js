import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import AddSectionModal from './AddSectionModal';
import { useParams } from 'react-router-dom';

function classNames( ...classes ) {
	return classes.filter( Boolean ).join( ' ' );
}

const ComboBox = ( { sections } ) => {
	const { id } = useParams();
	const [ query, setQuery ] = useState( '' );
	const [ selectedPerson, setSelectedPerson ] = useState( null );

	const filteredPeople = sections.map( ( section ) => ( {
		id: section.id,
		name: section.title.rendered,
	} ) );

	// const filteredPeople =
	// 	query === ''
	// 		? sections
	// 		: sections.filter( ( person ) => {
	// 				return person.name
	// 					.toLowerCase()
	// 					.includes( query.toLowerCase() );
	// 		  } );

	return (
		<Combobox
			as="div"
			value={ selectedPerson }
			onChange={ setSelectedPerson }
		>
			<div className="relative mt-1">
				<Combobox.Input
					// className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
					placeholder={ __( 'Type a section name', 'dokan-driver' ) }
					required
					className="h-11 bg-gray-50 !border-gray-300 text-gray-900 text-base !rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full !py-2 !px-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					onChange={ ( event ) => setQuery( event.target.value ) }
					displayValue={ ( person ) => person?.name }
				/>
				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
					{ /*<ChevronUpDownIcon*/ }
					{ /*	className="h-5 w-5 text-gray-400"*/ }
					{ /*	aria-hidden="true"*/ }
					{ /*/>*/ }
				</Combobox.Button>

				{ filteredPeople.length > 0 && (
					<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base text-left shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{ filteredPeople.map( ( person ) => (
							<Combobox.Option
								key={ person.id }
								value={ person }
								className={ ( { active } ) =>
									classNames(
										'relative cursor-default select-none py-2.5 pl-3 pr-9 mb-0',
										active
											? 'bg-indigo-600 text-white'
											: 'text-gray-900'
									)
								}
							>
								{ ( { active, selected } ) => (
									<>
										<span
											className={ classNames(
												'block truncate',
												selected && 'font-semibold'
											) }
										>
											{ person.name }
										</span>

										{ selected && (
											<span
												className={ classNames(
													'absolute inset-y-0 right-0 flex items-center pr-4',
													active
														? 'text-white'
														: 'text-indigo-600'
												) }
											>
												{ /*<CheckIcon*/ }
												{ /*	className="h-5 w-5"*/ }
												{ /*	aria-hidden="true"*/ }
												{ /*/>*/ }
											</span>
										) }
									</>
								) }
							</Combobox.Option>
						) ) }

						<AddSectionModal parent={ id }>
							<Combobox.Option
								className="flex items-center bg-gray-100 relative cursor-pointer text-base text-indigo-600 mb-0 select-none py-2 pl-3 pr-9"
								value="custom"
							>
								<span className="dashicons dashicons-plus text-xs mt-1.5"></span>
								{ __( 'Create new section', 'wedocs' ) }
							</Combobox.Option>
						</AddSectionModal>
					</Combobox.Options>
				) }
			</div>
		</Combobox>
	);
};

export default ComboBox;
