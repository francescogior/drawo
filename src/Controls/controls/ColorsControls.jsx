import React from 'react'
import { connect, update } from '../../modules/ReactApp/ReactApp'
import Square from '../../UI/Square'
import Select from '../../UI/Select'

const ColorsControls = connect(['colors', 'selectedColor', 'isColorMenuOpen'])(update(['setColor', 'openColorMenu', 'closeColorMenu'])(({
  isColorMenuOpen, selectedColor, colors, setColor, closeColorMenu, openColorMenu,
}) => (
  <Select
    isMenuOpen={isColorMenuOpen}
    selectedValue={selectedColor}
    elements={colors.map(color => ({
          value: color,
          label: <Square background={color} />,
        }))}
    onSelect={setColor}
    onMenuClose={closeColorMenu}
    onMenuOpen={openColorMenu}
  />
)))

export default ColorsControls
