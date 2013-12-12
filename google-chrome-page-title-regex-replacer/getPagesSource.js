// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
	var pattern = /(<title>.*)(US[0-9]+)(.*<\/title>)/g;

    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            //html += node.outerHTML;
			val = node.outerHTML
			var matches = pattern.exec(val);
			
			if (matches.length > 3)
			{
				m = matches[1] + "<a heref=\"https://rally1.rallydev.com/slm/rally.sp?#/search?keywords=" + matches[2] + "\">" + matches[2] + "</a>" + matches[3]
				html += m
				//node.outerHTML = "<div>This div replaced a paragraph.</div>";

				//document.body.app
			}
			
			/*for (var i=0;i<matches.length;i++)
			{ 
				html += "i=" + i
				html += matches[i]	
			}*/
			
            break;
        case Node.TEXT_NODE:
            //html += node.nodeValue;
			
					
            break;
        case Node.CDATA_SECTION_NODE:
            //html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            //html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            //html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
	//TODO: Call regular expression match and replace
    return html;
}


chrome.extension.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});