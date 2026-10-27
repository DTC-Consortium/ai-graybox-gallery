/*
 * Validate gallery.json before it ships.
 *
 *   node scripts/check-gallery.mjs [--offline]
 *
 * Checks that every entry has the required fields, that slugs are unique and
 * URL-safe, that each thumbnail file exists and is 16:9-ish, and (unless
 * --offline) that each deck URL and repo URL still answers. This is what the
 * `check` job in CI runs on every pull request, so a broken link or a missing
 * thumbnail is caught in review rather than on the live gallery.
 */

import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const root = resolve( dirname( fileURLToPath( import.meta.url ) ), '..' );
const offline = process.argv.includes( '--offline' );

const required = [ 'slug', 'title', 'author', 'url', 'repo', 'thumb' ];
const problems = [];
const warnings = [];

function problem( slug, message ) { problems.push( `${slug}: ${message}` ); }
function warn( slug, message ) { warnings.push( `${slug}: ${message}` ); }

/** PNG and JPEG dimensions, without pulling in an image library. */
async function imageSize( path ) {
	const buf = await readFile( path );
	if ( buf.length > 24 && buf.readUInt32BE( 0 ) === 0x89504e47 ) {
		return { width: buf.readUInt32BE( 16 ), height: buf.readUInt32BE( 20 ) };
	}
	if ( buf.length > 4 && buf[ 0 ] === 0xff && buf[ 1 ] === 0xd8 ) {
		let i = 2;
		while ( i < buf.length ) {
			if ( buf[ i ] !== 0xff ) { i ++; continue; }
			const marker = buf[ i + 1 ];
			// SOF0..SOF15, excluding the non-frame markers DHT/JPG/DAC
			if ( marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc ) {
				return { height: buf.readUInt16BE( i + 5 ), width: buf.readUInt16BE( i + 7 ) };
			}
			i += 2 + buf.readUInt16BE( i + 2 );
		}
	}
	return null;
}

async function reachable( url ) {
	try {
		// Some hosts reject HEAD; fall back to a ranged GET.
		let res = await fetch( url, { method: 'HEAD', redirect: 'follow' } );
		if ( res.status === 405 || res.status === 403 ) {
			res = await fetch( url, { headers: { Range: 'bytes=0-0' }, redirect: 'follow' } );
		}
		return res.status;
	} catch ( error ) {
		return error.message;
	}
}

const data = JSON.parse( await readFile( join( root, 'gallery.json' ), 'utf8' ) );

if ( ! Array.isArray( data.entries ) ) {
	console.error( 'gallery.json: "entries" must be an array' );
	process.exit( 1 );
}

const seen = new Set();

for ( const entry of data.entries ) {

	const slug = entry.slug || '(no slug)';

	for ( const field of required ) {
		if ( ! entry[ field ] ) problem( slug, `missing required field "${field}"` );
	}

	if ( entry.slug ) {
		if ( ! /^[a-z0-9][a-z0-9-]*$/.test( entry.slug ) )
			problem( slug, 'slug must be lowercase letters, digits and hyphens' );
		if ( seen.has( entry.slug ) ) problem( slug, 'duplicate slug' );
		seen.add( entry.slug );
	}

	if ( entry.thumb ) {
		const path = join( root, entry.thumb );
		try {
			await stat( path );
			const size = await imageSize( path );
			if ( ! size ) {
				warn( slug, `could not read dimensions of ${entry.thumb}` );
			} else {
				const ratio = size.width / size.height;
				if ( Math.abs( ratio - 16 / 9 ) > 0.02 )
					warn( slug, `thumbnail is ${size.width}x${size.height} (${ratio.toFixed( 2 )}:1), expected 16:9` );
				if ( size.width < 960 )
					warn( slug, `thumbnail is only ${size.width}px wide; 1600px recommended` );
			}
		} catch {
			problem( slug, `thumbnail not found: ${entry.thumb}` );
		}
	}

	if ( ! offline ) {
		for ( const field of [ 'url', 'repo' ] ) {
			if ( ! entry[ field ] ) continue;
			const status = await reachable( entry[ field ] );
			// A Slidev deck deep link is routinely served as the SPA fallback
			// with a 404 status, so only flag what is unambiguously broken.
			if ( typeof status !== 'number' ) problem( slug, `${field} ${entry[ field ]} -- ${status}` );
			else if ( status >= 400 ) problem( slug, `${field} ${entry[ field ]} -- HTTP ${status}` );
		}
	}

}

for ( const w of warnings ) console.warn( `warning  ${w}` );
for ( const p of problems ) console.error( `error    ${p}` );

console.log( `\nchecked ${data.entries.length} entries: ${problems.length} errors, ${warnings.length} warnings` );
process.exit( problems.length > 0 ? 1 : 0 );
