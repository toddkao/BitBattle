import CardObject from "../../interfaces/card";
import EntityObject from "../../objects/entity-object";

export default class HealthCard extends EntityObject {
  parent: EntityObject;

  constructor(x: number, y: number, id: number, parent: EntityObject) {
    super(x, y, id);
    this._maxCells = 1;
    this._maxHealthPerCell = parent.maxHealthPerCell;
    this.tileColor = parent.tileColor;
    this.attackDamage = 0;
    this.parent = parent;
  }

  getHealthCard() {
    return this.parent.getHealthCard();
  }

  isOverlappable(card: CardObject): boolean {
    if (card.id === this.parent.id) return true;
    return false;
  }
}