import React from "react";

const { abs, min } = Math;

const Point = ({ x0, y0, color, thickness }) => (
  <ellipse cx={x0} cy={y0} rx={thickness / 2} ry={thickness / 2} fill={color} />
);

export default Point;
