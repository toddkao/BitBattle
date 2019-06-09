import CardObject from "../../interfaces/card";
import TerrainObject from "../../objects/terrain-object"

export default class BrickCard extends TerrainObject {
  constructor(x: number, y: number, id: number) {
    super(x, y, id);
    this.tileImage = 'http://bbp.style/PUBLIC/BIM-library/jpg/australmasonry/GreyBlock/AM-MasonryBlocks-GreyBlock90x190x390-NAT.jpg';
  }

  isOverlappable(card: CardObject): boolean { return true; }
}