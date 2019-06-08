import TileObject from "../interfaces/tile-object";
import Point from "../interfaces/point";
import HealthCard from "./health-card";
import Map from "../map";

export default class PlayerCard implements TileObject {
  x: number;
  y: number;
  id: number;
  health: number;
  children: TileObject[];

  constructor(x: number, y: number, id: number) {
    this.health = this.maxHealthPerCell;
    this.children = [];
    this.x = x;
    this.y = y;
    this.id = id
  }

  get isOverlappable(): boolean { return true; }
  get isEnemy(): boolean { return false; }

  get maxHealthPerCell(): number { return 3; }
  get maxCells(): number { return 3; }

  get tileImage(): string {
    return 'assets/img/Spybotics_Guard_Pup.webp';
  }

  get tileColor(): string {
    return 'rgba(0,0,125, 0.5)';
  }

  getHealthCard(): TileObject {
    if (this.children.length == 0) return this;
    else return this.children[0];
  }

  getMovable(): Point[] {
    return [
      { x: this.x + 0, y: this.y + 1 },
      { x: this.x + 0, y: this.y + -1 },
      { x: this.x + 1, y: this.y },
      { x: this.x + -1, y: this.y }
    ];
  }

  move(g: Map, p: Point): void {
    console.log(`p(${p.x}, ${p.y}`);
    let dx = p.x - this.x;
    let dy = p.y - this.y;

    if ((this.children.length + 1) < this.maxCells) {
      const child = new HealthCard(this.x, this.y, g.nextId++, this);
      this.children.push(child);
      g.move(child, this.getHealthCard());
    }

    for (let i = this.children.length - 1; i >= 0; i--) {
      const child = this.children[i];
      if (child.move) g.move(child, (i > 0) ? this.children[i-1] : this);
    }

    this.x = p.x;
    this.y = p.y;
    console.log(`p(${p.x}, ${p.y}`);
  }
}