import Tile from './tile';
import Point from './interfaces/point';

import { Board } from './types/board';

export default class Map {
  tiles: Tile[];
  width: number;
  height: number;
  
  constructor(width : number, height : number) {
    this.tiles = new Array(width * height);
    this.width = width;
    this.height = height;
    
    for (let i = 0; i < this.width * this.height; i++) {
      let x = Math.floor(i / this.width);
      let y = i % this.width;
      this.setTile(new Tile(x, y), { x, y });
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

  importBoard(b: Board) {
    console.log(b);
    if (b.length !== this.tiles.length) throw new Error(`Imported Board doesn't match dimensions of map`)
    for (let i = 0; i < b.length; i++) {
      let x = Math.floor(i / this.width);
      let y = i % this.width;
      const tile = new Tile(x, y);
      let tileImageMap = {
        'D': 'http://bbp.style/PUBLIC/BIM-library/jpg/australmasonry/GreyBlock/AM-MasonryBlocks-GreyBlock90x190x390-NAT.jpg',
        'G': 'http://4.bp.blogspot.com/-a135QAgRRqc/ToXUbysPglI/AAAAAAAAAE4/ejvSKIXXtbc/s1600/Grass_8bit_32px.jpg',
        'L': 'https://cognigen-cellular.com/images/mario-clipart-sprite.png',
      }

      let movable: Point[] = [
        {x: 0, y: 1}
      ];

      let obj = {
        tileImage: tileImageMap[b[i]],
        tileColor: '',
        getMovable: () => movable,
        getTile: '',
        move: () => '',
        x,
        y,
      }
      tile.objects.push(obj)
      this.setTile(tile, { x, y });
    }
  }
}