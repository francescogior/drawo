import React, { Fragment as _ } from 'react'
import PropTypes from 'prop-types'
import cxs from 'cxs'
import stylexs from 'cxs/component'
import { equals, find, map, prop, memoize } from 'ramda'
import {
  toolIcons,
  thicknessIcon,
  clearIcon,
  undoIcon,
  redoIcon,
} from '../icons'
import Point from '../modules/Canvas/Point'
import Icon, { ICON_COLOR, ICON_SIZE } from '../Icon'
import { connect, update } from '../modules/ReactApp/ReactApp'
import { filterBeforeLastClear, getDirection, makeView } from '../utils'
import Select from '../UI/Select'
import Square from '../UI/Square'
import Space from './Space'
import ClearControls from './controls/ClearControls'
import UndoRedoControls from './controls/UndoRedoControls'
import ThicknessesControls from './controls/ThicknessesControls'
import ColorsControls from './controls/ColorsControls'
import ToolsControls from './controls/ToolsControls'

const Controls = connect(['viewport'])(({ viewport, className }) => (
  <div className={className}>
    <ColorsControls />
    <Space direction={getDirection(viewport)} />
    <ToolsControls />
    <Space direction={getDirection(viewport)} />
    <ThicknessesControls />
    <Space direction={getDirection(viewport)} />
    <ClearControls />
    <Space direction={getDirection(viewport)} />
    <UndoRedoControls />
  </div>
))

const addDirectionProp = ({ direction }) => ({
  position: 'absolute',
  zIndex: 1,
  display: 'flex',
  flexDirection: direction,
})

const StyledControls = stylexs(Controls)(addDirectionProp)

export default StyledControls
