(function( $ ) {
    "use strict";
    $.fn.shiftingtiles = function( images, options ) {
        var timeout,
            where = this;

        $.extend( {
            photosource: images
        }, options );

        where.on( "animationend webkitAnimationEnd oanimationend MSAnimationEnd", ".leave > .row", function() {
            $( this ).parent().addClass( "left" ).removeClass( "leave" );
        } );
        where.on( "animationend webkitAnimationEnd oanimationend MSAnimationEnd", ".disappear", function() {
            //console.log("Animation end, removing node",this);
            // $(this).  this wasn't working, why? no idea
            $( this ).css( "display", "none" ).remove();
            where.trigger( "animate-after" );

            return false;
        } );

        setup( this );

        // Source
        function source() {
            if( typeof images.bottom === "undefined" ) {
                images.bottom = 0;
            }

            var index = images.bottom + Math.floor( (images.length - images.bottom) * Math.random() );
            //console.log(index, 1, images.bottom, images);
            var one = images.splice( index, 1 )[0];
            images.unshift( one );

            images.bottom++;

            if( images.bottom === images.length ) {
                images.bottom = 0;
                where.trigger( "galleryrestart" );
            }

            return one;
        }

        // Setup
        function setup( where ) {
            where.addClass( "shiftingtiles" );
            where.prepend( "<div class='row'><div class='single'></div><div class='single'></div><div class='dual'><div></div><div></div></div></div>" );
            where.prepend( "<div class='row'><div class='single'></div><div class='single'></div><div class='dual'><div></div><div></div></div></div>" );
            where.append( "<div class='loading'>Loading Photos...</div>" );

            where.find( ".single, .dual > div" ).each( addImage );
            timeout = setTimeout( frame, 5000 );
        }

        // Add background image from source to jQuery element
        function image( $element ) {
            $element.css( "background-image", "url(" + source() + ")" );
        }

        // Figure out single or dual and add images
        function addImage( index, node ) {
            node = $( node );
            //console.log(node);
            // Load new images
            if( node.hasClass( "single" ) || node.parent( ".dual" ).size() > 0 ) {
                image( node );
            } else if( node.hasClass( "dual" ) ) {
                node.children().each( function() {
                    image( $( this ) );
                } );
            }

            return node;
        }

        // Animate frame, remove box and add new one
        function frame() {
            clearTimeout( timeout );
            var boxes = where.find( ".single:not(:last-child), .dual:not(:last-child)" ),
                disappear = $( boxes.get( Math.floor( Math.random() * boxes.size() ) ) );

            where.trigger( "animate-before", disappear );

            disappear.parent().append( addImage( 0, disappear.clone() ) );
            disappear.addClass( "disappear" );
            where.trigger( "animate", disappear );

            timeout = setTimeout( frame, 5000 );
        }

        // Chainability
        return this;

    };
})( jQuery );

if( !Array.prototype.reduce ) {
    Array.prototype.reduce = function reduce( accumulator ) {
        if( this === null || this === undefined ) {
            throw new TypeError( "Object is null or undefined" );
        }
        var i = 0, l = this.length >> 0, curr;

        if( typeof accumulator !== "function" ) // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
        {
            throw new TypeError( "First argument is not callable" );
        }

        if( arguments.length < 2 ) {
            if( l === 0 ) {
                throw new TypeError( "Array length is 0 and no second argument" );
            }
            curr = this[0];
            i = 1; // start accumulating at the second element
        } else {
            curr = arguments[1];
        }

        while( i < l ) {
            if( i in this ) {
                curr = accumulator.call( undefined, curr, this[i], i, this );
            }
            ++i;
        }

        return curr;
    };
}