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
			<Tab.List className="space-x-3.5 mb-8 font-medium text-sm">
				{ tabs &&
					tabs?.map( ( tab, index ) => (
						<Tab
							className={
								'px-3 py-2 aria-selected:bg-indigo-700 aria-selected:text-white hover:text-white hover:bg-indigo-700 rounded-md'
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
