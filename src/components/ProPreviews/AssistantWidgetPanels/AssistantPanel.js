import { __ } from '@wordpress/i18n';
import DummySwitch from './DummySwitch';
import { useState } from '@wordpress/element';
import Overlay from '../common/Overlay';

const AssistantPanel = ( { children } ) => {
	const [ enabled, setEnabled ] = useState( true );
	const [ showOverlay, setShowOverlay ] = useState( false );

	return (
		<section>
			<div className="wedocs-shadow sm:wedocs-rounded-md wedocs-bg-white wedocs-min-h-[500px] wedocs-overflow-hidden">
				<div className="wedocs-flex wedocs-justify-between wedocs-items-center wedocs-py-4 wedocs-px-8 sm:wedocs-px-8 sm:wedocs-py-4">
					<div className="wedocs-flex wedocs-items-center wedocs-space-x-3">
						<h2 className="wedocs-text-gray-900 wedocs-font-medium wedocs-text-lg">
							{ __( 'Assistant Widget', 'wedocs' ) }
						</h2>
					</div>
					<div className="wedocs-flex wedocs-items-center">
						<DummySwitch setChange={ setEnabled } isEnabled={ true } />
					</div>
				</div>
				<hr className="wedocs-h-px !wedocs-bg-gray-200 wedocs-border-0 dark:!wedocs-bg-gray-200" />

				{/* Render panels body. */}
				<div
					className={ `wedocs-pt-6 wedocs-pb-20 wedocs-px-8 wedocs-relative` }
					onMouseEnter={ () => setShowOverlay( true ) }
					onMouseLeave={ () => setShowOverlay( false ) }
				>
					{ children }
					{ !enabled && (
						<div
							className="backdrop wedocs-absolute wedocs-z-0 wedocs-top-0 wedocs-left-0 wedocs-w-full wedocs-h-full"
							style={ { backgroundColor: 'white', opacity: 0.5 } }
						/>
					) }
					<Overlay classes={ `${ showOverlay ? 'wedocs-flex wedocs-items-center wedocs-justify-center wedocs-mt-[70px]' : 'wedocs-hidden' }` } />
				</div>
			</div>
		</section>
	);
}

export default AssistantPanel;
