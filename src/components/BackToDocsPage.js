import { __ } from '@wordpress/i18n';
import { Link } from 'react-router-dom';

const BackToDocsPage = () => {
  return (
    <Link
      to="/"
      className="wedocs-inline-flex wedocs-group wedocs-items-center wedocs-text-gray-700 hover:wedocs-text-indigo-700 focus:wedocs-shadow-none !wedocs-font-medium !wedocs-text-base"
    >
      <svg
        width="35"
        height="10"
        viewBox="0 0 20 10"
        fill="none"
        className="wedocs-pr-3 group-hover:!wedocs-stroke-indigo-700 wedocs-stroke-gray-500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 9L1 5M1 5L5 1M1 5L19 5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      { __( 'All Docs', 'wedocs' ) }
    </Link>
  );
};

window.backDocPage = BackToDocsPage;
export default BackToDocsPage;
