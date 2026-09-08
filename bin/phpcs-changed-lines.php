<?php
/**
 * Filter a PHPCS JSON report down to the lines a pull request actually changed.
 *
 * PHPCS reports whole files. On a codebase with existing violations that means
 * touching one line of a legacy file inherits every finding already in it, so
 * the gate punishes people for editing old code and the job is red no matter
 * what they do. This keeps only findings that sit on added or modified lines.
 *
 * Usage: phpcs --report=json <files> | php bin/phpcs-changed-lines.php <base-sha>
 * Exits 1 if any finding survives, 0 otherwise. Emits GitHub annotations.
 *
 * @package weDocs
 */

$base = $argv[1] ?? '';
if ( '' === $base ) {
    fwrite( STDERR, "usage: phpcs --report=json ... | php {$argv[0]} <base-sha>\n" );
    exit( 2 );
}

$raw = stream_get_contents( STDIN );
if ( '' === trim( $raw ) ) {
    exit( 0 );
}

$report = json_decode( $raw, true );
if ( ! is_array( $report ) || empty( $report['files'] ) ) {
    exit( 0 );
}

/**
 * Line numbers added or modified in $file, relative to $base.
 */
function wedocs_changed_lines( $base, $file ) {
    $cmd = sprintf( 'git diff --unified=0 %s -- %s', escapeshellarg( $base ), escapeshellarg( $file ) );
    exec( $cmd, $out );

    $lines = [];
    $cursor = null;
    foreach ( $out as $line ) {
        if ( preg_match( '/^@@ -\S+ \+(\d+)(?:,(\d+))? @@/', $line, $m ) ) {
            $cursor = (int) $m[1];
            continue;
        }
        if ( null === $cursor ) {
            continue;
        }
        if ( isset( $line[0] ) && '+' === $line[0] && 0 !== strpos( $line, '+++' ) ) {
            $lines[ $cursor ] = true;
            $cursor++;
        } elseif ( isset( $line[0] ) && ( '-' === $line[0] || '\\' === $line[0] ) ) {
            continue;
        } else {
            $cursor++;
        }
    }

    return $lines;
}

$root  = rtrim( shell_exec( 'git rev-parse --show-toplevel' ) ?: '', "\n" );
$kept  = 0;
$total = 0;

foreach ( $report['files'] as $path => $data ) {
    if ( empty( $data['messages'] ) ) {
        continue;
    }

    $relative = $path;
    if ( '' !== $root && 0 === strpos( $path, $root . '/' ) ) {
        $relative = substr( $path, strlen( $root ) + 1 );
    }

    $changed = wedocs_changed_lines( $base, $relative );

    foreach ( $data['messages'] as $message ) {
        $total++;
        if ( ! isset( $changed[ $message['line'] ] ) ) {
            continue;
        }

        $kept++;
        printf(
            "::%s file=%s,line=%d,col=%d::%s (%s)\n",
            'ERROR' === $message['type'] ? 'error' : 'warning',
            $relative,
            $message['line'],
            $message['column'],
            str_replace( [ "\r", "\n" ], ' ', $message['message'] ),
            $message['source']
        );
    }
}

fwrite( STDERR, sprintf( "PHPCS: %d finding(s) on changed lines (%d in the files overall).\n", $kept, $total ) );

exit( $kept > 0 ? 1 : 0 );
