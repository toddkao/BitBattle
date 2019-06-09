import React from 'react';
import helpers from '../../../helpers';
import menuHelper from '../menu-helper';
import Map from '../../../game/map';
import TileObject from '../../../game/interfaces/tile-object';
import './choose-card-menu.scss';
import '../menu.scss';

interface ChooseCardMenuProps {
  clickHandler: Function,
  selectedCard: TileObject,
  game: Map
}

const ChooseCardMenu: React.FC<ChooseCardMenuProps> = ({
  clickHandler,
  game,
  selectedCard
}) => {

  const menuStyles = {
    gridTemplateColumns: `repeat(${4}, 1fr)`,
    ...menuHelper.menuDirection(game, selectedCard),
  }

  return (
    <div className='Menu' style={menuStyles} >
      {
        helpers.allEntityTypes.map((x, i) => {
          return (
            <img
              onClick={() => clickHandler(x.type)}
              className='MenuItem'
              src={x.image}
              key={`player-card-${i}`}
            />
          )
        })
      }
    </div>
  )
}

export default ChooseCardMenu;