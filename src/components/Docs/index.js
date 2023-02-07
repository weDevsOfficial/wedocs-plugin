import docsStore from '../../data/docs';
import { __ } from '@wordpress/i18n';
import AddPostModal from '../AddPostModal';
import Button from '../Documentations/Button';
import EmptyDocs from '../EmptyDocs/EmptyDocs';
import ParentDocs from './ParentDocs';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

const Docs = () => {
	// const { parentDocs, loading } = useSelect( ( select ) => {
	// 	select( docsStore ).getDocs();
	// 	return {
	// 		loading: select( docsStore ).getIsResolving( 'getDocs' ),
	// 		parentDocs: select( docsStore ).getParentOnlyDocs(),
	// 	};
	// }, [] );

	const parentDocs = useSelect(
		( select ) => select( docsStore ).getParentOnlyDocs(),
		[]
	);

	// console.log( parentDocs );

	const loading = useSelect(
		( select ) => select( docsStore ).getLoading(),
		[]
	);

	return (
		<>
			<div className="flex items-center mt-5">
				<h1>{ __( 'All Docs', 'wedocs-pro' ) }</h1>
				<AddPostModal>
					<Button />
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
