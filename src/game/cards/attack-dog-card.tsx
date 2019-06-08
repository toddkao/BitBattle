import TileObject from "../interfaces/tile-object";
import Point from "../interfaces/point";
import Map from "../map";

export default class AttackDogCard implements TileObject {
  x: number;
  y: number;
  id: number;
  health: number;

  constructor(x: number, y: number, id: number) {
    this.health = this.maxHealthPerCell;
    this.x = x;
    this.y = y;
    this.id = id;
  }

  get isOverlappable(): boolean { return true; }
  get isEnemy(): boolean { return true; }

  get maxHealthPerCell(): number { return 3; }
  get maxCells(): number { return 1; }

  get tileImage(): string {
    return 'assets/img/Spybotics_Attack_Dog.webp';
  }

  get tileColor(): string {
    return 'abc';
  }

  getMovable(): Point[] {
    return [
      {x: this.x+0, y: this.y+1},
      {x: this.x+0, y: this.y+-1},
      {x: this.x+1, y: this.y },
      {x: this.x+-1, y: this.y }
    ];
  }

  move(g: Map, p: Point): void {
    this.x = p.x;
    this.y = p.y;
  }
}