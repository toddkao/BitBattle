import Point from '../interfaces/point';
import Map from "../map";
import TileObject from "../interfaces/tile-object";
//import HealthCard from "./health-card";
import { TileObjectType } from '../types/tile-object-type';

export default class EntityObject implements TileObject {
  x: number;
  y: number;
  id: number;
  health: number;
  attackDamage: number;
  children: EntityObject[];

  protected _maxHealthPerCell: number;
  get maxHealthPerCell() { return this._maxHealthPerCell; }

  protected _maxCells: number;
  get maxCells() { return this._maxCells; }

  maxMovePerTurn: number;

  isEnemy: boolean;
  tileImage: string;
  tileColor: string;

  constructor(x: number, y: number, id: number) {
    this._maxHealthPerCell = 1;
    this._maxCells = 1;
    this.maxMovePerTurn = 1;
    this.attackDamage = 1;
    this.health = 0;
    this.children = [];
    this.x = x;
    this.y = y;
    this.id = id;
    this.isEnemy = false;
    this.tileColor = 'rgba(0,0,0,0)';
    this.tileImage = '';
  }

  get objectType() : TileObjectType { return TileObjectType.Entity; }

  isOverlappable(t: TileObject): boolean { return false; }

  removeChild(id: number) {
    this.children = this.children.filter(c => c.id !== id);
  }

  getHealthCard(): EntityObject {
    if (this.children.length === 0) return this;
    else return this.children[this.children.length - 1];
  }

  getMovable(): Point[] { return []; }
  getInteractable(): Point[] { return []; }

  move(g: Map, p: Point): void {
    if ((this.children.length + 1) < this.maxCells) {
      //const child = new HealthCard(this.x, this.y, g.nextId++, this);
      //child.health = this.maxHealthPerCell;
      //child.isEnemy = this.isEnemy;

      //this.children.push(child);
      //g.move(child, this.getHealthCard());
    }

    for (let i = this.children.length - 1; i >= 0; i--) {
      const child = this.children[i];
      g.move(child, (i > 0) ? this.children[i-1] : this);
    }

    this.x = p.x;
    this.y = p.y;
  }
}