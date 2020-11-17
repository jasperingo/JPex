




/*var form = DOM.byTagName("form", 0);
form.addEventListener("submit", onSubmit);

var emailInput = DOM.byId('e');
emailInput.addEventListener("input",  onEmail);

var valid = new Validator(form);
//valid.validateOnInput();



function onEmail (e) {
	
	if (this.validity.valid) {
		console.log(88)
		setTimeout(function () {
			
			emailInput.setCustomValidity(true);
			emailInput.checkValidity();

		}, 1000);
	}
}


function onSubmit (e) {

	e.preventDefault();

	if (!valid.validate()) {
		console.log("form is invalid");
		return;
	}



	console.log("sending to server");
}








		/*function Shape () {
			this.sides = 0;
		}

		Shape.prototype.draw = function () {
			console.log("Drawing shape "+ this.h);
		}

		function Square () {
			Shape.call(this);
			this.h = 10;
			this.w = 10;
		}

		JPex.extend(Square, Shape);

		Square.prototype.draw = function (u) {
			Shape.prototype.draw.call(this);
			console.log("Drawing square "+u);
		}

		var sq = new Square();

		//console.log(sq);

		sq.draw(6);

		var sq1 = new Square();

		//console.log(sq);

		sq1.draw(4);




		/*class Shape {

			constructor () {
				this.s = 2;
			}

			draw () {
				console.log(this.s);
			}
		}

		class Square extends Shape {

			constructor () {
				super();
				this.x = 5;
				this.h = 5;
				this.s = 9;
			}

			draw () {
				super.draw();
			}
		}

		var sq = new Square();

		sq.draw();

		console.log(sq);*/













