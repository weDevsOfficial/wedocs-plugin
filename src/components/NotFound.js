import { __ } from '@wordpress/i18n';

const NotFound = () => {
  return (
    <div className="wedocs-w-full wedocs-mt-7">
      <div className="wedocs-shadow sm:wedocs-overflow-hidden sm:wedocs-rounded-md">
        <div className="wedocs-space-y-6 wedocs-h-[80vh] wedocs-flex wedocs-justify-center wedocs-align-center wedocs-bg-white wedocs-px-4 wedocs-py-5 sm:wedocs-p-6">
          <div className="wedocs-w-[600px] wedocs-text-center wedocs-self-center wedocs-mt-1 wedocs-px-6 wedocs-py-12">
            <h2 className="wedocs-mb-6">
              <svg xmlns='http://www.w3.org/2000/svg' width='252' height='95' fill='none' className="wedocs-mx-auto wedocs-mb-6">
                <path fillRule='evenodd'
                  d='M89.147 94.491h44.489c19.042-.023 34.469-15.284 34.492-34.115V34.63C168.105 15.8 152.674.542 133.636.516h-9.997C104.597.538 89.169 15.8 89.147 34.63v59.86zm44.489-9.419H98.671V34.634c.019-13.63 11.187-24.677 24.968-24.692h9.997c13.781.019 24.948 11.062 24.967 24.692V60.38c-.015 13.63-11.183 24.673-24.967 24.692z'
                  fill='#4f46e5'
                />
                <path
                  d='M112.286 59.238h27.347c.086 0 .154.068.154.155v6.651c0 .087-.068.155-.154.155h-27.347c-.087 0-.155-.068-.155-.155v-6.651c0-.087.072-.155.155-.155zm0-14.035h32.694c.087 0 .155.068.155.155v6.651c0 .087-.068.155-.155.155h-32.694c-.087 0-.155-.068-.155-.155v-6.651c0-.083.072-.155.155-.155zm0-14.039h18.052c.087 0 .155.068.155.155v6.651c0 .087-.068.155-.155.155h-18.052c-.087 0-.155-.068-.155-.155v-6.651c0-.083.072-.155.155-.155z'
                  fill='#000'
                />
                <path
                  d='M47.358 94.491V75.017H6.311c-3.46 0-6.265-2.805-6.265-6.265v-2.641c0-1.161.322-2.298.932-3.285C13.27 42.932 27.016 21.727 39.774 3.206A6.24 6.24 0 0 1 44.917.51h8.021c3.46 0 6.265 2.805 6.265 6.265v57.757H73v10.486H59.202v19.474H47.358zM12.429 64.597h34.996v-53.21h-.808c-10.903 15.761-23.622 35.17-34.188 52.429v.782zm213.884 29.894V75.017h-41.047c-3.46 0-6.265-2.805-6.265-6.265v-2.641a6.25 6.25 0 0 1 .932-3.285c12.292-19.895 26.039-41.099 38.796-59.621A6.24 6.24 0 0 1 223.872.51h8.021c3.46 0 6.265 2.805 6.265 6.265v57.757h13.796v10.486h-13.796v19.474h-11.845zm-34.928-29.894h34.995v-53.21h-.807c-10.903 15.761-23.622 35.17-34.188 52.429v.782z'
                  fill='#4f46e5'
                />
              </svg>
              <p className="wedocs-text-[#3B3F4A] wedocs-font-bold wedocs-text-2xl wedocs-mx-auto wedocs-mb-2">
                { __( "There's Nothing here...", 'wedocs' ) }
              </p>
              <p className="wedocs-text-[#666B79] wedocs-text-lg wedocs-mx-auto">
                { __( '...maybe the page you’re looking for is not found or never existed.', 'wedocs' ) }
              </p>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
