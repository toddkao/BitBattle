import React from 'react';
import menuHelper from '../menu-helper';
import Map from '../../../game/map';
import CardObject from '../../../game/interfaces/card';
import './context-menu.scss';
import '../menu.scss';

interface ContextMenuProps {
  selectedCard: CardObject,
  clearState: Function,
  game: Map,
  getPath: Function
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  game,
  selectedCard,
  clearState,
  getPath
}) => {

  const endTurn = () => {
    console.log('end turn')
    game.endTurn();
    clearState();
  }

  const contextMenuStyles = {
    ...menuHelper.menuDirection(game, selectedCard, 1, 2),
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className='Menu ContextMenu' style={contextMenuStyles} >
      <span role="img" aria-label="end" onClick={() => endTurn()} className='Button'>
        🔚
      </span>
      <span role="img" aria-label="defend" onClick={() => endTurn()} className='Button'>
        🛡️
      </span>
    </div>
  )
}

export default ContextMenu;