export const sortDataMutation = (state) => {
  const {
    sortingKey: key,
    sortingDirection: direction
  } = state

  if (key === 'id') {
    state.sortedData = state.data // т.к. изначально сортированны по id
  } else {
    state.sortedData.sort((item1, item2) => {
      const value1 = item1[key]
      const value2 = item2[key]

      return value1.localeCompare(value2)
    })
  }

  if (direction === 'desc') {
    state.sortedData.reverse()
  }
}

export const filterData = (state) => {
  const {
    searchQuery
  } = state

  if (searchQuery) {
    state.filterData = state.data
  } else {
    state.filteredData = state.data.filter((item) => {
      return Object.values(item).filter((value) => {
        return typeof value === 'number'
          ? value.toString() === searchQuery
          : value.includes(searchQuery)
      }).length
    })
  }
}
