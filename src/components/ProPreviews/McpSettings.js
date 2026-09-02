import { __ } from '@wordpress/i18n';
import Overlay from './common/Overlay';
import { useState } from '@wordpress/element';

/**
 * Pro preview for the MCP settings (shown in free; locked behind an upgrade
 * overlay). Static mock only — no functional controls, and deliberately no
 * real endpoint or token, since neither exists without Pro.
 */
const McpSettings = () => {
	const [ showOverlay, setShowOverlay ] = useState( false );

	const stats = [
		{ label: __( 'Server status', 'wedocs' ), value: __( 'Active', 'wedocs' ) },
		{ label: __( 'Registered tools', 'wedocs' ), value: '6' },
		{ label: __( 'Connected apps', 'wedocs' ), value: '1' },
		{ label: __( 'Last activity', 'wedocs' ), value: __( 'Today', 'wedocs' ) },
	];

	const steps = [
		__( 'In Claude, open Settings > Connectors > Add custom connector.', 'wedocs' ),
		__( 'Paste the connector URL and give it a name, for example weDocs.', 'wedocs' ),
		__( 'Click Add, then approve access when Claude asks you to sign in.', 'wedocs' ),
	];

	const checks = [
		{ label: __( 'Secure connection', 'wedocs' ), detail: __( 'HTTPS is on and every WordPress URL agrees.', 'wedocs' ) },
		{ label: __( 'Registered tools', 'wedocs' ), detail: __( '6 weDocs tools are offered to connected clients.', 'wedocs' ) },
		{ label: __( 'Sign-in challenge', 'wedocs' ), detail: __( 'An unauthenticated request is refused with a sign-in challenge.', 'wedocs' ) },
	];

	return (
		<section>
			<div className="shadow sm:rounded-md bg-white min-h-[500px] relative">
				<div className="flex items-center justify-between py-4 px-8">
					<div className="flex items-center gap-3">
						<h2 className="text-gray-900 font-medium text-lg m-0">{ __( 'MCP', 'wedocs' ) }</h2>
						<span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
							{ __( 'Active', 'wedocs' ) }
						</span>
					</div>
					<div className="flex items-center gap-3">
						<span className="text-sm text-gray-600">{ __( 'Enable MCP access', 'wedocs' ) }</span>
						<span className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600">
							<span className="inline-block h-5 w-5 rounded-full border border-gray-200 bg-white shadow translate-x-[22px]" />
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
							'Let AI assistants such as Claude and ChatGPT read and write your documentation directly, over the Model Context Protocol. Access runs through a revocable connection token or a one-time sign-in, and every action is performed as the person who granted it.',
							'wedocs'
						) }
					</p>

					<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
						{ stats.map( ( stat, i ) => (
							<div key={ i } className="rounded-lg border border-gray-200 bg-white px-5 py-4">
								<span className="block text-xs font-medium text-gray-500">{ stat.label }</span>
								<span className="mt-1 block text-xl font-semibold text-gray-900">{ stat.value }</span>
							</div>
						) ) }
					</div>

					<h3 className="text-base font-semibold text-gray-900 mt-0 mb-4">
						{ __( 'Add weDocs to your client', 'wedocs' ) }
					</h3>

					<div className="rounded-lg border border-gray-200 p-5 mb-8">
						<div className="flex items-center justify-between mb-2">
							<span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
								{ __( 'Connector URL', 'wedocs' ) }
							</span>
							<span className="text-sm font-medium text-indigo-600">{ __( 'Copy', 'wedocs' ) }</span>
						</div>
						<div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2.5 text-xs text-gray-800 mb-5">
							{ `${ window.location.origin }/wedocs/mcp` }
						</div>

						<span className="block text-sm font-semibold text-gray-900 mb-2">{ __( 'Claude', 'wedocs' ) }</span>
						<ol className="m-0 pl-5 text-sm leading-relaxed text-gray-600">
							{ steps.map( ( step, i ) => (
								<li key={ i }>{ step }</li>
							) ) }
						</ol>
					</div>

					<h3 className="text-base font-semibold text-gray-900 mt-0 mb-4">
						{ __( 'Connection health', 'wedocs' ) }
					</h3>

					<div className="rounded-lg border border-gray-200 divide-y divide-gray-200">
						{ checks.map( ( check, i ) => (
							<div key={ i } className="flex items-start justify-between gap-4 px-5 py-3.5">
								<div>
									<span className="block text-sm font-medium text-gray-900">{ check.label }</span>
									<span className="block text-xs text-gray-500">{ check.detail }</span>
								</div>
								<span className="shrink-0 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
									{ __( 'OK', 'wedocs' ) }
								</span>
							</div>
						) ) }
					</div>

					<Overlay classes={ `${ showOverlay ? 'flex items-center justify-center' : 'hidden' }` } />
				</div>
			</div>
		</section>
	);
};

export default McpSettings;
