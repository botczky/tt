import { useDispatch, useSelector } from 'react-redux'
import { setSortingAction, resetSortingAction } from '../../../store/superTable'
import './SuperTable.scss'

const SuperTable = () => {
  const dispatch = useDispatch()
  const {
    slicedData: rows,
    keys,
    sortingKey,
    sortingDirection,
  } = useSelector((state) => state.superTable)

  const thClickHandler = (key) => {
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

  return rows ? (
    <div className="SuperTable">
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key} className={key}>
                <button onClick={() => thClickHandler(key)}>
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
  ) : (
    <></>
  )
}

export default SuperTable
