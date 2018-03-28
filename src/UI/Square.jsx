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
    opacity: 0.7,
    background,
    ':active': {
      transform: 'scale(.9, .9)',
    },
    ':hover': {
      opacity: 1,
    },
    borderRight: '1px solid rgba(0,0,0,.1)',
    borderBottom: '1px solid rgba(0,0,0,.1)',
    color,
  }),
)

Square.propTypes = {
  visible: PropTypes.bool,
}

export default Square
