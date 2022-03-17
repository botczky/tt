import produce from 'immer'
import { initialState } from './constants'
import {
  sortDataMutation,
  filterDataMutation,
  calcMaxPageMutation,
  sliceDataMutation,
} from './mutations'

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
      case 'SET_SEARCH':
        draft.searchQuery = payload.searchQuery
        break
      case 'SET_PAGE':
        draft.page = payload.page
        break
      case 'RESET_PAGE':
        draft.page = initialState.page
        break
      /* ===
       * CALLED FROM SAGA EFFECTS
       */
      case 'SORT_DATA':
        return sortDataMutation(state)
      case 'FILTER_DATA':
        return filterDataMutation(state)
      case 'CALC_MAX_PAGE':
        return calcMaxPageMutation(state)
      case 'SLICE_DATA':
        return sliceDataMutation(state)
      default:
        break
    }
  })

export default superTableReducer
