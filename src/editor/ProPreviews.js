import AiDocWriterImageUploadPreview from '../components/ProPreviews/AiDocWriterImageUploadPreview';

wp.hooks.addFilter(
	'wedocs_ai_doc_writer_modal_fields',
	'wedocs_free_ai_doc_writer_image_upload_preview',
	function ( content, modalState, stateSetters, aiSettings ) {
		const isProLoaded = wp.hooks.applyFilters( 'wedocs_pro_loaded', false );
		if ( isProLoaded ) return content;

		return <AiDocWriterImageUploadPreview />;
	},
	5
);
