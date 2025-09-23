import { __ } from '@wordpress/i18n';
import DummySwitch from '../DummySwitch';

const IntegrateAiSettings = () => {
	return (
		<div className={ `wedocs-relative wedocs-h-[180px]` }>
			<div className="wedocs-grid wedocs-grid-cols-4 wedocs-gap-5 wedocs-mb-5">
                <div
                    className="wedocs-col-span-4"
                    key="manage_subscription"
                >
                    <div className="settings-content wedocs-flex wedocs-items-center wedocs-justify-between">
                        <div className="settings-heading md:wedocs-min-w-[300px] wedocs-flex wedocs-items-center wedocs-space-x-2 wedocs-flex-1">
                            <label
                                className="wedocs-block wedocs-text-sm wedocs-font-medium wedocs-text-gray-700"
                                id="headlessui-listbox-label-15"
                                data-headlessui-state="open"
                            >
                                { __('Manage A.I. Chatbot Billing', 'wedocs') }
                            </label>
                        </div>
                        <div className="settings-field wedocs-w-full align-center wedocs-max-w-[490px] wedocs-mt-1 wedocs-ml-auto">
                            <button
                                type="button"
                                className="wedocs-inline-flex wedocs-shadow-gray-800/30 wedocs-items-center wedocs-border wedocs-border-indigo-600 wedocs-px-4 wedocs-py-2 wedocs-text-indigo-700 wedocs-font-medium hover:wedocs-text-white hover:wedocs-bg-indigo-700 focus:wedocs-outline-none focus:wedocs-ring-2 focus:wedocs-ring-indigo-500 focus:wedocs-ring-offset-2"
                            >
                                { __( 'Manage Subscription', 'wedocs' ) }
                            </button>
                        </div>
                    </div>
                </div>
			</div>
			<div
				className="backdrop wedocs-absolute wedocs-z-0 wedocs-top-0 wedocs-left-0 wedocs-w-full wedocs-h-full"
				style={ { backgroundColor: 'white', opacity: 0.5 } }
			/>
		</div>
	)
}

export default IntegrateAiSettings
