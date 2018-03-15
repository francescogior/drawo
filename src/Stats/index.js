import { connect } from '../modules/ReactApp/ReactApp'
import UI from './UI'
import mapProps from './mapProps'

export default connect(['drawings', 'points'], mapProps)(UI)
