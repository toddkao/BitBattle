import Tile from './tile';
import Point from './interfaces/point';

import BrickCard from './cards/brick-card';
import PlayerCard from './cards/player-card';
import GrassCard from './cards/grass-card';
import { ValidCard } from './types/valid-card';

export default class Map {
  tiles: Tile[];
  width: number;
  height: number;

  constructor(width : number, height : number) {
    this.tiles = new Array(width * height);
    this.width = width;
    this.height = height;

    for (let i = 0; i < this.width * this.height; i++) {
      let x = i % this.width;
      let y = Math.floor(i / this.width);
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

  importBoard(b: string) {
    console.log(b);
    if (b.length !== this.tiles.length) throw new Error(`Imported Board doesn't match dimensions of map`)
    for (let i = 0; i < b.length; i++) {
      let x = i % this.width;
      let y = Math.floor(i / this.width);
      const tile = new Tile(x, y);

      let card: ValidCard;
      if (b[i] === 'G') {
        card = new GrassCard(x, y);
      } else if (b[i] === 'P') {
        card = new PlayerCard(x, y);
      } else {
        card = new BrickCard(x, y);
      }
      tile.objects.push(card);

      this.setTile(tile, { x, y });
    }
  }
}