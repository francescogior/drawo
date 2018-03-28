// @flow
import React from 'react'
import Controls from './Controls'
import colors from './colors'
import tools from './tools'
import thicknesses from './thicknesses'
import Whiteboard from './Whiteboard'
import { view } from './utils'
import createReactApp from './modules/ReactApp/ReactApp'
import type { Viewport, Color, Tool, Thickness } from './domain'
import * as updaters from './updaters'
import { parse } from './serializer'
import type { State } from './State'

type Config = {
  colors: Color[],
  tools: Tool[],
  thicknesses: Thickness[],
}
type Env = { viewport: Viewport, hashString: string }

const config: Config = {
  doodloSize: 500,
  colors,
  tools,
  thicknesses,
}
const makeEnv: () => Env = () => ({
  hashString: window.location.hash.slice(1),
  viewport: {
    width: window.innerWidth || 500,
    height: window.innerHeight || 500,
  },
})

// eslint-disable-next-line no-shadow
const makeInitialState = (
  { colors, tools, thicknesses }: Config,
  env: Env,
): State => ({
  isDrawing: false,
  colors,
  tools,
  thicknesses,
  doodloSize: 500,
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

const Screen = view({
  position: 'absolute',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Doodlo = view({
  display: 'flex',
})

const App = () => (
  <Screen>
    <Doodlo>
      <Controls />
      <Whiteboard />
    </Doodlo>
  </Screen>
)

export default createReactApp({
  config,
  makeEnv,
  makeInitialState,
  // $FlowIssue boh
  updaters,
  render: App,
})
