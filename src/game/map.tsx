import Tile from './tile';
import Point from './interfaces/point';

export default class Map {
  tiles: Tile[];
  width: number;
  height: number;
  
  constructor(width : number, height : number) {
    this.tiles = new Array(width * height);
    this.width = width;
    this.height = height;

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.setTile(new Tile(i, j), { x: i, y: j });
      }
    }
  }

  private tilePointToIndex(p : Point) : number {
    if (p.x < 0) throw new Error('X must be greater than zero');
    if (p.y < 0) throw new Error('Y must be greater than zero');
    if (p.x >= this.width) throw new Error('X is out of bounds');
    if (p.y >= this.height) throw new Error('Y is out of bounds');
    return (p.y * this.width) + p.x;
  }

  getTile(p: Point) {
    return this.tiles[this.tilePointToIndex(p)];
  }

  setTile(t : Tile, p: Point) {
    t.x = p.x;
    t.y = p.y;
    this.tiles[this.tilePointToIndex(p)] = t;
  }
}