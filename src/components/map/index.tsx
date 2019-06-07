import React from 'react';
import Game from '../../game/map';
import Tile from '../tile';
import './map.scss';

const Map: React.FC = () => {
  const width = 4;
  const height = 4;
  const game = new Game(width, height);
  game.importBoard('PGGGGGDGGDDGGDDP');

  return (
    <div className="MapContainer">
      <div className="Map">
        {
          game.tiles.map(tile => {
            return (
              <Tile
                key={`tile-${tile.x}-${tile.y}`}
                data={tile}
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default Map;
