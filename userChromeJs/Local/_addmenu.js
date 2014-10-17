//添加标签右键菜单项
tab([{
		label:"复制 Favicon 的 URL",
		text:"%FAVICON%",
		image:" "
	},{
		label:"复制 Favicon 的 Base64",
		text:"%FAVICON_BASE64%",
		image:" "
	},{
		label: "关闭所有标签页",
		oncommand: "gBrowser.removeAllTabsBut(gBrowser.addTab('about:newtab'));",
		insertAfter:"context_closeOtherTabs",
	},
]);


//隐藏相同项。必须，不能删除
function syncHidden(event) {
	Array.slice(event.target.children).forEach(function(elem){
		var command = elem.getAttribute('command');
		if (!command) return;
		var original = document.getElementById(command);
		if (!original) {
				elem.hidden = true;
				return;
		};
		elem.hidden = original.hidden;
		elem.collapsed = original.collapsed;
		elem.disabled = original.disabled;
	});
};