export const getDataAction = () => ({
  type: 'GET_DATA'
})

export const getDataFailureAction = () => ({
  type: 'GET_DATA_FAILURE'
})

export const getDataSuccessAction = (data) => ({
  type: 'GET_DATA_SUCCESS',
  payload: {
    data
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

export const sortDataAction = () => ({
  type: 'SORT_DATA',
})

export const setSearchAction = (searchQuery) => ({
  type: 'SET_SORTING',
  payload: {
    searchQuery
  }
})

export const filterDataAction = () => ({
  type: 'FILTER_DATA',
})
