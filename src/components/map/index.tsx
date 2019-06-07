import React from 'react';
import Game from '../../game/map';
import Tile from '../tile';
import './map.scss';

const Map: React.FC = () => {
  const width = 10;
  const height = 10;
  const game = new Game(width, height);

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  let boardCards: any = {
    0: 'P',
    1: 'G',
    2: 'D'
  }
  let randomBoard = '';
  for (let i = 0; i < width * height; i++) {
    let r = getRandomInt(0, 2);
    randomBoard += boardCards[r];
  }
  console.log(randomBoard.length);
  game.importBoard(randomBoard);

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
