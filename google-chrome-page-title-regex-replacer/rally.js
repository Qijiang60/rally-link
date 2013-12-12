var rallyUrl = 'https://rally1.rallydev.com/slm/rally.sp?#/search?keywords=';
var els = document.querySelectorAll('.commit-title, .message');
for (var i in els)
{
	if (els[i] && els[i].innerHTML) 
		els[i].innerHTML = els[i].innerHTML
			.replace(/(US|DE|TA)([0-9]+)/g
				, '<a style="text-decoration:underline; color:purple;" href="' + rallyUrl + '$1$2">$1$2</a>');
}
