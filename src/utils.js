// @flow
import { findLastIndex, propEq, slice } from 'ramda'
import stylexs from 'cxs/component'

import type { Drawing, Viewport, Id } from './domain'

const { random, floor } = Math

const L = logger => (...x: mixed[]): mixed => {
  logger('l', ...x)
  return x[0]
}
export const l = L(console.log) // eslint-disable-line no-console
l.error = L(console.error) // eslint-disable-line no-console

export const lf = (fn: Function) => (...args: any[]) => l(fn(...args.map(l)))

export const noop = () => {}
export const identity = x => x

export const removeRedoneUndos = drawings => drawings.reduce((acc, drawing, index) => {
  if (drawing.tool === 'redo') {
    const shouldBeUndo = acc[index - 1]
    if (shouldBeUndo != null && shouldBeUndo.tool !== 'undo') throw Error(`Expected to void undo but found${JSON.stringify(shouldBeUndo)}`)
    return acc.slice(0, -1)
  }
  return acc.concat(drawing)
}, [])

export const computeUndosAndRedos = (drawings: Drawing[]): Drawing[] => {
  const drawingsWithClearedRedoneUndos = removeRedoneUndos(drawings)

  const drawingsWithClearedUndoneDrawings = drawingsWithClearedRedoneUndos.reduce((acc, drawing, index) => {
    if (drawing.tool === 'undo') {
      const shouldNotBeUndoOrRedo = acc[index - 1]
      if (shouldNotBeUndoOrRedo != null && ['undo', 'redo'].includes(shouldNotBeUndoOrRedo.tool)) throw Error(`Expected to void a drawing but found${JSON.stringify(shouldNotBeUndoOrRedo)}`)
      return acc.slice(0, -1)
    }
    return acc.concat(drawing)
  }, [])

  return drawingsWithClearedUndoneDrawings
}

export const filterBeforeLastClear = (drawings: Drawing[]): Drawing[] =>
  slice(findLastIndex(propEq('tool', 'clear'), drawings) + 1, Infinity, drawings)

export const getDirection = (viewport: Viewport) =>
  (viewport.width >= viewport.height ? 'row' : 'column')

export const makeView = stylexs('div')
export const view = stylexs('div')

export const makeId = (): Id => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('')
  let id = ''
  while (id.length < 12) id += alphabet[floor(random() * alphabet.length)]
  return id
}
