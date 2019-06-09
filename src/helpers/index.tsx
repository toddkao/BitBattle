import TileObject from "../game/interfaces/card";
import { TileObjectType } from "../game/types/tile-object-type";
import EntityObject from "../game/objects/entity-object";

import Entities from '../game/cards/get-entity';

export default {
  ObjectToClass(o: any): string {
    var c = '';
    for (var key in o) {
        if (o[key]) c += key + ' ';
    }
    return c;
  },
  isEnemy(tile: TileObject): boolean {
    return (tile.objectType === TileObjectType.Entity) && (tile as EntityObject).isEnemy
  },
  get allEntityTypes (): any[] {
    return Entities.map((t: any) => {
        var dummy = new t();
        return {
          image: dummy.tileImage,
          type: t,
        }
    });
  }
}