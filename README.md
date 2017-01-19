# ![URL Shortcut](https://github.com/dcrousso/URL-Shortcut/raw/master/Icons/icon-small.png) URL Shortcut

Do you get tired of having to type in "youtube.com" when going to watch videos of cats?  Does it happen with other websites too?

If this describes you, simply download this extension and configure it via the "options" link, adding a Regular Expression pattern that, when any requested URL matches it, will redirect the request to the given replacement.

### Releases

Browser | Link | Version | Source Code
------- | ---- | ------- | -----------
Safari| [Extensions Gallery](//safari-extensions.apple.com/details/?id=com.dcrousso.urlshortcut-Q5M4T22BE9) | 1.0.2 | [github folder](//github.com/dcrousso/URL-Shortcut/tree/master/Safari/)
Chrome | [Web Store](//chrome.google.com/webstore/detail/url-shortcut/phaniiibecagmfolpbjafbcckimlgjac) | 1.0.2 | [github folder](//github.com/dcrousso/URL-Shortcut/tree/master/Chrome/)
Opera | [Add-Ons](//addons.opera.com/en/extensions/details/url-shortcut/) | 1.0.2 | [github folder](//github.com/dcrousso/URL-Shortcut/tree/master/Chrome/)

### Changelog

##### Version 1.0:
 - Created base functionality
 - Uses Regular Expressions to match each requested URL
 - Supports using match patterns as prefixes (http://y/watch?v=dQw4w9WgXcQ will redirect to http://youtube.com/watch?v=dQw4w9WgXcQ)
 - Automatically adds an empty field if none exist
