const fs = require( 'fs' );
const replace = require( 'replace-in-file' );

const pluginFiles = [ 'inc/**/*', 'src/**/*', 'templates/**/*', 'wedocs.php' ];

const { version } = JSON.parse( fs.readFileSync( 'package.json' ) );

replace( {
  files: pluginFiles,
  from: /WEDOCS_SINCE/g,
  to: version,
} );
