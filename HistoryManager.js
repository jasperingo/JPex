




function JpexHistory () {
	

	this.pages = [];

	this.pagesPosition = 0;

	this.position = history.state == null ?  history.length : history.state.position;

	



}


window.addEventListener("popstate", popPage);

//window.addEventListener("load", startApp);



JPexHistory.prototype.poppedBack = function () {
	return history.state.position < historyPosition;
}


function getExistingPageInstance (name) {
	
	var pos = findPageInstanceOnStack(name);
		
	if (pos == -1) {
		return null;
	}
	
	return pagesStack[pos];
}


function findPageInstanceOnStack (n) {
	for (var i=0;i<pagesStack.length;i++) {
		if (pagesStack[i] != null && pagesStack[i].name == n) {
			return i;
		}
	}
	return -1;
}


function startPage (request) {
	
	var oldRequest = JSON.parse(JSON.stringify(history.state));
	oldRequest.position = undefined;
	if (JSON.stringify(oldRequest) == JSON.stringify(request)) {
		return;
	}
	
	var page = getPageInstance(request.name);
	
	pagesStack[pagesStackPosition].stop();
	
	pushToHistory(page, request);
	
	setUpPage(page, request);
	
	console.log(pagesStack);
}


function pushToHistory (page, request) {
	
	if (historyPosition < history.length) {
		pagesStack.splice(pagesStackPosition+1);
	}
	
	request.position = ++historyPosition;
	
	history.pushState(request, "", request.header.url);
	
	pagesStack.push(page);
	
	pagesStackPosition++;
}


function getPageInstance (name) {
	
	var page = null;
	
	if (registry.oneInstancePages.indexOf(name) > -1) {
		page = getExistingPageInstance(name);
	}
	
	if (page == null) {
		page = registry.getPageInstance(name);
	}
	
	return page;
}

function setUpPage (page, request) {
	
	page.setName(request.name);
	
	page.setRequestHeader(request.header);
	
	page.setRequestBody(request.body);
	
	if (page.lifeCycleState == 2) {
		page.resume();
	} else {
		page.start();
	}
	
	page.show();
}



function popPage (e) {
	
	var request = e.state;
	
	
	var currentPage = pagesStack[pagesStackPosition];
	
	
	if (currentPage instanceof SubPage && currentPage.static) {
		
		window.removeEventListener("popstate", popPage);
			
		history.go(historyPosition - request.position);
			
		setTimeout(function () {
			window.addEventListener("popstate", popPage); 
		}, 20);
			
		return;
	}
	
	if (currentPage != undefined && currentPage.lifeCycleState == 1) {
		currentPage.stop();
	}
	
	var popTo = (request.position - historyPosition) + pagesStackPosition;
	//alert("rp: "+request.position+" - hp: "+historyPosition+" - hl: "+history.length+" - pp: "+pagesStackPosition+" - pt: "+popTo);
	pagesStackPosition = popTo;
	
	historyPosition = request.position;
	
	if (popTo < 0) {
		
		for (var i=-1;i>popTo;i--) {
			pagesStack.unshift(null);
		}
		
		if (request.hasOwnProperty("name")) {
			var page = getPageInstance(request.name);
			
			pagesStack.unshift(page);
			
			setUpPage(page, request);
			
			pagesStackPosition = 0;
		} else {

			history.forward();
		}

	} else if (popTo > pagesStack.length-1) {
		
		for (var i=pagesStack.length;i<popTo;i++) {
			pagesStack.push(null);
		}

		if (request.hasOwnProperty("name")) {
			var page = getPageInstance(request.name);
			
			pagesStack.push(page);
			
			setUpPage(page, request);
			
			pagesStackPosition = 0;

		} else {
			
			history.back();
		}
		
		
	} else if (pagesStack[popTo] instanceof SubPage) {
		
		if (poppedBack(request.position) || !poppedBack(request.position) && historyPosition == history.length) {
			history.back();
		} else {
			history.forward();
		}
		
	} else if (pagesStack[popTo] == null) {
		
		var page = getPageInstance(request.name);
		
		pagesStack.splice(popTo, 1, page);
		
		setUpPage(page, request);
		
	} else {
		
		if (pagesStack[popTo].lifeCycleState == 2) {
			pagesStack[popTo].resume();
			pagesStack[popTo].show();
		}
		
	}
	
	
	console.log(pagesStack);
}


function requestIsForPage (page, request) {
		
	if (page.name != request.name) {
		return false;
	}
		
	if (page.title != request.header.title) {
		return false;
	}
		
	if (page.url != request.header.url) {
		return false;
	}
	
	if ((request.body != undefined && Object.keys(page.requestBody).length != Object.keys(request.body).length) || 
		(request.body == undefined && Object.keys(page.requestBody).length > 0)) {
		return false;
	}
	
	
	for (var j in page.requestBody) {
		
		if (!request.body.hasOwnProperty(j)) {
			return false;
		}
		
		if (page.requestBody[j] != request.body[j]) {
			return false;
		}
	}
	
	
	return true;
}



function startApp () {
	
	var page = getPageInstance(registry.startRequest.name);
	
	registry.startRequest.position = historyPosition;
	
	history.replaceState(registry.startRequest, "", registry.startRequest.header.url);
	
	pagesStack.push(page);
	
	setUpPage(page, registry.startRequest);
}








class SubPage {
	
	constructor () {
		this.page = null;
		this.static = false;
		this.lifeCycleState=0;
	}
	
	setPage (page) {
		this.page = page;
	}
	
	setStatic (s) {
		this.static = s;
	}
	
	start () {
		this.lifeCycleState=1;
	}
	
	stop () {
		this.lifeCycleState=2;
		this.page.subPage = null;
	}
	
}





