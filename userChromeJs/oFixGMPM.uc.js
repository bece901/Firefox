// ==UserScript==
// @name            fixGMPM
// @namespace       fixGMPM@zbinlin
// @author          zbinlin
// @description     左键单击 GreaseMonkey 图标显示菜单。
// @homepage        http://www.czcp.co.cc
// @version         0.0.1
// ==/UserScript==

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
