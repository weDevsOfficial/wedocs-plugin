import { __ } from '@wordpress/i18n';
import Overlay from './common/Overlay';
import { useState } from '@wordpress/element';

/**
 * Pro preview for the Glossary settings (shown in free; locked behind an
 * upgrade overlay). Static mock only — no functional controls, and the switch
 * stays off, because without Pro no glossary term is ever rendered.
 */
const GlossarySettings = () => {
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
