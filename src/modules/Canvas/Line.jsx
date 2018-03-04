import React from "react";

const Line = ({ x0, y0, x1, y1, color, thickness }) => (
  <line
    x1={x0}
    y1={y0}
    x2={x1}
    y2={y1}
    fill={"transparent"}
    strokeWidth={thickness}
    stroke={color}
  />
);

export default Line;
