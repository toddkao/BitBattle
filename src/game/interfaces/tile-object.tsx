import Point from './point';

export default interface TileObject extends Point {
  readonly tileImage: string;
  readonly tileColor: string;

  getMovable(): Point[];
  move(p: Point): void;
}

// class xyz implements TileObject {
//   x: number;
//   y: number;

//   constructor() {
//     this.x = 0;
//     this.y = 0;
//   }

//   get tileImage(): string {
//     return '..';
//   }
  
//   get tileColor(): string {
//     return 'abc';
//   }

//   getMovable(): Point[] {
//     return [];
//   }

//   move(p: Point): void {
//     this.x = p.x;
//     this.y = p.y;
//   }
// }