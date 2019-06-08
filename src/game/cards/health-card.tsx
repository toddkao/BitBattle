import TileObject from "../interfaces/tile-object";
import Point from "../interfaces/point";
import Map from "../map";

export default class HealthCard implements TileObject {
  x: number;
  y: number;
  id: number;
  health: number;
  parent: TileObject;

  constructor(x: number, y: number, id: number, parent: TileObject) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.parent = parent;
    this.health = this.parent.maxHealthPerCell;
  }

  get maxCells() { return 0; }
  get maxHealthPerCell() { return 0; }

  get isOverlappable(): boolean { return  true; }
  get isEnemy(): boolean { return this.parent.isEnemy; }

  get tileColor(): string {
    return this.parent.tileColor;
  }

  move(g: Map, p: Point): void {
    this.x = p.x;
    this.y = p.y;
  }
}