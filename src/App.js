import React, { Component } from 'react'
import Controls from './Controls'
import colors, { type Color } from './colors'
import tools, { type Tool } from './tools'
import thicknesses, { type Thickness } from './thicknesses'
import Whiteboard from './Whiteboard'
import { l, filterBeforeLastClear, getDirection, makeId, view } from './utils'
import PropTypes from 'prop-types'
import { Squared } from './patterns'
import createReactApp, {
  type Updater,
  type MakeInitialState,
  type Render,
  type Updaters,
} from './modules/ReactApp/ReactApp'
import * as R from 'ramda'
import { type Point, type DrawingType } from './types'
import * as updaters from './updaters'
import { parse } from './serializer'

// yes yes it is temp
window.R = R

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

const makeInitialState = (
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

const Screen = view()

const App = () => {
  return (
    <Screen>
      <Controls />
      <Whiteboard />
    </Screen>
  )
}

export default createReactApp({
  config,
  env,
  makeInitialState,
  updaters,
  render: App,
})
