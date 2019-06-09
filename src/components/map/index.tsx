import React, { useState, useEffect } from 'react';
import Game from '../../game/map';
import Board from '../../game/board';
import './map.scss';
import TileObject from '../../game/interfaces/tile-object';
import Point from '../../game/interfaces/point';
import { InteractionType } from '../../game/types/interaction-type';
import { TileObjectType } from '../../game/types/tile-object-type';
import EntityObject from '../../game/cards/entity-object';
import helpers from '../../helpers';
import PlayerCard from '../../game/cards/player-card';
import Tile from '../tile';

const boardImport = {
  "comment": "https://www.youtube.com/watch?v=HNJA0wfbGfE&list=PL56CE84F6287C82A8&index=10",
  "tiles": [
    "XX XX XX XX XX XX XX PP XX XX XX XX XX PP",
    "AP PP AP XX XX XX PP XX XX PP XX PP XX XX",
    "XX S1 XX XX XX XX XX XX PP XX XX XX XX XX",
    "XX XX XX S1 XX XX XX XX XX XX PP XX PP XX",
    "OO XX WM XX XX XX XX XX XX XX XX XX XX PP",
    "OO OO XX AP XX XX XX XX XX XX XX XX PP XX",
    "OO OO XX S1 XX S1 XX XX XX XX XX XX XX XX",
    "OO XX WM XX S1 XX AP XX XX S1 XX XX XX XX",
    "AP XX XX XX XX XX XX XX WM XX S1 XX XX XX",
    "XX PP AP WM OO OO OO XX XX XX XX AP PP AP",
    "AP XX XX OO OO OO OO OO XX AP XX XX XX XX"
  ],
  "mapping": {
    "*": "BrickCard",
    "XX": "BrickCard",
    "OO": "GrassCard",
    "PP": "PlayerCard",
    "AP": "GuardPupCard",
    "WM": "Watchman1Card",
    "S1": "Sentinel1Card"
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

  const isPlayerSelectingCards = (): boolean => {
    if (game.tiles.some(t => t.objects.some(o => o instanceof PlayerCard))) return true;
    return false;
  }

  const leftClick = (e: Event, tile: TileObject) => {
    // If we have a tile selected, and the new tile we're selecting is a movable tile,
    // then we're trying to move our selected tile to the new tile
    const selectingCards = isPlayerSelectingCards();

    if (selectedCard && !selectingCards) {
      if (tilesInteractableTo && tilesInteractableTo.some((t: Point) => t.x == tile.x && t.y == tile.y) && helpers.isEnemy(tile)) {
        game.interact(selectedCard, tile);
        clearState();
      } else if (tilesMovableTo && tilesMovableTo.some((t: Point) => t.x == tile.x && t.y == tile.y))  {
        game.move(selectedCard, tile);
        clearState();
      }
    } else if (!isSelected(tile) && tile.objectType == TileObjectType.Entity /* && !helpers.isEnemy(tile) */) {
      updateSelectedCard(tile);

      if (!selectingCards) {
        if (tile.getMovable)
          updateTilesMovableTo(tile.getMovable().filter(p => game.isValidPoint(p) && game.isOverlappable(tile, p)));
        if (tile.getInteractable) {
          updateTilesInteractableTo(tile.getInteractable().filter(p => game.isValidPoint(p)));
        }
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

    let card: EntityObject = (new type(selectedCard.x, selectedCard.y, game.nextId++)) as EntityObject;
    card.health = card.maxHealthPerCell;
    card.isEnemy = false;

    game.getTile(card).addCard(card);

    clearState();
  }

  const maxDimension = () => {
    return Math.max(game.width, game.height);
  }

  console.log(`${game.width / maxDimension() * 100}vmin`)
  console.log(`${game.height / maxDimension() * 100}vmin`)

  const mapStyles = {
    gridTemplateColumns: `repeat(${game.width}, 1fr)`,
    gridTemplateRows: `repeat(${game.height}, 1fr)`,
    width: `${game.width / maxDimension() * 100}vmin`,
    height: `${game.height / maxDimension() * 100}vmin`,
  }

  const menuDirection = (t: TileObject): React.CSSProperties => {
    let cssBuilder: React.CSSProperties = {top: '0', left: '100%'};
    if (t) {
      if (game.width - 2 <= t.x) {
        if (cssBuilder.left) delete cssBuilder.left;
        cssBuilder = {...cssBuilder, right: '100%'};
      }
      if (game.height - 4 <= t.y) {
        if (cssBuilder.top) delete cssBuilder.top;
        cssBuilder = {...cssBuilder, bottom: '0'}
      }
    }
    return cssBuilder;
  }

  const menuStyles = {
    gridTemplateColumns: `repeat(${4}, 1fr)`,
    ...menuDirection(selectedCard),
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
                      helpers.allEntityTypes.map((x, i) => {
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
