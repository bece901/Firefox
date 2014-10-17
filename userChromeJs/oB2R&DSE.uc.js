// ==UserScript==
// @name        B2R&DSE.uc.js 
// @namespace   blur2revert@zbinlin.gmail.com
// @filename    blur2revert.uc.js & DefaultSearchEngine.uc.js
// @description 地址栏失去焦点后恢复地址，搜索完成后自动清空搜索栏并切回默认搜索引擎。
// @author      zbinlin
// @version     0.1.1Mod
// @updateURL     https://j.mozest.com/ucscript/script/39.meta.js
// ==/UserScript==

//blur2revert.uc.js
if (location == "chrome://browser/content/browser.xul") {

    var ub = document.getElementById("urlbar");
    ub.addEventListener("blur", function () {
        this.handleRevert();
    }, false);

}

//DefaultSearchEngine.uc.js
(function() {
	var searchbar = document.getElementById("searchbar");
	searchbar._doSearchInternal = searchbar.doSearch;
	searchbar.doSearch = function(aData, aInNewTab) {
		this._doSearchInternal(aData, aInNewTab);
		// 清空搜索栏
		this.value = "";
		// 切回默认引擎
		this.currentEngine = this.engines ? this.engines[0] : this._engines[1];
	};
}());