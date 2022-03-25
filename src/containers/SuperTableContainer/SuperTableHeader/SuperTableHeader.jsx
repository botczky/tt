import { useDispatch, useSelector } from 'react-redux'
import { setSearchAction } from '../../../store/superTable'
import { ReactComponent as HelpIcon } from '../../../assets/bx-help-circle.svg'
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
      <div className="SuperTableHeader-iconWrapper">
        <HelpIcon className="SuperTableHeader-helpIcon" />
        <div className="SuperTableHeader-tip">
          {/* <div className="SuperTableHeader-tip-hoverArea"></div> */}
          <div className="SuperTableHeader-tip-arrow"></div>
          <div className="SuperTableHeader-tip-content">
            Start with # to search by id.
            <br />
            Try search by full name and phone in any format,
            <br />
            for example: 123456789, 123 45 6789, (123)34 56-78, etc.
            <br />
            Search by email is case-insensitive.
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperTableHeader
