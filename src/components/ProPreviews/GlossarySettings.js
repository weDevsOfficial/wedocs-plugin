import { __, sprintf, _n } from '@wordpress/i18n';
import Overlay from './common/Overlay';
import { useState } from '@wordpress/element';

/**
 * Pro preview for the Glossary settings (shown in free; locked behind an
 * upgrade overlay). Static mock only — no functional controls, and the switch
 * stays off, because without Pro no glossary term is ever rendered.
 */
/**
 * The Glossaries list, as the Pro screen draws it: header with the Add button,
 * then a row per term with its drag handle, definition, article count,
 * controls and enable switch.
 */
const GlossaryList = () => {
	const terms = [
		{
			term: __( 'Cloudflare', 'wedocs' ),
			meaning: __( 'A service that sits in front of your site to speed it up and keep it online.', 'wedocs' ),
			link: __( 'Learn more', 'wedocs' ),
			articles: 4,
			on: true,
		},
		{
			term: __( 'DNS', 'wedocs' ),
			meaning: __( 'The address book of the internet: it turns a domain name into a server address.', 'wedocs' ),
			link: '',
			articles: 7,
			on: true,
		},
		{
			term: __( 'SSL', 'wedocs' ),
			meaning: __( 'The padlock in the address bar: it encrypts traffic between a reader and your site.', 'wedocs' ),
			link: '',
			articles: 3,
			on: false,
		},
	];

	return (
		<>
			<div className="glossary-header my-7 flex items-center justify-between">
				<h1 className="text-xl font-medium text-gray-900 m-0">{ __( 'Glossaries', 'wedocs' ) }</h1>
				<span className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-600 text-white">
					<span className="dashicons dashicons-plus" />
				</span>
			</div>

			<div className="space-y-3">
				{ terms.map( ( item, i ) => (
					<div key={ i } className="bg-white border border-gray-300 rounded-md">
						<div className="flex items-start justify-between">
							<span className="text-gray-400 flex-shrink-0 px-4 py-6">
								<svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
									<circle cx="2" cy="2" r="1.5" /><circle cx="8" cy="2" r="1.5" />
									<circle cx="2" cy="8" r="1.5" /><circle cx="8" cy="8" r="1.5" />
									<circle cx="2" cy="14" r="1.5" /><circle cx="8" cy="14" r="1.5" />
								</svg>
							</span>

							<div className="flex-1 min-w-0 py-5 pr-4">
								<span className="block truncate text-base font-medium text-black">{ item.term }</span>
								<p className="mt-1 mb-0 text-sm text-gray-500">{ item.meaning }</p>
								{ item.link && (
									<span className="mt-1 inline-block text-sm font-medium text-indigo-600">
										{ item.link } →
									</span>
								) }
							</div>

							<div className="flex flex-shrink-0 items-center space-x-3 py-5 pr-4">
								<span className="flex items-center gap-2 text-sm text-gray-500">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
									</svg>
									{ sprintf(
										/* translators: %d: number of articles mentioning the term. */
										_n( '%d Article', '%d Articles', item.articles, 'wedocs' ),
										item.articles
									) }
								</span>

								<svg className="text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
									<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
								</svg>
								<svg className="text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<polyline points="3 6 5 6 21 6" />
									<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
								</svg>

								<span className={ `relative inline-flex h-6 w-11 items-center rounded-full ${ item.on ? 'bg-indigo-600' : 'bg-gray-300' }` }>
									<span className={ `inline-block h-5 w-5 rounded-full border border-gray-200 bg-white shadow ${ item.on ? 'translate-x-[22px]' : 'translate-x-0.5' }` } />
								</span>
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
 * Glossaries screen itself, or its settings panel. One component either way,
 * so the two can only drift together.
 */
const GlossarySettings = ( { variant = 'settings' } ) => {
	const [ showOverlay, setShowOverlay ] = useState( false );

	// Mirrors the defaults the Pro panel ships with, so the swatches below are
	// the colours a customer would actually get.
	const colors = [
		{ label: __( 'Term color', 'wedocs' ), value: '#4F46E5' },
		{ label: __( 'Term hover color', 'wedocs' ), value: '#4338CA' },
		{ label: __( 'Tooltip text color', 'wedocs' ), value: '#F9FAFB' },
		{ label: __( 'Tooltip border color', 'wedocs' ), value: '#111827' },
		{ label: __( 'Tooltip background', 'wedocs' ), value: '#111827' },
		{ label: __( 'Tooltip link color', 'wedocs' ), value: '#FBBF24' },
	];

	const fonts = [
		{ label: __( 'Glossary term font', 'wedocs' ), style: __( 'Normal', 'wedocs' ), size: '16' },
		{ label: __( 'Tooltip font', 'wedocs' ), style: __( 'Normal', 'wedocs' ), size: '16' },
	];

	if ( 'screen' === variant ) {
		return (
			<section>
				<div
					className="relative"
					onMouseEnter={ () => setShowOverlay( true ) }
					onMouseLeave={ () => setShowOverlay( false ) }
				>
					<GlossaryList />
					<Overlay classes={ `${ showOverlay ? 'flex items-center justify-center' : 'hidden' }` } />
				</div>
			</section>
		);
	}

	return (
		<section>
			<div className="shadow sm:rounded-md bg-white min-h-[500px] relative">
				<div className="flex items-center justify-between py-4 px-8">
					<h2 className="text-gray-900 font-medium text-lg m-0">{ __( 'Glossary', 'wedocs' ) }</h2>
					<div className="flex items-center gap-3">
						<span className="text-sm text-gray-600">{ __( 'Enable Glossary', 'wedocs' ) }</span>
						<span className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
							<span className="inline-block h-5 w-5 rounded-full border border-gray-200 bg-white shadow translate-x-0.5" />
						</span>
					</div>
				</div>

				<hr className="h-px !bg-gray-200 border-0" />

				<div
					className="pt-6 pb-20 px-8 relative"
					onMouseEnter={ () => setShowOverlay( true ) }
					onMouseLeave={ () => setShowOverlay( false ) }
				>
					<p className="mt-0 mb-6 text-sm leading-relaxed text-gray-500 max-w-3xl">
						{ __(
							'Define a term once and weDocs marks it wherever it appears in your documentation, with a tooltip that explains it in place. These controls decide how the term and its tooltip look.',
							'wedocs'
						) }
					</p>

					{ fonts.map( ( font, i ) => (
						<div key={ i } className="flex items-center justify-between py-4 border-b border-gray-100">
							<label className="block text-sm font-medium text-gray-600">{ font.label }</label>
							<div className="flex items-center gap-2">
								<span className="flex h-10 w-40 items-center rounded-md border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800">
									{ font.style }
								</span>
								<span className="flex h-10 w-20 items-center rounded-md border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800">
									{ font.size }
								</span>
							</div>
						</div>
					) ) }

					<label className="mt-6 block text-sm font-medium text-gray-600 mb-3">
						{ __( 'Colors', 'wedocs' ) }
					</label>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 mb-8">
						{ colors.map( ( color, i ) => (
							<div key={ i } className="flex items-center justify-between">
								<span className="text-sm text-gray-600">{ color.label }</span>
								<span className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-2 py-1.5">
									<span
										style={ { background: color.value } }
										className="block h-6 w-6 rounded-full border border-gray-200"
									/>
									<span className="text-xs uppercase text-gray-500">{ color.value }</span>
								</span>
							</div>
						) ) }
					</div>

					<label className="block text-sm font-medium text-gray-600 mb-3">
						{ __( 'Preview', 'wedocs' ) }
					</label>
					<div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-6">
						<p className="m-0 text-sm leading-relaxed text-gray-700">
							{ __( 'Point your domain at our servers using', 'wedocs' ) }{ ' ' }
							<span
								className="font-medium"
								style={ { color: '#4F46E5', textDecoration: 'underline', textUnderlineOffset: '3px' } }
							>
								{ __( 'Cloudflare', 'wedocs' ) }
							</span>{ ' ' }
							{ __( 'and the change goes live within minutes.', 'wedocs' ) }
						</p>

						<div
							className="mt-4 inline-block max-w-xs rounded-md px-4 py-3"
							style={ { background: '#111827', border: '1px solid #111827' } }
						>
							<span className="block text-xs leading-relaxed" style={ { color: '#F9FAFB' } }>
								{ __( 'A service that sits in front of your site to speed it up and keep it online.', 'wedocs' ) }
							</span>
							<span className="mt-2 block text-xs font-medium" style={ { color: '#FBBF24' } }>
								{ __( 'Learn more →', 'wedocs' ) }
							</span>
						</div>
					</div>

					<Overlay classes={ `${ showOverlay ? 'flex items-center justify-center' : 'hidden' }` } />
				</div>
			</div>
		</section>
	);
};

export default GlossarySettings;
