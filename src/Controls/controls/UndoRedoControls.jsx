import React, { Fragment } from 'react'
import { last } from 'ramda'

import { connect, update } from '../../modules/ReactApp/ReactApp'
import { undoIcon, redoIcon } from '../../icons'
import { getDirection, computeUndosAndRedos, removeRedoneUndos } from '../../utils'
import Square from '../../UI/Square'

const UndoAndRedoControls = connect(['drawings', 'viewport'])(update(['onUndo', 'onRedo'])(({
  viewport, onUndo, onRedo, drawings,
}) => (
  <Fragment>
    <Square
      visible={computeUndosAndRedos(drawings).length > 0}
      direction={getDirection(viewport)}
      background="rgba(255,255,255,.8)"
      color="rgba(0,0,0,.8)"
      onClick={onUndo}
    >
      {undoIcon}
    </Square>
    <Square
      visible={(last(removeRedoneUndos(drawings)) || {}).tool === 'undo'}
      direction={getDirection(viewport)}
      background="rgba(255,255,255,.8)"
      color="rgba(0,0,0,.8)"
      onClick={onRedo}
    >
      {redoIcon}
    </Square>
  </Fragment>
)))

export default UndoAndRedoControls
