import Point from './point';
import Map from "../map";

export default interface TileObject extends Point {
  readonly id: number;
  readonly tileImage?: string;
  readonly tileColor: string;
  readonly isOverlappable: boolean;
  readonly isEnemy: boolean;

  readonly maxHealthPerCell: number;
  readonly maxCells: number;
  readonly health: number;
  readonly children?: TileObject[];

  getMovable?(): Point[];
  move?(g: Map, p: Point): void;

  getInteractable?(): Point[];

  getHealthCard?(): TileObject;
}