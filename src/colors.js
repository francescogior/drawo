import { range } from "ramda";

export type _Color = [number, number, number];
export type Color = string;

const TRANSPARENCY = 0.8;
const arrayColorToString = (rgbArr: _Color): Color =>
  `rgba(${rgbArr.join(",")},${TRANSPARENCY})`;

const REDDISH: _Color = [200, 50, 50];
const GREENISH: _Color = [50, 200, 50];
const BLUEISH: _Color = [50, 50, 200];
const BLACKISH: _Color = [50, 50, 50];
const WHITISH: _Color = [200, 200, 200];

const colors: Colors[] = [BLACKISH, REDDISH, GREENISH, BLUEISH, WHITISH].map(
  arrayColorToString
);

export default colors;
