import { __ } from '@wordpress/i18n';
import Overlay from './common/Overlay';
import { useState } from '@wordpress/element';

/**
 * Pro preview for the Changelog settings (shown in free; locked behind an
 * upgrade overlay). Static mock only — no functional controls.
 */
/**
 * The Changelogs list, as the Pro screen draws it: header with the Add button,
 * then a row per entry with its release date, category and channel.
 */
const ChangelogList = () => {
	const entries = [
		{ title: 'v2.5.0', date: __( 'Released 12 August 2026', 'wedocs' ), category: __( 'New feature', 'wedocs' ), color: '#0ea5e9', channel: __( 'Pro', 'wedocs' ) },
		{ title: 'v2.4.3', date: __( 'Released 29 July 2026', 'wedocs' ), category: __( 'Fixes', 'wedocs' ), color: '#b45309', channel: __( 'Free', 'wedocs' ) },
		{ title: 'v2.4.2', date: __( 'Released 15 July 2026', 'wedocs' ), category: __( 'Improvements', 'wedocs' ), color: '#15a66e', channel: __( 'Free', 'wedocs' ) },
	];

	return (
		<>
			<div className="my-7 flex items-center justify-between">
				<h1 className="text-xl font-medium text-gray-900 m-0">{ __( 'Changelogs', 'wedocs' ) }</h1>
				<span className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-600 text-white">
					<span className="dashicons dashicons-plus" />
				</span>
			</div>

			<div className="space-y-3">
				{ entries.map( ( entry, i ) => (
					<div key={ i } className="bg-white border border-gray-300 rounded-md">
						<div className="flex items-center justify-between">
							<span className="text-gray-400 flex-shrink-0 px-4 py-6">
								<svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
									<circle cx="2" cy="2" r="1.5" /><circle cx="8" cy="2" r="1.5" />
									<circle cx="2" cy="8" r="1.5" /><circle cx="8" cy="8" r="1.5" />
									<circle cx="2" cy="14" r="1.5" /><circle cx="8" cy="14" r="1.5" />
								</svg>
							</span>

							<div className="flex-1 min-w-0 py-5 pr-4">
								<span className="block truncate text-base font-medium text-black">{ entry.title }</span>
								<p className="mt-1 mb-0 text-sm text-gray-500">{ entry.date }</p>
							</div>

							<div className="flex flex-shrink-0 items-center space-x-3 py-5 pr-4">
								<span
									className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
									style={ { background: entry.color + '26', color: entry.color } }
								>
									{ entry.category }
								</span>
								<span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
									{ entry.channel }
								</span>

								<svg className="text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
									<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
								</svg>
								<svg className="text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<polyline points="3 6 5 6 21 6" />
									<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
								</svg>
							</div>
						</div>
					</div>
				) ) }
			</div>
		</>
	);
};

/**
 * `variant` decides which half of the feature is being previewed: the
 * Changelogs screen itself, or its settings panel. One component either way,
 * so the two can only drift together.
 */
const ChangelogSettings = ( { variant = 'settings' } ) => {
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

	if ( 'screen' === variant ) {
		return (
			<section>
				<div
					className="relative"
					onMouseEnter={ () => setShowOverlay( true ) }
					onMouseLeave={ () => setShowOverlay( false ) }
				>
					<ChangelogList />
					<Overlay classes={ `${ showOverlay ? 'flex items-center justify-center' : 'hidden' }` } />
				</div>
			</section>
		);
	}

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
