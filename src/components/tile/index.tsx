import React, { useState } from 'react';
import './tile.scss';
import TileInstace from '../../game/tile';
import CardObject from '../../game/interfaces/card';
import { InteractionType } from '../../game/types/interaction-type';
import { CardObjectType } from "../../game/types/card-object-type";
import helpers from '../../helpers';
import EntityObject from '../../game/objects/entity-object';
import PlayerCard from '../../game/cards/utility/player-card';

interface TileProps {
  data: TileInstace;
  selected: boolean;
  isInteractable: InteractionType;
  isMovable: boolean;
  isInPath: boolean;
  leftClickHandler: Function;
  rightClickHandler: Function;
  topCard: CardObject;
}

const Tile: React.FC<TileProps> = ({
  data,
  selected,
  leftClickHandler,
  rightClickHandler,
  isInteractable,
  isMovable,
  isInPath,
  topCard,
  children
}) => {
  const backgroundImageOrColor = () => {
    if (topCard.tileImage) {
      return {
        backgroundImage: `url(${topCard.tileImage})`
      }
    }

    if (topCard.objectType === CardObjectType.Entity) {
      return { backgroundColor: (topCard as EntityObject).tileColor };
    }
    return { backgroundColor: '' };
  }
  const [topCardStyle] = useState(backgroundImageOrColor());

  const tileClass = () => {
    return {
      'Tile': true,
      'Selected': selected,
      'InteractableEnemy': isInteractable === InteractionType.Enemy,
      'InteractableEnemyNoTarget': isInteractable === InteractionType.EnemyNoTarget,
      'InPath': isInPath,
      'MovableTo': isMovable,
      'Enemy': topCard && (topCard.objectType === CardObjectType.Entity) && (topCard as EntityObject).isEnemy,
      'Friendly': topCard && (topCard.objectType === CardObjectType.Entity) && !(topCard as EntityObject).isEnemy,
      'Choosing': topCard instanceof PlayerCard
    }
  }

  let displayHealth: number = 0;
  if (topCard) {
    displayHealth += topCard.health;
    if (topCard.objectType === CardObjectType.Entity) {
      const healthCard = (topCard as EntityObject).children.find(c => c.x === topCard.x && c.y === topCard.y);
      if (healthCard) {
        displayHealth += healthCard.health;
      }
    }
  }

  return (
    <div
      className={helpers.ObjectToClass(tileClass())}
      onContextMenu={(e) => rightClickHandler(e, topCard)}
      onClick={(e) => leftClickHandler(e, topCard)}
      style={topCardStyle}>
      {
        displayHealth > 0 && !(topCard instanceof PlayerCard) &&
        <div className='HealthBar'>
          {displayHealth}
        </div>
      }
      {
        topCard.objectType === CardObjectType.Entity && !(topCard as EntityObject).isEnemy && !(topCard instanceof PlayerCard) &&
        <span role="img" aria-label="Turn over" className='TurnOver'>
          ⌛
        </span>
      }
      {
        topCard instanceof PlayerCard &&
        <span role="img" aria-label="Choose Player Card" style={{fontSize: '4vmin'}}>
          🔳
        </span>
      }
      { children }
    </div>
  );
}

export default Tile;
