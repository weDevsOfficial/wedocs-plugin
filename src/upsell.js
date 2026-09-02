// DESCRIPTION: Mounts a locked Pro preview onto its own admin screen.
//
// The Changelogs and Glossaries menu entries exist in Free so the menu does
// not rearrange itself on upgrade. Rather than draw a second mock in PHP,
// each screen renders the same ProPreviews panel the settings page already
// shows, so there is one preview per feature and it can only drift in one
// place.

import { createRoot } from '@wordpress/element';
import ChangelogSettings from './components/ProPreviews/ChangelogSettings';
import GlossarySettings from './components/ProPreviews/GlossarySettings';

const PANELS = {
	changelog: ChangelogSettings,
	glossary: GlossarySettings,
};

const container = document.getElementById( 'wedocs-upsell-app' );

if ( container ) {
	const Panel = PANELS[ container.dataset.screen ];

	if ( Panel ) {
		// Tailwind is scoped to `.wedocs-document` (see tailwind.config.js),
		// so the panel needs that wrapper to pick up any styling at all.
		createRoot( container ).render(
			// `screen` asks for the list the menu entry promises, rather than
			// the settings panel the same component draws on the settings page.
			<div className="wedocs-document w-full">
				<Panel variant="screen" />
			</div>
		);
	}
}
