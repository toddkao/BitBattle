import CardObject from "../game/interfaces/card";
import { CardObjectType } from "../game/types/card-object-type";
import EntityObject from "../game/objects/entity-object";

import Entities from '../game/cards/get-entity';

export default {
  ObjectToClass(o: any): string {
    let c = '';
    for (let key in o) {
        if (o[key]) c += key + ' ';
    }
    return c;
  },
  isEnemy(card: CardObject): boolean {
    return (card.objectType === CardObjectType.Entity) && (card as EntityObject).isEnemy
  },
  get allEntityTypes (): any[] {
    return Entities.map((className: any) => {
        var dummy = new className();
        return {
          image: dummy.tileImage,
          type: className,
        }
    });
  }
}