export class AceSelectionMarker{constructor(e,t,r,i,n){this._session=e,this._label=r,this._color=i,this._ranges=n||[],this._selectionId=t,this._id=null,this._markerElement=document.createElement("div")}update(e,t,r,i){for(;this._markerElement.hasChildNodes();)this._markerElement.removeChild(this._markerElement.lastChild);this._ranges.forEach((e=>{this._renderRange(t,r,i,e)})),this._markerElement.remove(),t.elt("remote-selection","");(t.element.childNodes[t.i-1]||t.element.lastChild).appendChild(this._markerElement)}setSelection(e){this._ranges=null==e?[]:e instanceof Array?e:[e],this._forceSessionUpdate()}getLabel(){return this._label}selectionId(){return this._selectionId}markerId(){return this._id}_renderLine(e){const t=document.createElement("div");t.className="ace-multi-selection",t.style.backgroundColor=this._color,"number"==typeof e.height&&(t.style.height=`${e.height}px`),"number"==typeof e.width&&(t.style.width=`${e.width}px`),"number"==typeof e.top&&(t.style.top=`${e.top}px`),"number"==typeof e.left&&(t.style.left=`${e.left}px`),"number"==typeof e.bottom&&(t.style.bottom=`${e.bottom}px`),"number"==typeof e.right&&(t.style.right=`${e.right}px`),this._markerElement.append(t)}_renderRange(e,t,r,i){const n=i.toScreenRange(t);let s=r.lineHeight,o=e.$getTop(n.start.row,r),h=0;const l=e.$padding+n.start.column*r.characterWidth;if(n.isMultiLine()){if(this._renderLine({height:s,right:0,top:o,left:l}),o=e.$getTop(n.end.row,r),h=n.end.column*r.characterWidth,this._renderLine({height:s,width:h,top:o,left:e.$padding}),s=(n.end.row-n.start.row-1)*r.lineHeight,s<0)return;o=e.$getTop(n.start.row+1,r),this._renderLine({height:s,right:0,top:o,left:e.$padding})}else h=(i.end.column-i.start.column)*r.characterWidth,this._renderLine({height:s,width:h,top:o,left:l})}_forceSessionUpdate(){this._session._signal("changeBackMarker")}}