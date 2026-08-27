// DESCRIPTION: Toast helpers for the FAQ admin screens.
// Wraps the SweetAlert2 toast configuration the rest of the plugin uses so
// every FAQ action reports its outcome the same way.

import { __ } from '@wordpress/i18n';
import Swal from 'sweetalert2';

const baseConfig = {
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
};

/**
 * Show a success toast.
 *
 * @param {string} title Toast title.
 * @param {string} text  Supporting message.
 *
 * @return {void}
 */
export const toastSuccess = ( title, text = '' ) => {
    Swal.fire( {
        ...baseConfig,
        title,
        text,
        icon: 'success',
        timer: 2000,
    } );
};

/**
 * Show an error toast.
 *
 * Falls back to a generic message when the request failed before the REST API
 * could answer, so the user is never left without a reason.
 *
 * @param {Object|string} error    Error thrown by apiFetch, or a plain message.
 * @param {string}        fallback Message to show when the error carries none.
 *
 * @return {void}
 */
export const toastError = ( error, fallback = '' ) => {
    const message =
        ( typeof error === 'string' ? error : error?.message ) ||
        fallback ||
        __( 'Something went wrong. Please try again.', 'wedocs' );

    Swal.fire( {
        ...baseConfig,
        title: __( 'Error', 'wedocs' ),
        text: message,
        icon: 'error',
        timer: 3000,
    } );
};
