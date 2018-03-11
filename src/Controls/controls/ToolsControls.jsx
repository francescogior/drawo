import React from 'react'
import { connect, update } from '../../modules/ReactApp/ReactApp'
import { toolIcons } from '../../icons'
import Select from '../../UI/Select'

const ToolsControls = connect([
  'tools',
  'selectedTool',
  'isToolMenuOpen',
  'selectedColor',
])(
  update(['setTool', 'openToolMenu', 'closeToolMenu'])(
    ({
      isToolMenuOpen,
      selectedTool,
      tools,
      selectedColor,
      setTool,
      closeToolMenu,
      openToolMenu,
    }) => (
      <Select
        isMenuOpen={isToolMenuOpen}
        selectedValue={selectedTool}
        background="rgba(255, 255, 255, .8)"
        elements={tools.map((tool) => ({
          value: tool,
          label: toolIcons({ color: selectedColor })[tool],
        }))}
        onSelect={setTool}
        onMenuClose={closeToolMenu}
        onMenuOpen={openToolMenu}
      />
    ),
  ),
)

export default ToolsControls
