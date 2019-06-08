import React, { useState } from 'react';
import './tile.scss';
import TileInstace from '../../game/tile';
import TileObject from '../../game/interfaces/tile-object';

interface TileProps {
  data: TileInstace;
  selected: boolean;
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
  tilesMovableTo,
  topCard
}) => {
  const backgroundImageOrColor = () => {
    if (!topCard) { return {backgroundColor: ''} }
    if (topCard.tileImage) {
      return {
        backgroundImage: `url(${topCard.tileImage})`
      }
    } else {
      return {
        backgroundColor: topCard.tileColor
      }
    }
  }
  const [topCardStyle, updateTopCard] = useState(backgroundImageOrColor());

  const tileClass = () => {
    return `Tile ${selected ? 'Selected' : ''} ${tilesMovableTo ? 'MovableTo' : ''} ${topCard && topCard.isEnemy ? 'Enemy' : ''}`;
  }

  return (
    <div
      className={tileClass()}
      onContextMenu={(e) => rightClickHandler(e, data.top())}
      onClick={(e) => leftClickHandler(e, data.top())}
      style={topCardStyle}>

    </div>
  );
}

export default Tile;
