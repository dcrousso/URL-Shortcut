chrome.storage.sync.get({
	redirects: {}
}, ({redirects}) => {
	chrome.webRequest.onBeforeRequest.addListener(({url}) => {
		let redirect = redirects[url];
		if (redirect)
			return {redirectUrl: redirect};
	}, {
		urls: ["<all_urls>"]
	}, ["blocking"]);
});
