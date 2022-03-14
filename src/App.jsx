import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import debounce from './utils/debounce'
import './App.scss'

const keys = [
  'id',
  'firstName',
  'lastName',
  'email',
  'phone',
  'street',
  'city',
  'state',
  'zip',
  'description',
]

async function getData() {
  const url =
    'http://www.filltext.com/?rows=1000&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

  const response = await fetch(url)
  const responseData = await response.json()

  return responseData.map((item, index) => {
    const { address, ...rest } = item
    item = { ...address, ...rest }

    item.id = index

    // просто глаза мазолит
    item.street = item.streetAddress
    delete item.streetAddress

    const map = new Map()

    for (const key of keys) {
      map.set(key, item[key])
    }

    item = Object.fromEntries(map.entries())

    return item
  })
}

const App = () => {
  const dispatch = useDispatch()
  // prettier-ignore
  const {
    rows,
    searchText,
    sortingKey,
    sortingDirection
  } = useSelector((state) => state)

  useEffect(() => {
    getData().then((data) => {
      dispatch({ type: 'SET_DATA', payload: { data } })
    })
  }, [])

  const handleSearchFieldChange = debounce((event) => {
    dispatch({ type: 'SEARCH', payload: { searchText: event.target.value } })
  }, 500)

  const handleThClick = (key) => {
    // 1st click
    if (key !== sortingKey) {
      dispatch({
        type: 'SORT_ROWS',
        payload: {
          sortingKey: key,
          sortingDirection: 'asc',
        },
      })
    }

    // 2nd
    else if (sortingDirection === 'asc') {
      dispatch({
        type: 'SORT_ROWS',
        payload: {
          sortingKey: key,
          sortingDirection: 'desc',
        },
      })
    }

    // 3rd
    else {
      dispatch({
        type: 'SORT_ROWS',
        payload: {
          sortingKey: 'id',
          sortingDirection: 'asc',
        },
      })
    }
  }

  return (
    <div className="App">
      <div className="App-container">
        <div className="App-header">
          <input
            className="App-searchField"
            placeholder="Search"
            disabled={!rows}
            defaultValue={searchText}
            onChange={handleSearchFieldChange}
          />
        </div>
        {rows && (
          <div className="App-tableWrapper">
            <table>
              <thead>
                <tr>
                  {keys.map((key) => (
                    <th key={key} className={key}>
                      <button onClick={() => handleThClick(key)}>
                        <div className="inner">{key}</div>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ id, ...item }) => (
                  <tr key={id}>
                    <th scope="row">
                      <div className="inner">{id}</div>
                    </th>
                    {Object.keys(item).map((key) => (
                      <td key={key} className={key}>
                        <div className="inner">{item[key]}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* App-footer (pagination) */}
      </div>
    </div>
  )
}

export default App
