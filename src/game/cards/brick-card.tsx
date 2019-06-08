import TileObject from "../interfaces/tile-object";

export default class BrickCard implements TileObject {
  x: number;
  y: number;
  id: number;

  constructor(x: number, y: number, id: number) {
    this.x = x;
    this.y = y;
    this.id = id;
  }

  get maxHealthPerCell(): number { return 0; }
  get maxCells(): number { return 0; }
  get health(): number { return 0; }

  get isOverlappable(): boolean { return true; }
  get isEnemy(): boolean { return false; }

  get tileImage(): string {
    return 'http://bbp.style/PUBLIC/BIM-library/jpg/australmasonry/GreyBlock/AM-MasonryBlocks-GreyBlock90x190x390-NAT.jpg';
  }
  get tileColor(): string {
    return 'rgba(0,0,0,0)';
  }
}