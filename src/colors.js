// @flow
import type { Color, RGBAColor } from './domain'

const DEFAULT_ALPHA = 0.8

const toColorString = (rgba: RGBAColor): Color =>
  (rgba.length === 3 ? `rgba(${rgba.join(',')},${DEFAULT_ALPHA})` : `rgba(${rgba.join(',')})`)

const REDDISH: RGBAColor = [200, 50, 50]
const GREENISH: RGBAColor = [50, 200, 50]
const BLUEISH: RGBAColor = [50, 50, 200]
const BLACKISH: RGBAColor = [0, 0, 0]
const GIALLISH: RGBAColor = [230, 220, 10]

const colors: Color[] = [BLUEISH, BLACKISH, REDDISH, GREENISH, GIALLISH].map(toColorString)

export default colors
