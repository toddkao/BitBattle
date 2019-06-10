import CardObject from "../../game/interfaces/card";
import Map from '../../game/map';

export default {
  menuDirection: (game: Map, card: CardObject, width: number, height: number): React.CSSProperties => {
    let cssBuilder: React.CSSProperties = {top: '0', left: '100%'};
    if (card) {
      if (game.width - width <= card.x) {
        if (cssBuilder.left) delete cssBuilder.left;
        cssBuilder = {...cssBuilder, right: '100%'};
      }
      if (game.height - height <= card.y) {
        if (cssBuilder.top) delete cssBuilder.top;
        cssBuilder = {...cssBuilder, bottom: '0'}
      }
    }
    return cssBuilder;
  }
}