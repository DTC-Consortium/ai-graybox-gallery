/*
 * Capture a gallery thumbnail from a published Slidev deck.
 *
 *   node scripts/thumb.mjs <deck-url> <slide-number> <out.png> [options]
 *
 *   --clicks N     advance N click steps into the slide before capturing
 *   --width N      viewport width  (default 1600)
 *   --height N     viewport height (default 900, i.e. 16:9)
 *   --wait MS      extra settle time after load (default 1200)
 *   --max N        safety bound on the arrow-key walk (default 200)
 *   --quality N    JPEG quality, 1-100 (default 85; ignored for .png output)
 *
 * Write to a .png for slides that are mostly text and diagrams, and to a .jpg
 * for slides built around a photograph -- a full-bleed photo lands around 1 MB
 * as a PNG and under 150 KB as a JPEG, with no visible difference at tile size.
 *
 * Example:
 *   node scripts/thumb.mjs https://ocj-dev.github.io/kineval/pathfinding/ 15 \
 *     files/thumbs/astar-pathfinding.png
 *
 * Why this is more than a page.goto(): GitHub Pages serves a single root
 * 404.html, and how a deck handles deep links depends on what its deploy
 * workflow put there. A deck whose workflow copies index.html to 404.html
 * resolves `<deck>/15` straight to slide 15. A repo hosting several decks
 * usually has a 404.html that redirects deep links back to a deck's slide 1
 * instead. So: try the deep link, verify which slide actually rendered by
 * looking for Slidev's own `.slidev-page-<n>` class, and walk forward with
 * ArrowRight if we landed somewhere else.
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

function usage( message ) {
	if ( message ) console.error( `thumb: ${message}\n` );
	console.error( 'usage: node scripts/thumb.mjs <deck-url> <slide-number> <out.png>' +
		' [--clicks N] [--width N] [--height N] [--wait MS] [--max N]' );
	process.exit( 1 );
}

const positional = [];
const opts = { clicks: 0, width: 1600, height: 900, wait: 1200, max: 200, quality: 85 };

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

const [ rawUrl, rawSlide, out ] = positional;
const slide = Number( rawSlide );
if ( ! Number.isInteger( slide ) || slide < 1 ) usage( 'slide number must be a positive integer' );

const base = rawUrl.endsWith( '/' ) ? rawUrl : rawUrl + '/';
const query = opts.clicks > 0 ? `?clicks=${opts.clicks}` : '';

await mkdir( dirname( out ), { recursive: true } );

const browser = await chromium.launch();
const page = await browser.newPage( {
	viewport: { width: opts.width, height: opts.height },
	deviceScaleFactor: 1,
} );

/*
 * Which slide is on screen.
 *
 * Read it from the URL, which Slidev keeps in sync via history routing: a
 * deck root means slide 1, otherwise the trailing path segment is the number.
 * Reading it from the DOM instead is unreliable during a slide transition,
 * when both the outgoing and incoming `.slidev-page-<n>` are laid out -- so
 * the DOM is only a fallback for when the URL carries no number at all.
 */
async function currentSlide() {
	return page.evaluate( () => {
		const match = /\/(\d+)\/?$/.exec( window.location.pathname );
		if ( match ) return Number( match[ 1 ] );
		if ( document.querySelector( '[class*="slidev-page-"]' ) ) return 1;
		return null;
	} );
}

async function settle( ms ) {
	await page.waitForLoadState( 'networkidle' ).catch( () => {} );
	await page.evaluate( () => document.fonts && document.fonts.ready ).catch( () => {} );
	await page.waitForTimeout( ms );
}

try {

	await page.goto( `${base}${slide}${query}`, { waitUntil: 'networkidle', timeout: 60000 } );
	await settle( opts.wait );

	let at = await currentSlide();
	if ( at === null ) {
		throw new Error( `no Slidev slide rendered at ${base}${slide} -- is that a Slidev deck?` );
	}

	if ( at !== slide ) {
		// Deep link didn't stick (a redirecting 404.html, most likely). Walk
		// there. ArrowRight steps through click animations as well as slides,
		// so check after every press rather than pressing (slide - at) times.
		console.error( `thumb: landed on slide ${at}, walking to ${slide}` );
		let presses = 0;
		while ( at !== slide && presses < opts.max ) {
			await page.keyboard.press( 'ArrowRight' );
			await page.waitForTimeout( 250 );
			at = await currentSlide();
			presses ++;
		}
		if ( at !== slide ) {
			throw new Error( `could not reach slide ${slide} (stuck on ${at} after ${presses} presses)` );
		}
		for ( let i = 0; i < opts.clicks; i ++ ) {
			await page.keyboard.press( 'ArrowRight' );
			await page.waitForTimeout( 150 );
		}
		await settle( opts.wait );
	}

	/*
	 * Hide the navigation chrome. Keep these selectors exact: a wildcard like
	 * [class*="slidev-nav-"] also matches the `slidev-nav-go-forward` class
	 * Slidev leaves on an ancestor of the slide after navigating, which hides
	 * the slide itself and yields a blank thumbnail.
	 */
	await page.addStyleTag( {
		content: `
			.slidev-controls, .slidev-progress-bar { display: none !important; }
			* { caret-color: transparent !important; }
		`,
	} );
	// Park the pointer off-canvas so nothing is in a hover state.
	await page.mouse.move( -10, -10 );
	await page.waitForTimeout( 250 );

	/*
	 * Shoot the slide element itself rather than `#slide-content`: it is
	 * exactly the 16:9 canvas (no letterboxing if the viewport aspect differs),
	 * and during a `transition: slide-left` the container can still be holding
	 * the outgoing slide, which is how you get a blank thumbnail.
	 */
	const slideEl = page.locator( `.slidev-page-${slide}` ).first();
	await slideEl.waitFor( { state: 'visible', timeout: 15000 } );
	await settle( opts.wait );

	const jpeg = /\.jpe?g$/i.test( out );
	await slideEl.screenshot( {
		path: out,
		animations: 'disabled',
		...( jpeg ? { type: 'jpeg', quality: opts.quality } : {} ),
	} );

	console.log( `thumb: wrote ${out} (slide ${slide} of ${base})` );

} finally {
	await browser.close();
}
