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
import { Grid, Navigator, NavigatorTile, Entity } from 'pulsar-pathfinding';

const boardImport = {
  "comment": "https://www.youtube.com/watch?v=HNJA0wfbGfE&list=PL56CE84F6287C82A8&index=10",
  "tiles": [
    "XX XX XX XX XX XX XX XX XX XX XX XX XX XX",
    "XX XX XX XX XX XX XX XX XX XX XX XX XX XX",
    "XX XX XX XX XX XX XX XX XX P1 P1 XX XX XX",
    "XX XX XX XX XX XX XX XX XX XX XX XX XX XX",
    "OO XX XX XX XX XX XX XX XX XX XX XX XX XX",
    "OO OO XX XX XX XX XX XX XX XX XX XX XX XX",
    "OO OO XX XX P2 XX XX XX XX XX XX XX XX XX",
    "OO XX XX XX P2 XX XX XX XX XX XX XX XX XX",
    "XX XX XX XX XX XX XX XX XX XX XX XX XX XX",
    "XX XX XX XX OO OO OO XX XX XX XX XX XX XX",
    "XX XX XX OO OO OO OO OO XX XX XX XX XX XX"
  ],
  "mapping": {
    "*": "BrickCard",
    "XX": "BrickCard",
    "OO": "GrassCard",
    "P1": "PlayerCard",
    "P2": "Player2Card",
  }
}

const g = new Game(boardImport)
const Map: React.FC = () => {
  const [selectedCard, updateSelectedCard] = useState();
  const [tilesMovableTo, updateTilesMovableTo] = useState();
  const [tilesInteractableTo, updateTilesInteractableTo] = useState();
  const [contextMenu, updateContextMenu] = useState();
  const [tilesInPath, updateTilesInPath] = useState();

  const [game] = useState(g);

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
      updateContextMenu({ id: card.id, card: card });
    }
  }

  const isPlayerSelectingCards = (): boolean => {
    if (game.tiles.some(t => t.objects.some(o => o instanceof PlayerCard))) return true;
    return false;
  }


  const getMyEntities = (): EntityObject[] => {
    let entities: EntityObject[] | undefined = game.tiles
      .map(t =>
        t.objects
          .filter(o => o.objectType == CardObjectType.Entity)
          .map(o => o as EntityObject)
          .filter(o => o.isEnemy == game.isEnemyTurn)
      )
      .reduce((a, v) => a.concat(v), []);

    return entities ? entities : [];
  }

  const isTurnOver = (): boolean => {
    let over: boolean | undefined = getMyEntities()
      .every(o => o.actionsTaken >= o.maxActionsPerTurn);

    return over ? true : false;
  }

  const leftClick = (e: Event, card: CardObject) => {
    // If we have a card selected, and the new card we're selecting is a movable card,
    // then we're trying to move our selected card to the new card

    const selectingCards = isPlayerSelectingCards();
    updateContextMenu(undefined);

    if (selectedCard && !selectingCards) {

      if (selectedCard.objectType == CardObjectType.Entity) {

        const selectedEntity = selectedCard as EntityObject;

        if (selectedEntity.isEnemy != game.isEnemyTurn) return;

        if (selectedEntity.actionsTaken < selectedEntity.maxActionsPerTurn) {

          if (card.objectType == CardObjectType.Terrain && tilesMovableTo && tilesMovableTo.some((t: Point) => t.x === card.x && t.y === card.y)) {
            game.move(selectedCard, card);
            clearState();
          }
          else if (tilesInteractableTo && tilesInteractableTo.some((t: Point) => t.x === card.x && t.y === card.y) && selectedCard.isEnemy != helpers.isEnemy(card)) {
            game.interact(selectedCard, card);
            clearState();
          }

          if (isTurnOver()) {
            console.log('change turns');
            game.isEnemyTurn = !game.isEnemyTurn;
            getMyEntities().forEach(e => e.actionsTaken = 0);
          }

        }

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

  const isPartOfPath = (card: CardObject | undefined) => {
    if (!card) return false;
    if (!tilesInPath) return false;
    if (tilesInPath.some((t: Point) => t.x === card.x && t.y === card.y)) return true;
    return false;
  }

  const isInteractableTo = (card: CardObject | undefined) => {
    if (!tilesInteractableTo) return InteractionType.None;
    if (!card) return InteractionType.None;
    if (tilesInteractableTo.some((t: Point) => t.x === card.x && t.y === card.y)) {
      if (card.objectType === CardObjectType.Terrain) {
        return InteractionType.EnemyNoTarget;
      } else if (selectedCard && helpers.isEnemy(selectedCard) != helpers.isEnemy(card)) {
        return InteractionType.Enemy;
      } else {
        return InteractionType.EnemyNoTarget;
      }
    }
    return InteractionType.None;
  }

  const choosePlayerCard = (type: any) => {
    let card: EntityObject = (new type(selectedCard.x, selectedCard.y, game.nextId++)) as EntityObject;
    card.health = card.maxHealthPerCell;

    card.isEnemy = selectedCard.isEnemy;
    game.removeCard(selectedCard);
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

  const getPath = () => {
    const grid: Grid = new Grid({ width: game.width, height: game.height });
    grid.makeGrid();
    for (let y = 0; y < game.height; y++) {
      for (let x = 0; x < game.width; x++) {
        if (!game.isOverlappable(selectedCard, { x, y })) {
          // @ts-ignore
          let gg = grid.findTile({ x, y });
          if (gg) grid.obstacles.add(gg);
        }
      }
    }
    // @ts-ignore
    const begin: NavigatorTile = grid.findTile({ x: 0, y: 9 });
    // @ts-ignore
    const end: NavigatorTile = grid.findTile({ x: 0, y: 3 });
    const navigator: Navigator = new Navigator({
      grid, begin, end,
      onExplore: (x) => {
        console.log(x)
      },
      onComplete: (x) => {
        console.log(x)
      },
    });
    navigator.start();

    //     if (short.find(t => t.x === x && t.y === y)) {
    //       console.log(game.isOverlappable(selectedCard, {x, y}))
    //     }
    //     if (!game.isOverlappable(selectedCard, {x, y}))
    //       grid.setWalkableAt(x, y, false);
    //   }
    // }
    // let finder = new pf.BiDijkstraFinder({ allowDiagonal: true, dontCrossCorners: false});

    // let path = finder.findPath(0,9, 0,3, grid).map((c: any) => ({ x: c[0], y: c[1]}));
    console.log(navigator);
    let points = navigator.path.map(tile => tile.position);
    // let test = p.search({ x: 0, y: 9 }, { x: 0, y: 3 }, (p: Point) => game.isValidPoint(p) && game.isOverlappable(selectedCard, p), path);
    updateTilesInPath(points);
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
                isMovable={isMovableTo(card.top())}
                isInteractable={isInteractableTo(card.top())}
                isInPath={isPartOfPath(card.top())}
                selected={isSelected(card.top())}
                topCard={card.top()}
                key={`card-${card.topId()}`}
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
                    getPath={getPath}
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
