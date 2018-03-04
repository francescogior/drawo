import React from "react";

const { sqrt, pow } = Math;
const distance = (p1, p0) => sqrt(pow(p1.x - p0.x, 2) + pow(p1.y - p0.y, 2));

const Circle = ({ x0, y0, x1 = x0, y1 = y0, color, thickness }) =>
  !x0 && !y0 ? null : !x1 && !y1 ? (
    <ellipse
      cx={x0}
      cy={y0}
      rx={thickness / 2}
      ry={thickness / 2}
      fill={color}
    />
  ) : (
    <circle
      cx={x0}
      cy={y0}
      r={distance({ x: x1, y: y1 }, { x: x0, y: y0 })}
      fill={"transparent"}
      strokeWidth={thickness}
      stroke={color}
    />
  );

export default Circle;
