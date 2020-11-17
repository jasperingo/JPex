/*=== GETS ELEMENTS FROM DOM ===*/


var HIDE = "hide";

var SHOW = "show";




/*var reader = new FileReader();
	reader.addEventListener("load", success);
	reader.readAsDataURL(pix);*/

function hide (el) {
	if (!Array.isArray(el)) {
		el.classList.add(HIDE);
	} else {
		for (var i=0;i<el.length;i++) {
			el[i].classList.add(HIDE);
		}
	}
}

function show (el) {
	if (!Array.isArray(el)) {
		el.classList.remove(HIDE);
	} else {
		for (var i=0;i<el.length;i++) {
			el[i].classList.remove(HIDE);
		}
	}
}

function setScrollListener (callback) {
	window.addEventListener("scroll", callback);
}

function unsetScrollListener (callback) {
	window.removeEventListener("scroll", callback);
}


function getDashboardBox (view) {
	var box = _ce("div");
	box.className = "dashboard-box";
	box.appendChild(view);
	return box;
}

function getLoader () {
	
	var loader = _ce("div");
	loader.className = "loader";
	
	var div1 = _ce("div");
	var div2 = _ce("div");
	var div3 = _ce("div");
	var div4 = _ce("div");
	
	div1.className = "load redload";
	div2.className = "load blueload";
	div3.className = "load blueload";
	div4.className = "load redload";
	
	loader.appendChild(div1);
	loader.appendChild(div2);
	loader.appendChild(div3);
	loader.appendChild(div4);
	
	return loader;
}


function getNoContent (a) {
	var div = _ce("div");
	div.className = "no-content";
	div.innerText = a;
	return div;
}

function getRetry (a, callback) {
	var div = _ce("div");
	var span = _ce("span");
	var button = _ce("button");
	div.className = "retry-box";
	span.innerText = a;
	button.innerText = strings.retry;
	button.addEventListener("click", callback);
	button.addEventListener("click", function () {
		div.parentElement.removeChild(div);
	});
	div.appendChild(span);
	div.appendChild(button);
	return div;
}


function copyLayout (a) {
	var layout = _ce("div");
	layout.innerHTML = _id(a).innerHTML;
	return layout.firstElementChild;
}


function makeDate (a) {
	
	var d = new Date(a);
	
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
	var date = d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear()+" "+d.getHours()+":"+(d.getMinutes() < 10 ? "0"+d.getMinutes() : d.getMinutes());
	
	return date;
}

function makeRawDate () {
	
	var d = new Date();
	
	var mon = d.getMonth()+1 < 10 ? "0"+(d.getMonth()+1) : d.getMonth()+1;
	var hr = d.getHours() < 10 ? "0"+d.getHours() : d.getHours();
	var min = d.getMinutes() < 10 ? "0"+d.getMinutes() : d.getMinutes();
	var dt = d.getDate() < 10 ? "0"+d.getDate() : d.getDate();
	var sec = d.getSeconds() < 10 ? "0"+d.getSeconds() : d.getSeconds();
	
	return d.getFullYear()+"-"+mon+"-"+dt+" "+hr+":"+min+":"+sec;
}

function DialogBox () {
	
	this.blur;
	
	this.box;
	
	this.rightButton=null;
	
	this.leftButton=null;
	
	this.centreButton=null;
	
	
	
	this.setLeftButton = function (text) {
		this.leftButton = _ce("button");
		this.leftButton.innerText = text;
		this.leftButton.className = "dual";
		this.leftButton.addEventListener("click", this.remove.bind(this));
	}
	
	this.setRightButton = function (text, callback) {
		this.rightButton = _ce("button");
		this.rightButton.innerText = text;
		this.rightButton.className = "dual";
		this.rightButton.addEventListener("click", callback);
	}
	
	this.setCentreButton = function (text) {
		this.centreButton = _ce("button");
		this.centreButton.innerText = text;
		this.centreButton.addEventListener("click", this.remove.bind(this));
	}
	
	this.getButtonBox = function () {
		var box = _ce("div");
		box.className = "dialog-button-box";
		return box;
	}
	
	this.getButton = function () {
		var box = this.getButtonBox();
		box.appendChild(this.centreButton);
		return box;
	}
	
	this.getButtons = function () {
		var box = this.getButtonBox();
		box.appendChild(this.leftButton);
		box.appendChild(this.rightButton);
		return box;
	}
	
	this.getTipBox = function (text) {
		var box = _ce("div");
		box.className = "dialog-tip";
		box.innerText = text;
		return box;
	}
	
	this.setBox = function (objs) {
		
		if (this.box == null) {
			this.box = _ce("div");
			this.box.className = "dialog-box";
		} else {
			this.box.innerHTML = "";
		}
		
		for (var i=0;i<objs.length;i++) {
			this.box.appendChild(objs[i]);
		}
		
		if (this.centreButton != null) {
			this.box.appendChild(this.getButton());
		}
		
		if (this.leftButton != null && this.rightButton != null) {
			this.box.appendChild(this.getButtons());
		}
		
		document.body.appendChild(this.box);
		
		var h = this.box.offsetHeight;
		
		if (this.blur == null) {
			document.body.removeChild(this.box);
		}
		
		var pos = ((h/2) * 100)/window.innerHeight;
		
		this.box.style.top = (50-pos)+"%";
	}
	
	this.show = function () {
		
		if (this.blur == null) {
			this.blur = _ce("div");
			this.blur.id = "dialog-blur";
		}
		
		document.body.appendChild(this.blur);
		document.body.appendChild(this.box);
		
		setTimeout((function () {
			this.box.classList.add("show");
		}).bind(this), 10);
	}
	
	
	this.remove = function () {
		
		this.box.classList.remove("show");
		document.body.removeChild(this.blur);
		setTimeout((function () {
			document.body.removeChild(this.box);
		}).bind(this), 300);
	}
	
}




function getMoney (m, c, p) {
	c = c ? "" : "₦ ";
	p = p ? p : 2;
	return c+parseFloat(m).toFixed(p); 
}

function lineBreakString (txt) { 
	return txt.replace(/(\r\n|\n|\r)/gm, "<br/>").replace(/  +/gm, "&nbsp"); 
}


function formatCount (c) {
	
	if (c > 999 && c < 1000000) {
		var t = c.toString();
		return t.slice(0, t.length-3)+"k";
	} else if (c > 999999 && c < 1000000000) {
		var t = c.toString();
		return t.slice(0, t.length-6)+"m";
	} else if (c < 1000) {
		return c;
	}
}


String.prototype.firstToUpperCase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


function deviceIsMoblie () {
	return window.innerWidth < 768;
}

function hasVerticalScroll (node){
    if(node == undefined){
        if(window.innerHeight){
            return document.body.offsetHeight > window.innerHeight;
        } else {
            return document.documentElement.scrollHeight > document.documentElement.offsetHeight ||
                document.body.scrollHeight >document.body.offsetHeight;
        }
        
    } else {
        return node.scrollHeight > node.offsetHeight;
    }
}


function canLoadMoreContent (box) {
	var y1 = box.offsetHeight;
	var y2 = window.pageYOffset+window.innerHeight;
	return y2 >= (y1/1.333);
}


