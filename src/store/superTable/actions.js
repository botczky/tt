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

export const setSearchAction = (searchQuery) => ({
  type: 'SET_SEARCH',
  payload: {
    searchQuery
  }
})

export const setPageAction = (page) => ({
  type: 'SET_PAGE',
  payload: {
    page
  }
})

export const resetPageAction = () => ({
  type: 'RESET_PAGE',
})

export const sortDataAction = () => ({
  type: 'SORT_DATA',
})

export const filterDataAction = () => ({
  type: 'FILTER_DATA',
})

export const sliceDataAction = () => ({
  type: 'SLICE_DATA',
})

export const calcMaxPageAction = () => ({
  type: 'CALC_MAX_PAGE',
})
