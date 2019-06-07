import React, { useContext } from 'react';
import GameContext from '../../context/game';
import Game from '../../game/map';
import Tile from '../tile';
import './map.scss';

const Map: React.FC = () => {
  const ctx = useContext(GameContext);

  const width = 4;
  const height = 4;
  const game = new Game(width, height);
  game.importBoard(['G', 'D', 'G', 'G','G', 'G', 'D', 'G', 'G', 'D', 'D', 'G','G', 'D', 'D', 'L'])
  console.log(game);

  const mapStyle = {
    width: ctx.cellSize * width + 'px',
    height: ctx.cellSize * height + 'px',
  }

  return (
    <div className="MapContainer">
      <div className="Map" style={mapStyle}>
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
