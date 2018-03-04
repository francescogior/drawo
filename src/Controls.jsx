import React from "react";
import cxs from "cxs";
import stylexs from "cxs/component";
import { toolIcons } from "./tools";
import Point from "./modules/Canvas/Point";
import Icon, { ICON_COLOR, ICON_SIZE } from "./Icon";

const makeView = stylexs("div");

const Square = makeView(
  ({ direction, size, children, selected, background, color }) => ({
    height: `${40 + (selected && direction === "row" ? 20 : 0)}px`,
    width: `${40 + (selected && direction === "column" ? 20 : 0)}px`,
    cursor: "pointer",
    transition: "width .2s, height .2s, box-shadow .5s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background,
    boxShadow: `${selected ? "6px" : "3px"} 3px 5px rgba(0,0,0,.3)`,
    color
  })
);

const Space = makeView(({ vertical, horizontal }) => ({
  marginLeft: `${horizontal}px`,
  marginRight: `${horizontal}px`,
  marginTop: `${vertical}px`,
  marginBottom: `${vertical}px`
}));

const Colors = ({ direction, colors, selectedColor, setColor }) => (
  <React.Fragment>
    {colors.map(color => (
      <Square
        direction={direction}
        key={color}
        background={color}
        selected={selectedColor === color}
        onClick={() => setColor(color)}
      />
    ))}
  </React.Fragment>
);

const Tools = ({ direction, tools, selectedTool, setTool }) => (
  <React.Fragment>
    {tools.map(tool => (
      <Square
        direction={direction}
        key={tool}
        background={"rgba(0,0,0,.8)"}
        color="white"
        selected={selectedTool === tool}
        onClick={() => setTool(tool)}
      >
        {toolIcons[tool] || tool[0].toUpperCase()}
      </Square>
    ))}
  </React.Fragment>
);

const Thicknesses = ({
  direction,
  thicknesses,
  selectedThickness,
  setThickness
}) => (
  <React.Fragment>
    {thicknesses.map(thickness => (
      <Square
        direction={direction}
        key={thickness}
        background={"rgba(0,0,0,.8)"}
        color="white"
        selected={selectedThickness === thickness}
        onClick={() => setThickness(thickness)}
      >
        <Icon size={ICON_SIZE}>
          <Point
            x0={ICON_SIZE / 2}
            y0={ICON_SIZE / 2}
            color={ICON_COLOR}
            thickness={thickness}
          />
        </Icon>
      </Square>
    ))}
  </React.Fragment>
);

const Controls = ({
  direction,
  className,
  colors,
  selectedColor,
  setColor,
  tools,
  selectedTool,
  setTool,
  thicknesses,
  selectedThickness,
  setThickness
}) => (
  <div className={className}>
    <Colors
      direction={direction}
      colors={colors}
      selectedColor={selectedColor}
      setColor={setColor}
    />
    <Space
      vertical={direction === "column" ? 30 : 0}
      horizontal={direction === "row" ? 30 : 0}
    />
    <Tools
      direction={direction}
      tools={tools}
      selectedTool={selectedTool}
      setTool={setTool}
    />
    <Space
      vertical={direction === "column" ? 30 : 0}
      horizontal={direction === "row" ? 30 : 0}
    />
    <Thicknesses
      direction={direction}
      thicknesses={thicknesses}
      selectedThickness={selectedThickness}
      setThickness={setThickness}
    />
  </div>
);

export default stylexs(Controls)(({ direction }) => ({
  position: "absolute",
  zIndex: 1,
  display: "flex",
  flexDirection: direction
}));
