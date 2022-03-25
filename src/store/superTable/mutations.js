import { search } from './service'

export const sortDataMutation = (state) => {
  const { sortingKey: key, sortingDirection: direction } = state

  let sortedData

  if (key === 'id') {
    sortedData = [...state.data] // т.к. изначально сортированны по id
  } else {
    sortedData = [...state.data].sort((item1, item2) => {
      const value1 = item1[key]
      const value2 = item2[key]

      return value1.localeCompare(value2)
    })
  }

  if (direction === 'desc') {
    sortedData = [...sortedData].reverse()
  }

  return {
    ...state,
    sortedData,
  }
}

export const filterDataMutation = (state) => {
  const { searchQuery } = state

  let filteredData

  if (!searchQuery) {
    filteredData = [...state.sortedData]
  } else {
    filteredData = search(state.sortedData, searchQuery)
  }

  return {
    ...state,
    filteredData,
  }
}

export const sliceDataMutation = (state) => {
  const { page } = state

  return {
    ...state,
    slicedData: state.filteredData.slice((page - 1) * 50, page * 50),
  }
}

export const calcMaxPageMutation = (state) => {
  return {
    ...state,
    maxPage: Math.ceil(state.filteredData.length / 50),
  }
}
