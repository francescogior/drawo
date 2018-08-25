// @flow
import React from 'react'

export type Props = {|
  src: string,
  height: number,
  width: number,
|}


export default function Image({
  src, width, height,
}: Props) {
  return (
    <image
      href={src}
      height={height / (window.devicePixelRatio || 2)} // eslint-disable-line no-undef
      width={width / (window.devicePixelRatio || 2)} // eslint-disable-line no-undef
    />
  )
}
