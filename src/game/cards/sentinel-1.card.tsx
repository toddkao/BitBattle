import TileObject from "../interfaces/tile-object";
import Point from "../interfaces/point";
import Map from "../map";
import SpybotEnemyObject from "./spybot-enemy-object";

export default class Sentinel1Card extends SpybotEnemyObject {
  constructor(x: number, y: number, id: number) {
    super(x, y, id);
    this.tileImage = 'assets/img/Spybotics_Sentinel.webp';
    this.tileColor = 'rgba(0,0,0,0)';
    this._maxHealthPerCell = 1;
    this._maxCells = 3;
    this.attackDamage = 2;
    this.attackRange = 1;
  }
}