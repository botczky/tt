import produce from 'immer'
import { initialState } from './constants'
import { sortDataMutation, filterDataMutation } from './mutations'

const superTableReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action

    switch (type) {
      case 'GET_DATA':
        draft.status = 'loading'
        break
      case 'GET_DATA_FAILURE':
        draft.status = 'failure'
        break
      case 'GET_DATA_SUCCESS':
        draft.data = payload.data
        draft.status = 'success'
        break
      case 'SET_SORTING':
        draft.sortingKey = payload.sortingKey
        draft.sortingDirection = payload.sortingDirection
        break
      case 'RESET_SORTING':
        draft.sortingKey = initialState.sortingKey
        draft.sortingDirection = initialState.sortingDirection
        break
      case 'SORT_DATA':
        sortDataMutation(draft)
        break
      case 'SET_SEARCH':
        draft.searchQuery = payload.searchQuery
        break
      case 'FILTER_DATA':
        filterDataMutation(draft)
        break
      default:
        break
    }
  })

export default superTableReducer
