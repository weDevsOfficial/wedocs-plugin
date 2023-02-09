import ListingHeader from './ListingHeader';
import DocSections from './DocSections';
import { useParams } from 'react-router-dom';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import docsStore from '../../data/docs';
import BackToDocsPage from '../BackToDocsPage';
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
			{ sections && sections.length > 0 &&
				sections.map( ( section ) => (
					<DocSections
						key={ section.id }
						sections={ sections }
						section={ section }
					/>
				) ) }

            { sections && ! sections.length && (
                <div className="space-y-4 mb-3">
                    <div className="bg-white shadow sm:rounded-md">
                        <div className="cursor-pointer text-base px-4 py-5 sm:px-6">
                            { __( 'No section created for this documentation', 'wedocs' ) }
                        </div>
                    </div>
                </div>
            ) }
			<ListingButtons sections={ sections } />
		</div>
	);
};

export default ListingPage;
