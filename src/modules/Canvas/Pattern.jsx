import React from "react";

export type Props = {
  width: number,
  height: number,
  children: any // TODO better type
};

export default function Pattern({ width, height, children }: Props) {
  return (
    <pattern
      id="PatternBackground"
      patternUnits="userSpaceOnUse"
      x="0"
      y="0"
      width={width}
      height={height}
    >
      {children}
    </pattern>
  );
}
