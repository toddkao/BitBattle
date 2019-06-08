import TileObject from "../interfaces/tile-object";
import Point from "../interfaces/point";
import HealthCard from "./health-card";
import Map from "../map";
import EntityObject from "./entity-object";

export default class PlayerCard extends EntityObject {
  constructor(x: number, y: number, id: number) {
    super(x, y, id);
    this.tileImage = 'assets/img/Spybotics_Guard_Pup.webp';
    this.tileColor = 'rgba(0,0,125, 0.5)';
  }
}