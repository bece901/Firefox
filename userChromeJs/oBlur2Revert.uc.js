// ==UserScript==
// @name        url bar blur to revert
// @namespace   blur2revert@zbinlin.gmail.com
// @filename    blur2revert.uc.js
// @description 地址栏失去焦点后恢复地址。
// @author      zbinlin
// @version     0.1.20110602.1
// @updateURL     https://j.mozest.com/ucscript/script/39.meta.js
// ==/UserScript==

if (location == "chrome://browser/content/browser.xul") {

    var ub = document.getElementById("urlbar");
    ub.addEventListener("blur", function () {
        this.handleRevert();
    }, false);

}