



function Validator (form, errorPattern) {

	this.form = typeof form === "string" ? DOM.byId(form) : form;

	this.errorType = 0;

	this.errorMessage = null;

	this.errorPosition = 0;

	this.errorLayout = this.defaultErrorLayout();

	this.setErrorPattern(errorPattern);

	for (var i = 0; i < this.form.length; i++) {
		var ear = this.form.elements[i].getAttribute("jpex-invalid-ear");
		if (ear == null || ear == "") {
			this.form.elements[i].setAttribute("jpex-invalid-ear", 1);
			this.form.elements[i].addEventListener("invalid", this.onInvalid.bind(this));
		}
	}

}


Validator.prototype.setErrorPattern = function (errorPattern) {
	
	if (typeof errorPattern !== "object") {
		return this;
	}

	if (errorPattern.hasOwnProperty("input")) {
		this.errorType = 0;
		errorPattern = errorPattern.input;
	} else if (errorPattern.hasOwnProperty("form")) {
		this.errorType = 1;
		errorPattern = errorPattern.form;
		this.errorLayout = this.defaultFormErrorLayout();
	}

	if (errorPattern.hasOwnProperty("layout")) {
		this.errorLayout = DOM.cloneFirst(errorPattern.layout);
	}

	if (errorPattern.hasOwnProperty("message")) {
		this.errorMessage = errorPattern.message;
	}

	if (errorPattern.hasOwnProperty("position")) {
		this.errorPosition = errorPattern.position;
	}

	return this;
}

Validator.prototype.getEvent = function (input) {
	if (input.tagName == "SELECT" || (input.tagName == "INPUT" && ["checkbox", "radio", "file", "date"].indexOf(input.type) >= 0)) {
		return "change";
	}

	return "input";
}

Validator.prototype.validate = function () {

	this.removeErrors();

	for (var i = 0; i < this.form.length; i++) {
		if (this.form.elements[i].type == "file") {
			this.form.elements[i].setCustomValidity(this.validateFile(this.form.elements[i]));
		}
	}

	return this.form.checkValidity();
}

Validator.prototype.validateOnInput = function () {
	
	for (var i = 0; i < this.form.length; i++) {
		this.form.elements[i].addEventListener(this.getEvent(this.form.elements[i]), this.onInput.bind(this));
	}

	return this;
}

Validator.prototype.validateFile = function (fileInput) {
	
	var inputMime = fileInput.accept.split(",");

	for (var i = 0; i < fileInput.files.length; i++) {
		var file = fileInput.files[i];
		var mime = file.type.split("/");
		
		var typeFound = inputMime == ""?true:false;

		for (var i = 0; i < inputMime.length; i++) {
			var inputType = inputMime[i].split("/");

			if ((mime[1] == inputType[1] || inputType[1] == "*") && (mime[0] == inputType[0] || inputType[0] == "*")) {
				typeFound = true;
				break;
			}
		}

		if (!typeFound) {
			return "typeMismatch";
		}
		

		if (fileInput.minLength > -1 && file.size < fileInput.minLength) {
			return "tooShort";
		}

		if (fileInput.maxLength > -1 && file.size > fileInput.maxLength) {
			return "tooLong";
		}
	}
	
	return "";
}


Validator.prototype.onInput = function (e) {
	
	this.removeError(e.target);

	if (e.target.type == "file") {
		e.target.setCustomValidity(this.validateFile(e.target));
	}

	e.target.checkValidity();
}

Validator.prototype.onInvalid = function (e) {
	
	if (this.errorMessage == null) {
		var inputMessages = e.target.getAttribute("jpex-error-messages");
		inputMessages = inputMessages == null || inputMessages == "" ? {} : JSON.parse(inputMessages);
		var vMessages = Validator.MESSAGES.hasOwnProperty(e.target.type)?Validator.MESSAGES[e.target.type]:Validator.MESSAGES.text;
	}

	if (this.errorType == 1) {
		this.addFormError(this.errorMessage==null?Validator.MESSAGES.form:this.errorMessage);
	} else {

		for (var x in e.target.validity) {
			if (x != "valid" && e.target.validity[x] === true) {

				if (e.target.type == "file" && x != "valueMissing") {
					x = e.target.validationMessage;
				}

				var msg = this.errorMessage==null?
							this.replaceErrorMessagePlaceholders(!inputMessages.hasOwnProperty(x)?vMessages[x]:inputMessages[x], x, e.target)
						:this.errorMessage;

				

				this.addError(e.target, msg);
				break;
			}
		}

	}

}

Validator.prototype.replaceErrorMessagePlaceholders = function (msg, error, input) {

	switch (error) {
		case "tooLong" :
			var replacement = input.maxLength;
			break;
		case "tooShort" :
			var replacement = input.minLength;
			break;
		case "rangeOverflow" :
			var replacement = input.max;
			break;
		case "rangeUnderflow" :
			var replacement = input.min;
			break;
		case "stepMismatch" :
			var replacement = input.step;
			break;
		case "typeMismatch" :
			var replacement = input.type;
			break;
	}

	return msg.replace("(???)", replacement);
	
}

Validator.prototype.putErrorMessageInLayout = function (message) {

	if (this.errorLayout.children.length > 0) {
		var spans = this.errorLayout.byTagName("span");
		if (spans.length > 0) {
			spans[spans.length-1].innerHTML = message;
		}
	} else {
		this.errorLayout.innerHTML = message;
	}
}

Validator.prototype.addError = function (field, message) {
	
	this.removeError(field);

	this.putErrorMessageInLayout(message);

	if (!this.errorPosition) {
		var next = field.nextElementSibling;
		if (next != null) {
			field.parentElement.insertBefore(this.errorLayout.cloneNode(true), next);
		} else {
			field.parentElement.appendChild(this.errorLayout.cloneNode(true));
		}

		field.setAttribute("jpex-invalid-error", 0);

	} else {
		field.parentElement.insertBefore(this.errorLayout.cloneNode(true), field);
		field.setAttribute("jpex-invalid-error", 1);
	}

}

Validator.prototype.removeError = function (field) {
	
	var error = field.getAttribute("jpex-invalid-error");

	if (error === "0") {
		field.parentElement.removeChild(field.nextElementSibling);
	} else if (error === "1") {
		field.parentElement.removeChild(field.previousElementSibling);
	}

	field.removeAttribute("jpex-invalid-error");
}

Validator.prototype.addFormError = function (message) {
	
	this.removeFormError();

	this.putErrorMessageInLayout(message);

	if (!this.errorPosition) {
		this.form.appendChild(this.errorLayout);
		this.form.setAttribute("jpex-invalid-error", 0);
	} else {
		this.form.insertBefore(this.errorLayout, this.form.firstElementChild);
		this.form.setAttribute("jpex-invalid-error", 1);
	}
}

Validator.prototype.removeFormError = function () {
	
	var error = this.form.getAttribute("jpex-invalid-error");

	if (error === "0") {
		this.form.removeChild(this.form.lastElementChild);
	} else if (error === "1") {
		this.form.removeChild(this.form.firstElementChild);
	}

	this.form.removeAttribute("jpex-invalid-error");
	
}

Validator.prototype.removeErrors = function () {
	for (var i = 0; i < this.form.length; i++) {
		this.removeError(this.form.elements[i]);
	}
}

Validator.prototype.defaultErrorLayout = function () {
	var span = DOM.createElement("span");
	span.style.color = "#FF0000";
	return span;
}

Validator.prototype.defaultFormErrorLayout = function () {
	var div = DOM.createElement("div");
	div.style.color = "#FF0000";
	div.style.textAlign = "center";
	return div;
}


Validator.MESSAGES = {

	form : "Fill this form properly before submitting",

	text : {

		badInput: "Fill this field properly",

		customError: "Fill this field properly",
		
		patternMismatch: "This input field is invalid",
		
		rangeOverflow: "Fill this field properly",
		
		rangeUnderflow: "Fill this field properly",
		
		stepMismatch: "Fill this field properly",

		tooLong: "Field should not have more than (???) characters",
		
		tooShort: "Field should not have less than (???) characters",
		
		typeMismatch: "Fill this field properly",

		valueMissing: "This input field is required",
	},

	email : {
		
		customError: "Email address is invalid",

		patternMismatch: "Email address is invalid",
		
		tooLong: "Email address should not be more than (???) characters",
		
		tooShort: "Email address should not be less than (???) characters",
		
		typeMismatch: "Email address is invalid",
		
		valueMissing: "Email address is required",
	},
	

	password : {
		
		customError: "Password is invalid",

		patternMismatch: "Password is invalid",
		
		tooLong: "Password should not be more than (???) characters",
		
		tooShort: "Password should not be less than (???) characters",
		
		valueMissing: "Password is required",
	},

	file : {

		customError: "A file is required",
		
		tooLong: "File size is too large",
		
		tooShort: "File size is too small",
		
		typeMismatch: "File is invalid",
		
		valueMissing: "A file is required",
	},

	/* : {

		badInput: "",

		customError: "",

		patternMismatch: "",
		
		rangeOverflow: "",
		
		rangeUnderflow: "",
		
		stepMismatch: "",
		
		tooLong: "",
		
		tooShort: "",
		
		typeMismatch: "",
		
		valid: "",
		
		valueMissing: "",
	},*/

};














