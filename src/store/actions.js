import { getData } from './service'

export const setDataAction = (data) => ({
  type: 'SET_DATA',
  payload: {
    data
  }
})

export const setStatusAction = (status) => ({
  type: 'SET_STATUS',
  payload: {
    status
  }
})

export const setSortingAction = (sortingKey, sortingDirection) => ({
  type: 'SET_SORTING',
  payload: {
    sortingKey,
    sortingDirection
  }
})

export const resetSortingAction = () => ({
  type: 'RESET_SORTING',
})

export const searchAction = (searchText) => ({
  type: 'SEARCH',
  payload: {
    searchText
  }
})

export const fetchDataAction = () => async (dispatch) => {
  try {
    dispatch(setStatusAction('loading'))
    dispatch(setDataAction(await getData()))
    dispatch(setStatusAction('success'))
  } catch {
    dispatch(setStatusAction('failure'))
  }
}
