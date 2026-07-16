import { __ } from '@wordpress/i18n';
import Overlay from './common/Overlay';
import { useState } from '@wordpress/element';

/**
 * Pro preview for the Changelog settings (shown in free; locked behind an
 * upgrade overlay). Static mock only — no functional controls.
 */
const ChangelogSettings = () => {
	const [ showOverlay, setShowOverlay ] = useState( false );

	const modes = [
		{
			title: __( 'Single changelog', 'wedocs' ),
			desc: __( 'One timeline at /changelog with every update. Channels become filters.', 'wedocs' ),
			active: true,
		},
		{
			title: __( 'Separate per channel', 'wedocs' ),
			desc: __( 'Each channel is its own changelog at <base>/<channel>.', 'wedocs' ),
			active: false,
		},
	];

	const categories = [
		{ name: __( 'Fixes', 'wedocs' ), color: '#b45309' },
		{ name: __( 'Improvements', 'wedocs' ), color: '#15a66e' },
		{ name: __( 'New feature', 'wedocs' ), color: '#0ea5e9' },
		{ name: __( 'New releases', 'wedocs' ), color: '#4f46e5' },
	];

	return (
		<section>
			<div className="shadow sm:rounded-md bg-white min-h-[500px] relative">
				<div className="py-4 px-8">
					<h2 className="text-gray-900 font-medium text-lg">{ __( 'Changelog', 'wedocs' ) }</h2>
				</div>
				<hr className="h-px !bg-gray-200 border-0" />

				<div
					className="pt-6 pb-20 px-8 relative"
					onMouseEnter={ () => setShowOverlay( true ) }
					onMouseLeave={ () => setShowOverlay( false ) }
				>
					<label className="block text-sm font-medium text-gray-600 mb-2">{ __( 'Display mode', 'wedocs' ) }</label>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
						{ modes.map( ( m, i ) => (
							<div
								key={ i }
								className={ `relative rounded-lg border bg-white p-4 shadow-sm ${ m.active ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-gray-300' }` }
							>
								<span className="flex items-center text-sm font-semibold text-gray-900">
									{ m.title }
									<span className={ `ml-auto flex items-center justify-center rounded-full w-5 h-5 ${ m.active ? 'bg-indigo-600' : 'border border-gray-300' }` }>
										{ m.active && (
											<svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l3.5 3.5L15 6" /></svg>
										) }
									</span>
								</span>
								<span className="mt-1.5 block text-xs text-gray-500">{ m.desc }</span>
							</div>
						) ) }
					</div>

					<label className="block text-sm font-medium text-gray-600 mb-2">{ __( 'URL base', 'wedocs' ) }</label>
					<div className="flex items-stretch max-w-lg rounded-md border border-gray-300 overflow-hidden mb-6">
						<span className="flex items-center bg-gray-50 text-gray-400 text-sm px-3 border-r border-gray-300">{ window.location.host }/</span>
						<span className="flex-1 h-10 px-2 text-sm text-gray-800 flex items-center">changelog</span>
					</div>

					<div className="flex items-center justify-between max-w-lg mb-6">
						<label className="block text-sm font-medium text-gray-600">{ __( 'Header banner', 'wedocs' ) }</label>
						<span className="relative inline-flex h-5 w-10 items-center rounded-full bg-indigo-600">
							<span className="inline-block h-5 w-5 rounded-full border border-gray-200 bg-white shadow translate-x-5" />
						</span>
					</div>

					<label className="block text-sm font-medium text-gray-600 mb-3">{ __( 'Categories', 'wedocs' ) }</label>
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-5">
						{ categories.map( ( c, i ) => (
							<div key={ i } className="flex items-center gap-4">
								<span className="flex justify-center items-center space-x-1 px-2 py-1.5 rounded-md bg-white border border-[#E2E2E2]">
									<span style={ { background: c.color } } className="block w-6 h-6 rounded-full" />
									<svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 stroke-gray-500"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
								</span>
								<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold" style={ { background: c.color + '26', color: `color-mix(in srgb, ${ c.color } 64%, #000)` } }>{ c.name }</span>
							</div>
						) ) }
					</div>

					<Overlay classes={ `${ showOverlay ? 'flex items-center justify-center' : 'hidden' }` } />
				</div>
			</div>
		</section>
	);
};

export default ChangelogSettings;
