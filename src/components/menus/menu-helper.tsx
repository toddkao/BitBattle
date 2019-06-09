import TileObject from "../../game/interfaces/card";
import Map from '../../game/map';

export default {
  menuDirection: (g: Map, t: TileObject): React.CSSProperties => {
    let cssBuilder: React.CSSProperties = {top: '0', left: '100%'};
    if (t) {
      if (g.width - 2 <= t.x) {
        if (cssBuilder.left) delete cssBuilder.left;
        cssBuilder = {...cssBuilder, right: '100%'};
      }
      if (g.height - 4 <= t.y) {
        if (cssBuilder.top) delete cssBuilder.top;
        cssBuilder = {...cssBuilder, bottom: '0'}
      }
    }
    return cssBuilder;
  }
}