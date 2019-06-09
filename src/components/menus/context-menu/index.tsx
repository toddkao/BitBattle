import React from 'react';
import menuHelper from '../menu-helper';
import Map from '../../../game/map';
import TileObject from '../../../game/interfaces/card';
import './context-menu.scss';
import '../menu.scss';

interface ContextMenuProps {
  selectedCard: TileObject,
  clearState: Function,
  game: Map
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  game,
  selectedCard,
  clearState
}) => {

  const endTurn = () => {
    console.log(endTurn);
    clearState();
  }

  const contextMenuStyles = {
    ...menuHelper.menuDirection(game, selectedCard),
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className='Menu ContextMenu' style={contextMenuStyles} >
      <span role="img" aria-label="end" onClick={() => endTurn()} className='Button'>
        🔚
      </span>
      <span role="img" aria-label="defend" onClick={() => endTurn()} className='Button'>
        🛡️
      </span>
      <span role="img" aria-label="bomb" onClick={() => endTurn()} className='Button'>
        💣
      </span>
    </div>
  )
}

export default ContextMenu;