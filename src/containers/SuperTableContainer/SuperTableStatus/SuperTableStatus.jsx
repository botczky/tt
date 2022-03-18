import { useDispatch, useSelector } from 'react-redux'
import { getDataAction } from '../../../store/superTable'
import Spinner from '../../../components/Spinner'
import { ReactComponent as AlertIcon } from '../../../assets/circle-alert.svg'
import './SuperTableStatus.scss'

const SuperTableStatus = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.superTable)

  return status !== 'success' ? (
    <div className="SuperTableStatus">
      <button
        className="SuperTableStatus-inner"
        disabled={status !== 'failure'}
        onClick={() => dispatch(getDataAction())}>
        {status === 'loading' && (
          <>
            <Spinner />
            Loading...
          </>
        )}
        {status === 'failure' && (
          <>
            <AlertIcon className="SuperTableStatus-alertIcon" />
            Failed to fetch
            <br />
            Click to try again
          </>
        )}
      </button>
    </div>
  ) : (
    <></>
  )
}

export default SuperTableStatus
