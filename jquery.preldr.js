/**
 * @name jquery.preloader.js
 * @author Andreas Berghaus <andreas@bergha.us>
 *
 * jquery.preloader.js, utf-8, 2013-04-17
 */

import jQuery from 'jquery';

if ( undefined === jQuery ) { console.error( 'jQuery is required. #preldr' ); }
else {
	( function ( $ ) {
		"use strict";
		$.fn.preldr = function ( callback ) {
			var urls = [],
				$this = $( this );

			this.each( function () {
				if ( typeof this === 'string' ) {
					urls.push( this );
					return true;
				}
				$( this ).find( 'img' ).each( function () {
					urls.push( $( this ).attr( 'src' ) );
				} );
			} );

			$.preldr( urls, function () {
				( callback || function () {} ).apply( undefined, [$this] );
			} );
		};

		$.preldr = function ( urls, callback ) {
			var loading = urls.length,
				loaded;

			loaded = function () {
				( callback || function () {} ).apply( undefined, [] );
			};

			$.each( urls, function () {
				var url = this;
				$( '<img />' )
				.one( 'load', function ( e ) {
					loading--;
					if ( loading === 0 ) {
						loaded( this );
					}
				} )
				.one( 'error', function ( e ) {
					console.error( 'unable to load image: ' + url );
					loaded( this );
				} )
				.attr( 'src', url );
			} );

			if ( urls.length === 0 ) {
				loaded();
			}
		};
	} ( jQuery ) );
}

