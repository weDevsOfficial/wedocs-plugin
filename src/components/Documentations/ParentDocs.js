import folder from '../../assets/img/folder.png';
import { __, sprintf } from '@wordpress/i18n';
import file from '../../assets/img/file.png';
import { useSelect } from '@wordpress/data';
import docsStore from '../../data/docs';
import DocumentationHeader from './DocumentationHeader';
import AddSectionModal from '../AddSectionModal';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ParentDocs = ( { doc } ) => {
	if ( ! doc ) {
		return;
	}

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable( { id: doc.id } );

    const style = {
        transform: CSS.Transform.toString( transform ),
        transition,
    };

	const sections = useSelect(
		( select ) => select( docsStore ).getSectionsDocs( doc.id ),
		[]
	) || [];

	const articles = useSelect(
		( select ) => select( docsStore ).getDocArticles( doc.id ),
		[]
	) || [];

	return (
		<div className="col-span-1 rounded bg-white shadow" ref={ setNodeRef } style={ style } { ...attributes } { ...listeners }>
            <DocumentationHeader doc={ doc } />

			{ /* Documentation Section Start */ }
			<div className="w-full p-6 pt-0 pb-7">
				<ul role="list" className="mb-6 rounded-md">
					<li className="flex items-center justify-between mb-0 py-1.5 pl-3 pr-4 text-sm">
						<div className="w-full inline-flex items-center">
							<div className="w-6 flex-none justify-center">
								<img
									src={ folder }
									alt={ __( 'Docs Link Icon', 'wedocs' ) }
								/>
							</div>
							<span className="ml-2 flex-1 truncate">
								{ sprintf(
									// translators: %d: Length of documentation sections
									__( '%d Sections', 'wedocs' ),
									sections.length
								) }
							</span>
						</div>
					</li>
					<li className="flex items-center justify-between mb-0 py-1.5 pl-3 pr-4 text-sm">
						<div className="flex w-0 flex-1 items-center">
							<div className="w-6 flex justify-center">
								<img
									src={ file }
									alt={ __( 'Docs Link Icon', 'wedocs' ) }
								/>
							</div>
							<span className="ml-2 w-0 flex-1 truncate">
								{ sprintf(
									// translators: %d: Length of documentation articles
									__( '%d Articles', 'wedocs' ),
									articles.length
								) }
							</span>
						</div>
					</li>
				</ul>
			</div>
			{ /* Documentation Section End */ }

			{ /* Documentation Footer Start */ }
			<div className="border-t border-gray-200">
				<div className="-mt-px flex divide-x divide-gray-200">
					<div className="flex w-0 flex-1 justify-end items-center py-4 px-6">
                        <AddSectionModal
                            parent={ doc.id }
                            className="py-2 inline-flex items-center hover:bg-indigo-600 hover:text-white rounded-md border border-gray-200 ease-in-out duration-200 shadow-gray-100 px-4 text-sm text-gray shadow-sm"
                        >
                            <span className="dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-4 text-base flex items-center"></span>
                            { __( 'Add', 'wedocs-pro' ) }
                        </AddSectionModal>
					</div>
				</div>
			</div>
			{ /* Documentation Footer End */ }
		</div>
	);
};

export default ParentDocs;
