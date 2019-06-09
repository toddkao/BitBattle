import EntityObject from "./entity-object";

export default class PlayerCard extends EntityObject {
  constructor(x: number, y: number, id: number) {
    super(x, y, id);
    this.tileColor = 'rgba(0,0,0,0.2)';
  }
}