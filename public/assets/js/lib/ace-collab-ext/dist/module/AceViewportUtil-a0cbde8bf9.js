export class AceViewportUtil{static getVisibleIndexRange(e){let t=e.getFirstVisibleRow(),o=e.getLastVisibleRow();e.isRowFullyVisible(t)||t++,e.isRowFullyVisible(o)||o--;return{start:e.getSession().getDocument().positionToIndex({row:t,column:0},0),end:e.getSession().getDocument().positionToIndex({row:o,column:0},0)}}static indicesToRows(e,t,o){return{start:e.getSession().getDocument().indexToPosition(t,0).row,end:e.getSession().getDocument().indexToPosition(o,0).row}}}