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

    // how do i get access to width/height of board here?
    protected getStraightPoints(range: number = 10) : Point[] {
      let p : Point[] = [];
      for (let y = -range; y <= range; y++) {
        for (let x = -range; x <= range; x++) {
          if (y === 0 || x === 0) {
            p.push({x: this.x+x, y: this.y+y});
          }
        }
      }
      return p;
    }
  
    protected getDiagonalPoints(range: number = 10) : Point[] {
      let p : Point[] = [];
      for (let y = -range; y <= range; y++) {
        for (let x = -range; x <= range; x++) {
          if (y === x || -x === y) {
            p.push({x: this.x+x, y: this.y+y});
          }
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