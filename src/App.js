import React, { Component } from "react";
import Path from "./Path";
import Rectangle from "./Rectangle";
import Canvas from "./Canvas";
import Controls from "./Controls";
import colors from "./colors";
import tools from "./tools";
import { l } from "./utils";
const initialState = {
  points: [],
  drawings: [],
  selectedColor: colors[0],
  selectedTool: tools[0],
  selectedThickness: 5
};

class App extends Component {
  state = initialState;

  updaters = {
    collectPoint: ({ x, y }) => {
      this.setState(({ selectedTool, points }) => ({
        points:
          selectedTool === "pen"
            ? points.concat({ x, y })
            : points.length === 0 ? [{ x, y }] : [points[0], { x, y }]
      }));
    },

    setColor: color => () => {
      this.setState({
        selectedColor: color
      });
    },

    setTool: tool => () => {
      this.setState({
        selectedTool: tool
      });
    },

    onDrawEnd: () => {
      this.setState(
        ({
          drawings,
          points,
          selectedColor,
          selectedTool,
          selectedThickness
        }) => ({
          points: [],
          drawings: drawings.concat({
            points,
            color: selectedColor,
            tool: selectedTool,
            thickness: selectedThickness
          })
        })
      );
    }
  };

  render() {
    return renderApp({
      ...this.props,
      ...this.state,
      ...this.updaters
    });
  }
}

const renderApp = ({
  points,
  drawings,
  selectedColor,
  selectedTool,
  setColor,
  setTool,
  collectPoint,
  selectedThickness,
  onDrawEnd
}) => (
  <div className="app">
    <Controls
      colors={colors}
      selectedColor={selectedColor}
      setColor={setColor}
      tools={tools}
      selectedTool={selectedTool}
      setTool={setTool}
    />
    <Canvas
      width={window.innerWidth}
      height={window.innerHeight}
      background="rgha(0, 0, 0, .8)"
      onDraw={collectPoint}
      onDrawEnd={onDrawEnd}
    >
      {drawings.map(
        ({ points, color, tool, thickness }, i) =>
          tool === "pen" ? (
            <Path key={i} points={points} color={color} thickness={thickness} />
          ) : tool === "rectangle" ? (
            <Rectangle
              thickness={thickness}
              color={color}
              key={i}
              x0={(points[0] || {}).x}
              y0={(points[0] || {}).y}
              x1={(points[1] || {}).x}
              y1={(points[1] || {}).y}
            />
          ) : (
            l.error("TOOL NON SUPPORTATO")
          )
      )}

      {selectedTool === "pen" ? (
        <Path
          points={points}
          color={selectedColor}
          thickness={selectedThickness}
        />
      ) : selectedTool === "rectangle" ? (
        <Rectangle
          thickness={selectedThickness}
          x0={(points[0] || {}).x}
          y0={(points[0] || {}).y}
          x1={(points[1] || {}).x}
          y1={(points[1] || {}).y}
          color={selectedColor}
        />
      ) : (
        l.error("TOOL NON SUPPORTATO")
      )}
    </Canvas>
  </div>
);

export default App;
