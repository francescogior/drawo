import React from "react";

const { abs, min } = Math;

const Rectangle = ({ x0, y0, x1 = x0, y1 = y0, color, thickness }) =>
  !x0 && !y0 ? null : !x1 && !y1 ? (
    <ellipse
      cx={x0}
      cy={y0}
      rx={thickness / 2}
      ry={thickness / 2}
      fill={color}
    />
  ) : (
    <rect
      x={min(x0, x1)}
      y={min(y0, y1)}
      width={abs(x1 - x0)}
      height={abs(y1 - y0)}
      stroke={color}
      strokeWidth={thickness}
      fill="transparent"
    />
  );

export default Rectangle;
