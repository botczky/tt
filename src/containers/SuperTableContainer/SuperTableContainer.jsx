import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDataAction,
  setSortingAction,
  resetSortingAction,
} from '../../store/superTable'
import Spinner from '../../components/Spinner'
import { ReactComponent as AlertIcon } from '../../assets/circle-alert.svg'
import Header from './SuperTableHeader'
import Footer from './SuperTableFooter'
import './SuperTableContainer.scss'

const SuperTableContainer = () => {
  const dispatch = useDispatch()
  // prettier-ignore
  const {
    slicedData: rows,
    keys,
    status,
    sortingKey,
    sortingDirection,
  } = useSelector((state) => state.superTable)

  useEffect(() => {
    dispatch(getDataAction())
  }, [])

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
    dispatch(getDataAction())
  }

  return (
    <div className="SuperTableContainer">
      <Header />
      {status !== 'success' && (
        <div className="SuperTableContainer-status">
          <button
            className="SuperTableContainer-status-inner"
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
                <AlertIcon className="SuperTableContainer-status-alertIcon" />
                Failed to fetch
                <br />
                Click to try again
              </>
            )}
          </button>
        </div>
      )}
      {rows && (
        <div className="SuperTableContainer-tableWrapper">
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
      <Footer />
    </div>
  )
}

export default SuperTableContainer
