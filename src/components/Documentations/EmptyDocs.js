import { __ } from '@wordpress/i18n';
import CreateImage from '../../assets/img/create.jpg';
import AddPostModal from '../AddPostModal';

const EmptyDocs = () => {
  return (
    <>
      <div className="w-full">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 h-screen flex justify-center align-center bg-white px-4 py-5 sm:p-6">
            <div className="w-[500px] text-center self-center mt-1 px-6 py-12">
              <h2 className="text-center mb-6">
                <img
                  className="mx-auto"
                  src={ CreateImage }
                  alt={ __( 'Docs Create Icon', 'wedocs' ) }
                />
                <p className="text-[#3B3F4A] font-bold text-2xl">
                  { __( 'Get started by creating a new doc', 'wedocs' ) }
                </p>
                <p className="text-[#666B79] text-lg">
                  <a
                    href="https://wedocs.co/docs/wedocs/how-to/how-to-create-a-doc/"
                    className="text-[#0043FF]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    { __( 'Learn More ', 'wedocs' ) }
                  </a>
                  { __( 'how to create a new doc', 'wedocs' ) }
                </p>
              </h2>
              <AddPostModal className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-2.5 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-4 text-base flex items-center"></span>
                { __( 'Create a new doc', 'wedocs' ) }
              </AddPostModal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyDocs;
