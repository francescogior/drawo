import { l } from './utils'
const SEP1 = ','
const SEP2 = ';'
const SEP3 = '$'
const SEP4 = '£'

const t = (x) => x

const stringifyPoints = (points) =>
  points.map((p) => [p.x, p.y].join(SEP1)).join(SEP2)

const parsePoints = (pointsString) =>
  pointsString
    .split(SEP2)
    .filter(t)
    .map((pointString) => {
      const [x, y] = pointString.split(SEP1).filter(t)
      return { x: parseInt(x, 10), y: parseInt(y, 10) }
    })

export const stringify = (drawings) =>
  btoa(
    drawings
      .map(({ tool, color, thickness, id, points }) =>
        [tool, color, thickness, id, stringifyPoints(points)].join(
          SEP3,
        ),
      )
      .join(SEP4),
  )

export const parse = (drawingsString) =>
  atob(drawingsString)
    .split(SEP4)
    .filter(t)
    .map((drawingString) => {
      const [tool, color, thickness, id, pointsString] = drawingString.split(
        SEP3,
      )

      return {
        tool,
        color,
        thickness: parseInt(thickness, 10),
        id,
        points: parsePoints(pointsString),
      }
    })
