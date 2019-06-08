import TileObject from "../interfaces/tile-object";

export default class GrassCard implements TileObject {
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

  get isOverlappable(): boolean { return false; }
  get isEnemy(): boolean { return false; }

  get tileImage(): string {
    return 'http://4.bp.blogspot.com/-a135QAgRRqc/ToXUbysPglI/AAAAAAAAAE4/ejvSKIXXtbc/s1600/Grass_8bit_32px.jpg';
  }
  get tileColor(): string {
    return 'rgba(0,0,0,0)';
  }
}