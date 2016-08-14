class RedirectController {
	constructor(match, redirect) {
		this._match = match || "";
		this._redirect = redirect || "";

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

const content = document.getElementById("content");
const newButton = document.getElementById("new");
const statusElement = document.getElementById("status");
const saveButton = document.getElementById("save");

chrome.storage.sync.get({
	redirects: {}
}, ({redirects}) => {
	const controllers = Object.keys(redirects).map(key => {
		let controller = new RedirectController(key, redirects[key]);
		content.appendChild(controller.element);
		return controller;
	});

	newButton.addEventListener("click", event => {
		let controller = new RedirectController;
		content.appendChild(controller.element);
		controllers.push(controller);
	});

	saveButton.addEventListener("click", event => {
		chrome.storage.sync.set({
			redirects: controllers.filter(controller => !controller.invalid).reduce((value, controller) => controller.reduce(value), {})
		}, () => {
			statusElement.textContent = "Options saved";
			setTimeout(() => {
				statusElement.textContent = "";
			}, 750);
			chrome.runtime.reload();
		});
	});
});
