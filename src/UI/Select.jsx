import React from 'react'
import { equals } from 'ramda'
import { makeView } from '../utils'
import Square from './Square'

const SelectMenu = makeView({
  position: 'absolute',
})

const SelectWrapper = makeView({
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
  <SelectWrapper>
    <Square
      direction={direction}
      color={color}
      onClick={onMenuOpen}
      background={background}
    >
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
