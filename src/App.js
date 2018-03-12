import React, { Component } from 'react'
import Canvas from './modules/Canvas/Canvas'
import Controls from './Controls'
import colors, { type Color } from './colors'
import tools, { type Tool } from './tools'
import thicknesses, { type Thickness } from './thicknesses'
import Drawing from './Drawing'
import { l, filterBeforeLastClear, getDirection } from './utils'
import PropTypes from 'prop-types'
import { Squared } from './patterns'
import createReactApp, {
  type Updater,
  type MakeInitialState,
  type Render,
  type Updaters,
} from './modules/ReactApp/ReactApp'
import cxs from 'cxs'
import stylexs from 'cxs/component'
import { range, slice, last, concat, append, prepend, head } from 'ramda'
import { type Point, type DrawingType } from './types'

import { parse, stringify } from './serializer'

const save = (drawings) => {
  window.location.hash = stringify(drawings)
  return drawings
}

const { random, floor } = Math
const makeId = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
    '',
  )
  let id = ''
  while (id.length < 12) id += alphabet[floor(random() * alphabet.length)]
  return id
}

type Config = {}
type Env = { viewport: { width: number, height: number } }
type State = {
  undos: DrawingType[],
  points: Point[],
  drawings: DrawingType[],
  selectedColor: Color,
  selectedTool: Tool,
  selectedThickness: Thickness,
  isColorMenuOpen: boolean,
  isToolMenuOpen: boolean,
  isThicknessMenuOpen: boolean,
}

type PState = $Rest<State, {}>

const windowWidth: number = window.innerWidth
const windowHeight: number = window.innerHeight

const config: Config = {
  colors,
  tools,
  thicknesses,
}
const env: Env = {
  hashString: window.location.hash.slice(1),
  viewport: {
    width: windowWidth,
    height: windowHeight,
  },
}

const initialState = (
  { colors, tools, thicknesses }: Config,
  env: Env,
): State => ({
  colors,
  tools,
  thicknesses,
  points: [],
  undos: [],
  drawings: parse(env.hashString),
  selectedColor: colors[0],
  selectedTool: tools[0],
  selectedThickness: thicknesses[0],
  viewport: env.viewport,
  isColorMenuOpen: false,
  isToolMenuOpen: false,
  isThicknessMenuOpen: false,
})

const collectPoint = (point: Point) => ({
  selectedTool,
  points,
}: PState): PState => ({
  points:
    selectedTool === 'pen'
      ? append(point, points)
      : points.length === 0 ? [point] : [points[0], point],
})

const setColor = (color: Color) => (): PState => ({
  selectedColor: color,
})

const openColorMenu = () => (): PState => ({
  isColorMenuOpen: true,
})

const closeColorMenu = () => (): PState => ({
  isColorMenuOpen: false,
})

const openToolMenu = () => (): PState => ({
  isToolMenuOpen: true,
})

const closeToolMenu = () => (): PState => ({
  isToolMenuOpen: false,
})

const openThicknessMenu = () => (): PState => ({
  isThicknessMenuOpen: true,
})

const closeThicknessMenu = () => (): PState => ({
  isThicknessMenuOpen: false,
})

const setThickness = (thickness: Thickness) => (): PState => ({
  selectedThickness: thickness,
})

const setTool = (tool: Tool) => (): PState => ({
  selectedTool: tool,
})

const onDrawEnd = () => ({
  drawings,
  points,
  selectedColor,
  selectedTool,
  selectedThickness,
}: PState): PState => ({
  points: [],
  undos: [],
  drawings: save(
    append({
      id: makeId(),
      points,
      color: selectedColor,
      tool: selectedTool,
      thickness: selectedThickness,
    })(drawings),
  ),
})

const onClear = () => ({
  drawings,
  selectedColor,
  selectedTool,
  selectedThickness,
}) => ({
  undos: [],
  drawings: save(
    append({
      id: makeId(),
      points: [],
      tool: 'clear',
      color: selectedColor,
      thickness: selectedThickness,
    })(drawings),
  ),
})

const onUndo = () => ({ undos, drawings }) => ({
  drawings: slice(0, -1)(drawings),
  undos: prepend(last(drawings))(undos),
})

const onRedo = () => ({ undos, drawings }) => ({
  drawings: append(head(undos))(drawings),
  undos: slice(1, Infinity)(undos),
})

const updaters = {
  collectPoint,
  setColor,
  setTool,
  setThickness,
  onDrawEnd,
  onClear,
  onUndo,
  onRedo,
  openColorMenu,
  closeColorMenu,
  openToolMenu,
  closeToolMenu,
  openThicknessMenu,
  closeThicknessMenu,
}

const renderApp: Render<State> = (
  {
    points,
    drawings,
    undos,
    viewport,
    selectedColor,
    selectedTool,
    selectedThickness,
  },
  {
    collectPoint,
    onDrawEnd,
    setThickness,
    onClear,
    onUndo,
    onRedo,
    openColorMenu,
    closeColorMenu,
    openThicknessMenu,
    closeThicknessMenu,
  },
) => (
  <div className="app">
    <Controls />
    <Canvas
      className={cxs({ cursor: 'crosshair' })}
      width={viewport.width}
      height={viewport.height}
      onDraw={collectPoint}
      onDrawEnd={onDrawEnd}
      PatternBackground={() => <Squared size={30} />}
    >
      {filterBeforeLastClear(drawings).map(
        ({ points, color, tool, thickness, id }) => (
          <Drawing
            key={id}
            points={points}
            color={color}
            tool={tool}
            thickness={thickness}
          />
        ),
      )}

      <Drawing
        key="currentDrawing"
        points={points}
        color={selectedColor}
        tool={selectedTool}
        thickness={selectedThickness}
      />
    </Canvas>
  </div>
)

export default createReactApp({
  config,
  env,
  makeInitialState: initialState,
  updaters,
  render: renderApp,
})
