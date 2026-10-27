/*
 * Dependency-free static server for previewing the gallery locally.
 *
 *   node scripts/serve.mjs [dir] [--port 4173] [--base /prefix/]
 *
 * Defaults to serving the repository root, which is enough to check the front
 * page, the thumbnails and gallery.json.
 *
 * To preview the assembled site exactly as GitHub Pages will serve it -- guide
 * deck included, whose assets are absolute under /ai-graybox-gallery/ -- build
 * it and mount it at that prefix:
 *
 *   node scripts/build-site.mjs
 *   node scripts/serve.mjs site --base /ai-graybox-gallery/
 *
 * Unknown paths fall through to 404.html, the way Pages does, so deep links
 * into the guide deck resolve here the same way they will in production.
 */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve, normalize } from 'node:path';

const args = process.argv.slice( 2 );

function option( name, fallback ) {
	const i = args.indexOf( `--${name}` );
	return i >= 0 ? args[ i + 1 ] : fallback;
}

const port = Number( option( 'port', 4173 ) );
const rawBase = option( 'base', '/' );
const base = rawBase.endsWith( '/' ) ? rawBase : rawBase + '/';

// Everything that isn't an option or an option's value is the directory.
const taken = new Set();
for ( const name of [ 'port', 'base' ] ) {
	const i = args.indexOf( `--${name}` );
	if ( i >= 0 ) { taken.add( i ); taken.add( i + 1 ); }
}
const dir = resolve( args.find( ( a, i ) => ! taken.has( i ) && ! a.startsWith( '--' ) ) || '.' );

const TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.ico': 'image/x-icon',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.md': 'text/plain; charset=utf-8',
};

async function send( res, path, status = 200 ) {
	const body = await readFile( path );
	res.writeHead( status, { 'content-type': TYPES[ extname( path ).toLowerCase() ] || 'application/octet-stream' } );
	res.end( body );
}

createServer( async ( req, res ) => {

	// Strip the query string and normalise away any ../ before touching disk.
	let urlPath = decodeURIComponent( req.url.split( '?' )[ 0 ] );

	if ( base !== '/' ) {
		if ( urlPath === base.slice( 0, -1 ) ) {
			res.writeHead( 302, { location: base } );
			res.end();
			return;
		}
		if ( ! urlPath.startsWith( base ) ) {
			res.writeHead( 404, { 'content-type': 'text/plain' } );
			res.end( `not found -- this site is mounted at ${base}\n` );
			return;
		}
		urlPath = '/' + urlPath.slice( base.length );
	}

	let path = join( dir, normalize( urlPath ).replace( /^(\.\.[/\\])+/, '' ) );

	try {
		const info = await stat( path );
		if ( info.isDirectory() ) path = join( path, 'index.html' );
		await send( res, path );
		return;
	} catch {}

	// Mimic GitHub Pages: unknown paths fall through to 404.html if present,
	// which is what makes Slidev deep links such as /guide/7 resolve.
	try {
		await send( res, join( dir, '404.html' ), 404 );
	} catch {
		res.writeHead( 404, { 'content-type': 'text/plain' } );
		res.end( 'not found\n' );
	}

} ).listen( port, () => {
	console.log( `serving ${dir} at http://localhost:${port}${base}` );
} );
