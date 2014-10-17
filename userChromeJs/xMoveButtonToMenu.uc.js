// for Stylish
(function() {
	var StylishMenu = $('menu_ToolsPopup').insertBefore($C("menu", {
		id: "Stylish-AnoMenu",
		class: "menu-iconic",
		label: "Stylish",
		image: "chrome://stylish/skin/32.png",
	}), $("menu_preferences"));

	var StylishMenuPopup = StylishMenu.appendChild($("stylish-popup"));
		StylishMenuPopup.setAttribute("position", "");

	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();