import { combineReducers } from 'redux'
import { superTableReducer } from './superTable'

const rootReducer = combineReducers({
  superTable: superTableReducer,
})

export default rootReducer
