import produce from 'immer'
import { intialState } from './constants'

const superTableReducer = (state = intialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'GET_DATA':
        draft.status = 'loading'
        break
      case 'GET_DATA_FAILURE':
        draft.status = 'failure'
        break
      case 'GET_DATA_SUCCESS':
        draft.data = action.payload.data
        draft.status = 'success'
        break
      default:
        break
    }
  })

export default superTableReducer
