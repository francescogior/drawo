import React from 'react'
import { connect, update } from '../../modules/ReactApp/ReactApp'
import { clearIcon } from '../../icons'
import { getDirection, filterBeforeLastClear } from '../../utils'
import Square from '../../UI/Square'

const ClearControls = connect(['drawings', 'viewport'])(
  update(['onClear'])(({ drawings, viewport, onClear }) => (
    <Square
      visible={filterBeforeLastClear(drawings).length > 0}
      direction={getDirection(viewport)}
      background={'rgba(255,255,255,.8)'}
      color={'rgba(0,0,0,.8)'}
      onClick={onClear}
    >
      {clearIcon}
    </Square>
  )),
)

export default ClearControls
