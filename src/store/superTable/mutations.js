export const sortDataMutation = (state) => {
  const {
    data,
    sortingKey: key,
    sortingDirection: direction
  } = state

  if (key === 'id') {
    state.sortedData = data // т.к. изначально сортированны по id
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
