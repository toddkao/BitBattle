import React, { useContext } from 'react';
import GameContext from '../../context/game';

import Point from '../../game/interfaces/point';

import './tile.scss';

interface TileProps {
  data: Point;
}

const Tile: React.FC <TileProps> = ({ data }) => {
  const ctx = useContext(GameContext);

  const tileStyle = {
    width: ctx.cellSize + 'px',
    height: ctx.cellSize + 'px'
  }

  return (
    <div className="Tile" style={tileStyle}>
      <div> ({ data.x }, {data.y}) </div>
    </div>
  );
}

export default Tile;
