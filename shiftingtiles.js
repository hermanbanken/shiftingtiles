(function( $ ){

  $.fn.shiftingtiles = function(source, options) {
  	
  	options = $.extend({
  		dummy_prop: function(){},
  		dummy_prop2: true,
  		photosource: source
  	}, options);

  	// Setup
  	function setup(where){
  	  	where.addClass("shiftingtiles");
	  	where.append("<div class='row'><div class='single'></div><div class='single'></div><div class='dual'><div></div><div></div></div><div class='single'></div></div>");
	  	where.append("<div class='row'><div class='single'></div><div class='single'></div><div class='dual'><div></div><div></div></div><div class='single'></div></div>");
  	}

  	setup(this);

  	// Chainability
    return this;
  
  };
})( jQuery );