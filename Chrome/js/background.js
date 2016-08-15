chrome.storage.sync.get({
	redirects: {}
}, ({redirects}) => {
	chrome.webRequest.onBeforeRequest.addListener(({url}) => {
		let redirect = redirects[url];
		if (redirect)
			return {redirectUrl: redirect};

		for (let key of Object.keys(redirects)) {
			if (url.startsWith(key))
				return {redirectUrl: url.replace(key, redirects[key])};
		}
	}, {
		urls: Object.keys(redirects).map(redirect => redirect + (redirect.endsWith("/") ? "*" : ""))
	}, ["blocking"]);
});
