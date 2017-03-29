/**
 * @name jquery.preloader.js
 * @author Andreas Berghaus <andreas@bergha.us>
 *
 * jquery.preloader.js, utf-8, 2013-04-17
 */

if ( undefined === jQuery ) { console.error( 'jQuery is required. #preldr' ); return; }

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
			$( new Image() )
			.one( 'load error', function () {
				loading--;
				if ( loading === 0 ) {
					loaded( this );
				}
			} )
			.attr( 'src', url )
			.each( function () {
				if ( true === this.complete ) { $( this ).trigger( 'load' ); }
			} );
		} );

		if ( urls.length === 0 ) {
			loaded();
		}
	};
} ( jQuery ) );
