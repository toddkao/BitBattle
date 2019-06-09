import React from 'react';
import menuHelper from '../menu-helper';
import Map from '../../../game/map';
import Path from "../../../game/path";
import CardObject from '../../../game/interfaces/card';
import './context-menu.scss';
import '../menu.scss';
import Point from "../../../game/interfaces/point";

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
    getPath();
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