import React, { useContext } from 'react';
import GameContext from '../../context/game';

import TileInstace from '../../game/tile';

import './tile.scss';

interface TileProps {
  data: TileInstace;
}

const Tile: React.FC <TileProps> = ({ data }) => {
  const ctx = useContext(GameContext);

  const tileStyle = {
    width: ctx.cellSize + 'px',
    height: ctx.cellSize + 'px',
    backgroundImage: `url(${data.tileImage})`
  }
  const showMovable = () => {
    console.log(data.objects[0].getMovable());
  }

  return (
    <div className="Tile" onClick={showMovable} style={tileStyle}>
      <div> ({ data.x }, {data.y}) </div>
    </div>
  );
}

export default Tile;
