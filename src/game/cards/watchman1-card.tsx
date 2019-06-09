import SpybotEnemyObject from "./spybot-enemy-object";

export default class Watchman1Card extends SpybotEnemyObject {
  constructor(x: number, y: number, id: number) {
    super(x, y, id);
    this.tileImage = 'assets/img/Spybotics_Watchman.webp';
    this.tileColor = 'rgba(0,0,0,0)';
    this._maxHealthPerCell = 1;
    this._maxCells = 2;
    this.attackDamage = 2;
    this.attackRange = 2;
  }
}