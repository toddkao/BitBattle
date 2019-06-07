import React, { useContext } from 'react';
import GameContext from '../../context/game';

import TileInstace from '../../game/tile';

import './tile.scss';

interface TileProps {
  data: TileInstace;
}

const Tile: React.FC <TileProps> = ({ data }) => {
  const ctx = useContext(GameContext);

  console.log(data);
  const tileStyle = {
    width: ctx.cellSize + 'px',
    height: ctx.cellSize + 'px',
    background: `url(${data.tileImage})`
  }

  return (
    <div className="Tile" style={tileStyle}>
      <div> ({ data.x }, {data.y}) </div>
    </div>
  );
}

export default Tile;
