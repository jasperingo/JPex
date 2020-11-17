


/**
* DOM contains methods form getting & creating HTMLElement(s)
*/
const DOM  = {

	/**
	* Gets element by ID from the DOM. 
	* @param string a, ID of element.
	* @return HTMLElement | null.
	*/
	byId : function (a) {

		if (this !== DOM) {
			var el = this.querySelector("#"+a);
		} else {
			var el = document.getElementById(a);
		}

		return DOM.giveGetters(el);
	},

	/**
	* Gets elements or an element by class name from the DOM. 
	* @param string a, class name of elements.
	* @param mixed i, index of element to return from the HTMLCollection | RootElement.
	* @param object root, RootElement to search from.
	* @return HTMLCollection | null.
	*/
	byClassName : function (a, i, root) {
		
		root = DOM.getRoot(this, i, root);

		if (typeof i === "number") {
			var elems = root.getElementsByClassName(a)[i];
		} else {
			var elems = root.getElementsByClassName(a);
		}
		
		return DOM.giveGetters(elems);
	},

	/**
	* Gets elements or an element by tag name from the DOM. 
	* @param string a, tag name of elements.
	* @param mixed i, index of element to return from the HTMLCollection | RootElement.
	* @param object root, RootElement to search from.
	* @return HTMLCollection | null.
	*/
	byTagName : function (a, i, root) { 
		
		root = DOM.getRoot(this, i, root);

		if (typeof i === "number") {
			var elems = root.getElementsByTagName(a)[i];
		} else {
			var elems = root.getElementsByTagName(a);
		}
		
		return DOM.giveGetters(elems);
	},

	cloneFirst : function (id) {

		var layout = document.getElementById(id);
		if (layout !== null) {
			layout = layout.cloneNode(true).firstElementChild;
		}

		return DOM.giveGetters(layout);
	},

	/**
	* Creates a HTML element. 
	* @param string a, name of element.
	* @return HTMLElement.
	*/
	createElement : function (a) { 
		var el = document.createElement(a); 
		return DOM.giveGetters(el);
	},
	
	/**
	* Determines the element to use as the root element. Can be document | calling object
	* @param object caller, calling object
	* @param mixed i, integer | RootElement.
	* @param object root, RootElement.
	* @return HTMLElement | Document.
	*/
	getRoot : function (caller, i, root) {

		if (caller !== DOM) {
			root = caller;
		} else if (typeof i === "object") {
			root =  i;
		} else if (root === undefined) {
			root = document;
		}

		return root;
	},
	
	/**
	* Checks if elems is null | HTMLCollection | HTMLElement before passing it to DOM.attachGetters(elems). 
	* @param mixed a, HTMLElement | HTMLCollection.
	* @return HTMLElement | HTMLCollection.
	*/
	giveGetters : function (elems) {
		
		if (elems === null || elems === undefined) { 
			return elems;
		} else if (elems.length === undefined) {
			DOM.attachGetters(elems);
		} else {
			for (var i=0;i<elems.length;i++) {
				DOM.attachGetters(elems[i]);
			}
		}

		return elems;
	},


	/**
	* Add DOM's elements get method to HTMLElement. 
	* @param mixed a, HTMLElement.
	* @return HTMLElement.
	*/
	attachGetters : function (el) {
		el.byId = this.byId;
		el.byTagName = this.byTagName;
		el.byClassName = this.byClassName;
	}



};














