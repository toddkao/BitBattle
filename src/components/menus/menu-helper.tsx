import CardObject from "../../game/interfaces/card";
import Map from '../../game/map';

export default {
  menuDirection: (game: Map, card: CardObject): React.CSSProperties => {
    let cssBuilder: React.CSSProperties = {top: '0', left: '100%'};
    if (card) {
      if (game.width - 2 <= card.x) {
        if (cssBuilder.left) delete cssBuilder.left;
        cssBuilder = {...cssBuilder, right: '100%'};
      }
      if (game.height - 4 <= card.y) {
        if (cssBuilder.top) delete cssBuilder.top;
        cssBuilder = {...cssBuilder, bottom: '0'}
      }
    }
    return cssBuilder;
  }
}