import { keys } from './constants'

const initialState = {
  keys,
  data: null, // crud & sorting
  rows: null, // search & pagination
  status: null,
  searchText: '',
  sortingKey: 'id',
  sortingDirection: 'asc',
}

const reducer = (state = initialState, action) => {
  // const rows = [...state.rows]
  // почему я не могу обьявить const rows в каждом блоке case
  // тоесть почему 'Cannot redeclare block-scoped variable 'rows'. ts(2451)'
  // и почему не action.name ???
  switch (action.type) {
    case 'SET_DATA':
      const { data } = action.payload

      return {
        ...state,
        data,
        rows: data,
      }

    case 'SET_STATUS':
      const { status } = action.payload

      return {
        ...state,
        status
      }

    case 'SET_SORTING':
      const { sortingKey, sortingDirection } = action.payload

      state.data.sort((item1, item2) => {
        const value1 = item1[sortingKey]
        const value2 = item2[sortingKey]

        return sortingKey === 'id'
          ? value1 - value2
          : value1.localeCompare(value2)
      })

      if (sortingDirection === 'desc') {
        state.data.reverse()
      }

      return {
        ...state,
        sortingKey,
        sortingDirection,
      }

    case 'RESET_SORTING':

      state.data.sort((item1, item2) => {
        const value1 = item1['id']
        const value2 = item2['id']

        return value1 - value2
      })

      return {
        ...state,
        sortingKey: 'id',
        sortingDirection: 'asc'
      }

    case 'SEARCH':
      const { searchText } = action.payload

      state.rows = state.data.filter((item) => {
        return Object.values(item).filter((value) => {
          return typeof value === 'number'
            ? value.toString() === searchText
            : value.includes(searchText)
        }).length
      })

      return {
        ...state,
        searchText,
      }

    default:
      return state
  }
}

export default reducer
