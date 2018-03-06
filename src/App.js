import React, { Component } from "react";
import Canvas from "./modules/Canvas/Canvas";
import Controls from "./Controls";
import colors, { type Color } from "./colors";
import tools, { type Tool } from "./tools";
import thicknesses, { type Thickness } from "./thicknesses";
import Drawing from "./Drawing";
import { l } from "./utils";
import { Squared } from "./patterns";
import createReactApp, {
  type Updater,
  type MakeInitialState,
  type Render,
  type Updaters
} from "./modules/ReactApp/ReactApp";
import cxs from "cxs";
import stylexs from "cxs/component";
import { range } from "ramda";
import { type Point, type DrawingType } from "./types";

type Config = {};
type Env = { viewport: { width: number, height: number } };
type State = {
  // TODO how to make it strict? And also have the partial type to use for updaters
  // here https://flow.org/en/docs/types/utilities/#toc-rest
  points: Point[],
  drawings: DrawingType[],
  selectedColor: Color,
  selectedTool: Tool,
  selectedThickness: Thickness
};

const windowWidth: number = window.innerWidth;
const windowHeight: number = window.innerHeight;

const config: Config = {};
const env: Env = {
  viewport: {
    width: windowWidth,
    height: windowHeight
  }
};

const initialState = (config, env) => ({
  points: [],
  drawings: [],
  selectedColor: colors[0],
  selectedTool: tools[0],
  selectedThickness: thicknesses[0],
  viewport: env.viewport
});

const collectPoint = (point: Point) => ({
  selectedTool,
  points,
  ...restState
}: State): State => ({
  ...restState,
  selectedTool,
  points:
    selectedTool === "pen"
      ? points.concat(point)
      : points.length === 0 ? [point] : [points[0], point]
});

const setColor = (color: Color) => (state: State): State => ({
  ...state,
  selectedColor: color
});

const setThickness = (thickness: Thickness) => (state: State): State => ({
  ...state,
  selectedThickness: thickness
});

const setTool = (tool: Tool) => (state: State): State => ({
  ...state,
  selectedTool: tool
});

const onDrawEnd = () => ({
  drawings,
  points,
  selectedColor,
  selectedTool,
  selectedThickness,
  ...state
}: State): State => ({
  ...state,
  selectedColor,
  selectedTool,
  selectedThickness,
  points: [],
  drawings: drawings.concat({
    points,
    color: selectedColor,
    tool: selectedTool,
    thickness: selectedThickness
  })
});

const updaters = {
  collectPoint,
  setColor,
  setTool,
  setThickness,
  onDrawEnd
};

const renderApp: Render<State> = (
  {
    points,
    drawings,
    selectedColor,
    selectedTool,
    selectedThickness,
    viewport
  },
  { setColor, setTool, collectPoint, onDrawEnd, setThickness }
) => (
  <div className="app">
    <Controls
      direction={viewport.width >= viewport.height ? "row" : "column"}
      colors={colors}
      selectedColor={selectedColor}
      setColor={setColor}
      tools={tools}
      selectedTool={selectedTool}
      setTool={setTool}
      thicknesses={thicknesses}
      selectedThickness={selectedThickness}
      setThickness={setThickness}
    />
    <Canvas
      className={cxs({ cursor: "crosshair" })}
      width={viewport.width}
      height={viewport.height}
      onDraw={collectPoint}
      onDrawEnd={onDrawEnd}
      PatternBackground={() => <Squared size={30} />}
    >
      {drawings.map(({ points, color, tool, thickness }, i) => (
        <Drawing
          key={i}
          points={points}
          color={color}
          tool={tool}
          thickness={thickness}
        />
      ))}

      <Drawing
        points={points}
        color={selectedColor}
        tool={selectedTool}
        thickness={selectedThickness}
      />
    </Canvas>
  </div>
);

export default createReactApp({
  config,
  env,
  makeInitialState: initialState,
  updaters,
  render: renderApp
});
