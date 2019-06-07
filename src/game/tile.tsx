import Point from './interfaces/point';
import TileObject from './interfaces/tile-object';

export default class Tile implements Point {
  x: number;
  y: number;
  objects: TileObject[];

  constructor(x : number, y: number) {
    this.x = x;
    this.y = y;
    this.objects = [];
  }

  moveTo(o : TileObject) : void {
    this.objects.push(o);
    o.move(this);
  }

  get tileImage() {
    if (this.objects.length > 0) {
      return this.objects[0].tileImage;
    }
    return '...'; // default of nothing on it
  }
}