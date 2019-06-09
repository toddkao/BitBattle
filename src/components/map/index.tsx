import React, { useState } from 'react';
import Game from '../../game/map';
import './map.scss';
import CardObject from '../../game/interfaces/card';
import Point from '../../game/interfaces/point';
import { InteractionType } from '../../game/types/interaction-type';
import { CardObjectType } from '../../game/types/card-object-type';
import EntityObject from '../../game/objects/entity-object';
import helpers from '../../helpers';
import PlayerCard from '../../game/cards/utility/player-card';
import Tile from '../tile';
import ChooseCardMenu from '../menus/choose-card-menu';
import ContextMenu from '../menus/context-menu';

const boardImport = {
  "comment": "https://www.youtube.com/watch?v=HNJA0wfbGfE&list=PL56CE84F6287C82A8&index=10",
  "tiles": [
    "XX XX XX XX XX XX XX XX XX XX XX XX XX PP",
    "AP XX AP XX XX XX XX XX XX XX XX XX XX XX",
    "XX S1 XX XX XX XX XX XX XX PP XX XX XX XX",
    "XX XX XX S1 XX XX XX XX XX XX XX PP XX XX",
    "OO XX WM XX XX XX XX XX XX XX XX XX XX XX",
    "OO OO XX AP XX XX XX XX XX XX XX XX XX XX",
    "OO OO XX S1 XX S1 XX XX XX XX XX XX XX XX",
    "OO XX WM XX S1 XX AP XX XX S1 XX XX XX XX",
    "AP XX XX XX XX XX XX XX WM XX S1 XX XX XX",
    "XX XX AP WM OO OO OO XX XX XX XX AP XX AP",
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
  const [game] = useState(g);
  const [contextMenu, updateContextMenu] = useState();

  const clearState = () => {
    updateSelectedCard(undefined);
    updateTilesMovableTo(undefined);
    updateTilesInteractableTo(undefined);
    updateContextMenu(undefined);
  }

  const rightClick = (e: Event, card: CardObject) => {
    e.preventDefault();
    const selectingCards = isPlayerSelectingCards();
    if (!selectingCards) {
      if (selectedCard) clearState();
      updateContextMenu({id: card.id, card: card});
    }
  }

  const isPlayerSelectingCards = (): boolean => {
    if (game.tiles.some(t => t.objects.some(o => o instanceof PlayerCard))) return true;
    return false;
  }

  const leftClick = (e: Event, card: CardObject) => {
    // If we have a card selected, and the new card we're selecting is a movable card,
    // then we're trying to move our selected card to the new card
    const selectingCards = isPlayerSelectingCards();
    updateContextMenu(undefined);

    if (selectedCard && !selectingCards) {
      if (tilesInteractableTo && tilesInteractableTo.some((t: Point) => t.x === card.x && t.y === card.y) && helpers.isEnemy(card)) {
        game.interact(selectedCard, card);
        clearState();
      } else if (tilesMovableTo && tilesMovableTo.some((t: Point) => t.x === card.x && t.y === card.y))  {
        game.move(selectedCard, card);
        clearState();
      }
    } else if (!isSelected(card) && card.objectType === CardObjectType.Entity /* && !helpers.isEnemy(card) */) {
      updateSelectedCard(card);

      if (!selectingCards) {
        if (card.getMovable)
          updateTilesMovableTo(card.getMovable().filter(p => game.isValidPoint(p) && game.isOverlappable(card, p)));
        if (card.getInteractable) {
          updateTilesInteractableTo(card.getInteractable().filter(p => game.isValidPoint(p)));
        }
      }
    }
  }

  const isSelected = (card: CardObject | undefined) => {
    if (!card) return false;
    if (!selectedCard) return false;
    if (card.id === selectedCard.id) return true;
    else return false;
  }

  const isMovableTo = (card: CardObject | undefined) => {
    if (!card) return false;
    if (!tilesMovableTo) return false;
    if (tilesMovableTo.some((t: Point) => t.x === card.x && t.y === card.y)) return true;
    return false;
  }

  const isInteractableTo = (card: CardObject | undefined) => {
    if (!tilesInteractableTo) return InteractionType.None;
    if (!card) return InteractionType.None;
    if (tilesInteractableTo.some((t: Point) => t.x === card.x && t.y === card.y)) {
      if (helpers.isEnemy(card)) {
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

  const mapStyles = {
    gridTemplateColumns: `repeat(${game.width}, 1fr)`,
    gridTemplateRows: `repeat(${game.height}, 1fr)`,
    width: `${game.width / maxDimension() * 100}vmin`,
    height: `${game.height / maxDimension() * 100}vmin`,
  }

  return (
    <div className="MapContainer">
      <div className="Map" style={mapStyles}>
        {
          game.tiles.map(card => {
            return (
              <Tile
                leftClickHandler={leftClick}
                rightClickHandler={rightClick}
                tilesMovableTo={isMovableTo(card.top())}
                tilesInteractableTo={isInteractableTo(card.top())}
                selected={isSelected(card.top())}
                topCard={card.top()}
                key={`card-${card.x}-${card.y}-${card.topId()}`}
                data={card}
              >
                {
                  isSelected(card.top()) && (selectedCard instanceof PlayerCard) &&
                  <ChooseCardMenu
                    clickHandler={choosePlayerCard}
                    selectedCard={selectedCard}
                    game={game}
                  />
                }
                {
                  contextMenu && contextMenu.id === card.topId() &&
                  <ContextMenu
                    clearState={clearState}
                    selectedCard={contextMenu.card}
                    game={game}
                  />
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
