

var API = "../api/v1/";

var PAGE_LIMIT = 2;



var database = {
	client : {},
	admin : {}, 
	transactions : {
		filter_type : 0, 
		filter : -1, 
		loaded : false, 
		data : []
	}, 
	subscriptions : {
		filter_type : 0, 
		filter : -1, 
		loaded : false, 
		data : [], 
	}, 
	sportsPredictions : {
		loaded : false, 
		data : []
	},
	forexPredictions : {
		loaded : false, 
		data : []
	}
};


const registry = {
	
	getPageInstance : function (n) {
		
		switch (n) {
			
			case "Support Messages" : 
				return new SupportMessages();
				
			case "Forex Prediction" :
				return new AddForexPrediction();
				
			case "Sports Prediction" :
				return new AddSportsPrediction();
				
			case "Clients" : 
				return new Clients();
			
			case "Support" : 
				return new Support();
			
			case "Subscribe" : 
				return new Subscribe();
			
			case "Withdraw" :
				return new Withdraw();
				
			case "Deposit" : 
				return new Deposit();
			
			case "Forex Predictions" :
				return new ForexPredictions();
				
			case "Sports Predictions" :
				return new SportsPredictions();
				
			case "Subscriptions" :
				return new Subscriptions();
				
			case "Transactions" : 
				return new Transactions();
				
			case "Referrals" : 
				return new Referrals();
			
			case "Settings" : 
				return new Settings();
			
			default : 
				return new Dashboard();
		}
	},
	
	oneInstancePages : onePagesArray, 
	
	startRequest : {
		name : parseStartPageData(), 
		header : {
			title : parseStartPageData(),
			url : firstPage+firstPageId,
		},
		body : firstBody
	},
	
};


function parseStartPageData () {
	
	switch (firstPage) {
		
		case "support-messages" : 
			return "Support Messages";
			
		case "sports-prediction" :
			return "Sports Prediction";
		
		case "forex-prediction" :
			return "Forex Prediction";
			
		case "sports-predictions" :
			return "Sports Predictions";
		
		case "forex-predictions" :
			return "Forex Predictions";
		
		default : 
			return firstPage.firstToUpperCase();
	}
}



function signOut (callback) {
	var ajax = new Ajax();
	ajax.sendGet("../res/php/unsetsession.php", callback);
}

function goToSignIn () {
	if (pagesWithBodyParam.indexOf(history.state.name) > -1) {
		window.location = "../signin";
	} else {
		window.location = "signin";
	}
}


class Header {
	
	constructor () {
		
		this.titleSpan = _id("header-title");
		
		this.navButton = _id("nav-button");
		
		this.onNavButtonClicked;
	}
	
	
	setTitle (text) {
		this.titleSpan.innerText = text.firstToUpperCase();
	}
	
	setNavButtonListener (callback) {
		this.onNavButtonClicked = callback;
		this.navButton.addEventListener("click", this.onNavButtonClicked);
	}
	
	unsetNavButtonListener () {
		this.navButton.removeEventListener("click", this.onNavButtonClicked);
	}
	
}


class NavBar extends SubPage {
	
	
	constructor () {
		super();
		
		this.view = _id("nav-bar");
		
		this.activeIndex = 0;
		
		this.dialog = null;
		
		this.closeButton = _id("nav-bar-close-button");
		this.closeButton.addEventListener("click", this.close);
		
		this.dashboardButton = _id("dashboard-nav-button");
		this.dashboardButton.addEventListener("click", this.openDashboard.bind(this));
		
		this.settingsButton = _id("settings-nav-button");
		this.settingsButton.addEventListener("click", this.openSettings.bind(this));
		
		this.signOutButton = _id("sign-out-nav-button");
		this.signOutButton.addEventListener("click", this.confirmSignOut.bind(this));
		
		this.transactionsButton = _id("transactions-nav-button");
		this.transactionsButton.addEventListener("click", this.openTransactions.bind(this));
		
		this.subscriptionsButton = _id("subscriptions-nav-button");
		this.subscriptionsButton.addEventListener("click", this.openSubscriptions.bind(this));
		
		this.supportButton = _id("support-nav-button");
		this.supportButton.addEventListener("click", this.openSupport.bind(this));
		
	}
	
	
	setActiveButton (index) {
		_tn("button", this.activeIndex, this.view).classList.remove("active");
		_tn("button", index, this.view).classList.add("active");
		this.activeIndex = index;
	}
	
	
	start () {
		super.start();
		this.view.classList.add(SHOW);
	}
	
	stop () {
		super.stop();
		this.view.classList.remove(SHOW);
	}
	
	close () {
		if (deviceIsMoblie()) {
			history.back();
		}
	}
	
	
	openDashboard () {
		
		this.close();
		
		setTimeout(function () {
			startPage({
				name : "Dashboard",
				header : {
					title : "Dashboard",
					url : "dashboard",
				}
			});
		}, 10);
	}
	
	openSettings () {
		
		this.close();
		
		setTimeout(function () {
			startPage({
				name : "Settings",
				header : {
					title : "Settings",
					url : "settings",
				}
			});
		}, 10);
	}
	
	openTransactions () {
		
		this.close();
		
		setTimeout(function () {
			startPage({
				name : "Transactions",
				header : {
					title : "Transactions",
					url : "transactions",
				}
			});
		}, 10);
	}
	
	openSubscriptions () {
		
		this.close();
		
		setTimeout(function () {
			startPage({
				name : "Subscriptions",
				header : {
					title : "Subscriptions",
					url : "subscriptions",
				}
			});
		}, 10);
	}
	
	
	openSupport () {
		
		this.close();
		
		setTimeout(function () {
			startPage({
				name : "Support",
				header : {
					title : "Support",
					url : "support",
				}
			});
		}, 10);
	}
	
	
	confirmSignOut () {
		
		this.close();
		
		setTimeout(function () {
			
			this.dialog = new DialogView();
			this.dialog.setLeftButton(strings.no);
			this.dialog.setRightButton(strings.yes, this.signOut.bind(this));
			this.dialog.setBox([this.dialog.getTipBox(strings.confirm_sign_out)]);
			this.page.addSubPage(this.dialog);
			
		}.bind(this), 10);
		
	}
	
	signOut () {
		
		this.dialog.rightButton=null;
		this.dialog.leftButton=null;
		this.dialog.setBox([getLoader()]);
		this.dialog.setStatic(true);
		
		signOut(goToSignIn());
		
	}
	
}




class SXPage extends Page {
	
	
	constructor () {
		super();
		
		this.activeNavButton = 0;
		this.showNavBar = this.showNavBar.bind(this);
	}
	
	start () {
		super.start();
		this.bindNavBar();
		header.setTitle(this.title);
		header.setNavButtonListener(this.showNavBar);
	}
	
	resume () {
		super.resume();
		this.bindNavBar();
		header.setTitle(this.title);
		header.setNavButtonListener(this.showNavBar);
	}
	
	stop () {
		super.stop();
		header.unsetNavButtonListener();
	}

	bindNavBar () {
		if (!deviceIsMoblie()) {
			navBar.page = this;
			navBar.setActiveButton(this.activeNavButton);
		}
	}
	
	showNavBar () {
		this.addSubPage(navBar);
		navBar.setActiveButton(this.activeNavButton);
	}
	
}



class SportsPrediction {
	
	
	constructor (data, readOnly, page) {
		
		
		this.ID = data.id;
		
		this.matches = [];
		
		this.page = page;
		
		this.dialog = null;
		
		this.confirmClose = this.confirmClose.bind(this);
		this.close = this.close.bind(this);
		this.onCloseResponse = this.onCloseResponse.bind(this);
		
		
		var layout = _ce("div");
		layout.innerHTML = _id("sports-prediction-layout").innerHTML;
		this.view = layout.firstElementChild;
		
		this.stakeAmountCell = _cl("stake-amount-cell", 0, this.view);
		this.resultAmountCell = _cl("result-amount-cell", 0, this.view);
		this.stakeDateCell = _cl("stake-date-cell", 0, this.view);
		this.closeButton = _cl("sports-close-button", 0, this.view);
		this.stakeAmountRow = _cl("stake-amount-row", 0, this.view);
		this.resultAmountRow = _cl("result-amount-row", 0, this.view);
		this.closeRow = _cl("sports-close-row", 0, this.view);
		
		
		this.stakeDateCell.innerText = makeDate(data.stake_date);
		
		if (!data.hasOwnProperty("stake_amount")) {
			this.stakeAmountRow.classList.add(HIDE);
		} else {
			this.stakeAmountCell.innerText = getMoney(data.stake_amount);
		}
		
		if (!data.hasOwnProperty("result_amount")) {
			this.resultAmountRow.classList.add(HIDE);
		} else if (data.status == null) {
			hide(this.resultAmountCell.firstElementChild);
			this.resultAmountCell.children[1].addEventListener("input", unsetError);
		} else {
			hide(this.resultAmountCell.children[1]);
			this.resultAmountCell.firstElementChild.innerText = getMoney(data.result_amount);
		}
		
		if (!data.hasOwnProperty("status") || data.status != null || (data.status == 0 && readOnly)) {
			hide(this.closeRow);
		} else {
			this.closeButton.addEventListener("click", this.confirmClose);
		}
		
		
		for (var i=0;i<data.home.length;i++) {
			
			var m = new SportsMatch();
			
			m.matchCell.innerText = data.home[i]+" vs "+data.away[i];
			
			m.optionCell.innerText = data.option[i];
			
			m.oddCell.innerText = data.odd[i];
			
			if (!data.hasOwnProperty("result") || (data.result == null && readOnly)) {
				m.resultRow.classList.add(HIDE);
			} else if (data.status == null) {
				hide(m.resultCell.firstElementChild);
				m.resultCell.children[1].addEventListener("input", unsetError);
			} else {
				hide(m.resultCell.children[1]);
				m.resultCell.firstElementChild.innerText = data.result[i];
			}
			
			if (!data.hasOwnProperty("status") || (data.status == null && readOnly)) {
				m.statusCell.innerText = strings.sports_statuses[0];
			} else if (data.status == null) {
				hide(m.statusCell.firstElementChild);
				m.statusCell.children[1].addEventListener("change", unsetError);
			} else {
				hide(m.statusCell.children[1]);
				m.statusCell.firstElementChild.innerText = strings.sports_statuses[data.status[i]];
			}
			
			this.matches.push(m);
			
			this.view.insertBefore(m.view, this.view.lastElementChild);
			
		}
		
	}
	
	
	confirmClose () {
		
		var errors =false;
		
		if (this.resultAmountCell.children[1].value == "" || parseFloat(this.resultAmountCell.children[1].value) < 0) {
			addInputError(strings.result_amount_empty_error, this.resultAmountCell.children[1]);
			errors = true;
		}
		
		for (var i=0;i<this.matches.length;i++) {
			var m = this.matches[i];
			if (m.resultInputIsInvalid()) {
				errors = true;
			}
			
			if (m.statusInputIsInvalid()) {
				errors = true;
			}
		}
		
		if (errors) {
			return;
		}
		
		this.dialog = new DialogView();
		this.dialog.setLeftButton(strings.no);
		this.dialog.setRightButton(strings.yes, this.close);
		this.dialog.setBox([this.dialog.getTipBox(strings.confirm_close_sports_prediction)]);
		this.page.addSubPage(this.dialog);
	}
	
	close () {
		
		this.dialog.rightButton=null;
		this.dialog.leftButton=null;
		this.dialog.setBox([getLoader()]);
		this.dialog.setStatic(true);
		
		var statuses = [], results = [];
		
		for (var i=0;i<this.matches.length;i++) {
			var m = this.matches[i];
			statuses.push(strings.sports_statuses.indexOf(m.statusCell.children[1].value));
			if (strings.sports_statuses.indexOf(m.statusCell.children[1].value) == 3) {
				results.push("Nil");
			} else {
				results.push(m.resultCell.children[1].value);
			}
		}
		
		var form = JSON.stringify({
			id : this.ID, 
			status : statuses, 
			result : results, 
			result_amount : parseFloat(this.resultAmountCell.children[1].value)
		});
		
		var ajax = new Ajax();
		ajax.sendPost(
			_API+"endsportsprediction.php", 
			form, 
			this.onCloseResponse,
			token
		);
	}
	
	onCloseResponse (e) {
		
		//alert(e.target.responseText+" - "+e.target.status);
		
		this.dialog.setStatic(false);
		
		if (e.target.status == 0 || e.target.status == 500) {
			this.dialog.setCentreButton(strings.cancel);
			this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
		}
		
		if (e.target.status == 401) {
			goToSignIn();
		}
		
		if (e.target.status == 200) {
			
			var r = JSON.parse(e.target.responseText);
			
			if (r.hasOwnProperty("prediction_ended")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.prediction_already_closed_error)]);
			}
			
			if (r.hasOwnProperty("input_errors")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.prediction_close_input_errors)]);
			}
			
			if (r.hasOwnProperty("error")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
			}
			
			if (r.hasOwnProperty("success")) {
				this.dialog.setCentreButton(strings.ok);
				this.dialog.setBox([this.dialog.getTipBox(strings.close_sports_prediction_success)]);
				
				hide(this.resultAmountCell.children[1]);
				show(this.resultAmountCell.firstElementChild);
				this.resultAmountCell.firstElementChild.innerText = getMoney(this.resultAmountCell.children[1].value);
				
				for (var i=0;i<this.matches.length;i++) {
					var m = this.matches[i];
					
					hide(m.statusCell.children[1]);
					show(m.statusCell.firstElementChild);
					m.statusCell.firstElementChild.innerText = m.statusCell.children[1].value;
					
					hide(m.resultCell.children[1]);
					show(m.resultCell.firstElementChild);
					if (strings.sports_statuses.indexOf(m.statusCell.children[1].value) == 3) {
						m.resultCell.firstElementChild.innerText = "Nil";
					} else {
						m.resultCell.firstElementChild.innerText = m.resultCell.children[1].value;
					}
				}
				
				hide(this.closeRow);
			}
		}
	}
	
	
}


class SportsMatch {
	
	constructor () {
		
		var layout = _ce("div");
		layout.innerHTML = _id("sports-match-layout").innerHTML;
		this.view = layout.firstElementChild;
		
		this.matchCell = _cl("match-cell", 0, this.view);
		this.optionCell = _cl("option-cell", 0, this.view);
		this.oddCell = _cl("odd-cell", 0, this.view);
		this.resultCell = _cl("result-cell", 0, this.view);
		this.statusCell = _cl("status-cell", 0, this.view);
		this.resultRow = _cl("result-row", 0, this.view);
		
	}
	
	resultInputIsInvalid () {
		
		if (this.resultCell.children[1].value == "" && this.statusCell.children[1].value != strings.sports_statuses[3]) {
			addInputError(strings.match_result_empty_error, this.resultCell.children[1]);
			return true;
		}
		
		return false;
	}
	
	statusInputIsInvalid () {
		
		if (strings.sports_statuses.indexOf(this.statusCell.children[1].value) < 1) {
			addInputError(strings.match_status_wrong_error, this.statusCell.children[1]);
			return true;
		}
		
		return false;
	}
	
	
}


class ForexPrediction {
	
	
	constructor (data, readOnly, page) {
		
		this.ID = data.id;
		
		this.page = page;
		
		this.dialog = null;
		
		this.confirmClose = this.confirmClose.bind(this);
		this.close = this.close.bind(this);
		this.onCloseResponse = this.onCloseResponse.bind(this);
		
		
		var layout = _ce("div");
		layout.innerHTML = _id("forex-prediction-layout").innerHTML;
		this.view = layout.firstElementChild;
		
		this.instrumentCell = _cl("instrument-cell", 0, this.view);
		this.tradeActionCell = _cl("trade-action-cell", 0, this.view);
		this.lotSizeCell = _cl("lot-size-cell", 0, this.view);
		this.entryPriceCell = _cl("entry-price-cell", 0, this.view);
		this.exitPriceCell = _cl("exit-price-cell", 0, this.view);
		this.exitPriceRow = _cl("exit-price-row", 0, this.view);
		this.pipCell = _cl("pip-cell", 0, this.view);
		this.pipRow = _cl("pip-row", 0, this.view);
		this.statusCell = _cl("status-cell", 0, this.view);
		this.stakeAmountCell = _cl("stake-amount-cell", 0, this.view);
		this.resultAmountCell = _cl("result-amount-cell", 0, this.view);
		this.stakeDateCell = _cl("stake-date-cell", 0, this.view);
		this.closeButton = _cl("forex-close-button", 0, this.view);
		this.stakeAmountRow = _cl("stake-amount-row", 0, this.view);
		this.resultAmountRow = _cl("result-amount-row", 0, this.view);
		this.closeRow = _cl("forex-close-row", 0, this.view);
		
		this.exitPriceCellSpan = this.exitPriceCell.children[0];
		this.exitPriceCellInput = this.exitPriceCell.children[1];
		this.pipCellSpan = this.pipCell.children[0];
		this.pipCellInput = this.pipCell.children[1];
		this.statusCellSpan = this.statusCell.children[0];
		this.statusCellInput = this.statusCell.children[1];
		this.resultAmountCellSpan = this.resultAmountCell.children[0];
		this.resultAmountCellInput = this.resultAmountCell.children[1];
		
		this.instrumentCell.innerText = data.instrument;
		this.tradeActionCell.innerText = strings.forex_actions[data.trade_action];
		this.lotSizeCell.innerText = data.lot_size;
		this.entryPriceCell.innerText = getMoney(data.entry_price, false, 4);
		this.stakeDateCell.innerText = makeDate(data.stake_date);
		
		
		if (!data.hasOwnProperty("exit_price") || (data.status == 0 && readOnly)) {
			hide(this.exitPriceRow);
		} else if (data.status == 0) {
			hide(this.exitPriceCellSpan);
			this.exitPriceCellInput.addEventListener("input", unsetError);
		} else {
			hide(this.exitPriceCellInput);
			this.exitPriceCellSpan.innerText = getMoney(data.exit_price, false, 4);
		}
		
		if (!data.hasOwnProperty("pip") || (data.status == 0 && readOnly)) {
			hide(this.pipRow);
		} else if (data.status == 0) {
			hide(this.pipCellSpan);
			this.pipCellInput.addEventListener("input", unsetError);
		} else {
			hide(this.pipCellInput);
			this.pipCellSpan.innerText = data.pip;
		}
		
		if (!data.hasOwnProperty("status") || (data.status == 0 && readOnly)) {
			this.statusCell.innerText = strings.forex_statuses[0];
		} else if (data.status == 0) {
			hide(this.statusCellSpan);
			this.statusCellInput.addEventListener("change", unsetError);
		} else {
			hide(this.statusCellInput);
			this.statusCellSpan.innerText = strings.forex_statuses[data.status];
		}
		
		if (!data.hasOwnProperty("stake_amount")) {
			hide(this.stakeAmountRow);
		} else {
			this.stakeAmountCell.innerText = getMoney(data.stake_amount);
		}
		
		if (!data.hasOwnProperty("result_amount") || (data.status == 0 && readOnly)) {
			hide(this.resultAmountRow);
		} else if (data.status == 0) {
			hide(this.resultAmountCellSpan);
			this.resultAmountCellInput.addEventListener("input", unsetError);
		} else {
			hide(this.resultAmountCellInput);
			this.resultAmountCellSpan.innerText = getMoney(data.result_amount);
		}
		
		if (!data.hasOwnProperty("status") || data.status != 0 || (data.status == 0 && readOnly)) {
			hide(this.closeRow);
		} else {
			this.closeButton.addEventListener("click", this.confirmClose);
		}
		
		
	}
	
	
	confirmClose () {
		
		var errors =false;
		
		if (strings.forex_statuses.indexOf(this.statusCellInput.value) < 1) {
			addInputError(strings.trade_status_wrong_error, this.statusCellInput);
			errors = true;
		}
		
		if (this.resultAmountCellInput.value == "" || parseFloat(this.resultAmountCellInput.value) < 0) {
			addInputError(strings.result_amount_empty_error, this.resultAmountCellInput);
			errors = true;
		}
		
		if (this.exitPriceCellInput.value == "" || parseFloat(this.exitPriceCellInput.value) < 0) {
			addInputError(strings.trade_exit_price_empty_error, this.exitPriceCellInput);
			errors = true;
		}
		
		if (this.pipCellInput.value == "" || parseInt(this.pipCellInput.value) < 0) {
			addInputError(strings.trade_pip_empty_error, this.pipCellInput);
			errors = true;
		}
		
		if (errors) {
			return;
		}
		
		
		this.dialog = new DialogView();
		this.dialog.setLeftButton(strings.no);
		this.dialog.setRightButton(strings.yes, this.close);
		this.dialog.setBox([this.dialog.getTipBox(strings.confirm_close_forex_prediction)]);
		this.page.addSubPage(this.dialog);
	}
	
	close () {
		
		this.dialog.rightButton=null;
		this.dialog.leftButton=null;
		this.dialog.setBox([getLoader()]);
		this.dialog.setStatic(true);
		
		var form = JSON.stringify({
			id : this.ID, 
			exit_price : parseFloat(this.exitPriceCellInput.value), 
			pip : parseInt(this.pipCellInput.value), 
			status : strings.forex_statuses.indexOf(this.statusCellInput.value), 
			result_amount : parseFloat(this.resultAmountCell.children[1].value)
		});
		
		var ajax = new Ajax();
		ajax.sendPost(
			_API+"endforexprediction.php", 
			form, 
			this.onCloseResponse,
			token
		);
	}
	
	onCloseResponse (e) {
		
		alert(e.target.responseText+" - "+e.target.status);
		
		this.dialog.setStatic(false);
		
		if (e.target.status == 0 || e.target.status == 500) {
			this.dialog.setCentreButton(strings.cancel);
			this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
		}
		
		if (e.target.status == 401) {
			goToSignIn();
		}
		
		if (e.target.status == 200) {
			
			var r = JSON.parse(e.target.responseText);
			
			if (r.hasOwnProperty("prediction_ended")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.prediction_already_closed_error)]);
			}
			
			if (r.hasOwnProperty("input_errors")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.prediction_close_input_errors)]);
			}
			
			if (r.hasOwnProperty("error")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
			}
			
			if (r.hasOwnProperty("success")) {
				this.dialog.setCentreButton(strings.ok);
				this.dialog.setBox([this.dialog.getTipBox(strings.close_forex_prediction_success)]);
				
				hide(this.resultAmountCellInput);
				show(this.resultAmountCellSpan);
				this.resultAmountCellSpan.innerText = getMoney(this.resultAmountCellInput.value);
				
				hide(this.statusCellInput);
				show(this.statusCellSpan);
				this.statusCellSpan.innerText = this.statusCellInput.value;
				
				hide(this.pipCellInput);
				show(this.pipCellSpan);
				this.pipCellSpan.innerText = this.pipCellInput.value;
				
				hide(this.exitPriceCellInput);
				show(this.exitPriceCellSpan);
				this.exitPriceCellSpan.innerText = getMoney(this.exitPriceCellInput.value, false, 4);
				
				hide(this.closeRow);
			}
		}
	}
	
	
}



class Client {
	
	
	constructor (data) {
		
		var layout = _ce("div");
		layout.innerHTML = _id("client-layout").innerHTML;
		this.view = layout.firstElementChild;
		
		this.copyReferralLink = this.copyReferralLink.bind(this);
		
		this.nameDiv = _cl("client-name", 0, this.view);
		this.emailDiv = _cl("client-email", 0, this.view);
		this.balanceDiv = _cl("client-balance", 0, this.view);
		this.verifiedDiv = _cl("client-verified", 0, this.view);
		this.referralDiv = _cl("client-referral", 0, this.view);
		this.referralInput = this.referralDiv.firstElementChild;
		this.referralButton = this.referralDiv.children[1];
		this.verificationDiv = _cl("client-verification", 0, this.view);
		this.bonusDiv = _cl("client-bonus", 0, this.view);
		this.dateDiv = _cl("client-date", 0, this.view);
		
		
		this.nameDiv.innerText = data.first_name+" "+data.last_name;
		
		this.verifiedDiv.innerText = strings.client_verified_texts[data.email_verified];
		
		this.dateDiv.innerText = makeDate(data.add_date);
		
		this.referralInput.value = "www.sporrex.com/?ref="+data.referral_code;
		
		if (!data.hasOwnProperty("email")) {
			this.emailDiv.classList.add(HIDE);
		} else {
			this.emailDiv.innerText = data.email;
		}
		
		if (!data.hasOwnProperty("balance")) {
			this.balanceDiv.classList.add(HIDE);
		} else {
			this.balanceDiv.innerText = getMoney(data.balance);
		}
		
		if (!data.hasOwnProperty("email_verification_code")) {
			this.verificationDiv.classList.add(HIDE);
		} else {
			this.verificationDiv.innerText = data.email_verification_code;
		}
		
		if (!data.hasOwnProperty("has_subscribed")) {
			this.bonusDiv.classList.add(HIDE);
		} else {
			this.bonusDiv.innerText = data.has_subscribed ? strings.bonus_given : strings.bonus_not_given;
		}
		
		
		this.referralButton.addEventListener("click", this.copyReferralLink);
	}
	
	copyReferralLink () {
		this.referralInput.focus();
		this.referralInput.select();
		this.referralInput.setSelectionRange(0, 99);
		document.execCommand("copy");
		this.referralInput.blur();
	}
	
}



class Transaction {
	
	constructor (data, user, page) {
		
		this.ID = data.id;
		
		this.page = page;
		
		this.dialog = null;
		
		this.confirmCancelWithdrawal = this.confirmCancelWithdrawal.bind(this);
		this.cancelWithdrawal = this.cancelWithdrawal.bind(this);
		this.onCancelWithdrawalResponse = this.onCancelWithdrawalResponse.bind(this);
		
		this.confirmProcessWithdrawal = this.confirmProcessWithdrawal.bind(this);
		this.processWithdrawal = this.processWithdrawal.bind(this);
		this.onProcessWithdrawalResponse = this.onProcessWithdrawalResponse.bind(this);
		
		this.confirmApproveWithdrawal = this.confirmApproveWithdrawal.bind(this);
		this.approveWithdrawal = this.approveWithdrawal.bind(this);
		this.onApproveWithdrawalResponse = this.onApproveWithdrawalResponse.bind(this);
		
		this.confirmFailWithdrawal = this.confirmFailWithdrawal.bind(this);
		this.failWithdrawal = this.failWithdrawal.bind(this);
		this.onFailWithdrawalResponse = this.onFailWithdrawalResponse.bind(this);
		
		
		var layout = _ce("div");
		layout.innerHTML = _id("transaction-layout").innerHTML;
		this.view = layout.firstElementChild;
		
		this.amountCell = _cl("amount-cell", 0, this.view);
		this.typeCell = _cl("type-cell", 0, this.view);
		this.statusCell = _cl("status-cell", 0, this.view);
		this.dateCell = _cl("date-cell", 0, this.view);
		
		this.bankNameCell = _cl("bank-name-cell", 0, this.view);
		this.bankAccountNameCell = _cl("bank-account-name-cell", 0, this.view);
		this.bankAccountNumberCell = _cl("bank-account-number-cell", 0, this.view);
		this.bankAccountTypeCell = _cl("bank-account-type-cell", 0, this.view);
		this.bankNameRow = _cl("bank-name-row", 0, this.view);
		this.bankAccountNameRow = _cl("bank-account-name-row", 0, this.view);
		this.bankAccountNumberRow = _cl("bank-account-number-row", 0, this.view);
		this.bankAccountTypeRow = _cl("bank-account-type-row", 0, this.view);
		
		this.buttonsRow = _cl("buttons-row", 0, this.view);
		this.approveButton = _cl("approve-button", 0, this.view);
		this.cancelButton = _cl("cancel-button", 0, this.view);
		this.processButton = _cl("process-button", 0, this.view);
		this.failButton = _cl("fail-button", 0, this.view);
		
		this.amountCell.innerText = getMoney(data.amount);
		this.typeCell.innerText = strings.transaction_types[data.type];
		this.statusCell.innerText = strings.transaction_statuses[data.status];
		this.dateCell.innerText = makeDate(data.add_date);
		
		if (data.type != 1) {
			this.bankNameRow.classList.add(HIDE);
			this.bankAccountNameRow.classList.add(HIDE);
			this.bankAccountNumberRow.classList.add(HIDE);
			this.bankAccountTypeRow.classList.add(HIDE);
			this.buttonsRow.classList.add(HIDE);
		} else {
			this.bankNameCell.innerText = data.bank_name;
			this.bankAccountNameCell.innerText = data.bank_account_name;
			this.bankAccountNumberCell.innerText = data.bank_account_number;
			this.bankAccountTypeCell.innerText = data.bank_account_type;
			
			if (user == 1 || data.status != 4) {
				this.approveButton.classList.add(HIDE);
			} else {
				this.approveButton.addEventListener("click", this.confirmApproveWithdrawal);
			}
			
			if (user == 1 || data.status != 1) {
				this.processButton.classList.add(HIDE);
			} else {
				this.processButton.addEventListener("click", this.confirmProcessWithdrawal);
			}
			
			if (user == 1 || (data.status != 1 && data.status != 4)) {
				this.failButton.classList.add(HIDE);
			} else {
				this.failButton.addEventListener("click", this.confirmFailWithdrawal);
			}
			
			if (user == 0 || data.status != 1) {
				this.cancelButton.classList.add(HIDE);
			} else {
				this.cancelButton.addEventListener("click", this.confirmCancelWithdrawal);
			}
			
			if (data.status != 1 && data.status != 4) {
				this.buttonsRow.classList.add(HIDE);
			}
			
		}
		
		
	}
	
	removeView () {
		this.page.view.removeChild(this.view.parentElement);
		for (var i=0;i<database.transactions.data.length;i++) {
			if (database.transactions.data[i].id == this.ID) {
				database.transactions.data.splice(i, 1);
				break;
			}
		}
		if (!hasVerticalScroll()) {
			this.page.getTransactions();
		}
	}
	
	
	confirmCancelWithdrawal () {
		this.dialog = new DialogView();
		this.dialog.setLeftButton(strings.no);
		this.dialog.setRightButton(strings.yes, this.cancelWithdrawal);
		this.dialog.setBox([this.dialog.getTipBox(strings.confirm_cancel_withdrawal)]);
		this.page.addSubPage(this.dialog);
	}
	
	cancelWithdrawal () {
		
		this.dialog.rightButton=null;
		this.dialog.leftButton=null;
		this.dialog.setBox([getLoader()]);
		this.dialog.setStatic(true);
		
		var form = JSON.stringify({
			id : this.ID
		});
		
		var ajax = new Ajax();
		ajax.sendPost(
			API+"client/cancelwithdrawal.php", 
			form, 
			this.onCancelWithdrawalResponse,
			token
		);
	}
	
	onCancelWithdrawalResponse (e) {
		
		//alert(e.target.responseText+" - "+e.target.status);
		
		this.dialog.setStatic(false);
		
		if (e.target.status == 0 || e.target.status == 500) {
			this.dialog.setCentreButton(strings.cancel);
			this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
		}
		
		if (e.target.status == 401) {
			goToSignIn();
		}
		
		if (e.target.status == 200) {
			
			var r = JSON.parse(e.target.responseText);
			
			if (r.hasOwnProperty("error")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
			}
			
			if (r.hasOwnProperty("success")) {
				this.dialog.setCentreButton(strings.ok);
				this.dialog.setBox([this.dialog.getTipBox(strings.cancel_withdrawal_success)]);
				
				if ([-1,1].indexOf(database.transactions.filter) < 0) {
					this.removeView();
				} else {
					hide(this.buttonsRow);
					this.statusCell.innerText = strings.transaction_statuses[3];
					this.cancelButton.removeEventListener("click", this.cancelWithdrawal);
				}
				
				if (database.client.balance != undefined) {
					database.client.balance += parseFloat(this.amountCell.innerText.split(" ")[1]);
				}
			}
		}
	}
	
	
	confirmProcessWithdrawal () {
		this.dialog = new DialogView();
		this.dialog.setLeftButton(strings.no);
		this.dialog.setRightButton(strings.yes, this.processWithdrawal);
		this.dialog.setBox([this.dialog.getTipBox(strings.confirm_process_withdrawal)]);
		this.page.addSubPage(this.dialog);
	}
	
	processWithdrawal () {
		this.dialog.rightButton=null;
		this.dialog.leftButton=null;
		this.dialog.setBox([getLoader()]);
		this.dialog.setStatic(true);
		
		var form = JSON.stringify({
			id : this.ID
		});
		
		var http = new Ajax();
		http.sendPost(
			_API+"processwithdrawal.php", 
			form, 
			this.onProcessWithdrawalResponse, 
			token
		);
	}
	
	onProcessWithdrawalResponse (e) {
		
		//alert(e.target.responseText+" - "+e.target.status);
		
		this.dialog.setStatic(false);
		
		if (e.target.status == 0 || e.target.status == 500) {
			this.dialog.setCentreButton(strings.cancel);
			this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
		}
		
		if (e.target.status == 401) {
			goToSignIn();
		}
		
		if (e.target.status == 200) {
			
			var r = JSON.parse(e.target.responseText);
			
			if (r.hasOwnProperty("error")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
			}
			
			if (r.hasOwnProperty("success")) {
				this.dialog.setCentreButton(strings.ok);
				this.dialog.setBox([this.dialog.getTipBox(strings.process_withdrawal_success)]);
				
				if (database.transactions.filter_type == 2 && database.transactions.filter == 1) {
					this.removeView();
				} else {
					this.statusCell.innerText = strings.transaction_statuses[4];
					this.processButton.removeEventListener("click", this.confirmProcessWithdrawal);
					this.approveButton.addEventListener("click", this.confirmApproveWithdrawal);
					show(this.approveButton);
					hide(this.processButton);
				}
			}
		}
		
	}
	
	confirmApproveWithdrawal () {
		this.dialog = new DialogView();
		this.dialog.setLeftButton(strings.no);
		this.dialog.setRightButton(strings.yes, this.approveWithdrawal);
		this.dialog.setBox([this.dialog.getTipBox(strings.confirm_approve_withdrawal)]);
		this.page.addSubPage(this.dialog);
	}
	
	approveWithdrawal () {
		
		this.dialog.rightButton=null;
		this.dialog.leftButton=null;
		this.dialog.setBox([getLoader()]);
		this.dialog.setStatic(true);
		
		var form = JSON.stringify({
			id : this.ID
		});
		
		var http = new Ajax();
		http.sendPost(
			_API+"approvewithdrawal.php", 
			form, 
			this.onApproveWithdrawalResponse, 
			token
		);
	}
	
	onApproveWithdrawalResponse (e) {
		
		//alert(e.target.responseText+" - "+e.target.status);
		
		this.dialog.setStatic(false);
		
		if (e.target.status == 0 || e.target.status == 500) {
			this.dialog.setCentreButton(strings.cancel);
			this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
		}
		
		if (e.target.status == 401) {
			goToSignIn();
		}
		
		if (e.target.status == 200) {
			
			var r = JSON.parse(e.target.responseText);
			
			if (r.hasOwnProperty("error")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
			}
			
			if (r.hasOwnProperty("success")) {
				this.dialog.setCentreButton(strings.ok);
				this.dialog.setBox([this.dialog.getTipBox(strings.approve_withdrawal_success)]);
				
				if (database.transactions.filter_type == 2 && database.transactions.filter == 4) {
					this.removeView();
				} else {
					this.statusCell.innerText = strings.transaction_statuses[0];
					hide(this.buttonsRow);
				}
			}
		}
		
	}
	
	
	confirmFailWithdrawal () {
		this.dialog = new DialogView();
		this.dialog.setLeftButton(strings.no);
		this.dialog.setRightButton(strings.yes, this.failWithdrawal);
		this.dialog.setBox([this.dialog.getTipBox(strings.confirm_fail_withdrawal)]);
		this.page.addSubPage(this.dialog);
	}
	
	failWithdrawal () {
		
		this.dialog.rightButton=null;
		this.dialog.leftButton=null;
		this.dialog.setBox([getLoader()]);
		this.dialog.setStatic(true);
		
		var form = JSON.stringify({
			id : this.ID
		});
		
		var http = new Ajax();
		http.sendPost(
			_API+"failwithdrawal.php", 
			form, 
			this.onFailWithdrawalResponse, 
			token
		);
	}
	
	onFailWithdrawalResponse (e) {
		
		//alert(e.target.responseText+" - "+e.target.status);
		
		this.dialog.setStatic(false);
		
		if (e.target.status == 0 || e.target.status == 500) {
			this.dialog.setCentreButton(strings.cancel);
			this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
		}
		
		if (e.target.status == 401) {
			goToSignIn();
		}
		
		if (e.target.status == 200) {
			
			var r = JSON.parse(e.target.responseText);
			
			if (r.hasOwnProperty("error")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
			}
			
			if (r.hasOwnProperty("success")) {
				this.dialog.setCentreButton(strings.ok);
				this.dialog.setBox([this.dialog.getTipBox(strings.fail_withdrawal_success)]);
				
				if (database.transactions.filter_type == 2 && [1,4].indexOf(database.transactions.filter) > -1) {
					this.removeView();
				} else {
					this.statusCell.innerText = strings.transaction_statuses[2];
					hide(this.buttonsRow);
				}
			}
		}
		
	}
	
}



class Subscription {
	
	constructor (data, user, page) {
		
		this.ID = data.id;
		
		this.page = page;
		
		this.dialog = null;
		
		this.confirmCancel = this.confirmCancel.bind(this);
		this.cancel = this.cancel.bind(this);
		this.onCancelResponse = this.onCancelResponse.bind(this);
		
		this.confirmActivate = this.confirmActivate.bind(this);
		this.activate = this.activate.bind(this);
		this.onActivateResponse = this.onActivateResponse.bind(this);
		
		this.confirmEnd = this.confirmEnd.bind(this);
		this.end = this.end.bind(this);
		this.onEndResponse = this.onEndResponse.bind(this);
		
		
		this.showSportsPredictions = this.showSportsPredictions.bind(this);
		this.showForexPredictions = this.showForexPredictions.bind(this);
		
		
		var layout = _ce("div");
		layout.innerHTML = _id("subscription-layout").innerHTML;
		this.view = layout.firstElementChild;
		
		this.sectorCell = _cl("sector-cell", 0, this.view);
		this.amountCell = _cl("amount-cell", 0, this.view);
		this.durationCell = _cl("duration-cell", 0, this.view);
		this.statusCell = _cl("status-cell", 0, this.view);
		this.dateCell = _cl("date-cell", 0, this.view);
		
		this.sectorCell.innerText = strings.sector_names[data.sector_id-1];
		this.amountCell.innerText = getMoney(data.amount);
		this.durationCell.innerText = data.duration+" "+strings.days.toLowerCase();
		this.statusCell.innerText = strings.subscription_statuses[data.status];
		this.dateCell.innerText = makeDate(data.add_date);
		
		this.profitCell = _cl("profit-cell", 0, this.view);
		this.debtPaidCell = _cl("debt-paid-cell", 0, this.view);
		this.activationDateCell = _cl("activation-date-cell", 0, this.view);
		this.cancellationDateCell = _cl("cancellation-date-cell", 0, this.view);
		this.lostDateCell = _cl("lost-date-cell", 0, this.view);
		this.endDateCell = _cl("end-date-cell", 0, this.view);
		this.expiringDateCell = _cl("expiring-date-cell", 0, this.view);
		this.expiringDateCell1 = _cl("expiring-date-cell1", 0, this.view);
		this.debtPaidDateCell = _cl("debt-paid-date-cell", 0, this.view);
		
		this.profitRow = _cl("profit-row", 0, this.view);
		this.debtPaidRow = _cl("debt-paid-row", 0, this.view);
		this.activationDateRow = _cl("activation-date-row", 0, this.view);
		this.cancellationDateRow = _cl("cancellation-date-row", 0, this.view);
		this.lostDateRow = _cl("lost-date-row", 0, this.view);
		this.endDateRow = _cl("end-date-row", 0, this.view);
		this.expiringDateRow = _cl("expiring-date-row", 0, this.view);
		this.debtPaidDateRow = _cl("debt-paid-date-row", 0, this.view);
		
		
		
		if ([0,3].indexOf(data.status) > -1) {
			hide(this.profitRow);
		} else {
			this.profitCell.innerText = getMoney(data.profit);
		}
		
		if (data.status != 4) {
			hide(this.debtPaidRow);
		} else {
			this.debtPaidCell.innerText = data.debt_paid ? strings.yes : strings.no;
		}
		
		if (data.activation_date == null) {
			hide(this.activationDateRow);
		} else {
			this.activationDateCell.innerText = makeDate(data.activation_date);
		}
		
		if (data.cancellation_date == null) {
			hide(this.cancellationDateRow);
		} else {
			this.cancellationDateCell.innerText = makeDate(data.cancellation_date);
		}
		
		if (data.lost_date == null) {
			hide(this.lostDateRow);
		} else {
			this.lostDateCell.innerText = makeDate(data.lost_date);
		}
		
		if (data.end_date == null) {
			hide(this.endDateRow);
		} else {
			this.endDateCell.innerText = makeDate(data.end_date);
		}
		
		if (data.expiring_date == null || data.status == 4) {
			hide(this.expiringDateRow);
		} else {
			var expired = new Date(data.expiring_date).getTime() <= new Date().getTime();
			this.expiringDateCell1.innerText = expired ? strings.expired_on : strings.expiring_on;
			this.expiringDateCell.innerText = makeDate(data.expiring_date);
		}
		
		if (data.debt_paid_date == null) {
			hide(this.debtPaidDateRow);
		} else {
			this.debtPaidDateCell.innerText = makeDate(data.debt_paid_date);
		}
		
		
		this.buttonsRow = _cl("buttons-row", 0, this.view);
		this.activateButton = _cl("activate-button", 0, this.view);
		this.cancelButton = _cl("cancel-button", 0, this.view);
		this.endButton = _cl("end-button", 0, this.view);
		
		this.predictionsButton = _cl("predictions-button", 0, this.view);
		
		if (user == 1) {
			if (data.sector_id == 1) {
				this.predictionsButton.addEventListener("click", this.showSportsPredictions);
			} else {
				this.predictionsButton.addEventListener("click", this.showForexPredictions);
			}
		} else {
			hide(this.predictionsButton);
		}
		
		if (user == 1) {
			hide([this.activateButton, this.cancelButton, this.endButton]);
		} else {
			
			if (data.status != 0) {
				hide([this.activateButton, this.cancelButton]);
			} else {
				this.activateButton.addEventListener("click", this.confirmActivate);
				this.cancelButton.addEventListener("click", this.confirmCancel);
			}
			
			if (data.status != 1 || !expired) {
				hide(this.endButton);
			} else {
				this.endButton.addEventListener("click", this.confirmEnd);
			}
			
			if ((data.status != 1 && data.status != 0) || (data.status == 1 && !expired)) {
				hide(this.buttonsRow);
			}
		}
		
	}
	
	
	removeView () {
		this.page.view.removeChild(this.view.parentElement);
		for (var i=0;i<database.subscriptions.data.length;i++) {
			if (database.subscriptions.data[i].id == this.ID) {
				database.subscriptions.data.splice(i, 1);
				break;
			}
		}
		if (!hasVerticalScroll()) {
			this.page.getSubscriptions();
		}
	}
	
	showSportsPredictions () {
		
		startPage({
			name : "Sports Predictions",
			header : {
				title : "Sports Predictions",
				url : "sports-predictions/"+this.ID,
			},
			body : {
				id : this.ID
			}
		});
	}
	
	showForexPredictions () {
		
		startPage({
			name : "Forex Predictions",
			header : {
				title : "Forex Predictions",
				url : "forex-predictions/"+this.ID,
			},
			body : {
				id : this.ID
			}
		});
	}
	
	
	confirmCancel () {
		this.dialog = new DialogView();
		this.dialog.setLeftButton(strings.no);
		this.dialog.setRightButton(strings.yes, this.cancel);
		this.dialog.setBox([this.dialog.getTipBox(strings.confirm_cancel_subscription)]);
		this.page.addSubPage(this.dialog);
	}
	
	cancel () {
		
		this.dialog.rightButton=null;
		this.dialog.leftButton=null;
		this.dialog.setBox([getLoader()]);
		this.dialog.setStatic(true);
		
		var form = JSON.stringify({
			id : this.ID
		});
		
		var ajax = new Ajax();
		ajax.sendPost(
			_API+"cancelsubscription.php", 
			form, 
			this.onCancelResponse,
			token
		);
	}
	
	onCancelResponse (e) {
		
		//alert(e.target.responseText+" - "+e.target.status);
		
		this.dialog.setStatic(false);
		
		if (e.target.status == 0 || e.target.status == 500) {
			this.dialog.setCentreButton(strings.cancel);
			this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
		}
		
		if (e.target.status == 401) {
			goToSignIn();
		}
		
		if (e.target.status == 200) {
			
			var r = JSON.parse(e.target.responseText);
			
			if (r.hasOwnProperty("error")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
			}
			
			if (r.hasOwnProperty("success")) {
				this.dialog.setCentreButton(strings.ok);
				this.dialog.setBox([this.dialog.getTipBox(strings.cancel_subscription_success)]);
				
				if (database.subscriptions.filter_type == 2 && database.subscriptions.filter == 0) {
					this.removeView();
				} else {
					hide(this.buttonsRow);
					this.statusCell.innerText = strings.subscription_statuses[3];
					show(this.cancellationDateRow);
					this.cancellationDateCell.innerText = makeDate(makeRawDate());
				}
			}
		}
	}
	
	
	confirmActivate () {
		
		this.dialog = new DialogView();
		this.dialog.setLeftButton(strings.no);
		this.dialog.setRightButton(strings.yes, this.activate);
		this.dialog.setBox([this.dialog.getTipBox(strings.confirm_activate_subscription)]);
		this.page.addSubPage(this.dialog);
	}
	
	activate () {
		
		this.dialog.rightButton=null;
		this.dialog.leftButton=null;
		this.dialog.setBox([getLoader()]);
		this.dialog.setStatic(true);
		
		var form = JSON.stringify({
			id : this.ID
		});
		
		var ajax = new Ajax();
		ajax.sendPost(
			_API+"activatesubscription.php", 
			form, 
			this.onActivateResponse,
			token
		);
	}
	
	onActivateResponse (e) {
		
		//alert(e.target.responseText+" - "+e.target.status);
		
		this.dialog.setStatic(false);
		
		if (e.target.status == 0 || e.target.status == 500) {
			this.dialog.setCentreButton(strings.cancel);
			this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
		}
		
		if (e.target.status == 401) {
			goToSignIn();
		}
		
		if (e.target.status == 200) {
			
			var r = JSON.parse(e.target.responseText);
			
			if (r.hasOwnProperty("error")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
			}
			
			if (r.hasOwnProperty("success")) {
				this.dialog.setCentreButton(strings.ok);
				this.dialog.setBox([this.dialog.getTipBox(strings.activate_subscription_success)]);
				
				if (database.subscriptions.filter_type == 2 && database.subscriptions.filter == 0) {
					this.removeView();
				} else {
					hide(this.buttonsRow);
					this.statusCell.innerText = strings.subscription_statuses[1];
					show([this.activationDateRow, this.profitRow, this.expiringDateRow]);
					this.activationDateCell.innerText = makeDate(makeRawDate());
					this.profitCell.innerText = getMoney(0);
					this.expiringDateCell1.innerText = strings.expiring_on;
					this.expiringDateCell.innerText = makeDate(this.formExpiringDate());
				}
			}
		}
	}
	
	
	formExpiringDate () {
		
		var dur = parseInt(this.durationCell.innerText.split(" ")[0]);
		var isForex = this.sectorCell.innerText == strings.sector_names[1];
		
		var day = 86400000;
		var dt = new Date().getTime();
		var sec = new Date(dt).getSeconds();
		if (sec != 0) { dt += 1000*(60-sec); }
		var i = 1;
		while (i<=dur) {
			if (isForex && [0,6].indexOf(new Date(dt).getDay()) > -1) {
				dt += day;
				i--;
			}
			dt += day;
			i++;
		}
		
		return dt;
	}
	
	
	confirmEnd () {
		this.dialog = new DialogView();
		this.dialog.setLeftButton(strings.no);
		this.dialog.setRightButton(strings.yes, this.end);
		this.dialog.setBox([this.dialog.getTipBox(strings.confirm_end_subscription)]);
		this.page.addSubPage(this.dialog);
	}
	
	end () {
		
		this.dialog.rightButton=null;
		this.dialog.leftButton=null;
		this.dialog.setBox([getLoader()]);
		this.dialog.setStatic(true);
		
		var form = JSON.stringify({
			id : this.ID
		});
		
		var ajax = new Ajax();
		ajax.sendPost(
			_API+"endsubscription.php", 
			form, 
			this.onEndResponse,
			token
		);
	}
	
	onEndResponse (e) {
		
		//alert(e.target.responseText+" - "+e.target.status);
		
		this.dialog.setStatic(false);
		
		if (e.target.status == 0 || e.target.status == 500) {
			this.dialog.setCentreButton(strings.cancel);
			this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
		}
		
		if (e.target.status == 401) {
			goToSignIn();
		}
		
		if (e.target.status == 200) {
			
			var r = JSON.parse(e.target.responseText);
			
			if (r.hasOwnProperty("unable_error")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.end_subscription_unable_error)]);
			}
			
			if (r.hasOwnProperty("error")) {
				this.dialog.setCentreButton(strings.cancel);
				this.dialog.setBox([this.dialog.getTipBox(strings.error_msg)]);
			}
			
			if (r.hasOwnProperty("success")) {
				this.dialog.setCentreButton(strings.ok);
				this.dialog.setBox([this.dialog.getTipBox(strings.end_subscription_success)]);
				
				if (database.subscriptions.filter_type == 3 || (database.subscriptions.filter_type == 2 && database.subscriptions.filter == 1)) {
					this.removeView();
				} else {
					hide(this.buttonsRow);
					this.statusCell.innerText = strings.subscription_statuses[2];
					show(this.endDateRow);
					this.endDateCell.innerText = makeDate(makeRawDate());
				}
			}
		}
	}
	
	
}


class SupportMessage {
	
	constructor (data, user) {
		
		this.ID = data.id;
		
		var layout = _ce("div");
		layout.innerHTML = _id("support-message-layout").innerHTML;
		this.view = layout.firstElementChild;
		
		
		this.supportDiv = _cl("support-message-support", 0, this.view);
		this.categoryDiv = _cl("support-message-category", 0, this.view);
		this.messageDiv = _cl("support-message-message", 0, this.view);
		this.dateDiv = _cl("support-message-date", 0, this.view);
		
		this.messageDiv.innerHTML = lineBreakString(data.message);
		this.dateDiv.innerText = makeDate(data.send_date);
		
		if (data.category == 0) {
			hide(this.categoryDiv);
			this.supportDiv.innerText = strings.support_team;
		} else {
			hide(this.supportDiv);
			this.categoryDiv.innerText = strings.support_categories[data.category-1];
		}
		
		if (data.category == 0 && user == 1) {
			this.view.classList.remove("mine");
		}
		
		if (data.category > 0 && user == 0) {
			this.view.classList.remove("mine");
		}
		
	}
	
}









