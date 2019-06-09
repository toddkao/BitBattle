import Point from "../interfaces/point";
import EntityObject from "./entity-object";

export default class SpybotEnemyObject extends EntityObject {
  attackRange: number;

  constructor(x: number, y: number, id: number) {
    super(x, y, id);
    this.attackRange = 1;
  }

  private getPoints(range: number) : Point[] {
    var p : Point[] = [];
    for (var y = -range; y <= range; y++) {
      for (var x = -range; x <= range; x++) {
        if (y === 0 && x === 0) continue;
        p.push({x: this.x+x, y: this.y+y});
      }
    }
    return p;
  }

  getMovable(): Point[] {
    return this.getPoints(1);
  }

  getInteractable(): Point[] {
    return this.getPoints(this.attackRange);
  }
}