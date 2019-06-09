import Point from './point';
import { CardObjectType } from "../types/card-object-type";

export default interface CardObject extends Point {
  readonly id: number;
  readonly health: number;
  readonly tileImage?: string;
  readonly objectType: CardObjectType;

  isOverlappable(card: CardObject): boolean;

  getMovable?(): Point[];
  getInteractable?(): Point[];
}