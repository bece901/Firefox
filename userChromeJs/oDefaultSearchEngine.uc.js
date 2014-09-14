// ==UserScript==
// @name         DefaultSearchEngine.uc.js
// @description  搜索完成后自动清空搜索栏并切回默认搜索引擎。
// ==/UserScript==
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