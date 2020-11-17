

class Page {
	
	
	constructor () {
		
		this.name;
		this.title;
		this.url;
		this.view;
		
		this.viewHolder = null;
		
		this.scrollPosition=0;
		
		this.lifeCycleState=0;
		
		this.static = false;
		
		this.requestBody = {};
		
		this.subPage = null;
		
	}
	
	
	start () {
		console.log(this.name+" started");
		this.lifeCycleState=1;
		setTitleTag(this.title);
	}
	
	show () {
		
		if (this.viewHolder == null) {
			this.view.style.display = "block";
		} else {
			document.body.replaceChild(this.view, this.viewHolder);
		}
		
		document.body.scrollTop = this.scrollPosition;
		document.documentElement.scrollTop = this.scrollPosition;
	}
	
	resume () {
		console.log(this.name+" resumed");
		this.lifeCycleState=1;
		setTitleTag(this.title);
	}
	
	stop () {
		console.log(this.name+" stopped");
		
		this.lifeCycleState=2;
		
		if (document.documentElement.scrollTop) {
			this.scrollPosition = document.documentElement.scrollTop;
		} else if (document.body.scrollTop) {
			this.scrollPosition = document.body.scrollTop;
		} else {
			this.scrollPosition = 0;
		}
		
		if (this.viewHolder == null) {
			this.view.style.display = "none";
		} else {
			document.body.replaceChild(this.viewHolder, this.view);
		}
	}
	
	setName (name) {
		this.name = name;
	}
	
	setRequestHeader (header) {
		
		if (header.hasOwnProperty("title")) {
			this.title = header.title;
		}
		
		if (header.hasOwnProperty("url")) {
			this.url = header.url;
		}
	}
	
	setRequestBody (body) {
		if (body != undefined) {
			this.requestBody = body;
		}
	}
	
	
	setView (id) {
		this.view = _id(id);
	}
	
	setViewLayout (id, hold) {
		var layout = _ce("div");
		layout.innerHTML = _id(id).innerHTML;
		this.viewHolder = _id(hold);
		this.view = layout.firstElementChild;
	}
	
	
	addSubPage (subPage) {
		this.subPage = subPage;
		this.subPage.setPage(this);
		pushToHistory(subPage, {header:{url:""}});
		this.subPage.start();
		
		console.log(pagesStack);
	}
	
	removeSubPage () {
		if (!this.subPage.static) {
			history.back();
		}
	}
	
}




