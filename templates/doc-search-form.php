<form role='search' method='get' class='search-form wedocs-search-form' action='<?php echo esc_url( home_url( '/' ) ) ?>'>
    <div class='wedocs-search-input'>
        <input
            name='s'
            type='search'
            class='search-field'
            value='<?php get_search_query(); ?>'
            title='<?php echo esc_attr_x( 'Search for:', 'label', 'wedocs' ); ?>'
            placeholder='<?php echo esc_attr_x( 'Search for a topic or question', 'placeholder', 'wedocs' ); ?>'
        />
        <input type='hidden' name='post_type' value='docs' />
        <button type='submit' class='search-submit'>
            <svg width='15' height='16' fill='none'>
                <path fill-rule='evenodd' d='M11.856 10.847l2.883 2.883a.89.89 0 0 1 0 1.257c-.173.174-.401.261-.629.261s-.455-.087-.629-.261l-2.883-2.883c-1.144.874-2.532 1.353-3.996 1.353a6.56 6.56 0 0 1-4.671-1.935c-2.576-2.575-2.576-6.765 0-9.341C3.179.934 4.839.247 6.603.247s3.424.687 4.671 1.935a6.56 6.56 0 0 1 1.935 4.67 6.55 6.55 0 0 1-1.353 3.995zM3.189 3.439c-1.882 1.882-1.882 4.945 0 6.827.912.912 2.124 1.414 3.414 1.414s2.502-.502 3.414-1.414 1.414-2.124 1.414-3.413-.502-2.502-1.414-3.413-2.124-1.414-3.414-1.414-2.502.502-3.414 1.414z' fill='#fff' />
            </svg>
        </button>
    </div>
</form>
