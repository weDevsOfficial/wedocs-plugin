import ListingHeader from './ListingHeader';
import DocSections from './DocSections';
import { useParams } from 'react-router-dom';
import { useSelect } from '@wordpress/data';
import docsStore from '../../data/docs';
import BackToDocsPage from '../BackToDocsPage';
import { __ } from '@wordpress/i18n';
import ListingButtons from './ListingButtons';

const ListingPage = () => {
	const { id } = useParams();

	const sections = useSelect( ( select ) => {
		return select( docsStore ).getSectionsDocs( parseInt( id ) );
	}, [] );

	return (
		<div className="docs-section-listing wrap py-5">
			<BackToDocsPage />
			<ListingHeader id={ id } />
			{ sections &&
				sections.map( ( section ) => (
					<DocSections
						key={ section.id }
						sections={ sections }
						section={ section }
					/>
				) ) }
			<ListingButtons />
		</div>
	);
};

export default ListingPage;
