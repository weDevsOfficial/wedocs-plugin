<div role='button' class='doc-search doc-search-container'>
    <div class='doc-search-modal'>
        <div class='modal-header doc-search-bar'>
            <form class='doc-search-form'>
                <label class='doc-search-magnifier-label' for='doc-search-input' id='doc-search-label'>
                    <svg width='20' height='20' class='doc-search-icon' viewBox='0 0 20 20'>
                        <path
                            fill='none'
                            stroke-width='2'
                            stroke='#475569'
                            fill-rule='evenodd'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z'
                        ></path>
                    </svg>
                </label>
                <div class='doc-search-loading-indicator' style='width: 20px; display: none;'>
                    <svg viewBox='0 0 38 38' stroke='currentColor' stroke-opacity='.5'>
                        <g fill='none' fill-rule='evenodd'>
                            <g transform='translate(1 1)' stroke-width='2'>
                                <circle stroke-opacity='.3' cx='18' cy='18' r='18'></circle>
                                <path d='M36 18c0-9.94-8.06-18-18-18'>
                                    <animateTransform attributeName='transform' type='rotate' from='0 18 18' to='360 18 18' dur='1s' repeatCount='indefinite'></animateTransform>
                                </path>
                            </g>
                        </g>
                    </svg>
                </div>
                <div class='doc-search-field'>
                    <input
                        type='text'
                        id='doc-search-input'
                        placeholder='<?php _e( 'Search documentation', 'wedocs' ); ?>'
                    />
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="search-clean">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </form>
            <button class='doc-search-cancel' type='reset'>
                <?php _e( 'ESC', 'wedocs' ); ?>
            </button>
        </div>
        <div class='modal-body doc-search-dropdown'>
            <div class='doc-search-dropdown-container'>
                <section class='doc-search-hits'>
                    <div class='doc-empty-search'>
                        <?php _e( 'Search field cannot be blank', 'wedocs' ); ?>
                    </div>
                </section>
            </div>
        </div>
        <div class='modal-footer doc-search-footer'>
            <div class='doc-search-logo'>
                <span class='doc-search-label'><?php _e( 'Search by', 'wedocs' ); ?></span>
                <a href='https://wedocs.co' target='_blank' rel='noopener noreferrer'>
                    <svg width='77px' height='22px' viewBox='0 0 78 22' version='1.1'>
                        <g id='surface1'>
                            <path
                                style='stroke:none;fill-rule:evenodd;fill:rgb(23.137255%,50.980392%,96.470588%);fill-opacity:1;'
                                d='M 0 22 L 10.367188 22 C 14.804688 21.996094 18.398438 18.421875 18.40625 14.011719 L 18.40625 7.988281 C 18.398438 3.578125 14.804688 0.00390625 10.367188 0 L 8.039062 0 C 3.601562 0.00390625 0.00390625 3.578125 0 7.988281 Z M 10.367188 19.792969 L 2.21875 19.792969 L 2.21875 7.988281 C 2.222656 4.796875 4.828125 2.210938 8.039062 2.207031 L 10.367188 2.207031 C 13.578125 2.210938 16.179688 4.796875 16.183594 7.988281 L 16.183594 14.011719 C 16.179688 17.203125 13.578125 19.789062 10.367188 19.792969 Z M 10.367188 19.792969 '
                            />
                            <path
                                style='stroke:none;fill-rule:nonzero;fill:rgb(5.882353%,9.019608%,16.470588%);fill-opacity:1;'
                                d='M 5.546875 13.746094 L 11.609375 13.746094 C 11.714844 13.746094 11.800781 13.832031 11.800781 13.9375 L 11.800781 15.183594 C 11.800781 15.289062 11.714844 15.375 11.609375 15.375 L 5.546875 15.375 C 5.441406 15.375 5.355469 15.289062 5.355469 15.183594 L 5.355469 13.9375 C 5.355469 13.832031 5.441406 13.746094 5.546875 13.746094 Z M 5.546875 13.746094 '
                            />
                            <path
                                style='stroke:none;fill-rule:nonzero;fill:rgb(5.882353%,9.019608%,16.470588%);fill-opacity:1;'
                                d='M 5.546875 10.460938 L 12.855469 10.460938 C 12.960938 10.460938 13.046875 10.546875 13.046875 10.652344 L 13.046875 11.898438 C 13.046875 12.003906 12.960938 12.089844 12.855469 12.089844 L 5.546875 12.089844 C 5.441406 12.089844 5.355469 12.003906 5.355469 11.898438 L 5.355469 10.652344 C 5.355469 10.546875 5.441406 10.460938 5.546875 10.460938 Z M 5.546875 10.460938 '
                            />
                            <path
                                style='stroke:none;fill-rule:nonzero;fill:rgb(5.882353%,9.019608%,16.470588%);fill-opacity:1;'
                                d='M 5.546875 7.175781 L 9.445312 7.175781 C 9.550781 7.175781 9.632812 7.261719 9.632812 7.367188 L 9.632812 8.613281 C 9.632812 8.71875 9.550781 8.804688 9.445312 8.804688 L 5.546875 8.804688 C 5.441406 8.804688 5.355469 8.71875 5.355469 8.613281 L 5.355469 7.367188 C 5.355469 7.261719 5.441406 7.175781 5.546875 7.175781 Z M 5.546875 7.175781 '
                            />
                            <path
                                style='stroke:none;fill-rule:nonzero;fill:rgb(5.882353%,9.019608%,16.470588%);fill-opacity:1;'
                                d='M 26.945312 16.066406 L 24.816406 8.761719 L 26.679688 8.761719 L 27.941406 14.019531 L 29.40625 8.761719 L 31.492188 8.761719 L 32.957031 14.019531 L 34.234375 8.761719 L 36.09375 8.761719 L 33.953125 16.066406 L 32.003906 16.066406 L 30.449219 10.601562 L 28.894531 16.066406 Z M 40.070312 16.246094 C 39.335938 16.246094 38.6875 16.085938 38.121094 15.773438 C 37.554688 15.457031 37.109375 15.015625 36.785156 14.445312 C 36.464844 13.875 36.300781 13.21875 36.300781 12.472656 C 36.300781 11.714844 36.457031 11.042969 36.769531 10.453125 C 37.09375 9.863281 37.535156 9.40625 38.089844 9.082031 C 38.660156 8.75 39.324219 8.582031 40.085938 8.582031 C 40.800781 8.582031 41.429688 8.738281 41.976562 9.054688 C 42.523438 9.371094 42.949219 9.800781 43.253906 10.351562 C 43.566406 10.890625 43.722656 11.496094 43.722656 12.164062 L 43.707031 12.503906 L 43.691406 12.871094 L 38.164062 12.871094 C 38.203125 13.441406 38.398438 13.886719 38.75 14.210938 C 39.113281 14.535156 39.546875 14.699219 40.054688 14.699219 C 40.4375 14.699219 40.753906 14.613281 41.011719 14.445312 C 41.265625 14.28125 41.46875 14.046875 41.597656 13.769531 L 43.503906 13.769531 C 43.367188 14.230469 43.136719 14.652344 42.8125 15.035156 C 42.5 15.410156 42.109375 15.703125 41.640625 15.921875 C 41.179688 16.136719 40.65625 16.246094 40.070312 16.246094 Z M 40.085938 10.117188 C 39.625 10.117188 39.222656 10.246094 38.867188 10.511719 C 38.515625 10.769531 38.292969 11.160156 38.195312 11.691406 L 41.816406 11.691406 C 41.789062 11.210938 41.613281 10.828125 41.289062 10.542969 C 40.964844 10.257812 40.566406 10.117188 40.085938 10.117188 Z M 40.085938 10.117188 '
                            />
                            <path
                                style='stroke:none;fill-rule:nonzero;fill:rgb(23.137255%,50.980392%,96.470588%);fill-opacity:1;'
                                d='M 45.347656 16.066406 L 45.347656 5.753906 L 48.851562 5.753906 C 50.054688 5.753906 51.039062 5.96875 51.8125 6.402344 C 52.59375 6.824219 53.171875 7.425781 53.542969 8.199219 C 53.925781 8.964844 54.117188 9.871094 54.117188 10.910156 C 54.117188 11.953125 53.925781 12.859375 53.542969 13.636719 C 53.171875 14.402344 52.59375 15.003906 51.8125 15.433594 C 51.039062 15.855469 50.054688 16.066406 48.851562 16.066406 Z M 47.222656 14.449219 L 48.761719 14.449219 C 49.625 14.449219 50.300781 14.308594 50.800781 14.035156 C 51.300781 13.75 51.65625 13.347656 51.871094 12.828125 C 52.085938 12.296875 52.195312 11.65625 52.195312 10.910156 C 52.195312 10.175781 52.085938 9.542969 51.871094 9.011719 C 51.664062 8.492188 51.289062 8.058594 50.800781 7.789062 C 50.304688 7.503906 49.625 7.359375 48.761719 7.359375 L 47.222656 7.359375 Z M 58.734375 16.246094 C 58.027344 16.246094 57.394531 16.082031 56.824219 15.757812 C 56.269531 15.433594 55.824219 14.988281 55.492188 14.417969 C 55.167969 13.839844 55.007812 13.171875 55.007812 12.414062 C 55.007812 11.65625 55.171875 10.996094 55.507812 10.425781 C 55.824219 9.859375 56.285156 9.394531 56.839844 9.070312 C 57.40625 8.746094 58.042969 8.582031 58.746094 8.582031 C 59.441406 8.582031 60.066406 8.746094 60.625 9.070312 C 61.191406 9.394531 61.636719 9.847656 61.957031 10.425781 C 62.292969 10.996094 62.457031 11.65625 62.457031 12.414062 C 62.457031 13.171875 62.292969 13.839844 61.957031 14.417969 C 61.636719 14.988281 61.191406 15.433594 60.625 15.757812 C 60.058594 16.082031 59.425781 16.246094 58.734375 16.246094 Z M 58.734375 14.609375 C 59.222656 14.609375 59.644531 14.425781 60.007812 14.0625 C 60.371094 13.691406 60.550781 13.140625 60.550781 12.414062 C 60.550781 11.6875 60.371094 11.140625 60.007812 10.777344 C 59.644531 10.40625 59.226562 10.21875 58.746094 10.21875 C 58.25 10.21875 57.816406 10.40625 57.457031 10.777344 C 57.105469 11.140625 56.929688 11.6875 56.929688 12.414062 C 56.929688 13.140625 57.105469 13.691406 57.457031 14.0625 C 57.816406 14.425781 58.242188 14.609375 58.734375 14.609375 Z M 67.214844 16.246094 C 66.46875 16.246094 65.816406 16.082031 65.25 15.757812 C 64.683594 15.433594 64.230469 14.984375 63.898438 14.402344 C 63.578125 13.824219 63.414062 13.160156 63.414062 12.414062 C 63.414062 11.667969 63.578125 11.003906 63.898438 10.425781 C 64.230469 9.84375 64.679688 9.394531 65.25 9.070312 C 65.816406 8.746094 66.46875 8.582031 67.214844 8.582031 C 68.140625 8.582031 68.925781 8.828125 69.558594 9.320312 C 70.195312 9.800781 70.601562 10.46875 70.777344 11.324219 L 68.796875 11.324219 C 68.710938 10.984375 68.5 10.691406 68.210938 10.5 C 67.925781 10.292969 67.589844 10.1875 67.199219 10.1875 C 66.679688 10.1875 66.242188 10.386719 65.878906 10.777344 C 65.515625 11.171875 65.335938 11.714844 65.335938 12.414062 C 65.335938 13.113281 65.515625 13.65625 65.878906 14.050781 C 66.242188 14.441406 66.679688 14.640625 67.199219 14.640625 C 67.589844 14.640625 67.925781 14.539062 68.210938 14.34375 C 68.503906 14.148438 68.699219 13.867188 68.796875 13.503906 L 70.777344 13.503906 C 70.601562 14.332031 70.195312 14.992188 69.558594 15.492188 C 68.925781 15.996094 68.140625 16.246094 67.214844 16.246094 Z M 74.964844 16.246094 C 74.316406 16.246094 73.75 16.140625 73.261719 15.933594 C 72.773438 15.71875 72.382812 15.425781 72.089844 15.050781 C 71.796875 14.675781 71.621094 14.246094 71.5625 13.753906 L 73.453125 13.753906 C 73.511719 14.039062 73.667969 14.285156 73.921875 14.492188 C 74.1875 14.6875 74.523438 14.785156 74.933594 14.785156 C 75.34375 14.785156 75.644531 14.703125 75.828125 14.535156 C 76.023438 14.367188 76.121094 14.175781 76.121094 13.960938 C 76.121094 13.648438 75.984375 13.433594 75.710938 13.328125 C 75.4375 13.210938 75.058594 13.097656 74.566406 12.988281 L 73.613281 12.738281 C 73.292969 12.640625 72.992188 12.515625 72.71875 12.371094 C 72.464844 12.222656 72.246094 12.019531 72.074219 11.78125 C 71.910156 11.535156 71.824219 11.234375 71.824219 10.882812 C 71.824219 10.234375 72.078125 9.6875 72.589844 9.246094 C 73.105469 8.804688 73.828125 8.582031 74.757812 8.582031 C 75.617188 8.582031 76.304688 8.785156 76.8125 9.1875 C 77.328125 9.589844 77.636719 10.144531 77.734375 10.851562 L 75.960938 10.851562 C 75.851562 10.3125 75.449219 10.042969 74.742188 10.042969 C 74.390625 10.042969 74.117188 10.109375 73.921875 10.246094 C 73.738281 10.386719 73.644531 10.558594 73.644531 10.761719 C 73.644531 10.980469 73.785156 11.152344 74.070312 11.28125 C 74.351562 11.40625 74.730469 11.523438 75.199219 11.632812 C 75.707031 11.75 76.171875 11.882812 76.589844 12.03125 C 77.023438 12.167969 77.363281 12.378906 77.617188 12.664062 C 77.871094 12.941406 78 13.335938 78 13.859375 C 78.007812 14.308594 77.890625 14.71875 77.648438 15.082031 C 77.402344 15.445312 77.050781 15.730469 76.589844 15.933594 C 76.132812 16.140625 75.589844 16.246094 74.964844 16.246094 Z M 74.964844 16.246094 '
                            />
                        </g>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>