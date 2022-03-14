import produce from 'immer'
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

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    // prettier-ignore
    const {
      data,
      status,
      searchText,
      sortingKey,
      sortingDirection
    } = action.payload || {}

    console.log(action.type, action.payload)

    // почему не action.name ???
    switch (action.type) {
      case 'SET_DATA':
        draft.data = data
        draft.rows = data
        break
      case 'SET_STATUS':
        draft.status = status
        break
      case 'SET_SORTING':
        draft.data.sort((item1, item2) => {
          const value1 = item1[sortingKey]
          const value2 = item2[sortingKey]

          return sortingKey === 'id'
            ? value1 - value2
            : value1.localeCompare(value2)
        })

        if (sortingDirection === 'desc') {
          draft.data.reverse()
        }

        draft.rows = draft.data
        draft.sortingKey = sortingKey
        draft.sortingDirection = sortingDirection
        break
      case 'RESET_SORTING':
        draft.data.sort((item1, item2) => {
          const value1 = item1['id']
          const value2 = item2['id']

          return value1 - value2
        })

        draft.rows = draft.data
        draft.sortingKey = 'id'
        draft.sortingDirection = 'asc'
        break
      case 'SEARCH':
        draft.rows = draft.data.filter((item) => {
          return Object.values(item).filter((value) => {
            return typeof value === 'number'
              ? value.toString() === searchText
              : value.includes(searchText)
          }).length
        })

        break
      default:
        break
    }
  })

export default reducer
