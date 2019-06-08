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
  topCard: TileObject;
}

const Tile: React.FC<TileProps> = ({
  data,
  selected,
  leftClickHandler,
  rightClickHandler,
  tilesMovableTo,
  topCard
}) => {
  const [topCardStyle, updateTopCard] = useState({
    backgroundImage: `url(${topCard.tileImage})`
  });

  const tileClass = () => {
    return `Tile ${selected ? 'Selected' : ''} ${tilesMovableTo ? 'MovableTo' : ''} ${data.top().isEnemy ? 'Enemy' : ''}`;
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
