import React from 'react';
import helpers from '../../../helpers';
import menuHelper from '../menu-helper';
import Map from '../../../game/map';
import CardObject from '../../../game/interfaces/card';
import './choose-card-menu.scss';
import '../menu.scss';

interface ChooseCardMenuProps {
  clickHandler: Function,
  selectedCard: CardObject,
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
    <div className='Menu ChooseCardMenu' style={menuStyles} >
      {
        helpers.allEntityTypes.map((x, i) => {
          return (
            <img
              alt="Menu Item"
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