import { __ } from '@wordpress/i18n';
import DummySwitch from './DummySwitch';
import { useState } from '@wordpress/element';
import Overlay from '../common/Overlay';

const AssistantPanel = ( { children } ) => {
	const [ enabled, setEnabled ] = useState( true );
	const [ showOverlay, setShowOverlay ] = useState( false );

	return (
		<section>
			<div className="shadow sm:rounded-md bg-white min-h-[500px] overflow-hidden">
				<div className="flex justify-between items-center py-4 px-8 sm:px-8 sm:py-4">
					<div className="flex items-center space-x-3">
						<h2 className="text-gray-900 font-medium text-lg">
							{ __( 'Assistant Widget', 'wedocs' ) }
						</h2>
					</div>
					<div className="flex items-center">
						<DummySwitch setChange={ setEnabled } isEnabled={ true } />
					</div>
				</div>
				<hr className="h-px !bg-gray-200 border-0 dark:!bg-gray-200" />

				{/* Render panels body. */}
				<div
					className={ `pt-6 pb-20 px-8 relative` }
					onMouseEnter={ () => setShowOverlay( true ) }
					onMouseLeave={ () => setShowOverlay( false ) }
				>
					{ children }
					{ !enabled && (
						<div
							className="backdrop absolute z-0 top-0 left-0 w-full h-full"
							style={ { backgroundColor: 'white', opacity: 0.5 } }
						/>
					) }
					<Overlay classes={ `${ showOverlay ? 'flex items-center justify-center mt-[70px]' : 'hidden' }` } />
				</div>
			</div>
		</section>
	);
}

export default AssistantPanel;
