// DESCRIPTION: Empty state component for the FAQ page.
// Shown when no FAQs exist yet.

import { __ } from '@wordpress/i18n';
import AddFaqGroupModal from './AddFaqGroupModal';

const EmptyFaq = ( { onGroupCreated } ) => {
    return (
        <div className="w-full">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 h-[75vh] flex justify-center align-center bg-white px-4 py-5 sm:p-6">
                    <div className="w-[500px] text-center self-center mt-1 px-6 py-12">
                        <h2 className="mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="194"
                                height="160"
                                fill="none"
                                viewBox="0 0 194 160"
                                className="mx-auto mb-6"
                            >
                                <circle cx="97" cy="80" r="70" fill="url(#faq-bg)" fillOpacity=".15" />
                                <rect x="52" y="42" width="90" height="76" rx="10" fill="#fff" stroke="#D1D5DB" strokeWidth="2" />
                                <rect x="66" y="58" width="46" height="6" rx="3" fill="#9CA3AF" />
                                <rect x="66" y="70" width="62" height="6" rx="3" fill="#E5E7EB" />
                                <rect x="66" y="82" width="38" height="6" rx="3" fill="#E5E7EB" />
                                <rect x="66" y="94" width="54" height="6" rx="3" fill="#E5E7EB" />
                                <circle cx="145" cy="45" r="24" fill="url(#faq-accent)" />
                                <text
                                    x="145"
                                    y="53"
                                    textAnchor="middle"
                                    fill="#fff"
                                    fontSize="28"
                                    fontWeight="bold"
                                    fontFamily="sans-serif"
                                >
                                    ?
                                </text>
                                <defs>
                                    <linearGradient
                                        id="faq-bg"
                                        x1="30"
                                        y1="160"
                                        x2="170"
                                        y2="0"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#6366F1" />
                                        <stop offset="1" stopColor="#6366F1" stopOpacity="0" />
                                    </linearGradient>
                                    <linearGradient
                                        id="faq-accent"
                                        x1="155"
                                        y1="20"
                                        x2="120"
                                        y2="80"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#818CF8" />
                                        <stop offset="1" stopColor="#4F46E5" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <p className="text-[#3B3F4A] font-bold text-2xl mx-auto">
                                { __( 'Get started by creating your first FAQ', 'wedocs' ) }
                            </p>
                            <p className="text-[#666B79] text-lg mx-auto mt-2">
                                { __( 'Create frequently asked questions to help your users find answers quickly.', 'wedocs' ) }
                            </p>
                        </h2>
                        <AddFaqGroupModal onGroupCreated={ onGroupCreated } className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-2.5 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="dashicons dashicons-plus-alt2 w-3.5 h-3.5 mr-4 text-base flex items-center"></span>
                            { __( 'Create a new FAQ', 'wedocs' ) }
                        </AddFaqGroupModal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyFaq;
