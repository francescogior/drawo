import React from 'react'
import PropTypes from 'prop-types'
import { makeView } from '../utils'

const Square = makeView(
  ({ direction, size, children, selected, background, color, visible }) => ({
    visibility: visible === false ? 'hidden' : 'visible',
    height: `50px`,
    width: `50px`,
    cursor: 'pointer',
    transition: 'transform .2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background,
    ':active': {
      transform: 'scale(.9, .9)',
    },
    boxShadow: `0 0 10px rgba(0,0,0,.3)`,
    color,
  }),
)

Square.propTypes = {
  visible: PropTypes.bool,
}

export default Square
