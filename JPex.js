


const JPex = {

	/**
	* Function for extending Function constructors
	*/
	extend : function (sub, base) {
		function A () {}
		A.prototype = base.prototype;
		sub.prototype = new A();
		sub.prototype.constructor = sub;

		/*sub.prototype = Object.create(base.prototype);

		/*Object.defineProperty(sub.prototype, "constructor", {
			value : sub,
			enumarable : false,
			writable : true
		});*/
	}
};








