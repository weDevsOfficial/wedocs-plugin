import Section from "./Section";
import DocHeader from "./DocHeader";
import AddSection from "./AddSection";

const Documentation = ({ docs }) => {
    return (
        <ul className="docs ui-sortable loaded">
            { docs && docs.map( ( doc ) => (
                <li key={doc.id} className="single-doc">
                    <DocHeader doc={ doc } />
                    <Section docID={doc.id} />
                    <AddSection />
                </li>
            ) ) }
        </ul>
    );
}

export default Documentation;
