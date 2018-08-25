// @flow
// import { l } from './utils'
import type { Drawing, Point } from './domain'

const SEP1 = ','
const SEP2 = ';'
const SEP3 = '$'
const SEP4 = '£'

const trueish = (x: mixed): boolean => !!x

const stringifyPoints = (points: Point[]) => points.map(p => [p.x, p.y].join(SEP1)).join(SEP2)

const parsePoints = (pointsString): Point[] =>
  pointsString
    .split(SEP2)
    .filter(trueish)
    .map((pointString) => {
      const [x, y] = pointString.split(SEP1).filter(trueish)
      return { x: parseInt(x, 10), y: parseInt(y, 10) }
    })

export const stringify = (drawings: Drawing[]) =>
  btoa(drawings // eslint-disable-line no-undef
    .map(({
      tool, color, thickness, id, points,
    }) => [tool, color, thickness, id, stringifyPoints(points)].join(SEP3))
    .join(SEP4))

export const parse = (drawingsString: string): Drawing[] =>
  atob(drawingsString) // eslint-disable-line no-undef
    .split(SEP4)
    .filter(trueish)
    .map((drawingString) => {
      const [tool, color, thickness, id, pointsString] = drawingString.split(SEP3)

      return {
        // $FlowIssue boh
        tool,
        color,
        thickness: parseInt(thickness, 10),
        id,
        points: parsePoints(pointsString),
      }
    })
