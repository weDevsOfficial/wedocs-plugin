<?php
// Silence WP "doing it wrong" notices so they neither pollute the debug log the
// CI job surfaces nor inject admin notices that overlay the SPA during a run.
add_filter( 'doing_it_wrong_trigger_error', '__return_false' );
