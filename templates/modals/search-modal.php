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
    </div>
</div>
