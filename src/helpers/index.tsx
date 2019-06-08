import TileObject from "../game/interfaces/tile-object";
import { TileObjectType } from "../game/types/tile-object-type";
import EntityObject from "../game/cards/entity-object";
import AttackDogCard from "../game/cards/attack-dog-card";
import { type } from "os";

export default {
  ObjectToClass(o: any): string {
    var c = '';
    for (var key in o) {
        if (o[key]) c += key + ' ';
    }
    return c;
  },
  isEnemy(tile: TileObject): boolean {
    return (tile.objectType == TileObjectType.Entity) && (tile as EntityObject).isEnemy
  },
  get allEntityTypes (): any[] {
    var types = [
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
      AttackDogCard,
    ];

    return types.map((t: any) => {
        var dummy = new t();
        return {
          image: dummy.tileImage,
          type: t,
        }
    });
  }
}