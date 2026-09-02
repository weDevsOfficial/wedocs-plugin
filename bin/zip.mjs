import { ZipArchive } from 'archiver';
import fs from 'node:fs';

/**
 * Adapted from: https://stackoverflow.com/a/51518100
 *
 * @param {Array}  sourceDirs  /some/folder/to/compress
 * @param {Array}  sourceFiles /some/file/to/compress
 * @param {string} outPath     /path/to/created.zip
 *
 * @return {Promise} The result of the compression
 */
function zipDirectories( sourceDirs, sourceFiles, outPath ) {
  // archiver 8 dropped the `archiver('zip', …)` factory for named format classes.
  const archive = new ZipArchive( { zlib: { level: 9 } } );
  const stream = fs.createWriteStream( outPath );

  return new Promise( ( resolve, reject ) => {
    let result = archive;

    // Add main plugin directory.
    result.append( null, { name: 'wedocs/' } );

    // Add the directories to the archive.
    sourceDirs.forEach( ( sourceDir ) => {
      result = result.directory( sourceDir, 'wedocs/' + sourceDir, {
        name: 'wedocs/' + sourceDir,
      } );
    } );

    // Add the files to the archive.
    sourceFiles.forEach( ( sourceFile ) => {
      result = result.file( sourceFile, {
        name: 'wedocs/' + sourceFile,
      } );
    } );
    result.on( 'error', ( err ) => reject( err ) ).pipe( stream );

    stream.on( 'close', () => resolve() );
    archive.finalize();
  } );
}

const { version } = JSON.parse( fs.readFileSync( 'package.json' ) );
const zipFileName = 'wedocs.v' + version + '.zip';
zipDirectories(
  [ 'assets/', 'includes/', 'languages/', 'vendor/', 'templates/' ],
  [ 'wedocs.php', 'readme.txt' ],
  zipFileName
)
  .then( () => {
    process.stdout.write(
      'ZIP File: ' + zipFileName + ' Created successfully.\n'
    );
  } )
  // Exit non-zero: the release workflow uploads whatever zip it finds, so a
  // silent failure here would publish a stale or missing package.
  .catch( ( err ) => {
    process.stderr.write( 'ZIP file creation failed: ' + err.message + '\n' );
    process.exitCode = 1;
  } );
