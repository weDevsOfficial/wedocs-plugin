import { __ } from '@wordpress/i18n';
import UpgradeButton from './UpgradeButton';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from '@wordpress/element';
import SliderImgOneSrc from '../../../assets/img/popup-slider/slider-1.jpg';
import SliderImgTwoSrc from '../../../assets/img/popup-slider/slider-2.jpg';
import SliderImgFourSrc from '../../../assets/img/popup-slider/slider-3.jpg';
import SliderImgThreeSrc from '../../../assets/img/popup-slider/slider-4.jpg';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const UpgradePopup = ({ children }) => {
  let [ isOpen, setIsOpen ] = useState( false );

  const closeModal = () => {
    setIsOpen( false );
  }

  const openModal = ( event ) => {
    event.preventDefault();
    setIsOpen( true );
  }

  const images = [
    { src: SliderImgOneSrc, text: __( 'Pop-up slider first image', 'wedocs' ) },
    { src: SliderImgTwoSrc, text: __( 'Pop-up slider second image', 'wedocs' ) },
    { src: SliderImgThreeSrc, text: __( 'Pop-up slider third image', 'wedocs' ) },
    { src: SliderImgFourSrc, text: __( 'Pop-up slider fourth image', 'wedocs' ) },
  ];

  return (
    <>
      {/* Pro upgrade button. */}
      <UpgradeButton showPopup={ openModal }>
        { children }
      </UpgradeButton>

      {/* Show premium features content via pop-up. */}
      <Transition appear show={ isOpen } as={ Fragment }>
        <Dialog as='div' className='wedocs-document relative z-[9999]' onClose={ closeModal }>
          <Transition.Child
            as={ Fragment }
            enter='wedocs-ease-out wedocs-duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='wedocs-ease-in wedocs-duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='wedocs-fixed wedocs-inset-0 wedocs-bg-black wedocs-bg-opacity-25' />
          </Transition.Child>

          <div className='wedocs-fixed wedocs-inset-0 wedocs-overflow-y-auto'>
            <div className='wedocs-flex wedocs-min-h-full wedocs-items-center wedocs-justify-center wedocs-p-4 wedocs-text-center'>
              <Transition.Child
                as={ Fragment }
                enter='wedocs-ease-out wedocs-duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='wedocs-ease-in wedocs-duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='wedocs-w-full wedocs-fixed wedocs-max-w-[1008px] wedocs-transform wedocs-overflow-hidden wedocs-rounded-md wedocs-bg-white wedocs-py-10 wedocs-px-20 wedocs-text-left wedocs-align-middle wedocs-shadow-xl wedocs-transition-all'>
                  <div className='modal-body wedocs-grid wedocs-grid-flow-col wedocs-auto-cols-[1fr] wedocs-items-end wedocs-mx-auto'>
                    <div className='content-area wedocs-space-y-[22px]'>
                      <div className='popup-close-button wedocs-absolute wedocs-top-10 wedocs-right-10 wedocs-cursor-pointer' onClick={ closeModal }>
                        <svg width='16' height='16' fill='#999'>
                          <path d='M.781 16a.78.78 0 0 1-.722-.482.78.78 0 0 1 .169-.851L14.666.229a.78.78 0 0 1 1.105 0 .78.78 0 0 1 0 1.105L1.334 15.771A.78.78 0 0 1 .781 16z '/>
                          <path d='M15.219 16a.78.78 0 0 1-.553-.229L.229 1.334a.78.78 0 0 1 0-1.105.78.78 0 0 1 1.105 0l14.437 14.437a.78.78 0 0 1 .169.851.78.78 0 0 1-.722.482z' />
                        </svg>
                      </div>
                      <Dialog.Title
                        as='h2'
                        className='wedocs-text-lg wedocs-font-medium wedocs-leading-6 wedocs-text-gray-900 !wedocs-mt-1'
                      >
                        <div className='popup-header'>
                          <div className='popup-diamond wedocs-flex wedocs-items-center wedocs-space-x-3'>
                            <div className='diamond-img wedocs-p-1.5 wedocs-rounded-md'>
                              <svg width='32' height='30' fill='none'>
                                <path d='M22.365 16l-6.286 14 15.455-14h-9.169z' fill='#fbdd7e' />
                                <path d='M7.112 8L.624 15.347h9.302L7.112 8z' fill='#ffcd73' />
                                <g fill='#fcc471'>
                                  <path d='M22.682 15.347h9.302L25.496 8l-2.814 7.347z' />
                                  <path d='M22.682 15.347L16.304 8l-6.378 7.347h12.756z' />
                                </g>
                                <path d='M16.304 8H7.112l2.814 7.347L16.304 8z' fill='#ffaa64' />
                                <path d='M25.496 8h-9.192l6.378 7.347L25.496 8z' fill='#fbdd7e' />
                                <path d='M9.455 16l6.624 14 6.624-14H9.455z' fill='#ffaa64' />
                                <path d='M.624 16l15.455 14-6.286-14H.624z' fill='#ff8c5a' />
                                <path d='M15.889 1v4M8.351 2l3.122 2.828M23.427 2l-3.122 2.828' stroke='#ff8c5a' strokeLinecap='round' />
                              </svg>
                            </div>
                            <h2 className='font-orange header-one wedocs-font-semibold wedocs-text-3xl wedocs-text-[#ff9000] wedocs-leading-[3rem]'>{ __( 'Upgrade to', 'wedocs' ) }</h2>
                          </div>
                          <h2 className='header-two wedocs-text-3xl wedocs-font-normal wedocs-leading-[3rem]'>
                            weDocs <span className='wedocs-font-bold'>Pro</span>
                          </h2>
                          <h2 className='header-three wedocs-text-[#656668] wedocs-mb-0.5 wedocs-pr-16 wedocs-font-normal wedocs-text-xl wedocs-leading-8'>
                            { __( 'to experience even more Powerful features 🎉', 'wedocs' ) }
                          </h2>
                        </div>
                      </Dialog.Title>
                      <div className='popup-list-area wedocs-mb-[60px] wedocs-space-y-0.5'>
                        <div className='single-checklist wedocs-flex'>
                          <div className='check-icon wedocs-mt-[13px] wedocs-mr-3.5'>
                            <div className='check-img wedocs-bg-[#139f84] wedocs-py-1.5 wedocs-px-[5px] wedocs-rounded-full'>
                              <svg width='10' height='8' fill='none'>
                                <path fillRule='evenodd' d='M8.927 1.134c-.33-.33-.865-.33-1.195 0L3.374 5.492 1.897 4.015c-.33-.33-.865-.33-1.195 0s-.33.865 0 1.195l2.075 2.075c.33.33.865.33 1.195 0l4.955-4.955c.33-.33.33-.865 0-1.195zM.992 4.853c.01.012.02.024.031.035l2.075 2.075a.39.39 0 0 0 .552 0l4.955-4.955a.39.39 0 0 0 .031-.517.39.39 0 0 1-.031.517L3.65 6.963a.39.39 0 0 1-.552 0L1.023 4.888c-.011-.011-.022-.023-.031-.035z' fill='#fff' />
                              </svg>
                            </div>
                          </div>
                          <div className='check-list'>
                            <p className='wedocs-text-[#656668] wedocs-mb-0.5 wedocs-mt-[13px] wedocs-pr-8 wedocs-text-[13px] wedocs-leading-normal wedocs-font-normal'>
                              <span className='wedocs-font-medium wedocs-text-black'>{ __( 'Role based permission management ', 'wedocs' ) }</span>
                              { __( 'or viewing, managing, and configuring permission settings.', 'wedocs' ) }
                            </p>
                          </div>
                        </div>
                        <div className='single-checklist wedocs-flex'>
                          <div className='check-icon wedocs-mt-[13px] wedocs-mr-3.5'>
                            <div className='check-img wedocs-bg-[#139f84] wedocs-py-1.5 wedocs-px-[5px] wedocs-rounded-full'>
                              <svg width='10' height='8' fill='none'>
                                <path fillRule='evenodd' d='M8.927 1.134c-.33-.33-.865-.33-1.195 0L3.374 5.492 1.897 4.015c-.33-.33-.865-.33-1.195 0s-.33.865 0 1.195l2.075 2.075c.33.33.865.33 1.195 0l4.955-4.955c.33-.33.33-.865 0-1.195zM.992 4.853c.01.012.02.024.031.035l2.075 2.075a.39.39 0 0 0 .552 0l4.955-4.955a.39.39 0 0 0 .031-.517.39.39 0 0 1-.031.517L3.65 6.963a.39.39 0 0 1-.552 0L1.023 4.888c-.011-.011-.022-.023-.031-.035z' fill='#fff' />
                              </svg>
                            </div>
                          </div>
                          <div className='check-list'>
                            <p className='wedocs-text-[#656668] wedocs-mb-0.5 wedocs-mt-[13px] wedocs-pr-8 wedocs-text-[13px] wedocs-leading-normal wedocs-font-normal'>
                              <span className='wedocs-font-medium wedocs-text-black'>{ __( 'Arrange content automatically or manually ', 'wedocs' ) }</span>
                              { __( 'giving you full control over its presentation.', 'wedocs' ) }
                            </p>
                          </div>
                        </div>
                        <div className='single-checklist wedocs-flex'>
                          <div className='check-icon wedocs-mt-[13px] wedocs-mr-3.5'>
                            <div className='check-img wedocs-bg-[#139f84] wedocs-py-1.5 wedocs-px-[5px] wedocs-rounded-full'>
                              <svg width='10' height='8' fill='none'>
                                <path fillRule='evenodd' d='M8.927 1.134c-.33-.33-.865-.33-1.195 0L3.374 5.492 1.897 4.015c-.33-.33-.865-.33-1.195 0s-.33.865 0 1.195l2.075 2.075c.33.33.865.33 1.195 0l4.955-4.955c.33-.33.33-.865 0-1.195zM.992 4.853c.01.012.02.024.031.035l2.075 2.075a.39.39 0 0 0 .552 0l4.955-4.955a.39.39 0 0 0 .031-.517.39.39 0 0 1-.031.517L3.65 6.963a.39.39 0 0 1-.552 0L1.023 4.888c-.011-.011-.022-.023-.031-.035z' fill='#fff' />
                              </svg>
                            </div>
                          </div>
                          <div className='check-list'>
                            <p className='wedocs-text-[#656668] wedocs-mb-0.5 wedocs-mt-[13px] wedocs-pr-8 wedocs-text-[13px] wedocs-leading-normal wedocs-font-normal'>
                              <span className='wedocs-font-medium wedocs-text-black'>{ __( 'Personalize messaging tab with custom titles ', 'wedocs' ) }</span>
                              { __( 'and messages for seamless communication.', 'wedocs' ) }
                            </p>
                          </div>
                        </div>
                        <div className='single-checklist wedocs-flex'>
                          <div className='check-icon wedocs-mt-[13px] wedocs-mr-3.5'>
                            <div className='check-img wedocs-bg-[#139f84] wedocs-py-1.5 wedocs-px-[5px] wedocs-rounded-full'>
                              <svg width='10' height='8' fill='none'>
                                <path fillRule='evenodd' d='M8.927 1.134c-.33-.33-.865-.33-1.195 0L3.374 5.492 1.897 4.015c-.33-.33-.865-.33-1.195 0s-.33.865 0 1.195l2.075 2.075c.33.33.865.33 1.195 0l4.955-4.955c.33-.33.33-.865 0-1.195zM.992 4.853c.01.012.02.024.031.035l2.075 2.075a.39.39 0 0 0 .552 0l4.955-4.955a.39.39 0 0 0 .031-.517.39.39 0 0 1-.031.517L3.65 6.963a.39.39 0 0 1-.552 0L1.023 4.888c-.011-.011-.022-.023-.031-.035z' fill='#fff' />
                              </svg>
                            </div>
                          </div>
                          <div className='check-list'>
                            <p className='wedocs-text-[#656668] wedocs-mb-0.5 wedocs-mt-[13px] wedocs-pr-14 wedocs-text-[13px] wedocs-leading-normal wedocs-font-normal'>
                              { __( 'Customize with ', 'wedocs' ) }
                              <span className='wedocs-font-medium wedocs-text-black'>{ __( 'design widgets, colors, and pre-built options ', 'wedocs' ) }</span>
                              { __( 'for an appealing interface.', 'wedocs' ) }
                            </p>
                          </div>
                        </div>
                        <div className='single-checklist wedocs-flex'>
                          <div className='check-icon wedocs-mt-[13px] wedocs-mr-3.5'>
                            <div className='check-img wedocs-bg-[#139f84] wedocs-py-1.5 wedocs-px-[5px] wedocs-rounded-full'>
                              <svg width='10' height='8' fill='none'>
                                <path fillRule='evenodd' d='M8.927 1.134c-.33-.33-.865-.33-1.195 0L3.374 5.492 1.897 4.015c-.33-.33-.865-.33-1.195 0s-.33.865 0 1.195l2.075 2.075c.33.33.865.33 1.195 0l4.955-4.955c.33-.33.33-.865 0-1.195zM.992 4.853c.01.012.02.024.031.035l2.075 2.075a.39.39 0 0 0 .552 0l4.955-4.955a.39.39 0 0 0 .031-.517.39.39 0 0 1-.031.517L3.65 6.963a.39.39 0 0 1-.552 0L1.023 4.888c-.011-.011-.022-.023-.031-.035z' fill='#fff' />
                              </svg>
                            </div>
                          </div>
                          <div className='check-list'>
                            <p className='wedocs-text-[#656668] wedocs-mb-0.5 wedocs-mt-[13px] wedocs-pr-14 wedocs-text-[13px] wedocs-leading-normal wedocs-font-normal'>
                              <span className='wedocs-font-medium wedocs-text-black'>{ __( 'Get assisted by A.I. Powered Chatbot ', 'wedocs' ) }</span>
                              { __( '24/7 with updated information and support.', 'wedocs' ) }
                            </p>
                          </div>
                        </div>
                      </div>
                      <UpgradeButton classes={ `wedocs-px-6 wedocs-py-3.5 !wedocs-font-normal !wedocs-mt-14` } />
                    </div>
                    <div className='modal-window-inner'>
                      <div className='slider-area'>
                        <Carousel
                          autoPlay
                          infiniteLoop
                          interval={ 2500 }
                          showThumbs={ false }
                          showStatus={ false }
                          showArrows={ false }
                          renderIndicator={ ( onClickHandler, isSelected, index, label ) => {
                            const style = { marginLeft: 12, cursor: "pointer", background: 'transparent' };
                            return (
                              <span
                                key={ index }
                                role="button"
                                style={ style }
                                onClick={ onClickHandler }
                                onKeyDown={ onClickHandler }
                                tabIndex={ 0 }
                                aria-label={ `${label} ${index + 1}` }
                              >
                                <span className={ `${ isSelected ? '!wedocs-bg-[#007f69]' : '!wedocs-bg-[#909091]' } indicator wedocs-rounded-full wedocs-w-2 wedocs-h-2` }></span>
                              </span>
                            );
                          }}
                        >
                          { images?.map( ( image, index ) => (
                            <img key={ index } className='wedocs-ml-auto !wedocs-w-[381px] wedocs-h-[407px]' src={ image?.src } alt={ image?.text } />
                          ) ) }
                        </Carousel>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer wedocs-mt-8 wedocs-mb-0.5'>
                    <div className='footer-feature wedocs-flex wedocs-justify-between'>
                      <p className='wedocs-flex wedocs-items-center'>
                        <svg className='wedocs-mr-3.5 wedocs-mt-0.5' width='10' height='8'>
                          <path fillRule='evenodd' fill='#139F84' d='M8.927 1.134c-.33-.33-.865-.33-1.195 0L3.374 5.492 1.897 4.015c-.33-.33-.865-.33-1.195 0s-.33.865 0 1.195l2.075 2.075c.33.33.865.33 1.195 0l4.955-4.955c.33-.33.33-.865 0-1.195zM.992 4.853c.01.012.02.024.031.035l2.075 2.075a.39.39 0 0 0 .552 0l4.955-4.955a.39.39 0 0 0 .031-.517.39.39 0 0 1-.031.517L3.65 6.963a.39.39 0 0 1-.552 0L1.023 4.888c-.011-.011-.022-.023-.031-.035z'/>
                        </svg>
                        { __( '10,000+ successful businesses', 'wedocs' ) }
                      </p>
                      <p className='wedocs-flex wedocs-items-center'>
                        <svg className='wedocs-mr-3.5 wedocs-mt-0.5' width='10' height='8'>
                          <path
                            fill='#139F84'
                            fillRule='evenodd'
                            d='M8.927 1.134c-.33-.33-.865-.33-1.195 0L3.374 5.492 1.897 4.015c-.33-.33-.865-.33-1.195 0s-.33.865 0 1.195l2.075 2.075c.33.33.865.33 1.195 0l4.955-4.955c.33-.33.33-.865 0-1.195zM.992 4.853c.01.012.02.024.031.035l2.075 2.075a.39.39 0 0 0 .552 0l4.955-4.955a.39.39 0 0 0 .031-.517.39.39 0 0 1-.031.517L3.65 6.963a.39.39 0 0 1-.552 0L1.023 4.888c-.011-.011-.022-.023-.031-.035z'
                          />
                        </svg>
                        { __( '14 days no questions asked refund policy', 'wedocs' ) }
                      </p>
                      <p className='wedocs-flex wedocs-items-center'>
                        <svg className='wedocs-mr-3.5 wedocs-mt-0.5' width='10' height='8'>
                          <path
                            fill='#139F84'
                            fillRule='evenodd'
                            d='M8.927 1.134c-.33-.33-.865-.33-1.195 0L3.374 5.492 1.897 4.015c-.33-.33-.865-.33-1.195 0s-.33.865 0 1.195l2.075 2.075c.33.33.865.33 1.195 0l4.955-4.955c.33-.33.33-.865 0-1.195zM.992 4.853c.01.012.02.024.031.035l2.075 2.075a.39.39 0 0 0 .552 0l4.955-4.955a.39.39 0 0 0 .031-.517.39.39 0 0 1-.031.517L3.65 6.963a.39.39 0 0 1-.552 0L1.023 4.888c-.011-.011-.022-.023-.031-.035z'
                          />
                        </svg>
                        { __( 'Industry leading 24x7 support', 'wedocs' ) }
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default UpgradePopup;
