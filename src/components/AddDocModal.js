import { __ } from "@wordpress/i18n";
import {Fragment, useState} from "@wordpress/element";
import {Dialog, Transition} from "@headlessui/react";

const AddDocModal = ({ className, children, href }) => {
    let [isOpen, setIsOpen] = useState( false );

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    return (
        <>
            <a href={ href } onClick={openModal} className={ className }>
                { children }
            </a>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-10 text-center align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-3xl font-semibold leading-6 text-slate-700">
                                        { __( 'Enter doc title', 'wedocs' ) }
                                    </Dialog.Title>
                                    <div className="mt-7 mb-5">
                                        <input type="text" name="doc_title" id="doc-title" placeholder={ __( 'Write something', 'dokan-driver' ) } required
                                            className="h-11 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            // value={ docs.doc_title } // onChange={ changeFieldValue }
                                        />
                                    </div>

                                    <div className="mt-4 space-x-2.5">
                                        <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-base py-2 px-5 rounded" onClick={closeModal}>{ __( 'OK', 'wedocs' ) }</button>
                                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-bold text-base py-2 px-5 border border-gray-400 rounded shadow" onClick={closeModal}>{ __( 'Cancel', 'wedocs' ) }</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default  AddDocModal;
