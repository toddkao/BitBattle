import TileObject from "../interfaces/tile-object";
import Point from "../interfaces/point";

export default class PlayerCard implements TileObject {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get tileImage(): string {
    return 'https://cognigen-cellular.com/images/mario-clipart-sprite.png';
  }

  get tileColor(): string {
    return 'abc';
  }

  getMovable(): Point[] {
    return [
      {x: 0, y: 1},
      {x: 0, y: -1}
    ];
  }

  move(p: Point): void {
    this.x = p.x;
    this.y = p.y;
  }
}