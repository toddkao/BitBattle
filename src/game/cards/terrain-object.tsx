import TileObject from "../interfaces/tile-object";
import { TileObjectType } from "../types/tile-object-type";

export default class TerrainObject implements TileObject {
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
  get objectType() : TileObjectType { return TileObjectType.Terrain; }

  isOverlappable(t: TileObject): boolean { return false; }
}