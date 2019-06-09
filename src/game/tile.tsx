import Point from './interfaces/point';
import CardObject from './interfaces/card';

export default class Tile implements Point {
  x: number;
  y: number;
  objects: CardObject[];

  constructor(x : number, y: number) {
    this.x = x;
    this.y = y;
    this.objects = [];
  }

  top(): CardObject {
    // if (!this.objects) return undefined;
    if (this.objects.length === 0) throw new Error('Tile unexpectedly has no objects');
    return this.objects[this.objects.length - 1];
  }

  topId(): number {
    const topCard = this.top();
    return topCard ? topCard.id : -1;
  }

  removeCard(id: number) {
    const i : number = this.objects.findIndex(o => o.id === id);
    if (i > -1) {
      this.objects.splice(i, 1);
    }
  }

  addCard(card: CardObject) : void {
    if (this.objects.find(x => x.id === card.id)) return;
    this.objects.push(card);
  }

  get tileImage() : string {
    const topCard = this.top();
    return topCard && topCard.tileImage ? topCard.tileImage : '';
  }
}