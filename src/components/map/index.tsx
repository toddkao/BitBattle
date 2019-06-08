import React, { useState, useEffect } from 'react';
import Game from '../../game/map';
import Tile from '../tile';
import Board from '../../game/board';
import './map.scss';
import TileObject from '../../game/interfaces/tile-object';
import Point from '../../game/interfaces/point';
import { InteractionType } from '../../game/types/interaction-type';
import { TileObjectType } from '../../game/types/tile-object-type';
import EntityObject from '../../game/cards/entity-object';
import helpers from '../../helpers';
import PlayerCard from '../../game/cards/player-card';

const boardImport = {
  "tiles": [
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * G G * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * P * * * * * * * *",
    "* * * * * P * * E * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
    "* * * * G G * * * * * * * * * *",
    "* * * * * * * * * * * * * * * *",
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
  const [tilesInteractableTo, updateTilesInteractableTo] = useState();
  const [game, updateGame] = useState(g);
  const [showMenu, updateShowMenu] = useState(true);

  const clearState = () => {
    updateSelectedCard(undefined);
    updateTilesMovableTo(undefined);
    updateTilesInteractableTo(undefined);
  }

  const rightClick = (e: Event, tile: TileObject) => {
    e.preventDefault();
    if (selectedCard) clearState();
  }

  const leftClick = (e: Event, tile: TileObject) => {
    // If we have a tile selected, and the new tile we're selecting is a movable tile,
    // then we're trying to move our selected tile to the new tile
    if (selectedCard) {
      if (tilesInteractableTo && tilesInteractableTo.some((t: Point) => t.x == tile.x && t.y == tile.y) && helpers.isEnemy(tile)){
        game.interact(selectedCard, tile);
        clearState();
      } else if (tilesMovableTo && tilesMovableTo.some((t: Point) => t.x == tile.x && t.y == tile.y)) {
        game.move(selectedCard, tile);
        clearState();
      }
    } else if (!isSelected(tile) && tile.objectType == TileObjectType.Entity /* && !helpers.isEnemy(tile) */) {
      updateSelectedCard(tile);
      if (tile.getMovable)
        updateTilesMovableTo(tile.getMovable().filter(p => game.isOverlappable(tile, p)));
      if (tile.getInteractable) {
        updateTilesInteractableTo(tile.getInteractable().filter(p => game.isValidPoint(p)));
      }
    }
  }

  const isSelected = (tile: TileObject | undefined) => {
    if (!tile) return false;
    if (!selectedCard) return false;
    if (tile.id === selectedCard.id) return true;
    else return false;
  }

  const isMovableTo = (tile: TileObject | undefined) => {
    if (!tile) return false;
    if (!tilesMovableTo) return false;
    if (tilesMovableTo.some((t: Point) => t.x == tile.x && t.y == tile.y)) return true;
    return false;
  }

  const isInteractableTo = (tile: TileObject | undefined) => {
    if (!tilesInteractableTo) return InteractionType.None;
    if (!tile) return InteractionType.None;
    if (tilesInteractableTo.some((t: Point) => t.x == tile.x && t.y == tile.y)) {
      if (helpers.isEnemy(tile)) {
        return InteractionType.Enemy;
      } else {
        return InteractionType.EnemyNoTarget;
      }
    }
    return InteractionType.None;
  }

  const choosePlayerCard = (type: any) => {
    
    game.removeCard(selectedCard);

    let card : EntityObject = (new type(selectedCard.x, selectedCard.y, game.nextId++)) as EntityObject;
    card.health = card.maxHealthPerCell;
    card.isEnemy = false;

    game.getTile(card).addCard(card);

    clearState();
  }

  const mapStyles = {
    gridTemplateColumns: `repeat(${game.width}, 1fr)`,
    gridTemplateRows: `repeat(${game.height}, 1fr)`,
  }

  const menuStyles = {
    gridTemplateColumns: `repeat(${4}, 1fr)`,
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
                tilesInteractableTo={isInteractableTo(tile.top())}
                selected={isSelected(tile.top())}
                topCard={tile.top()}
                key={`tile-${tile.x}-${tile.y}-${tile.topId()}`}
                data={tile}
              >
                {
                  showMenu && isSelected(tile.top()) && (selectedCard instanceof PlayerCard) &&
                  <div className='Menu' style={menuStyles} >
                    {
                      helpers.allEntityTypes.map((x, i)=> {
                        return (
                          <img
                            onClick={() => choosePlayerCard(x.type)}
                            className='MenuItem'
                            src={x.image}
                            key={`player-card-${i}`}
                          />
                        )
                      })
                    }
                  </div>
                }
              </Tile>
            )
          })
        }

      </div>
    </div>
  );
}

export default Map;
