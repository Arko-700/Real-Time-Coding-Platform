import{AceRadarViewIndicator}from"./AceRadarViewIndicator";export class AceRadarView{constructor(e,i){this._container=null,this._container="string"==typeof e?document.getElementById(e):e,this._container.style.position="relative",this._views={},this._editor=i}addView(e,i,t,s,o){const r=new AceRadarViewIndicator(i,t,s,o,this._editor);this._container.appendChild(r.element()),r.update(),this._views[e]=r}hasView(e){return void 0!==this._views[e]}setViewRows(e,i){this._views[e].setViewRows(i)}setCursorRow(e,i){this._views[e].setCursorRow(i)}clearView(e){const i=this._views[e];i.setCursorRow(null),i.setViewRows(null)}removeView(e){this._views[e].dispose(),delete this._views[e]}}