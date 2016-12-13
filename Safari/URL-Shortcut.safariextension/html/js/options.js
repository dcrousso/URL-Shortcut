"use strict";

class RedirectController {
	constructor(match = "", redirect = "") {
		this._match = match;
		this._redirect = redirect;

		this._element = document.createElement("div");
		this._element.classList.add("row");

		let matchInput = this._element.appendChild(document.createElement("input"));
		matchInput.value = this._match;
		matchInput.addEventListener("input", this._handleMatchInput.bind(this));

		let redirectInput = this._element.appendChild(document.createElement("input"));
		redirectInput.value = this._redirect;
		redirectInput.addEventListener("input", this._handleRedirectInput.bind(this));
	}

	get element() {
		return this._element;
	}

	get invalid() {
		return !this._match.trim().length || !this._redirect.trim().length;
	}

	reduce(value) {
		value[this._match] = this._redirect;
		return value;
	}

	_handleMatchInput(event) {
		this._match = event.target.value;
	}

	_handleRedirectInput(event) {
		this._redirect = event.target.value;
	}
}

const contentElement = document.getElementById("content");
const newButton = document.getElementById("new");
const statusElement = document.getElementById("status");
const saveButton = document.getElementById("save");

safari.self.addEventListener("message", event => {
	if (event.name !== "redirects")
		return;

	let keys = Object.keys(event.message);
	if (!keys.length)
		event.message = {"": ""};

	keys.sort();

	let controllers = keys.map(key => {
		let controller = new RedirectController(key, event.message[key]);
		contentElement.appendChild(controller.element);
		return controller;
	});

	newButton.addEventListener("click", clickEvent => {
		let controller = new RedirectController;
		contentElement.appendChild(controller.element);
		controllers.push(controller);
	});

	saveButton.addEventListener("click", clickEvent => {
		safari.self.tab.dispatchMessage(event.name, controllers.filter(controller => !controller.invalid).reduce((value, controller) => controller.reduce(value), {}));

		statusElement.textContent = "Options saved";
		setTimeout(() => {
			statusElement.textContent = "";
		}, 1500);
	});
});

