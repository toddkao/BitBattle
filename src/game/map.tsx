import Tile from './tile';
import Point from './interfaces/point';

import BrickCard from './cards/brick-card';
import PlayerCard from './cards/player-card';
import GrassCard from './cards/grass-card';
import Board from './board';
import TileObject from './interfaces/tile-object';
import AttackDogCard from './cards/attack-dog-card';

export default class Map {
  tiles: Tile[];
  width: number;
  height: number;
  nextId: number;

  constructor(b: Board) {
    this.nextId = 1;
    const cards = [
      GrassCard,
      PlayerCard,
      BrickCard,
      AttackDogCard,
    ]

    if (!b.tiles.every(t => t.length === b.tiles[0].length)) throw new Error('Invalid board tiles');
    if (!Object.values(b.mapping).every(m => cards.find(c => c.name === m))) throw new Error('Invalid card type');

    this.width = b.tiles[0].replace(/ /g, '').length;
    this.height = b.tiles.length;
    let tiles = new Array(this.width * this.height);
    this.tiles = tiles;

    console.log(this.width, this.height);
    const DefaultCardType = cards.find(c => c.name == b.mapping['*']);
    if (!DefaultCardType) throw new Error(`Default card type is unspecified`);

    const tilesString = b.tiles.join('').replace(/ /g, '');

    for (let i = 0; i < tilesString.length; i++) {
      let x = i % this.width;
      let y = Math.floor(i / this.width);
      let short = tilesString.charAt(i);

      const tile = new Tile(x, y);
      tile.objects.push(new DefaultCardType(x, y, this.nextId++));

      if (short != '*') {
        const CardType = cards.find(c => c.name === b.mapping[short]);
        if (!CardType) throw new Error(`Unknown card type ${short}} - ${b.mapping[short]}`);
        const card = new CardType(x, y, this.nextId++);
        tile.objects.push(card);
      }

      this.setTile(tile, { x, y });
    }
  }

  isValidPoint(p: Point): boolean {
    if (p.x < 0) return false; //throw new Error('X must be greater than zero');
    if (p.y < 0) return false; //throw new Error('Y must be greater than zero');
    if (p.x >= this.width) return false; //throw new Error('X is out of bounds');
    if (p.y >= this.height) return false; //throw new Error('Y is out of bounds');
    return true;
  }

  isOverlappable(p: Point) : boolean {
    const tile = this.getTile(p);
    if (tile.objects.some(o => !o.isOverlappable || o.isEnemy)) return false;
    return true;
  }

  private tilePointToIndex(p: Point): number {
    if (!this.isValidPoint(p)) throw new Error(`Point(${p.x}, ${p.y}) is out of bounds`);
    return (p.y * this.width) + p.x;
  }

  move(o: TileObject, p: Point) {
    p = { x: p.x, y: p.y };
    this.getTile(o).removeCard(o.id);
    if (o.move) o.move(this, p);
    this.getTile(p).addCard(o);
  }

  getTile(p: Point) {
    return this.tiles[this.tilePointToIndex(p)];
  }

  setTile(t: Tile, p: Point) {
    t.x = p.x;
    t.y = p.y;
    this.tiles[this.tilePointToIndex(p)] = t;
  }
}