import TileObject from "../interfaces/tile-object";
import Point from "../interfaces/point";
import Map from "../map";
import EntityObject from "./entity-object";

export default class AttackDogCard extends EntityObject {
  constructor(x: number, y: number, id: number) {
    super(x, y, id);
    this.tileImage = 'assets/img/Spybotics_Attack_Dog.webp';
    this.tileColor = 'rgba(0,0,0,0)';
    this._maxHealthPerCell = 3;
    this._maxCells = 5;
  }

  getMovable(): Point[] {
    return [
      { x: this.x + 0, y: this.y + 1 },
      { x: this.x + 0, y: this.y + -1 },
      { x: this.x + 1, y: this.y },
      { x: this.x + -1, y: this.y }
    ];
  }

  getInteractable(): Point[] {
    return [
      { x: this.x + 1, y: this.y + 1 },
      { x: this.x + 1, y: this.y + -1 },

      { x: this.x + -1, y: this.y + 1 },
      { x: this.x + -1, y: this.y - 1 }
    ];
  }
}