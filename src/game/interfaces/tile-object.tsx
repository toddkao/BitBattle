import Point from './point';

export default interface TileObject extends Point {
  readonly id: number;
  readonly tileImage: string;
  readonly tileColor: string;
  readonly isOverlappable: boolean;
  readonly isEnemy: boolean;

  getMovable?(): Point[];
  move?(p: Point): void;

  getInteractable?(): Point[];
}