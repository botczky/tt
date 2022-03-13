import { useState, useEffect, useMemo } from 'react'
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
  const [data, setData] = useState(null)
  const [sortingParams, setSortingParams] = useState({
    key: 'id',
    order: 'asc',
  })

  const sortedData = useMemo(() => {
    if (!data) return data

    const { key, order } = sortingParams

    let result

    if (key === 'id') {
      result = data
    } else {
      result = [...data].sort((item1, item2) =>
        item1[key].localeCompare(item2[key])
      )
    }

    if (order === 'desc') {
      result = [...result].reverse()
    }

    return result
  }, [data, sortingParams])

  useEffect(() => {
    getData().then(setData)
  }, [])

  const handleThClick = (key) => {
    // 1st click
    if (key !== sortingParams.key) {
      setSortingParams({
        key,
        order: 'asc',
      })
    }

    // 2nd
    else if (sortingParams.order === 'asc') {
      setSortingParams({
        key,
        order: 'desc',
      })
    }

    // 3rd
    else {
      setSortingParams({
        key: 'id',
        order: 'asc',
      })
    }
  }

  return (
    <div className="App">
      <div className="App-container">
        {/* App-header (search) */}
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
              {sortedData.map(({ id, ...item}) => (
                <tr key={id}>
                  <th scope='row'>
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
        {/* App-footer (pagination) */}
      </div>
    </div>
  )
}

export default App
