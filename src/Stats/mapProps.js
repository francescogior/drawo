import * as R from 'ramda'
import { Props, UIProps } from './types'
import { Point, Drawing } from '../types'

const { round, abs, max, min } = Math

const sum = (a, b) => a + b
const diff = (a, b) => a - b
const distance = (a, b) => abs(diff(a, b))

const toX = (p: Point) => p.x
const toY = (p: Point) => p.y

const drawingLength = (drawing: Drawing) => drawing.points.length

const xs = (drawing: Drawing) => drawing.points.map(toX)
const ys = (drawing: Drawing) => drawing.points.map(toY)

const drawingDiffsX = (drawing: Drawing) => {
  const xsd = xs(drawing)
  return xsd.slice(0, -1).map((_, i) => distance(xsd[i + 1], xsd[i]))
}
const drawingDiffsY = (drawing: Drawing) => {
  const ysd = ys(drawing)
  return ysd.slice(0, -1).map((_, i) => distance(ysd[i + 1], ysd[i]))
}

const drawingDiffSumX = (drawing: Drawing) =>
  drawingDiffsX(drawing).reduce(sum, 0)
const drawingDiffSumY = (drawing: Drawing) =>
  drawingDiffsY(drawing).reduce(sum, 0)

const drawingAvgDiffX = (drawing: Drawing) =>
  drawingDiffSumX(drawing) / drawingLength(drawing)
const drawingAvgDiffY = (drawing: Drawing) =>
  drawingDiffSumY(drawing) / drawingLength(drawing)

const drawingMaxDiffX = (drawing: Drawing) => max(...drawingDiffsX(drawing))
const drawingMaxDiffY = (drawing: Drawing) => max(...drawingDiffsY(drawing))

export default function mapProps({ drawings, points }: Props): UIProps {
  const allPoints = R.flatten(drawings.map((d) => d.points)).concat(points)

  const drawingsCounter = drawings.length
  const pointsCounter = allPoints.length

  const xSum = allPoints.map(toX).reduce(sum, 0)
  const ySum = allPoints.map(toY).reduce(sum, 0)

  const maxMaxX = round(max(...drawings.map(drawingMaxDiffX)))
  const avgMaxX = round(
    drawings.map(drawingMaxDiffX).reduce(sum, 0) / drawingsCounter,
  )
  const maxAvgX = round(max(...drawings.map(drawingAvgDiffX)))
  const avgAvgX = round(
    drawings.map(drawingAvgDiffX).reduce(sum, 0) / drawingsCounter,
  )

  const maxMaxY = round(max(...drawings.map(drawingMaxDiffY)))
  const avgMaxY = round(
    drawings.map(drawingMaxDiffY).reduce(sum, 0) / drawingsCounter,
  )
  const maxAvgY = round(max(...drawings.map(drawingAvgDiffY)))
  const avgAvgY = round(
    drawings.map(drawingAvgDiffY).reduce(sum, 0) / drawingsCounter,
  )

  return {
    pointsCounter,
    drawingsCounter,
    maxMaxX,
    avgAvgX,
    maxMaxY,
    avgAvgY,
  }
}
