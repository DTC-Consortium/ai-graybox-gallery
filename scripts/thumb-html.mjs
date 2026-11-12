/*
 * Capture a gallery thumbnail from a prebuilt single-file HTML deck -- the
 * kind hosted in this repository under grayboxes/<slug>/index.html.
 *
 *   node scripts/thumb-html.mjs <deck> <slide-number> <out.png> [options]
 *
 *   <deck>         a local path (grayboxes/<slug>/index.html) or a URL
 *   --width N      viewport width  in CSS pixels (default 1120)
 *   --height N     viewport height in CSS pixels (default 630, i.e. 16:9)
 *   --out-width N  width of the image written (default 1600)
 *   --wait MS      settle time after load (default 600)
 *   --quality N    JPEG quality, 1-100 (default 85; ignored for .png output)
 *
 * Example:
 *   node scripts/thumb-html.mjs grayboxes/meal-swipe-mystery/index.html 7 \
 *     files/thumbs/meal-swipe-mystery.png
 *
 * scripts/thumb.mjs is for Slidev decks and finds its slide through Slidev's
 * router. These decks are plain HTML: every slide is a `.slide` element, the
 * visible one carries `.on`, `#s<n>` in the URL opens slide n on load, and
 * ArrowRight steps forward. So: open the deck at `#s<n>`, check which slide
 * actually came up, and walk there with ArrowRight if the deck ignored the
 * hash.
 *
 * The viewport is deliberately smaller than the image. These decks cap their
 * content at about 980px, so a 1600px-wide viewport leaves the slide adrift
 * in empty margin; rendering at 1120x630 and scaling up fills the tile.
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function usage( message ) {
	if ( message ) console.error( `thumb-html: ${message}\n` );
	console.error( 'usage: node scripts/thumb-html.mjs <deck> <slide-number> <out.png>' +
		' [--width N] [--height N] [--out-width N] [--wait MS] [--quality N]' );
	process.exit( 1 );
}

const positional = [];
const opts = { width: 1120, height: 630, 'out-width': 1600, wait: 600, quality: 85 };

for ( let i = 2; i < process.argv.length; i ++ ) {
	const arg = process.argv[ i ];
	if ( arg.startsWith( '--' ) ) {
		const key = arg.slice( 2 );
		if ( ! ( key in opts ) ) usage( `unknown option ${arg}` );
		const value = Number( process.argv[ ++ i ] );
		if ( ! Number.isFinite( value ) ) usage( `${arg} needs a number` );
		opts[ key ] = value;
	} else {
		positional.push( arg );
	}
}

if ( positional.length !== 3 ) usage( 'expected three positional arguments' );

const [ deck, rawSlide, out ] = positional;
const slide = Number( rawSlide );
if ( ! Number.isInteger( slide ) || slide < 1 ) usage( 'slide number must be a positive integer' );

const base = ( /^https?:\/\//.test( deck ) ? deck : pathToFileURL( resolve( deck ) ).href ).replace( /#.*$/, '' );

await mkdir( dirname( out ), { recursive: true } );

const browser = await chromium.launch();
const page = await browser.newPage( {
	viewport: { width: opts.width, height: opts.height },
	deviceScaleFactor: opts[ 'out-width' ] / opts.width,
	colorScheme: 'light',
} );

/** 1-based index of the slide carrying `.on`, or null if this isn't such a deck. */
async function currentSlide() {
	return page.evaluate( () => {
		const slides = Array.from( document.querySelectorAll( '.slide' ) );
		const at = slides.findIndex( ( s ) => s.classList.contains( 'on' ) );
		return at < 0 ? null : at + 1;
	} );
}

try {

	await page.goto( `${base}#s${slide}`, { waitUntil: 'load', timeout: 60000 } );
	await page.evaluate( () => document.fonts && document.fonts.ready ).catch( () => {} );
	await page.waitForTimeout( opts.wait );

	let at = await currentSlide();
	if ( at === null ) {
		throw new Error( `no ".slide.on" element in ${base} -- is that a prebuilt HTML deck?` );
	}

	let presses = 0;
	while ( at < slide && presses < 200 ) {
		await page.keyboard.press( 'ArrowRight' );
		await page.waitForTimeout( 100 );
		at = await currentSlide();
		presses ++;
	}
	if ( at !== slide ) {
		throw new Error( `could not reach slide ${slide} (the deck stopped at slide ${at})` );
	}

	// Park the pointer off-canvas so nothing is in a hover state.
	await page.mouse.move( -10, -10 );
	await page.waitForTimeout( opts.wait );

	const jpeg = /\.jpe?g$/i.test( out );
	await page.screenshot( {
		path: out,
		animations: 'disabled',
		...( jpeg ? { type: 'jpeg', quality: opts.quality } : {} ),
	} );

	console.log( `thumb-html: wrote ${out} (slide ${slide} of ${deck})` );

} finally {
	await browser.close();
}
