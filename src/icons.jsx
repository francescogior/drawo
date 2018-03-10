import React from "react";
import Rectangle from "./modules/Canvas/Rectangle";
import Path from "./modules/Canvas/Path";
import Circle from "./modules/Canvas/Circle";
import Point from "./modules/Canvas/Point";
import Line from "./modules/Canvas/Line";
import Icon, { ICON_COLOR, ICON_SIZE } from "./Icon";

const iconPenPathPoints = size =>
  [
    [1 * size / 6, 3 * size / 4],
    [size / 5, size / 4],
    [size / 2, 3 * size / 4],
    [5 * size / 6, 1 * size / 6]
  ].map(([x, y]) => ({ x, y }));

const iconArrowPathPoints = size =>
  [
    [1 * size / 7, 3 * size / 6],
    [2 * size / 7, 2 * size / 6],
    [5 * size / 7, 2 * size / 6],
    [6 * size / 7, 3 * size / 6]
  ].map(([x, y]) => ({ x, y }));

const iconArrowPathPointsUndo = size =>
  [
    [3 * size / 14, 3 * size / 12],
    [2 * size / 14, 6 * size / 12],
    [5 * size / 14, 7 * size / 12]
  ].map(([x, y]) => ({ x, y }));

const iconArrowPathPointsRedo = size =>
  [
    [11 * size / 14, 3 * size / 12],
    [12 * size / 14, 6 * size / 12],
    [9 * size / 14, 7 * size / 12]
  ].map(([x, y]) => ({ x, y }));

const IconPen = ({ color, size }) => (
  <Icon size={size}>
    <Path
      points={iconPenPathPoints(size)}
      color={color}
      thickness={size / 10}
    />
  </Icon>
);

const IconRectangle = ({ color, size }) => (
  <Icon size={size}>
    <Rectangle
      x0={size / 5}
      y0={3 * size / 10}
      x1={4 * size / 5}
      y1={7 * size / 10}
      color={color}
      thickness={size / 10}
    />
  </Icon>
);

const IconCircle = ({ color, size }) => (
  <Icon size={size}>
    <Circle
      x0={size / 2}
      y0={size / 2}
      r={size / 4}
      color={color}
      thickness={size / 10}
    />
  </Icon>
);

const IconLine = ({ color, size }) => (
  <Icon size={size}>
    <Line
      x0={3 * size / 4}
      y0={size / 4}
      x1={size / 3}
      y1={3 * size / 4}
      color={color}
      thickness={size / 10}
    />
  </Icon>
);

const IconX = ({ color, size }) => (
  <Icon size={size}>
    <Line
      x0={size / 4}
      y0={size / 4}
      x1={3 * size / 4}
      y1={3 * size / 4}
      color={color}
      thickness={size / 7}
    />
    <Line
      x0={3 * size / 4}
      y0={size / 4}
      x1={size / 4}
      y1={3 * size / 4}
      color={color}
      thickness={size / 7}
    />
  </Icon>
);

const IconArrow = ({ undo, color, size }) => (
  <Icon size={size}>
    <Path
      points={iconArrowPathPoints(size)}
      color={color}
      thickness={size / 10}
    />
    <Path
      points={
        undo ? iconArrowPathPointsUndo(size) : iconArrowPathPointsRedo(size)
      }
      color={color}
      thickness={size / 10}
    />
  </Icon>
);

export const toolIcons = {
  pen: <IconPen color={ICON_COLOR} size={ICON_SIZE} />,
  rectangle: <IconRectangle color={ICON_COLOR} size={ICON_SIZE} />,
  circle: <IconCircle color={ICON_COLOR} size={ICON_SIZE} />,
  line: <IconLine color={ICON_COLOR} size={ICON_SIZE} />
};

export const thicknessIcon = thickness => (
  <Icon size={ICON_SIZE}>
    <Point
      x0={ICON_SIZE / 2}
      y0={ICON_SIZE / 2}
      color={ICON_COLOR}
      thickness={thickness}
    />
  </Icon>
);

export const clearIcon = <IconX color={ICON_COLOR} size={ICON_SIZE} />;

export const undoIcon = <IconArrow undo color={ICON_COLOR} size={ICON_SIZE} />;
export const redoIcon = <IconArrow color={ICON_COLOR} size={ICON_SIZE} />;
