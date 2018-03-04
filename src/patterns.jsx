import React from "react";
import Pattern from "./modules/Canvas/Pattern";

type Props = {
  size?: number
};
export const Squared = ({ size = 20 }: Props) => (
  <Pattern height={size} width={size}>
    <line
      x1="0"
      y1="0"
      x2="0"
      y2={size}
      strokeWidth={2}
      stroke="rgba(0, 0, 0, .2)"
    />
    <line
      x1="0"
      y1="0"
      x2={size}
      y2="0"
      strokeWidth={2}
      stroke="rgba(0, 0, 0, .2)"
    />
  </Pattern>
);
