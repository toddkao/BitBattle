import React from 'react';
import Game from '../../game/map';
import Tile from '../tile';
import './map.scss';

const Map: React.FC = () => {
  const width = 10;
  const height = 10;
  const game = new Game(width, height);
  // game.importBoard('PGGGGGDGGDDGGDDP');

  const mapStyles = {
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
  }

  return (
    <div className="MapContainer">
      <div className="Map" style={mapStyles}>
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
