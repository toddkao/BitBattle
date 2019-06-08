import TileObject from "../interfaces/tile-object";
import Point from "../interfaces/point";

export default class AttackDogCard implements TileObject {
  x: number;
  y: number;
  id: number;

  constructor(x: number, y: number, id: number) {
    this.x = x;
    this.y = y;
    this.id = id;
  }

  get isOverlappable(): boolean { return true; }
  get isEnemy(): boolean { return true; }

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

  move(p: Point): void {
    this.x = p.x;
    this.y = p.y;
  }
}