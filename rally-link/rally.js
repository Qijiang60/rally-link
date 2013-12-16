var rallyUrl = 'https://rally1.rallydev.com/slm/rally.sp?#/search?keywords=';
var els = document.querySelectorAll('.message, .commit-title');

function stringMethod(els, rallyUrl)
{
	for (var i = 0; i < els.length; i++)
	{
		if (els[i] && els[i].innerHTML && els[i].childNodes.length == 1 && ! els[i].innerHTML.match(/rally-link/g))
		{
			replacement = '<a class="issue-link rally-link" href="' + rallyUrl + '$1">$1</a>';
			
			if (els[i].tagName == 'A')
			{
				var attr = '';
				for (j = 0; j < els[i].attributes.length; j++)
				{
					attr += ' ' + els[i]	.attributes[j].name + '=' + els[i].attributes[j].value;
				}
				
				replacement = '</a>' + replacement + '<a' + attr + '>'
			}
			els[i].parentNode.innerHTML = els[i].outerHTML.replace(/(US\d+|DE\d+|TA\d+)/g, replacement );
		}
	}
}

function domMethod(els, rallyUrl)
{
	for (var i = 0; i < els.length; i++)
	{
		if (els[i] && els[i].innerHTML && els[i].childNodes.length == 1 && ! els[i].innerHTML.match(/rally-link/g))
		{
			var htmlString = els[i].innerHTML;
			
			var match = htmlString.match(/(US\d+|DE\d+|TA\d+)/g);
			
			if (! match) continue;
			
			// var matches = {};
			var segments = [];
			var start = 0;
			for (var j = 0; j < match.length; j++)
			{
				segments.push(htmlString.substring(start, htmlString.indexOf(match[j], start)));
				segments.push(match[j]);
				start = htmlString.indexOf(match[j], start) + match[j].length;
				
			}
			segments.push(htmlString.substring(start, htmlString.length));
			
			for (var j = 0; j < segments.length; j++)
			{
				if (segments[j].match(/^(US\d+|DE\d+|TA\d+)$/g))
				{
					var replacement = document.createElement('a');
					replacement.setAttribute('href', rallyUrl + segments[j]);
					replacement.setAttribute('class', 'issue-link rally-link');
					replacement.innerHTML = segments[j];
					segments[j] = replacement;
				}
				else
				{
					var replacement = document.createElement('a');
					for (k = 0; k < els[i].attributes.length; k++)
					{
						replacement.setAttribute(els[i].attributes[k].name, els[i].attributes[k].value);
					}
					replacement.innerHTML = segments[j];
					segments[j] = replacement;
				}
			}
			
			var parentNode = els[i].tagName == 'A' ? els[i].parentNode : els[i];
			parentNode.innerHTML = '';
			for (var j = 0; j < segments.length; j++)
			{
				parentNode.appendChild(segments[j]);
			}
		}
	}
}

domMethod(els, rallyUrl);