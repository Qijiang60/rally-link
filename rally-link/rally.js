var rallyUrl = 'https://rally1.rallydev.com/slm/rally.sp?#/search?keywords=';
var els = document.querySelectorAll('a.message, .commit-title a, .message, .commit-title');
for (var i in els)
{
	if (els[i] && els[i].innerHTML && ! els[i].innerHTML.match(/rally-link/g))
	{
		replacement = '<a class="issue-link rally-link" href="' + rallyUrl + '$1$2">$1$2</a>';
		els[i].outerHTML = els[i].outerHTML
			.replace(/(US|DE|TA)([0-9]+)/g, replacement);
	}
}
