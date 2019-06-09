import Point from './point';
import { TileObjectType } from "../types/tile-object-type";

export default interface TileObject extends Point {
  readonly id: number;
  readonly health: number;
  readonly tileImage?: string;
  readonly objectType: TileObjectType;

  isOverlappable(t: TileObject): boolean;

  getMovable?(): Point[];
  getInteractable?(): Point[];
}