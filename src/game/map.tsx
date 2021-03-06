import Tile from './tile';
import Point from './interfaces/point';

import PlayerCard from './cards/utility/player-card';
import Board from './board';
import CardObject from './interfaces/card';
import EntityObject from './objects/entity-object';
import { CardObjectType } from './types/card-object-type';
import helpers from '../helpers';

import cardList from './cards/get-all';
import objectList from './objects/get-all';
import HealthCard from './cards/utility/health-card';

export default class Map {
  tiles: Tile[];
  width: number;
  height: number;
  nextId: number;
  isEnemyTurn: boolean;

  constructor(b: Board) {
    this.nextId = 1;
    this.isEnemyTurn = false;

    const cards = [...cardList, ...objectList];
    console.log(cards);

    if (!b.tiles.every(t => t.length === b.tiles[0].length)) throw new Error('Invalid board tiles');
    if (!Object.values(b.mapping).every(m => cards.find(c => c.name === m))) throw new Error('Invalid card type');

    this.width = Math.floor(b.tiles[0].replace(/ /g, '').length / 2);
    this.height = b.tiles.length;
    this.tiles = new Array(this.width * this.height);

    const DefaultCardType = cards.find(c => c.name === b.mapping['*']);
    if (!DefaultCardType) throw new Error(`Default card type is unspecified`);

    const tilesString = b.tiles.join('').replace(/ /g, '');

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let i = this.tilePointToIndex({ x, y });
        let short = tilesString.substring(i * 2, (i * 2) + 2);

        const tile = new Tile(x, y);
        tile.objects.push(new DefaultCardType(x, y, this.nextId++));

        if (short !== '*') {
          const CardType = cards.find(c => c.name === b.mapping[short]);
          if (!CardType) throw new Error(`Unknown card type ${short}} - ${b.mapping[short]}`);
          const card = new CardType(x, y, this.nextId++);

          if (card.objectType === CardObjectType.Entity) {
            const entity = card as EntityObject;
            entity.health = entity.maxHealthPerCell;
            entity.healthCard = HealthCard;

            if (!(entity instanceof PlayerCard)) {
              entity.isEnemy = true;
            }
          }

          tile.objects.push(card);
        }

        this.setTile(tile, { x, y });
      }
    }
  }

  isTerrain(p: Point): boolean {
    return this.getTile(p).objects.some(t => t.objectType === CardObjectType.Terrain);
  }

  isValidPoint(p: Point): boolean {
    if (p.x < 0) return false; //throw new Error('X must be greater than zero');
    if (p.y < 0) return false; //throw new Error('Y must be greater than zero');
    if (p.x >= this.width) return false; //throw new Error('X is out of bounds');
    if (p.y >= this.height) return false; //throw new Error('Y is out of bounds');
    return true;
  }

  isOverlappable(card: CardObject, p: Point): boolean {
    const tile = this.getTile(p);
    if (tile.objects.some(tile => !tile.isOverlappable(card) || helpers.isEnemy(tile))) return false;
    return true;
  }

  private indexToTilePoint(i: number): Point {
    var p = { x: i % this.width, y: Math.floor(i / this.width) };
    if (!this.isValidPoint(p)) throw new Error(`Point(${p.x}, ${p.y}) is out of bounds`);
    return p;
  }

  private tilePointToIndex(p: Point): number {
    if (!this.isValidPoint(p)) throw new Error(`Point(${p.x}, ${p.y}) is out of bounds`);
    return (p.y * this.width) + p.x;
  }

  endTurn() {
    this.isEnemyTurn = !this.isEnemyTurn;
    this.getEntities(this.isEnemyTurn).forEach(e => e.actionsTaken = 0);
  }

  isTurnOver(): boolean {
    let over: boolean | undefined = this.getEntities(this.isEnemyTurn)
      .every(o => o.actionsTaken >= o.maxActionsPerTurn);
    return over ? true : false;
  }

  getEntities(enemy: boolean): EntityObject[] {
    let entities: EntityObject[] | undefined = this.tiles
      .map(t =>
        t.objects
          .filter(o => o.objectType == CardObjectType.Entity)
          .map(o => o as EntityObject)
          .filter(o => o.isEnemy == enemy)
      )
      .reduce((a, v) => a.concat(v), []);

    return entities ? entities : [];
  }

  move(o: EntityObject, p: Point) {
    o.actionsTaken++;

    p = { x: p.x, y: p.y };
    this.getTile(o).removeCard(o.id);
    o.move(this, p);
    this.getTile(p).addCard(o);
  }

  interact(interacter: CardObject, interactee: CardObject) {
    // assume attacking for now...
    if (interacter.objectType === CardObjectType.Entity) {
      if (interactee.objectType === CardObjectType.Entity) {
        this.attack(interacter as EntityObject, interactee as EntityObject);
      }
      // ...
    }
  }

  removeCard(card: CardObject) {
    this.getTile(card).removeCard(card.id);
  }

  private attack(attacker: EntityObject, defender: EntityObject) {
    attacker.actionsTaken++;

    let damage = attacker.attackDamage;
    let defenderCell = defender.getHealthCard();
    while (damage > 0) {
      let hit = Math.min(damage, defenderCell.health);
      if (hit <= 0) {
        break;
      }
      defenderCell.health -= hit;
      damage -= hit;

      if (defenderCell.health === 0) { // we killed this cell
        this.removeCard(defenderCell);

        if (defenderCell.id !== defender.id) {
          defender.removeChild(defenderCell.id);
          defenderCell = defender.getHealthCard();
        }
      }
    }
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