import { range } from "ramda";

const START_COLOR = [0, 0, 0];
const END_COLOR = [255, 255, 255];
const NUMBEROFCOLORS = 10;
const BOH = { r: 3, g: 47, b: 222 };
const TRANSPARENCY = 0.8;

const step = numberOfColors => (cStart, cEnd) =>
  Math.abs(Math.round((cStart - cEnd) / numberOfColors));
const direction = (cStart, cEnd) => (cEnd > cStart ? 1 : -1);
const mod256 = n => (n + 256) % 256;
const arrayColorToString = rgbArr =>
  `rgba(${rgbArr.join(",")},${TRANSPARENCY})`;
const makeGradient = numberOfColors => ([r1, g1, b1], [r2, g2, b2]) => {
  const rStep = step(numberOfColors)(r1, r2);
  const rDirection = direction(r1, r2);
  const gStep = step(numberOfColors)(g1, g2);
  const gDirection = direction(g1, g2);
  const bStep = step(numberOfColors)(b1, b2);
  const bDirection = direction(b1, b2);
  return range(0, numberOfColors).map(i =>
    [
      r1 +
        i * rStep * rDirection +
        i * BOH.r * Math.round(256 * numberOfColors / (i + 1)),
      g1 +
        i * gStep * gDirection +
        i * BOH.g * Math.round(256 * numberOfColors / (i + 1)),
      b1 +
        i * bStep * bDirection +
        i * BOH.b * Math.round(256 * numberOfColors / (i + 1))
    ].map(mod256)
  );
};
const colors_ = makeGradient(NUMBEROFCOLORS)(START_COLOR, END_COLOR).map(
  arrayColorToString
);

const REDDISH = [200, 50, 50];
const GREENISH = [50, 200, 50];
const BLUEISH = [50, 50, 200];
const BLACKISH = [50, 50, 50];
const WHITISH = [200, 200, 200];
const colors = [BLACKISH, REDDISH, GREENISH, BLUEISH, WHITISH].map(
  arrayColorToString
);

export default colors;
