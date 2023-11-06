const fs = require( 'fs' );
const replace = require( 'replace-in-file' );

const pluginFiles = [
  'includes/**/*',
  'src/**/*',
  'templates/**/*',
  'wedocs.php',
];

const { version } = JSON.parse( fs.readFileSync( 'package.json' ) );

replace( {
  files: pluginFiles,
  from: /WEDOCS_SINCE/g,
  to: version,
} );
