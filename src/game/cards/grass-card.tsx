import TileObject from "../interfaces/tile-object";
import TerrainObject from "./terrain-object"

export default class GrassCard extends TerrainObject {
  constructor(x: number, y: number, id: number) {
    super(x, y, id);
    this.tileImage = 'http://4.bp.blogspot.com/-a135QAgRRqc/ToXUbysPglI/AAAAAAAAAE4/ejvSKIXXtbc/s1600/Grass_8bit_32px.jpg';
  }
}