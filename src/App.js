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
// import { parse } from './serializer'
import type { State } from './State'

type Config = {|
  colors: Color[],
  tools: Tool[],
  thicknesses: Thickness[],
|}
type Env = {| viewport: Viewport, hashString: string |}

const windowWidth: number = window.innerWidth // eslint-disable-line no-undef
const windowHeight: number = window.innerHeight // eslint-disable-line no-undef

const config: Config = {
  colors,
  tools,
  thicknesses,
}
const env: Env = {
  hashString: '', // window.location.hash.slice(1), // eslint-disable-line no-undef
  viewport: {
    width: windowWidth,
    height: windowHeight,
  },
}

// eslint-disable-next-line no-shadow
const makeInitialState = ({ colors, tools, thicknesses }: Config, env: Env): State => ({
  colors,
  tools,
  thicknesses,
  points: [],
  remotePoints: [],
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

const Screen = view()

const App = () => (
  <Screen>
    <Controls />
    <Whiteboard />
  </Screen>
)

export default createReactApp({
  config,
  env,
  makeInitialState,
  // $FlowIssue boh
  updaters,
  render: App,
})
