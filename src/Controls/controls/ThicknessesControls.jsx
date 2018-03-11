import React from 'react'
import { connect, update } from '../../modules/ReactApp/ReactApp'
import { thicknessIcon } from '../../icons'
import Select from '../../UI/Select'

const ThicknessesControls = connect([
  'thicknesses',
  'selectedThickness',
  'isThicknessMenuOpen',
  'selectedColor',
])(
  update(['setThickness', 'openThicknessMenu', 'closeThicknessMenu'])(
    ({
      isThicknessMenuOpen,
      selectedThickness,
      thicknesses,
      selectedColor,
      setThickness,
      closeThicknessMenu,
      openThicknessMenu,
    }) => (
      <Select
        isMenuOpen={isThicknessMenuOpen}
        selectedValue={selectedThickness}
        background="rgba(255, 255, 255, .8)"
        color={selectedColor}
        elements={thicknesses.map((thickness) => ({
          value: thickness,
          label: thicknessIcon(thickness, { color: selectedColor }),
        }))}
        onSelect={setThickness}
        onMenuClose={closeThicknessMenu}
        onMenuOpen={openThicknessMenu}
      />
    ),
  ),
)

export default ThicknessesControls
