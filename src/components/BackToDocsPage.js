import { __ } from '@wordpress/i18n';
import { Link } from 'react-router-dom';

const BackToDocsPage = () => {
  return (
    <Link
      to="/"
      className="inline-flex group items-center text-gray-700 hover:text-indigo-700 focus:shadow-none !font-medium !text-base"
    >
      <svg
        width="35"
        height="10"
        viewBox="0 0 20 10"
        fill="none"
        className="pr-3 group-hover:!stroke-indigo-700 stroke-gray-500"
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

export default BackToDocsPage;
