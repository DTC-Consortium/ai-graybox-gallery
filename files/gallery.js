/*
 * Renders the thumbnail grid from gallery.json.
 *
 * Adding a gray box to the gallery means adding one object to gallery.json and
 * one image under files/thumbs/ -- nothing here needs to change.
 */

( function () {

	var projects = document.getElementById( 'projects' );

	function text( tag, className, value ) {

		var el = document.createElement( tag );
		el.className = className;
		el.textContent = value;
		return el;

	}

	function tile( entry ) {

		var link = document.createElement( 'a' );
		link.className = 'tile';
		link.href = entry.url;
		link.target = '_blank';
		link.rel = 'noopener';

		var img = document.createElement( 'img' );
		img.src = entry.thumb;
		img.loading = 'lazy';
		// The caption repeats this, but alt text is what a screen reader and a
		// broken-image placeholder actually read out.
		img.alt = entry.title + ( entry.subtitle ? ' — ' + entry.subtitle : '' );
		link.appendChild( img );

		var caption = document.createElement( 'div' );
		caption.className = 'tile-caption';
		caption.appendChild( text( 'span', 'tile-title', entry.title ) );

		if ( entry.subtitle ) {

			caption.appendChild( text( 'span', 'tile-subtitle', entry.subtitle ) );

		}

		var meta = [];
		if ( entry.author ) meta.push( entry.author );
		if ( entry.course ) meta.push( entry.course );
		if ( entry.topics && entry.topics.length ) meta.push( entry.topics.join( ' · ' ) );

		if ( meta.length ) {

			caption.appendChild( text( 'span', 'tile-meta', meta.join( ' — ' ) ) );

		}

		link.appendChild( caption );

		return link;

	}

	fetch( 'gallery.json' )
		.then( function ( response ) {

			if ( ! response.ok ) throw new Error( 'gallery.json: HTTP ' + response.status );
			return response.json();

		} )
		.then( function ( data ) {

			data.entries.forEach( function ( entry ) {

				projects.appendChild( tile( entry ) );

			} );

		} )
		.catch( function ( error ) {

			console.error( error );
			projects.appendChild( text( 'p', 'tile-meta', 'Could not load gallery.json.' ) );

		} );

} )();
