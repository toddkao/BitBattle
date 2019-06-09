import Point from './interfaces/point';
import TileObject from './interfaces/card';

export default class Tile implements Point {
  x: number;
  y: number;
  objects: TileObject[];

  constructor(x : number, y: number) {
    this.x = x;
    this.y = y;
    this.objects = [];
  }

  top() : TileObject {
    // if (!this.objects) return undefined;
    if (this.objects.length === 0) throw new Error('Tile unexpectedly has no objects');
    return this.objects[this.objects.length - 1];
  }

  topId() : number {
    const t = this.top();
    return t ? t.id : 0;
  }

  removeCard(id: number) {
    const i : number = this.objects.findIndex(o => o.id === id);
    if (i > -1) {
      this.objects.splice(i, 1);
    }
  }

  addCard(o: TileObject) : void {
    if (this.objects.find(obj => obj.id === o.id)) return;

    this.objects.push(o);
  }

  get tileImage() : string {
    const t = this.top();
    return t && t.tileImage ? t.tileImage : '';
  }
}