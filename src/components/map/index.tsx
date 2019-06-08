import React, { useState, useEffect } from 'react';
import Game from '../../game/map';
import Tile from '../tile';
import Board from '../../game/board';
import './map.scss';
import TileObject from '../../game/interfaces/tile-object';
import Point from '../../game/interfaces/point';

const boardImport = {
  "tiles": [
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * G G * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * P * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * G G * * * * * * * * * *",
    "* * E * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
  ],
  "mapping": {
    "*": "BrickCard",
    "G": "GrassCard",
    "P": "PlayerCard",
    "E": "AttackDogCard"
  }
}

const g = new Game(boardImport)
const Map: React.FC = () => {
  const [selectedCard, updateSelectedCard] = useState();
  const [tilesMovableTo, updateTilesMovableTo] = useState();
  const [game, updateGame] = useState(g);

  const clearState = () => {
    updateSelectedCard(undefined);
    updateTilesMovableTo(undefined);
  }

  const rightClick = (e: Event, tile: TileObject) => {
    console.log('right clicked')
    e.preventDefault();
    if (selectedCard) clearState();
  }

  const leftClick = (e: Event, tile: TileObject) => {
    // If we have a tile selected, and the new tile we're selecting is a movable tile,
    // then we're trying to move our selected tile to the new tile
    if (selectedCard && tilesMovableTo && tilesMovableTo.some((t: Point) => t.x == tile.x && t.y == tile.y)) {
      console.log(`before ${selectedCard.x} ${selectedCard.y}`);
      console.log(selectedCard.id)
      game.move(selectedCard, tile);
      clearState();
      console.log(`after ${selectedCard.x} ${selectedCard.y}`);
    } else if (!isSelected(tile) && tile.getMovable && !tile.isEnemy) {
      updateSelectedCard(tile);
      updateTilesMovableTo(tile.getMovable().filter(p => game.isOverlappable(p)));
      console.log(tilesMovableTo);
    }
  }

  const isSelected = (tile: TileObject) => {
    if (!selectedCard) return false;
    if (tile.id === selectedCard.id) return true;
    else return false;
  }

  const isMovableTo = (tile: TileObject) => {
    if (!tilesMovableTo) return false;
    if (tilesMovableTo.some((t: Point) => t.x == tile.x && t.y == tile.y)) return true;
    return false;
  }

  const mapStyles = {
    gridTemplateColumns: `repeat(${game.width}, 1fr)`,
    gridTemplateRows: `repeat(${game.height}, 1fr)`,
  }

  return (
    <div className="MapContainer">
      <div className="Map" style={mapStyles}>
        {
          game.tiles.map(tile => {
            return (
              <Tile
                leftClickHandler={leftClick}
                rightClickHandler={rightClick}
                tilesMovableTo={isMovableTo(tile.top())}
                selected={isSelected(tile.top())}
                topCard={tile.top()}
                key={`tile-${tile.x}-${tile.y}-${tile.top().id}`}
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
