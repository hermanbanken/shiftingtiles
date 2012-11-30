(function( $ ){

  $.fn.shiftingtiles = function(source, options) {
  	
  	var options = $.extend({
	  		dummy_prop: function(){},
	  		dummy_prop2: true,
	  		photosource: source
	  	}, options), 
  		where = this;

  	// Setup
  	function setup(where){
  	  	where.addClass("shiftingtiles");
	  	where.append("<div class='row'><div class='single'></div><div class='single'></div><div class='dual'><div></div><div></div></div></div>");
	  	where.append("<div class='row'><div class='single'></div><div class='single'></div><div class='dual'><div></div><div></div></div></div>");
  	}

  	where.on("webkitAnimationEnd", ".disappear", function(){
  		$(this).css("display", "none").remove();
  	});

  	var timeout;
  	function frame(){
  		clearTimeout(timeout);
  		var boxes = where.find(".single:not(:last-child), .dual:not(:last-child)");
  		var disappear = $(boxes.get( ~~(Math.random() * boxes.size()) ));

  		disappear.parent().append(disappear.clone());
  		disappear.addClass("disappear");
	  	timeout = setTimeout(frame, 5000);
  	}
  	timeout = setTimeout(frame, 5000);
  	$(document.body).keyup(function(e){
  		if(e.keyCode == 32) frame();
  	})

  	setup(this);

  	// Chainability
    return this;
  
  };
})( jQuery );

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function reduce(accumulator){
    if (this===null || this===undefined) throw new TypeError("Object is null or undefined");
    var i = 0, l = this.length >> 0, curr;
 
    if(typeof accumulator !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
      throw new TypeError("First argument is not callable");
 
    if(arguments.length < 2) {
      if (l === 0) throw new TypeError("Array length is 0 and no second argument");
      curr = this[0];
      i = 1; // start accumulating at the second element
    }
    else
      curr = arguments[1];
 
    while (i < l) {
      if(i in this) curr = accumulator.call(undefined, curr, this[i], i, this);
      ++i;
    }
 
    return curr;
  };
}