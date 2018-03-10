import React, { Fragment as _ } from "react";
import cxs from "cxs";
import stylexs from "cxs/component";
import {
  toolIcons,
  thicknessIcon,
  clearIcon,
  undoIcon,
  redoIcon
} from "./icons";
import Point from "./modules/Canvas/Point";
import Icon, { ICON_COLOR, ICON_SIZE } from "./Icon";

const makeView = stylexs("div");

const Square = makeView(
  ({ direction, size, children, selected, background, color, visible }) => ({
    visibility: visible === false ? "hidden" : "visible",
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
  <_>
    {colors.map(color => (
      <Square
        direction={direction}
        key={color}
        background={color}
        selected={selectedColor === color}
        onClick={() => setColor(color)}
      />
    ))}
  </_>
);

const Tools = ({ direction, tools, selectedTool, setTool }) => (
  <_>
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
  </_>
);

const Thicknesses = ({
  direction,
  thicknesses,
  selectedThickness,
  setThickness
}) => (
  <_>
    {thicknesses.map(thickness => (
      <Square
        direction={direction}
        key={thickness}
        background={"rgba(0,0,0,.8)"}
        color="white"
        selected={selectedThickness === thickness}
        onClick={() => setThickness(thickness)}
      >
        {thicknessIcon(thickness)}
      </Square>
    ))}
  </_>
);

const Clear = ({ direction, onClear }) => (
  <Square
    direction={direction}
    background={"rgba(0,0,0,.8)"}
    color="white"
    onClick={onClear}
  >
    {clearIcon}
  </Square>
);

const UndoAndRedo = ({ direction, onUndo, onRedo, redoable, undoable }) => (
  <_>
    <Square
      visible={undoable}
      direction={direction}
      background={"rgba(0,0,0,.8)"}
      color="white"
      onClick={onUndo}
    >
      {undoIcon}
    </Square>
    <Square
      visible={redoable}
      direction={direction}
      background={"rgba(0,0,0,.8)"}
      color="white"
      onClick={onRedo}
    >
      {redoIcon}
    </Square>
  </_>
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
  setThickness,
  onClear,
  onUndo,
  onRedo,
  redoable,
  undoable
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
    <Space
      vertical={direction === "column" ? 30 : 0}
      horizontal={direction === "row" ? 30 : 0}
    />
    <Clear direction={direction} onClear={onClear} />
    <Space
      vertical={direction === "column" ? 30 : 0}
      horizontal={direction === "row" ? 30 : 0}
    />
    <UndoAndRedo
      direction={direction}
      onUndo={onUndo}
      onRedo={onRedo}
      redoable={redoable}
      undoable={undoable}
    />
  </div>
);

export default stylexs(Controls)(({ direction }) => ({
  position: "absolute",
  zIndex: 1,
  display: "flex",
  flexDirection: direction
}));
