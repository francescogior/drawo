import React, { Fragment as _ } from 'react'
import { connect, update } from '../../modules/ReactApp/ReactApp'
import { undoIcon, redoIcon } from '../../icons'
import { getDirection } from '../../utils'
import Square from '../../UI/Square'

const UndoAndRedoControls = connect(['drawings', 'undos', 'viewport'])(
  update(['onUndo', 'onRedo'])(
    ({ viewport, onUndo, onRedo, undos, drawings }) => (
      <_>
        <Square
          visible={drawings.length > 0}
          direction={getDirection(viewport)}
          background={'rgba(255,255,255,.8)'}
          color={'rgba(0,0,0,.8)'}
          onClick={onUndo}
        >
          {undoIcon}
        </Square>
        <Square
          visible={undos.length > 0}
          direction={getDirection(viewport)}
          background={'rgba(255,255,255,.8)'}
          color={'rgba(0,0,0,.8)'}
          onClick={onRedo}
        >
          {redoIcon}
        </Square>
      </_>
    ),
  ),
)

export default UndoAndRedoControls
