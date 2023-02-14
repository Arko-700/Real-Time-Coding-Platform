/*!
 * © 2016-2021 Convergence Labs, Inc.
 * @version 0.6.0
 * @license MIT
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("ace-builds")):"function"==typeof define&&define.amd?define(["exports","ace-builds"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).AceCollabExt={},t.ace)}(this,(function(t,e){"use strict";var o=function(){function t(t,e,o,i,n){this._session=t,this._label=o,this._color=i,this._ranges=n||[],this._selectionId=e,this._id=null,this._markerElement=document.createElement("div")}return t.prototype.update=function(t,e,o,i){for(var n=this;this._markerElement.hasChildNodes();)this._markerElement.removeChild(this._markerElement.lastChild);this._ranges.forEach((function(t){n._renderRange(e,o,i,t)})),this._markerElement.remove(),e.elt("remote-selection",""),(e.element.childNodes[e.i-1]||e.element.lastChild).appendChild(this._markerElement)},t.prototype.setSelection=function(t){this._ranges=null==t?[]:t instanceof Array?t:[t],this._forceSessionUpdate()},t.prototype.getLabel=function(){return this._label},t.prototype.selectionId=function(){return this._selectionId},t.prototype.markerId=function(){return this._id},t.prototype._renderLine=function(t){var e=document.createElement("div");e.className="ace-multi-selection",e.style.backgroundColor=this._color,"number"==typeof t.height&&(e.style.height=t.height+"px"),"number"==typeof t.width&&(e.style.width=t.width+"px"),"number"==typeof t.top&&(e.style.top=t.top+"px"),"number"==typeof t.left&&(e.style.left=t.left+"px"),"number"==typeof t.bottom&&(e.style.bottom=t.bottom+"px"),"number"==typeof t.right&&(e.style.right=t.right+"px"),this._markerElement.append(e)},t.prototype._renderRange=function(t,e,o,i){var n=i.toScreenRange(e),s=o.lineHeight,r=t.$getTop(n.start.row,o),l=0,c=t.$padding+n.start.column*o.characterWidth;if(n.isMultiLine()){if(this._renderLine({height:s,right:0,top:r,left:c}),r=t.$getTop(n.end.row,o),l=n.end.column*o.characterWidth,this._renderLine({height:s,width:l,top:r,left:t.$padding}),(s=(n.end.row-n.start.row-1)*o.lineHeight)<0)return;r=t.$getTop(n.start.row+1,o),this._renderLine({height:s,right:0,top:r,left:t.$padding})}else l=(i.end.column-i.start.column)*o.characterWidth,this._renderLine({height:s,width:l,top:r,left:c})},t.prototype._forceSessionUpdate=function(){this._session._signal("changeBackMarker")},t}(),i=function(){function t(t){this._selections={},this._session=t}return t.prototype.addSelection=function(t,e,i,n){if(void 0!==this._selections[t])throw new Error("Selection with id already defined: "+t);var s=new o(this._session,t,e,i,n);this._selections[t]=s,this._session.addDynamicMarker(s,!1)},t.prototype.setSelection=function(t,e){this._getSelection(t).setSelection(e)},t.prototype.clearSelection=function(t){this._getSelection(t).setSelection(null)},t.prototype.removeSelection=function(t){var e=this._selections[t];if(void 0===e)throw new Error("Selection not found: "+t);this._session.removeMarker(e.id),delete this._selections[t]},t.prototype.removeAll=function(){var t=this;Object.getOwnPropertyNames(this._selections).forEach((function(e){t.removeSelection(t._selections[e].selectionId())}))},t.prototype._getSelection=function(t){var e=this._selections[t];if(void 0===e)throw new Error("Selection not found: "+t);return e},t}(),n=function(){function t(t,e,o,i,n){this._session=t,this._label=o,this._color=i,this._position=n?this._convertPosition(n):null,this._cursorId=e,this._id=null,this._visible=!1,this._tooltipTimeout=null,this._markerElement=document.createElement("div"),this._cursorElement=document.createElement("div"),this._cursorElement.className="ace-multi-cursor",this._cursorElement.style.background=this._color,this._markerElement.append(this._cursorElement),this._tooltipElement=document.createElement("div"),this._tooltipElement.className="ace-multi-cursor-tooltip",this._tooltipElement.style.background=this._color,this._tooltipElement.style.opacity="0",this._tooltipElement.innerHTML=o,this._markerElement.append(this._tooltipElement)}return t.prototype.update=function(t,e,o,i){if(null!==this._position){var n=this._session.documentToScreenPosition(this._position.row,this._position.column),s=e.$getTop(n.row,i),r=e.$padding+n.column*i.characterWidth,l=i.lineHeight,c=s+2,u=l-3,h=r;this._cursorElement.style.height=u+"px",this._cursorElement.style.width="2px",this._cursorElement.style.top=c+"px",this._cursorElement.style.left=h+"px";var a=c-l;a<5&&(a=c+l-1);var p=h;this._tooltipElement.style.top=a-2+"px",this._tooltipElement.style.left=p-2+"px",this._markerElement.remove(),e.elt("remote-cursor",""),(e.element.childNodes[e.i-1]||e.element.lastChild).appendChild(this._markerElement)}},t.prototype.setPosition=function(t){this._position=this._convertPosition(t),this._forceSessionUpdate(),this._tooltipElement.style.opacity="1",this._scheduleTooltipHide()},t.prototype.setVisible=function(t){var e=this._visible;this._visible=t,e!==this._visible&&(this._markerElement.style.visibility=t?"visible":"hidden",this._forceSessionUpdate())},t.prototype.isVisible=function(){return this._visible},t.prototype.cursorId=function(){return this._cursorId},t.prototype.markerId=function(){return this._id},t.prototype.getLabel=function(){return this._label},t.prototype._forceSessionUpdate=function(){this._session._signal("changeFrontMarker")},t.prototype._convertPosition=function(t){if(null===t)return null;if("number"==typeof t)return this._session.getDocument().indexToPosition(t,0);if("number"==typeof t.row&&"number"==typeof t.column)return t;throw new Error("Invalid position: "+t)},t.prototype._scheduleTooltipHide=function(){var t=this;null!==this._tooltipTimeout&&clearTimeout(this._tooltipTimeout),this._tooltipTimeout=setTimeout((function(){t._tooltipElement.style.opacity="0",t._tooltipTimeout=null}),2e3)},t}(),s=function(){function t(t){this._cursors={},this._session=t}return t.prototype.addCursor=function(t,e,o,i){if(void 0!==this._cursors[t])throw new Error("Cursor with id already defined: "+t);var s=new n(this._session,t,e,o,i);this._cursors[t]=s,this._session.addDynamicMarker(s,!0)},t.prototype.setCursor=function(t,e){this._getCursor(t).setPosition(e)},t.prototype.clearCursor=function(t){this._getCursor(t).setPosition(null)},t.prototype.removeCursor=function(t){var e=this._cursors[t];if(void 0===e)throw new Error("Cursor not found: "+t);this._session.removeMarker(e.id),delete this._cursors[t]},t.prototype.removeAll=function(){var t=this;Object.getOwnPropertyNames(this._cursors).forEach((function(e){t.removeCursor(t._cursors[e].cursorId())}))},t.prototype._getCursor=function(t){var e=this._cursors[t];if(void 0===e)throw new Error("Cursor not found: "+t);return e},t}(),r=function(){function t(){}return t.rangeToJson=function(t){return{start:{row:t.start.row,column:t.start.column},end:{row:t.end.row,column:t.end.column}}},t.jsonToRange=function(t){return new e.Range(t.start.row,t.start.column,t.end.row,t.end.column)},t.rangesToJson=function(e){return e.map((function(e){return t.rangeToJson(e)}))},t.jsonToRanges=function(e){return e.map((function(e){return t.jsonToRange(e)}))},t.toJson=function(e){return Array.isArray(e)?t.rangesToJson(e):t.rangeToJson(e)},t.fromJson=function(e){return Array.isArray(e)?t.jsonToRanges(e):t.jsonToRange(e)},t}(),l=function(){function t(t,e,o,i,n){var s=this;this._label=t,this._color=e,this._viewRows=o,this._cursorRow=i,this._editor=n,this._docLineCount=n.getSession().getLength(),this._editorListener=function(){var t=s._editor.getSession().getLength();t!==s._docLineCount&&(s._docLineCount=t,s.update())},this._editor.on("change",this._editorListener),this._scrollElement=document.createElement("div"),this._scrollElement.className="ace-radar-view-scroll-indicator",this._scrollElement.style.borderColor=this._color,this._scrollElement.style.background=this._color,this._scrollElement.title=this._label,this._scrollElement.addEventListener("click",(function(){var t=(s._viewRows.end-s._viewRows.start)/2+s._viewRows.start;s._editor.scrollToLine(t,!0,!1,(function(){}))}),!1),this._cursorElement=document.createElement("div"),this._cursorElement.className="ace-radar-view-cursor-indicator",this._cursorElement.style.background=this._color,this._cursorElement.title=this._label,this._cursorElement.addEventListener("click",(function(){s._editor.scrollToLine(s._cursorRow,!0,!1,(function(){}))}),!1),this._wrapper=document.createElement("div"),this._wrapper.className="ace-radar-view-wrapper",this._wrapper.style.display="none",this._wrapper.appendChild(this._scrollElement),this._wrapper.appendChild(this._cursorElement)}return t.prototype.element=function(){return this._wrapper},t.prototype.setCursorRow=function(t){this._cursorRow=t,this.update()},t.prototype.setViewRows=function(t){this._viewRows=t,this.update()},t.prototype.update=function(){if(c(this._viewRows)||c(this._cursorRow)){this._wrapper.style.display=null;var t=this._docLineCount-1;if(c(this._viewRows)){var e=Math.min(t,this._viewRows.start)/t*100,o=100-Math.min(t,this._viewRows.end)/t*100;this._scrollElement.style.top=e+"%",this._scrollElement.style.bottom=o+"%",this._scrollElement.style.display=null}else this._scrollElement.style.display="none";if(c(this._cursorRow)){var i=Math.min(this._cursorRow,t)/t*((this._wrapper.offsetHeight-this._cursorElement.offsetHeight)/this._wrapper.offsetHeight)*100;this._cursorElement.style.top=i+"%",this._cursorElement.style.display=null}else this._cursorElement.style.display="none"}else this._wrapper.style.display="none"},t.prototype.dispose=function(){this._wrapper.parentNode.removeChild(this._wrapper),this._editor.off("change",this._editorListener)},t}();function c(t){return null!=t}var u=function(){function t(t,e){this._container=null,this._container="string"==typeof t?document.getElementById(t):t,this._container.style.position="relative",this._views={},this._editor=e}return t.prototype.addView=function(t,e,o,i,n){var s=new l(e,o,i,n,this._editor);this._container.appendChild(s.element()),s.update(),this._views[t]=s},t.prototype.hasView=function(t){return void 0!==this._views[t]},t.prototype.setViewRows=function(t,e){this._views[t].setViewRows(e)},t.prototype.setCursorRow=function(t,e){this._views[t].setCursorRow(e)},t.prototype.clearView=function(t){var e=this._views[t];e.setCursorRow(null),e.setViewRows(null)},t.prototype.removeView=function(t){this._views[t].dispose(),delete this._views[t]},t}(),h=function(){function t(){}return t.getVisibleIndexRange=function(t){var e=t.getFirstVisibleRow(),o=t.getLastVisibleRow();return t.isRowFullyVisible(e)||e++,t.isRowFullyVisible(o)||o--,{start:t.getSession().getDocument().positionToIndex({row:e,column:0},0),end:t.getSession().getDocument().positionToIndex({row:o,column:0},0)}},t.indicesToRows=function(t,e,o){return{start:t.getSession().getDocument().indexToPosition(e,0).row,end:t.getSession().getDocument().indexToPosition(o,0).row}},t}();t.AceMultiCursorManager=s,t.AceMultiSelectionManager=i,t.AceRadarView=u,t.AceRangeUtil=r,t.AceViewportUtil=h,Object.defineProperty(t,"__esModule",{value:!0})}));