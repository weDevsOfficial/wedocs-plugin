import docsStore from '../../data/docs';
import { __ } from '@wordpress/i18n';
import AddPostModal from '../AddPostModal';
import EmptyDocs from './EmptyDocs';
import ParentDocs from './ParentDocs';
import { useSelect } from '@wordpress/data';

const Docs = () => {
	const parentDocs = useSelect(
		( select ) => select( docsStore ).getParentDocs(),
		[]
	);

	const loading = useSelect(
		( select ) => select( docsStore ).getLoading(),
		[]
	);

	return (
		<>
			<div className="flex items-center mt-5">
				<h1>{ __( 'All Docs', 'wedocs-pro' ) }</h1>
				<AddPostModal>
                    <button
                        type="button"
                        className="ml-5 py-2 h-fit inline-flex items-center rounded-md border border-transparent bg-indigo-600 ease-in-out duration-200 px-4 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-4 text-base flex items-center"></span>
                        { __( `Add doc`, 'wedocs-pro' ) }
                    </button>
				</AddPostModal>
			</div>
			<div
				role="list"
				className="documentation mx-auto mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
			>
				{ ! loading &&
					parentDocs &&
					parentDocs?.map( ( doc ) => (
						<ParentDocs key={ doc.id } doc={ doc } />
					) ) }
			</div>

			{ ! loading && parentDocs && ! parentDocs.length && <EmptyDocs /> }
			{ loading && (
				<span className="spinner is-active float-left"></span>
			) }
		</>
	);
};

export default Docs;
