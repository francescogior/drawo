import React, { Component } from 'react'
import Controls from './Controls'
import colors, { type Color } from './colors'
import tools, { type Tool } from './tools'
import thicknesses, { type Thickness } from './thicknesses'
import Whiteboard from './Whiteboard'
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
import * as R from 'ramda'
import { type Point, type DrawingType } from './types'

import { parse, stringify } from './serializer'

// yes yes it is temp
window.R = R

const { round, abs, max, min } = Math

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
  images: { src: string, width: number, height: number }[],
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
  images: [],
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

const onImagePaste = (
  base64Data: string,
  { width, height }: { width: number, height: number },
) => ({ images }: State): PState => ({
  images: l(images.concat({ src: base64Data, height, width }), 'ehi ehi'),
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
  onImagePaste,
}

const view = stylexs('div')
const Screen = view()
const Counter = view({
  position: 'absolute',
  height: '50px',
  right: '20px',
  top: '20px',
  marginLeft: 'auto',
  textAlign: 'right',
  ' span': {
    padding: '20px',
    background: 'rgba(255,255,255,.8)',
    borderRadius: '5px',
    marginTop: '30px',
    marginBottom: '30px',
    lineHeight: '50px',
    zIndex: 1000,
  },
})

const sum = (a, b) => a + b
const diff = (a, b) => a - b
const distance = (a, b) => abs(diff(a, b))

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
) => {
  const toX = (p) => p.x
  const toY = (p) => p.y
  const allPoints = R.flatten(drawings.map((d) => d.points)).concat(points)
  const drawingsCounter = drawings.length
  const pointsCounter = allPoints.length
  const xSum = allPoints.map(toX).reduce(sum, 0)
  const ySum = allPoints.map(toY).reduce(sum, 0)

  const drawingLength = (drawing) => drawing.points.length
  const xs = (drawing) => drawing.points.map(toX)
  const ys = (drawing) => drawing.points.map(toY)
  const drawingDiffsX = (drawing) => {
    const xsd = xs(drawing)
    return xsd.slice(0, -1).map((_, i) => distance(xsd[i + 1], xsd[i]))
  }
  const drawingDiffSumX = (drawing) => drawingDiffsX(drawing).reduce(sum, 0)
  const drawingDiffsY = (drawing) => {
    const ysd = ys(drawing)
    return ysd.slice(0, -1).map((_, i) => distance(ysd[i + 1], ysd[i]))
  }
  const drawingDiffSumY = (drawing) => drawingDiffsY(drawing).reduce(sum, 0)
  const drawingAvgDiffX = (drawing) =>
    drawingDiffSumX(drawing) / drawingLength(drawing)
  const drawingAvgDiffY = (drawing) =>
    drawingDiffSumY(drawing) / drawingLength(drawing)

  const drawingMaxDiffX = (drawing) => max(...drawingDiffsX(drawing))
  const drawingMaxDiffY = (drawing) => max(...drawingDiffsY(drawing))

  const maxMaxX = round(max(...drawings.map(drawingMaxDiffX)))
  const avgMaxX = round(
    drawings.map(drawingMaxDiffX).reduce(sum, 0) / drawingsCounter,
  )
  const maxAvgX = round(max(...drawings.map(drawingAvgDiffX)))
  const avgAvgX = round(
    drawings.map(drawingAvgDiffX).reduce(sum, 0) / drawingsCounter,
  )

  const maxMaxY = round(max(...drawings.map(drawingMaxDiffY)))
  const avgMaxY = round(
    drawings.map(drawingMaxDiffY).reduce(sum, 0) / drawingsCounter,
  )
  const maxAvgY = round(max(...drawings.map(drawingAvgDiffY)))
  const avgAvgY = round(
    drawings.map(drawingAvgDiffY).reduce(sum, 0) / drawingsCounter,
  )

  return (
    <Screen>
      <Controls />
      <Counter>
        <span>POINTS: {pointsCounter}</span>
        <span>DRAWINGS: {drawingsCounter}</span>
        <span>maxMaxDiffsX: {maxMaxX}</span>
        <span>avgAvgDiffsX: {avgAvgX}</span>
        <span>maxMaxDiffsY: {maxMaxY}</span>
        <span>avgAvgDiffsY: {avgAvgY}</span>
      </Counter>
      <Whiteboard />
    </Screen>
  )
}

export default createReactApp({
  config,
  env,
  makeInitialState: initialState,
  updaters,
  render: renderApp,
})
