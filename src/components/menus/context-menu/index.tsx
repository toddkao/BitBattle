import React from 'react';
import helpers from '../../../helpers';
import menuHelper from '../menu-helper';
import Map from '../../../game/map';
import TileObject from '../../../game/interfaces/tile-object';
import './context-menu.scss';
import '../menu.scss';

interface ContextMenuProps {
  selectedCard: TileObject,
  game: Map
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  game,
  selectedCard,
}) => {

  const endTurn = () => {
    console.log(endTurn);
  }

  const contextMenuStyles = {
    ...menuHelper.menuDirection(game, selectedCard),
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className='Menu ContextMenu' style={contextMenuStyles} >
      <button onClick={() => endTurn()} className='Button PrimaryButton'>
        End Turn
      </button>
    </div>
  )
}

export default ContextMenu;