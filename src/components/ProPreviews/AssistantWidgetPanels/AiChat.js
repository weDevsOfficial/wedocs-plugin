import { __ } from '@wordpress/i18n'

export const AiChat = () => {
  return (
    <div className="container mx-auto rounded-lg">
      <div className="flex flex-row justify-between bg-white">
        <div className="w-full px-5 flex flex-col justify-between">
          <div className="py-5">
              <input
                type="text"
                value={ '' }
                autoFocus={true}
                className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                placeholder={__('Ask me anything about this website...', 'wedocs')}
              />
          </div>
        </div>
      </div>
  </div>
  )

}
