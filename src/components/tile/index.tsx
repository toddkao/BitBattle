import React from 'react';
import './tile.scss';

import TileInstace from '../../game/tile';

import { MovableCard } from '../../game/types/movable-card';
import { ValidCard } from '../../game/types/valid-card';

interface TileProps {
  data: TileInstace;
}

const Tile: React.FC <TileProps> = ({ data }) => {
  const tileStyle = {
    backgroundImage: `url(${data.tileImage})`,
  }

  const isMovable = (card: ValidCard): card is MovableCard => {
    if((card as MovableCard)){
      return true
    }
    return false
  }

  const showMovable = () => {
    let card: ValidCard = data.objects[0];
    if (isMovable(card)) {
      console.log(card.getMovable());
    }
  }

  return (
    <div className="Tile" onClick={showMovable} style={tileStyle}>
      <div> ({ data.x }, {data.y}) </div>
    </div>
  );
}

export default Tile;
