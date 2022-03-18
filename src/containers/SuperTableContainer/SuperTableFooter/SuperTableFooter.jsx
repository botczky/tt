import { useDispatch, useSelector } from 'react-redux'
import { setPageAction } from '../../../store/superTable'
import Pagination from '../../../components/Pagination'
import './SuperTableFooter.scss'

const SuperTableFooter = () => {
  const dispatch = useDispatch()
  const { status, page, maxPage } = useSelector((state) => state.superTable)

  return maxPage > 1 ? (
    <div className="SuperTableFooter">
      <Pagination
        value={page}
        max={maxPage}
        disabled={status !== 'success'}
        onChange={(value) => dispatch(setPageAction(value))}
      />
    </div>
  ) : <></>
}

export default SuperTableFooter
