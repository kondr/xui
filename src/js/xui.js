/*
* XUI
* ===
* 
* A simple javascript framework for building mobile web applications.
* ---
*
* ### WHY?!
*
* We hear your words. _Why another JavaScript framework?!_ When development of PhoneGap was under way we noticed slow
* load times for modern JavaScript frameworks (such as Prototype, MooTools, YUI, Ext and (yes) even jQuery. 
* A big reason why these libraries are so big is because  is mostly they contain a great deal of cross browser 
* compatability code. The mobile space has less browser implementations (so far) and different needs. Thus XUI.
* 
* XUI strives to be a framework for first class mobile device browsers such as WebKit, Fennec and Opera with future 
* support under consideration for IE Mobile and BlackBerry.
*
* ### Authors
*
* - Rob Ellis
* - Brock Whitten
* - Brian LeRoux
* 
* ### Download
* 
* Minified code is less than 6k! _official builds coming soonish - Brian Jan 6, 2009_
* 
* ### Contribute
*
* Clone the source from GitHub:
*
* 	git clone git://github.com/brianleroux/xui.git
*
* To build xui: run _rake_ in the shell of your choice from the root of the project directory. (This requires Ruby.)
* There are other tasks for code minification, running the specs and generating docs. Run `rake -T` to see them all.
* 
* Check out the _example_ directory for a comprehensive example application. Specs are in the _spec_ directory. 
* 
* API Documentation
* ===
* 
* Welcome the XUI documentation. This is generated from inline documentation in the xui javascript source.
*
* 
* 
* Basics
* ---
*	
* XUI is available to the entire document as x$. It is a function, that accepts a query selector. The syntax is 
* mostly chainable and should be familiar to anyone who has worked with jQuery.
*
* 	x$('a.navigation').css({ background:'blue' });
* 
* The query selection engine is based on the browser implementation of querySelectorAll so its fast. Real fast.
* XUI allows for a single expression, an element or an array of elements to be passed
* 
* 	x$(window);
*
* 
*/
(function() {
	var _$ = function(els) {
		return this.find(els);
	};
	
	_$.prototype = {
		
		elements:[],
		
		find: function(q) {
			this.elements = []; // should it behave like this?

			var qlen = q.length;
			for(var i = 0; i < qlen; i++ ) {
				if( typeof q[i] == 'string' ) {
					var list = document.querySelectorAll(q[i]);
					var size = list.length;
					
					for(var j = 0; j < size; j++ ) {          
						this.elements.push(list[j]);   
					}
				} else {
					this.elements.push(q[i]);
				}
				
			};
			return this;
		},
		
		first: function() {
			return this.elements[0];
		},
		
	  	each: function(fn) {
			for( var i = 0, len = this.elements.length; i<len; ++i ) {
				fn.call(this,this.elements[i]);
			}
			return this;
		},

		// merges sub lib objects
		extend: function( libObj ) {
			for(var x in libObj) {
				this[x] = libObj[x];
			}
		}
	};
	

	// adds the xui system as x$ to the current window
	var xui = window.x$ = function() {
		<%= build_sub_libraries %>
	
		var libs = <%= "[#{ libs_to_build.map {|x| x.capitalize }.join(',') }]" %>;
		var size = libs.length;
		var that = new _$(arguments);
		
		for( var i = 0; i < size; i++ ) {
			that.extend( libs[i] );
		}
	
		return that;
	}

})();

/*
* TODO
* ---
* 
* - look into lib loading / extend method buggyness
* - more tests!!!
* - get jslint passing
* - better docs (generate side by side code like ubiquity)
* - inspect and generate example from markdown
* - generators
* - canvas progressive enhancement
* - prop should be JS property, not CSS property
*
* Changelog
* ---
* _jab 22, 2009_
* 
* - Full support for HTMLElement in DOM.html()
* 
* _jab 21, 2009_
*
* - fixed DOM
* - added remove
*
* _Jan 18, 2009_
* 
* - more documentation for core, etc
* - after cat getting out of the bag on ajaxian we're working furiously to get this production ready
*
* _Jan 13, 2009_
*
* - merged robs fixes and cleanup
* 
* _Jan 11, 2009_
*
* - added mobile safari events (these will need testing in android, etc)
* - cleaned up Dom.html and documented
* - documented event a little
* 
* _Jan 10, 2009_
* 
* - removed Dom.clean for now
* - made Dom.getTag and Dom.wrap private 
* - documented Dom
* - more Dom tests
* 
* _Jan 9, 2009_
*
* - more docs for xui core, xhr, style and fx
*
* _Jan 7, 2009_
* 
* - style spec passing
* - xui app phase one
* - testing approch resolved
* - hasClass now private
* 
* _Jan 6, 2009_
*
* - rock out with renewed authority
* - better docs we promise
* - create doc/index.html from markdown
* 
* LICENSE
* ---
* 
* _Copyright (c) 2008 Brian LeRoux, Brock Whitten, Rob Ellis_
* 
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
* IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
* CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
* TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
* SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/