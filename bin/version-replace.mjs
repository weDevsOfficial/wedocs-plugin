import fs from 'node:fs';
import { replaceInFile } from 'replace-in-file';

const pluginFiles = [
  'includes/**/*',
  'src/**/*',
  'templates/**/*',
  'wedocs.php',
];

const { version } = JSON.parse( fs.readFileSync( 'package.json' ) );

// Exit non-zero on failure: the release runs this before the build, and a
// silent miss would ship `@since WEDOCS_SINCE` placeholders to wp.org.
try {
  await replaceInFile( {
    files: pluginFiles,
    from: /WEDOCS_SINCE/g,
    to: version,
  } );
} catch ( err ) {
  process.stderr.write( 'Version replace failed: ' + err.message + '\n' );
  process.exitCode = 1;
}
