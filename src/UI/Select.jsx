import React from 'react'
import { equals } from 'ramda'
import { view } from '../utils'
import Square from './Square'

const SelectMenu = view({
  position: 'absolute',
})

const SelectWrapper = view({
  position: 'relative',
})

const Select = ({
  direction,
  elements,
  onSelect,
  selectedValue,
  isMenuOpen,
  onMenuOpen,
  onMenuClose,
  color = 'white',
  background,
}) => (
  <SelectWrapper onMouseOver={onMenuOpen} onMouseLeave={onMenuClose}>
    <Square direction={direction} color={color} background={background}>
      {elements.find((el) => equals(el.value, selectedValue)).label}
    </Square>
    {isMenuOpen && (
      <SelectMenu>
        {elements
          .filter((el) => !equals(el.value, selectedValue))
          .map(({ value, label }) => (
            <Square
              direction={direction}
              background={background}
              color={color}
              key={JSON.stringify(value)}
              onClick={() => {
                onMenuClose()
                onSelect(value)
              }}
            >
              {label}
            </Square>
          ))}
      </SelectMenu>
    )}
  </SelectWrapper>
)

export default Select
