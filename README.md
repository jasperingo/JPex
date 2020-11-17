# About JPex

JPex is a client-side javascript library for developing Single Page Web Applications. _Inspired by Android Framework_

## Usage

```javascript
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
```

## Contributing

Thank you for considering contributing. To contribute, you can create a pull request.

## License

JApp.js is licensed under [MIT License](https://opensource.org/license/MIT)








