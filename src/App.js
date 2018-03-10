import React, { Component } from 'react'
import Canvas from './modules/Canvas/Canvas'
import Controls from './Controls'
import colors, { type Color } from './colors'
import tools, { type Tool } from './tools'
import thicknesses, { type Thickness } from './thicknesses'
import Drawing from './Drawing'
import { l } from './utils'
import { Squared } from './patterns'
import createReactApp, {
  type Updater,
  type MakeInitialState,
  type Render,
  type Updaters,
} from './modules/ReactApp/ReactApp'
import cxs from 'cxs'
import stylexs from 'cxs/component'
import {
  range,
  findLastIndex,
  propEq,
  slice,
  last,
  concat,
  append,
  prepend,
  head,
} from 'ramda'
import { type Point, type DrawingType } from './types'

// TODO something nicer
let id = 0
const makeId = () => id++

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

const config: Config = {}
const env: Env = {
  viewport: {
    width: windowWidth,
    height: windowHeight,
  },
}

const filterBeforeLastClear = (drawings) =>
  slice(
    findLastIndex(propEq('tool', 'clear'), drawings) + 1,
    Infinity,
    drawings,
  )

const initialState = (config: Config, env: Env): State => ({
  points: [],
  undos: [],
  drawings: [],
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
  drawings: append({
    id: makeId(),
    points,
    color: selectedColor,
    tool: selectedTool,
    thickness: selectedThickness,
  })(drawings),
})

const onClear = () => ({ drawings }) => ({
  undos: [],
  drawings: append({
    id: makeId(),
    points: [],
    tool: 'clear',
  })(drawings),
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
    selectedColor,
    selectedTool,
    undos,
    selectedThickness,
    viewport,
    isColorMenuOpen,
    isToolMenuOpen,
    isThicknessMenuOpen,
  },
  {
    setColor,
    setTool,
    collectPoint,
    onDrawEnd,
    setThickness,
    onClear,
    onUndo,
    onRedo,
    openColorMenu,
    closeColorMenu,
    openToolMenu,
    closeToolMenu,
    openThicknessMenu,
    closeThicknessMenu,
  },
) => (
  <div className="app">
    <Controls
      direction={viewport.width >= viewport.height ? 'row' : 'column'}
      colors={colors}
      selectedColor={selectedColor}
      isColorMenuOpen={isColorMenuOpen}
      openColorMenu={openColorMenu}
      closeColorMenu={closeColorMenu}
      setColor={setColor}
      tools={tools}
      selectedTool={selectedTool}
      setTool={setTool}
      isToolMenuOpen={isToolMenuOpen}
      openToolMenu={openToolMenu}
      closeToolMenu={closeToolMenu}
      thicknesses={thicknesses}
      selectedThickness={selectedThickness}
      setThickness={setThickness}
      isThicknessMenuOpen={isThicknessMenuOpen}
      openThicknessMenu={openThicknessMenu}
      closeThicknessMenu={closeThicknessMenu}
      onClear={onClear}
      onUndo={onUndo}
      onRedo={onRedo}
      redoable={undos.length > 0}
      undoable={drawings.length > 0}
    />
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
