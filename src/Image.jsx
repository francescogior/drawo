// @flow
import React from 'react'

import { noop } from './utils'

export type Props = {|
  src: string,
  height: number,
  width: number,
|}

const collectPointTouch = ({ touches }) => {
  const [touch, ...otherTouches] = [...touches]
  if (
    touch !== undefined &&
    touch !== null &&
    Number.isFinite(touch.clientX) &&
    Number.isFinite(touch.clientY)
  ) {
    return { x: touch.clientX, y: touch.clientY, otherTouches }
  }
  throw new Error('Something is wrong in collectPointTouch')
}

const collectPointCursor = ({ offsetX, offsetY }) => {
  try {
    return { x: offsetX, y: offsetY }
  } catch (error) {
    throw new Error('Something is wrong in collectPointCursor', { error })
  }
}

export default class Image extends React.Component {
  static defaultProps = {
    onDragStart: noop,
    onDrag: noop,
    onDragEnd: noop,
  }

  componentDidMount() {
    this.readyToStartDrag()
  }

  componentWillUnmount() {
    this.notReadyToStartDrag()
  }

  readyToStartDrag = () => {
    this.image.addEventListener('mousedown', this.onDragStart)
    this.image.addEventListener('touchstart', this.onDragStart)
  }

  notReadyToStartDrag = () => {
    this.image.removeEventListener('mousedown', this.onDragStart)
    this.image.removeEventListener('touchstart', this.onDragStart)
  }

  readyToFinishDrag = () => {
    this.image.addEventListener('touchend', this.onDragEnd)
    this.image.addEventListener('mouseup', this.onDragEnd)
  }

  notReadyToFinishDrag = () => {
    this.image.removeEventListener('touchend', this.onDragEnd)
    this.image.removeEventListener('mouseup', this.onDragEnd)
  }

  notReadyToDrag = () => {
    this.image.removeEventListener('mousemove', this.passPointCursor)
    this.image.removeEventListener('touchmove', this.passPointTouch)
  }

  passPoint = method => (e) => {
    this.props.onDrag(method(e))
  }

  passPointCursor = (e) => {
    e.stopPropagation()
    this.props.onDrag(collectPointCursor(e))
  }

  passPointTouch = (e) => {
    e.stopPropagation()
    this.props.onDrag(collectPointTouch(e))
  }

  onDragStart = (e) => {
    e.stopPropagation()
    this.props.onDragStart()
    this.notReadyToStartDrag()
    this.readyToFinishDrag()
    if (e.touches) {
      this.passPointTouch(e)
      this.image.addEventListener('touchmove', this.passPointTouch)
    } else {
      this.passPointCursor(e)
      this.image.addEventListener('mousemove', this.passPointCursor)
    }
  }

  onDragEnd = () => {
    this.props.onDragEnd()
    this.notReadyToDrag()
    this.readyToStartDrag()
  }

  render() {
    const {
      src, width, height, x, y,
    } = this.props

    return (
      <image
        ref={(image) => { this.image = image }}
        x={x}
        y={y}
        style={{ cursor: 'move' }}
        href={src}
        height={height / (window.devicePixelRatio || 2)} // eslint-disable-line no-undef
        width={width / (window.devicePixelRatio || 2)} // eslint-disable-line no-undef
      />
    )
  }
}
