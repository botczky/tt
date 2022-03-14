import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchDataAction,
  searchAction,
  setSortingAction,
  resetSortingAction,
} from './store'
import debounce from './utils/debounce'
import Spinner from './components/Spinner'
import { ReactComponent as AlertIcon } from './assets/circle-alert.svg'
import './App.scss'

const App = () => {
  const dispatch = useDispatch()
  // prettier-ignore
  const {
    keys,
    rows,
    status,
    searchText,
    sortingKey,
    sortingDirection
  } = useSelector((state) => state)

  useEffect(() => {
    dispatch(fetchDataAction())
  }, [])

  const handleSearchFieldChange = debounce((event) => {
    dispatch(searchAction(event.target.value))
  }, 500)

  const handleThClick = (key) => {
    // 1st click
    if (key !== sortingKey) {
      dispatch(setSortingAction(key, 'asc'))
    }

    // 2nd
    else if (sortingDirection === 'asc') {
      dispatch(setSortingAction(key, 'desc'))
    }

    // 3rd
    else {
      dispatch(resetSortingAction())
    }
  }

  const statusClickHandler = () => {
    dispatch(fetchDataAction())
  }

  return (
    <div className="App">
      <div className="App-container">
        <div className="App-header">
          <input
            className="App-searchField"
            placeholder="Search"
            disabled={status !== 'success'}
            defaultValue={searchText}
            onChange={handleSearchFieldChange}
          />
        </div>
        {status !== 'success' && (
          <div className="App-status">
            <button
              className="App-status-inner"
              disabled={status !== 'failure'}
              onClick={statusClickHandler}>
              {status === 'loading' && (
                <>
                  <Spinner />
                  Loading...
                </>
              )}
              {status === 'failure' && (
                <>
                  <AlertIcon className="App-status-alertIcon" />
                  Failed to fetch
                  <br />
                  Click to try again
                </>
              )}
            </button>
          </div>
        )}
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
