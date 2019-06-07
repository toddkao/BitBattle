import TileObject from "../interfaces/tile-object";
import Point from "../interfaces/point";

export default class DeadTile implements TileObject {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get tileImage(): string {
    return 'http://4.bp.blogspot.com/-a135QAgRRqc/ToXUbysPglI/AAAAAAAAAE4/ejvSKIXXtbc/s1600/Grass_8bit_32px.jpg';
  }

  get tileColor(): string {
    return 'abc';
  }

  getMovable(): Point[] {
    return [];
  }

  move(): void {}
}