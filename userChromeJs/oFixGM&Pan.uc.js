// ==UserScript==
// @name            ChangePMforGM&Pan
// @namespace       fixGMPM@zbinlin
// @author          zbinlin oos
// @description     左键单击 GreaseMonkey 图标显示菜单。更换Pan按钮左右菜单逻辑。
// @homepage        http://www.czcp.co.cc
// @version         0.0.1
// ==/UserScript==

//for GreaseMonkey
if (location == "chrome://browser/content/browser.xul") {
	(function (doc) {
		var greasemonkeyTBB = doc.getElementById('greasemonkey-tbb');
		if (!greasemonkeyTBB) return;
		var menupopup = greasemonkeyTBB.firstChild;
		greasemonkeyTBB.addEventListener("click", function (e) {
			if (e.button == 0) {
				e.preventDefault();
				menupopup.openPopup(this, "after_pointer", 0, 0, false, false);
			}
		}, false);
		//menupopup.setAttribute("id", "greasemonkey-menupopup");
		//greasemonkeyTBB.setAttribute("contextmenu", "greasemonkey-menupopup");
	})(document);
}

//for Pan
(function() {
	$("pan-toolbarbutton", {
		onclick: "\
		if (event.button == 0) {document.getElementById('pan-status-popup').openPopup(document.getElementById('pan-toolbarbutton')); event.preventDefault();}\
		else if (event.button == 2) {document.getElementById('pan-toolbarbutton').doCommand(); event.preventDefault();}\
		",
		ondblclick: "if (event.button == 2) {event.preventDefault();}"
	});
	$("pan-status-popup", {position: "after_start"});

	function $(id, attr) {
		var el = document.getElementById(id);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();