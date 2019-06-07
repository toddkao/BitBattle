import Point from './interfaces/point';
import { ValidCard } from './types/valid-card';
import { MovableCard } from './types/movable-card';

export default class Tile implements Point {
  x: number;
  y: number;
  objects: ValidCard[];

  constructor(x : number, y: number) {
    this.x = x;
    this.y = y;
    this.objects = [];
  }

  moveTo(o: MovableCard) : void {
    this.objects.push(o);
    o.move(this);
  }

  get tileImage() {
    if (this.objects.length > 0) {
      return this.objects[0].tileImage;
    }
     // default image
    return undefined;
  }
}