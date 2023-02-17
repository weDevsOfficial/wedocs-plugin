import ListingHeader from './ListingHeader';
import DocSections from './DocSections';
import { useParams } from 'react-router-dom';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import docsStore from '../../data/docs';
import BackToDocsPage from '../BackToDocsPage';
import ListingButtons from './ListingButtons';
import DocsListingPlaceholder from "./DocsListingPlaceholder";
import { useState } from "@wordpress/element";
import docStore from "../../data/docs";
import DraggableDocs from "../DraggableDocs";
import SearchFilter from "../SearchFilter";

const ListingPage = () => {
	const { id } = useParams();

	const sections = useSelect( ( select ) => {
		return select( docsStore ).getSectionsDocs( parseInt( id ) );
	}, [] );

    const loading = useSelect(
        ( select ) => select( docsStore ).getLoading(),
        []
    );

    const [ searchValue, setSearchValue ] = useState( '' );
    // const [ selectedSections, setSelectedSections ] = useState( [] );

    const handleChange = ( event, reset = false ) => {
        if ( reset ) {
            setSearchValue( '' );
        } else {
            setSearchValue( event.target.value );
        }
    };

    const docArticles = useSelect(
        ( select ) => select( docStore ).getDocArticles( parseInt( id ) ),
        []
    );

    const filteredArticles = docArticles?.filter( doc =>
        doc?.title?.rendered?.toLowerCase().includes( searchValue.toLowerCase() )
    );

    const searchFilter = ( section ) => {
        const parentIds = [];
        filteredArticles?.forEach( ( article ) => ! parentIds.includes( article.parent ) ? parentIds.push( article.parent ) : '' );

        if ( parentIds.includes( section.id ) ) {
            return section;
        }

        return section?.title?.rendered?.toLowerCase().includes( searchValue.toLowerCase() );
    };

    const filteredSections = sections?.filter( searchFilter ) || [];
    // const sortableSections = filteredSections.sort( (a, b) => a.menu_order - b.menu_order ) || [];

	return (
		<div className="docs-section-listing wrap py-5">
            <div className="flex items-center justify-between">
                <BackToDocsPage />
                <SearchFilter handleChange={ handleChange } searchValue={ searchValue } />
            </div>

			<ListingHeader id={ id } />

			{ ! loading && filteredSections.length > 0 &&
                filteredSections?.map( ( section ) => (
                //     <DraggableDocs docs={ sortableSections } docType={ 'Section' } searchValue={ searchValue }></DraggableDocs>
                    <DocSections
                        key={ section.id }
                        sections={ sections }
                        section={ section }
                        searchValue={ searchValue }
                    />
                ) ) }

            { ! loading && filteredSections.length === 0 && (
                <div className="space-y-4 mb-3">
                    <div className="bg-white shadow sm:rounded-md">
                        <div className="flex items-center cursor-pointer text-base px-4 py-5 sm:px-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                            </svg>
                            { __( 'No section found for this documentation', 'wedocs' ) }
                        </div>
                    </div>
                </div>
            ) }

            { loading && <DocsListingPlaceholder /> }
			<ListingButtons sections={ filteredSections } />
		</div>
	);
};

export default ListingPage;
