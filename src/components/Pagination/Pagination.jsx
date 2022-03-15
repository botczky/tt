import { ReactComponent as ChevronRightIcon } from '../../assets/chevron-right.svg'
import { ReactComponent as ChevronLeftIcon } from '../../assets/chevron-left.svg'
import './Pagination.scss'

const Pagination = ({ value, min = 1, max, onChange }) => {
  return (
    <div className="Pagination">
      <button disabled={value === min} onClick={() => onChange(value - 1)}>
        <ChevronLeftIcon />
      </button>
      <button disabled={value === max} onClick={() => onChange(value + 1)}>
        <ChevronRightIcon />
      </button>
      <code className="Pagination-count">
        Page: {value}/{max}
      </code>
    </div>
  )
}

export default Pagination
