import React from "react";

const Path = ({ points, color, thickness, clipPath }) => (
  <path
    clipPath={clipPath}
    fill="transparent"
    stroke={color || "black"}
    strokeWidth={thickness}
    strokeLinecap="round"
    strokeLinejoin="round"
    d={pointsToD(points)}
  />
);

const pToString = ({ x, y }) => `${x} ${y}`;
const psToString = ([{ x: x1, y: y1 }, { x: x2, y: y2 }]) =>
  `${x1} ${y1} ${x2} ${y2}`;

const pointsToD = points =>
  points.length > 3
    ? betterPointsToD(points)
    : `M${points.map(pToString).join(" L ")}`;

const betterPointsToD = points =>
  `M${pToString(points[0])} Q ${addMidPoints(points.slice(1, -1))
    .map(psToString)
    .join(" Q ")} Q ${points
    .slice(-2)
    .map(pToString)
    .join(" ")}`;

const addMidPoints = points =>
  points
    .map((curPoint, curIndex) => {
      return curIndex === points.length - 1
        ? null
        : [curPoint, midPoint(curPoint, points[curIndex + 1])];
    })
    .slice(0, -1);

const midPoint = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => ({
  x: (x1 + x2) / 2,
  y: (y1 + y2) / 2
});

export const stringPathToPoints = stringPath => {
  if (stringPath[0] !== "M") throw "stringPath should start with M";
};

export default Path;
