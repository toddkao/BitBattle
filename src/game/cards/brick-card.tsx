import TileObject from "../interfaces/tile-object";

export default class BrickCard implements TileObject {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get tileImage(): string {
    return 'http://bbp.style/PUBLIC/BIM-library/jpg/australmasonry/GreyBlock/AM-MasonryBlocks-GreyBlock90x190x390-NAT.jpg';
  }

  get tileColor(): string {
    return 'abc';
  }
}