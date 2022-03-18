import { useDispatch, useSelector } from 'react-redux'
import { setSearchAction } from '../../../store/superTable'
import debounce from '../../../utils/debounce'
import './SuperTableHeader.scss'

const SuperTableHeader = () => {
  const dispatch = useDispatch()
  const { status, searchQuery } = useSelector((state) => state.superTable)

  const searchFieldChangeHandler = debounce((event) => {
    dispatch(setSearchAction(event.target.value))
  }, 500)

  return (
    <div className="SuperTableHeader">
      <input
        className="SuperTableHeader-searchField"
        placeholder="Search"
        disabled={status !== 'success'}
        defaultValue={searchQuery}
        onChange={searchFieldChangeHandler}
      />
    </div>
  )
}

export default SuperTableHeader
