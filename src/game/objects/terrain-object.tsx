import CardObject from "../interfaces/card";
import { CardObjectType } from "../types/card-object-type";

export default class TerrainObject implements CardObject {
  x: number;
  y: number;
  id: number;

  tileImage: string;

  constructor(x: number, y: number, id: number) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.tileImage = '';
  }

  get health() { return 0; }
  get objectType() : CardObjectType { return CardObjectType.Terrain; }

  isOverlappable(card: CardObject): boolean { return false; }
}