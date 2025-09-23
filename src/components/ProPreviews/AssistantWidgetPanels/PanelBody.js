import { Tab } from '@headlessui/react';
import { useState } from '@wordpress/element';
import Overlay from '../common/Overlay';

const PanelBody = ({ tabs, panels, children } ) => {
	const [ selectedIndex, setSelectedIndex ] = useState( 0 );

	return (
		<Tab.Group
			selectedIndex={ selectedIndex }
			onChange={ setSelectedIndex }
		>
			<Tab.List className="wedocs-space-x-3.5 wedocs-mb-8 wedocs-font-medium wedocs-text-sm">
				{ tabs &&
					tabs?.map( ( tab, index ) => (
						<Tab
							className={
								'wedocs-px-3 wedocs-py-2 aria-selected:wedocs-bg-indigo-700 aria-selected:wedocs-text-white hover:wedocs-text-white hover:wedocs-bg-indigo-700 wedocs-rounded-md'
							}
							key={ index }
						>
							{ tab }
						</Tab>
					) ) }
			</Tab.List>

			{/* Render panel settings switch. */}
			{ children }

			<Tab.Panels>
				{ panels && panels?.map( ( value, index ) => (
					<Tab.Panel key={ index }>
						{ value }
					</Tab.Panel>
				) ) }
			</Tab.Panels>
		</Tab.Group>
	);
}

export default PanelBody;
