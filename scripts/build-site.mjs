/*
 * Assemble the publishable site into site/.
 *
 *   cd guide && npm ci && npm run build && cd ..
 *   node scripts/build-site.mjs
 *   node scripts/serve.mjs site --base /ai-graybox-gallery/
 *
 * CI runs exactly this, so what you preview locally is what gets deployed.
 */

import { cp, mkdir, rm, readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const root = resolve( dirname( fileURLToPath( import.meta.url ) ), '..' );
const site = join( root, 'site' );
const BASE = '/ai-graybox-gallery/';

const guideDist = join( root, 'guide', 'dist' );
try {
	await access( join( guideDist, 'index.html' ) );
} catch {
	console.error( 'build-site: guide/dist is missing. Build the deck first:\n' +
		'  cd guide && npm ci && npm run build' );
	process.exit( 1 );
}

await rm( site, { recursive: true, force: true } );
await mkdir( site, { recursive: true } );

for ( const name of [ 'index.html', 'gallery.json', 'README.md', 'CONTRIBUTING.md', 'LICENSE', 'LICENSE-MIT' ] ) {
	await cp( join( root, name ), join( site, name ) );
}

for ( const dir of [ 'files', 'template' ] ) {
	await cp( join( root, dir ), join( site, dir ), { recursive: true } );
}

await cp( guideDist, join( site, 'guide' ), { recursive: true } );

/*
 * GitHub Pages consults exactly one 404.html, at the site root, for every path
 * it can't find on disk. The guide is a Slidev single-page app that routes
 * slides by path (/guide/7 is slide 7), and none of those paths exist as
 * files -- so make the 404 page *be* the guide app. It boots, reads the path,
 * and lands on the right slide.
 *
 * The guard script sends anything that isn't a guide path back to the gallery
 * front page, so a mistyped URL doesn't silently open the guide.
 */
const guard = `<script>(function(){var r=${JSON.stringify( BASE )};` +
	`if(location.pathname.indexOf(r+'guide/')!==0)location.replace(r);})();</script>`;

const guideIndex = await readFile( join( guideDist, 'index.html' ), 'utf8' );
if ( ! guideIndex.includes( '<head>' ) ) {
	console.error( 'build-site: guide index.html has no <head> to inject the 404 guard into' );
	process.exit( 1 );
}
await writeFile( join( site, '404.html' ), guideIndex.replace( '<head>', `<head>${guard}` ) );

console.log( `build-site: wrote ${site}` );
