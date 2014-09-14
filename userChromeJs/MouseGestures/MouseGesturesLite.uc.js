// ==UserScript==
// @name         Mouse Gestures (with Wheel Gesture and Rocker Gesture)
// @namespace    http://www.xuldev.org/
// @description  轻量级鼠标手势执行命令.
// @include      main
// @author       Gomita
// @version      1.0.20080201
// @homepage     http://www.xuldev.org/misc/ucjs.php
// ==/UserScript==

var ucjsMouseGestures = {

	// about:config
	enableWheelGestures: true,	// 滚轮手势 (Scroll wheel with holding right-click)
	enableRockerGestures: true,	// 摇杆手势 (Left-click with holding right-click and vice versa)

	_lastX: 0,
	_lastY: 0,
	_directionChain: "",
	_isMac: false,	// for Mac

	init: function()
	{
		this._isMac = navigator.platform.indexOf("Mac") == 0;
		gBrowser.mPanelContainer.addEventListener("mousedown", this, false);
		gBrowser.mPanelContainer.addEventListener("mousemove", this, false);
		gBrowser.mPanelContainer.addEventListener("mouseup", this, false);
		gBrowser.mPanelContainer.addEventListener("contextmenu", this, true);
		if (this.enableRockerGestures)
			gBrowser.mPanelContainer.addEventListener("draggesture", this, true);
		if (this.enableWheelGestures)
			gBrowser.mPanelContainer.addEventListener("DOMMouseScroll", this, false);
	},

	uninit: function()
	{
		gBrowser.mPanelContainer.removeEventListener("mousedown", this, false);
		gBrowser.mPanelContainer.removeEventListener("mousemove", this, false);
		gBrowser.mPanelContainer.removeEventListener("mouseup", this, false);
		gBrowser.mPanelContainer.removeEventListener("contextmenu", this, true);
		if (this.enableRockerGestures)
			gBrowser.mPanelContainer.removeEventListener("draggesture", this, true);
		if (this.enableWheelGestures)
			gBrowser.mPanelContainer.removeEventListener("DOMMouseScroll", this, false);
	},

	_isMouseDownL: false,
	_isMouseDownR: false,
	_suppressContext: false,
	_shouldFireContext: false,	// for Linux

	handleEvent: function(event)
	{
		switch (event.type) {
			case "mousedown":
				if (event.button == 2) {
					this._isMouseDownR = true;
					this._suppressContext = false;
					this._startGesture(event);
					if (this.enableRockerGestures && this._isMouseDownL) {
						this._isMouseDownR = false;
						this._suppressContext = true;
						this._directionChain = "L>R";
						this._stopGesture(event);
					}
				}
				else if (this.enableRockerGestures && event.button == 0) {
					this._isMouseDownL = true;
					if (this._isMouseDownR) {
						this._isMouseDownL = false;
						this._suppressContext = true;
						this._directionChain = "L<R";
						this._stopGesture(event);
					}
				}
				break;
			case "mousemove":
				if (this._isMouseDownR) {
					this._progressGesture(event);
				}
				break;
			case "mouseup":
				if ((this._isMouseDownR && event.button == 2) ||
				    (this._isMouseDownR && this._isMac && event.button == 0 && event.ctrlKey)) {
					this._isMouseDownR = false;
					if (this._directionChain)
						this._suppressContext = true;
					this._stopGesture(event);
					if (this._shouldFireContext) {
						this._shouldFireContext = false;
						this._displayContextMenu(event);
					}
				}
				else if (this.enableRockerGestures && event.button == 0 && this._isMouseDownL) {
					this._isMouseDownL = false;
				}
				break;
			case "contextmenu":
				if (this._suppressContext || this._isMouseDownR) {
					this._suppressContext = false;
					event.preventDefault();
					event.stopPropagation();
					if (this._isMouseDownR) {
						this._shouldFireContext = true;
					}
				}
				break;
			case "DOMMouseScroll":
				if (this.enableWheelGestures && this._isMouseDownR) {
					event.preventDefault();
					event.stopPropagation();
					this._suppressContext = true;
					this._directionChain = "W" + (event.detail > 0 ? "+" : "-");
					this._stopGesture(event);
				}
				break;
			case "draggesture":
				this._isMouseDownL = false;
				break;
		}
	},

	_displayContextMenu: function(event)
	{
		var evt = event.originalTarget.ownerDocument.createEvent("MouseEvents");
		evt.initMouseEvent(
			"contextmenu", true, true, event.originalTarget.defaultView, 0,
			event.screenX, event.screenY, event.clientX, event.clientY,
			false, false, false, false, 2, null
		);
		event.originalTarget.dispatchEvent(evt);
	},

	_startGesture: function(event)
	{
		this._lastX = event.screenX;
		this._lastY = event.screenY;
		this._directionChain = "";
	},

	_progressGesture: function(event)
	{
		var x = event.screenX;
		var y = event.screenY;
		var distanceX = Math.abs(x - this._lastX);
		var distanceY = Math.abs(y - this._lastY);
		// minimal movement where the gesture is recognized
		const tolerance = 10;
		if (distanceX < tolerance && distanceY < tolerance)
			return;
		// determine current direction
		var direction;
		if (distanceX > distanceY)
			direction = x < this._lastX ? "L" : "R";
		else
			direction = y < this._lastY ? "U" : "D";
		// compare to last direction 开始比较鼠标的方向
		var lastDirection = this._directionChain.charAt(this._directionChain.length - 1);
		if (direction != lastDirection) {
			this._directionChain += direction;
			XULBrowserWindow.statusTextField.label = "\uFEFF\u9F20\u6807\u624B\u52BF:" + this._directionChain;
		}
		// save current position 记录鼠标的坐标
		this._lastX = x;
		this._lastY = y;
	},

	_stopGesture: function(event)
	{
		try {
			if (this._directionChain)
				this._performAction(event);
			XULBrowserWindow.statusTextField.label = "";
		}
		catch(ex) {
			XULBrowserWindow.statusTextField.label = ex;
		}
		this._directionChain = "";
	},

//－－－－－－－－－－－－－自定义函数－－－－－－－－－－－－//
	_performAction: function(event)
	{
		// 映射. 支持自定义
		switch (this._directionChain) {
//MouseGesTures默认鼠标手势
//导航：
			// 刷新（跳过缓存）
			case "LU": document.getElementById("Browser:ReloadSkipCache").doCommand(); break;
			// 标签组
			case "UD": document.getElementById("Browser:ToggleTabView").doCommand(); break;
			// 关闭窗口
			case "RD": document.getElementById("cmd_closeWindow").doCommand(); break;
			// 释放内存
			case "LD": window.minimize();window.setTimeout('window.restore()',600); break;
			// 最大化/恢复窗口大小
			case "LU": window.windowState == 1 ? window.restore() : window.maximize(); break;
			//新建标签页
			case "RU" : document.getElementById("cmd_newNavigatorTab").doCommand(); break;
			//关闭标签页
			case "DR" : gBrowser.removeCurrentTab(); break;
			// 全屏
			case "DU": document.getElementById("View:FullScreen").doCommand(); break;
			// 撤销关闭标签页
			case "DL": document.getElementById("History:UndoCloseTab").doCommand(); break;
			//gBrowser.undoRemoveTab(); break;
			// 上一个标签页
			case "UL": gBrowser.mTabContainer.advanceSelectedTab(-1, true); break;
			// 下一个标签页
			case "UR": gBrowser.mTabContainer.advanceSelectedTab(+1, true); break;
            // 增强型后退,没前进翻到上一页
			case "L": var nav = gBrowser.webNavigation;
if (nav.canGoBack)
  nav.goBack();
else
content.window.wrappedJSObject.superPrefetcher.back(); break;
			// 增强型前进,没前进翻到下一页
			case "R": var nav = gBrowser.webNavigation;
if (nav.canGoForward)
  nav.goForward();
else
content.window.wrappedJSObject.superPrefetcher.go(); break;
			// 附加组件
			case "LR": document.getElementById("Tools:Addons").doCommand(); break;
			 // 下载
			case "RL": document.getElementById("Tools:Downloads").doCommand(); break;
			// 滚动到顶部
			case "U": goDoCommand("cmd_scrollTop"); break;
			// 滚动到底部
			case "D": goDoCommand("cmd_scrollBottom"); break;
                //\

                 //未知的手势
			default: throw "\uFEFF\u672A\u77E5\u7684\u9F20\u6807\u624B\u52BF\uFF1A" + this._directionChain;
		}
	}
};
// エントリポイント
ucjsMouseGestures.init();
window.addEventListener("unload", function(){ ucjsMouseGestures.uninit(); }, false);
