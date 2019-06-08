import React, { useState } from 'react';
import './tile.scss';
import TileInstace from '../../game/tile';
import TileObject from '../../game/interfaces/tile-object';
import { InteractionType } from '../../game/types/interaction-type';
import { TileObjectType } from "../../game/types/tile-object-type";
import helpers from '../../helpers';
import EntityObject from '../../game/cards/entity-object';

interface TileProps {
  data: TileInstace;
  selected: boolean;
  tilesInteractableTo: InteractionType;
  tilesMovableTo: boolean;
  leftClickHandler: Function;
  rightClickHandler: Function;
  topCard: TileObject | undefined;
}

const Tile: React.FC<TileProps> = ({
  data,
  selected,
  leftClickHandler,
  rightClickHandler,
  tilesInteractableTo,
  tilesMovableTo,
  topCard,
  children
}) => {
  const backgroundImageOrColor = () => {
    if (topCard) {
      if (topCard.tileImage) {
        return {
          backgroundImage: `url(${topCard.tileImage})`
        }
      }

      if (topCard.objectType == TileObjectType.Entity) {
        return { backgroundColor: (topCard as EntityObject).tileColor };
      }
    }
    return { backgroundColor: '' };
  }
  const [topCardStyle, updateTopCard] = useState(backgroundImageOrColor());

  const tileClass = () => {
    return {
      'Tile': true,
      'Selected': selected,
      'InteractableEnemy': tilesInteractableTo === InteractionType.Enemy,
      'InteractableEnemyNoTarget': tilesInteractableTo === InteractionType.EnemyNoTarget,
      'MovableTo': tilesMovableTo,
      'Enemy': topCard && (topCard.objectType == TileObjectType.Entity) && (topCard as EntityObject).isEnemy
    }
  }

  let displayHealth: number = 0;
  if (topCard) {
    displayHealth += topCard.health;
    if (topCard.objectType == TileObjectType.Entity) {
      const healthCard = (topCard as EntityObject).children.find(c => c.x == topCard.x && c.y == topCard.y);
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
        displayHealth > 0 &&
        <div className='HealthBar'>
          {displayHealth}
        </div>
      }
      { children }
    </div>
  );
}

export default Tile;
