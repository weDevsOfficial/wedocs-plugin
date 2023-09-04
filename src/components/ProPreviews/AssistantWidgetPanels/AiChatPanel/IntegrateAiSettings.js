import { __ } from '@wordpress/i18n';
import DummySwitch from '../DummySwitch';

const IntegrateAiSettings = () => {
	return (
		<div className={ `relative` }>
			<div className="grid grid-cols-4 gap-5 mb-5">
                <div
                    className="col-span-4"
                    key="manage_subscription"
                >
                    <div className="settings-content flex items-center justify-between">
                        <div className="settings-heading flex items-center space-x-2 flex-1">
                            <label
                                className="block text-sm font-medium text-gray-700"
                                id="headlessui-listbox-label-15"
                                data-headlessui-state="open"
                            >
                                { __('Manage AI Chatbot Billing', 'wedocs') }
                            </label>
                        </div>
                        <div className="settings-field w-full align-center max-w-[490px] mt-1 ml-auto">
                            <button
                                type="button"
                                className="inline-flex shadow-gray-800/30 items-center border border-indigo-600 px-4 py-2 text-indigo-700 font-medium hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                { __( 'Manage Subscription', 'wedocs' ) }
                            </button>
                        </div>
                    </div>
                </div>
			</div>
			<div
				className="backdrop absolute z-0 top-0 left-0 w-full h-full"
				style={ { backgroundColor: 'white', opacity: 0.5 } }
			/>
		</div>
	)
}

export default IntegrateAiSettings
