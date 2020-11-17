


class DialogView extends SubPage {
	
	
	constructor () {
		super();
		
		this.blur;
		
		this.box;
		
		this.rightButton=null;
		
		this.leftButton=null;
		
		this.centreButton=null;
	}
	
	
	setLeftButton (text, callback) {
		this.leftButton = _ce("button");
		this.leftButton.innerText = text;
		this.leftButton.className = "dual";
		
		if (callback == undefined) {
			callback = function () {
				this.page.removeSubPage();
			}.bind(this);
		}
		
		this.leftButton.addEventListener("click", callback);
	}
	
	setRightButton (text, callback) {
		this.rightButton = _ce("button");
		this.rightButton.innerText = text;
		this.rightButton.className = "dual";
		this.rightButton.addEventListener("click", callback);
	}
	
	setCentreButton (text, callback) {
		this.centreButton = _ce("button");
		this.centreButton.innerText = text;
		
		if (callback == undefined) {
			callback = function () {
				this.page.removeSubPage();
			}.bind(this);
		}
		
		this.centreButton.addEventListener("click", callback);
	}
	
	getButtonBox () {
		var box = _ce("div");
		box.className = "dialog-button-box";
		return box;
	}
	
	getButton () {
		var box = this.getButtonBox();
		box.appendChild(this.centreButton);
		return box;
	}
	
	getButtons () {
		var box = this.getButtonBox();
		box.appendChild(this.leftButton);
		box.appendChild(this.rightButton);
		return box;
	}
	
	getTipBox (text) {
		var box = _ce("div");
		box.className = "dialog-tip";
		box.innerText = text;
		return box;
	}
	
	setBox (objs) {
		
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
	
	start () {
		super.start();
		
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
	
	
	stop () {
		super.stop();
		
		this.box.classList.remove("show");
		document.body.removeChild(this.blur);
		setTimeout((function () {
			document.body.removeChild(this.box);
		}).bind(this), 300);
	}
	
}
