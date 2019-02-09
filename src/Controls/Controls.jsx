import React from 'react'

import { view } from '../utils'
import ClearControls from './controls/ClearControls'
import UndoRedoControls from './controls/UndoRedoControls'
import ThicknessesControls from './controls/ThicknessesControls'
import ColorsControls from './controls/ColorsControls'
import ToolsControls from './controls/ToolsControls'

const ControlsWrapper = view(({ direction }) => ({
  position: 'absolute',
  zIndex: 1,
  display: 'flex',
  flexDirection: direction,
}))

const Controls = () => (
  <ControlsWrapper>
    <ColorsControls />

    <ToolsControls />

    <ThicknessesControls />

    <ClearControls />

    <UndoRedoControls />
  </ControlsWrapper>
)

export default Controls
