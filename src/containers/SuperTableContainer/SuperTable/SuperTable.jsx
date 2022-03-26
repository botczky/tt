import { useDispatch, useSelector } from 'react-redux'
import { setSortingAction, resetSortingAction } from '../../../store/superTable'
import styles from './SuperTable.module.scss'

const camelCase2Title = (value) => {
  return value
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim()
}

const SortingIcon = ({ className }) => {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" className={className}>
      <path d="M11.2794 1.74885C11.6728 1.34001 12.3272 1.34001 12.7206 1.74885L19.0308 8.30662C19.6421 8.94193 19.1919 10 18.3102 10H5.68977C4.80811 10 4.35788 8.94193 4.9692 8.30662L11.2794 1.74885Z" />
      <path d="M11.2794 22.2512C11.6728 22.66 12.3272 22.66 12.7206 22.2512L19.0308 15.6934C19.6421 15.0581 19.1919 14 18.3102 14H5.68977C4.80811 14 4.35788 15.0581 4.9692 15.6934L11.2794 22.2512Z" />
    </svg>
  )
}

const SuperTable = () => {
  const dispatch = useDispatch()
  const { slicedData, keys, sortingKey, sortingDirection } = useSelector(
    (state) => state.superTable
  )

  const getThAriaSort = (key) => {
    return key === sortingKey
      ? sortingDirection === 'asc'
        ? 'ascending'
        : 'descending'
      : 'none'
  }

  const onThClickHandler = (key) => {
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

  const columns =
    slicedData &&
    keys.map((key) => (
      <th
        key={key}
        className={styles.tableColumnHeader}
        aria-sort={getThAriaSort(key)}>
        <button onClick={() => onThClickHandler(key)}>
          <div className={styles.tableCellInner}>
            {camelCase2Title(key)}
            <SortingIcon />
          </div>
        </button>
      </th>
    ))

  const rows = slicedData && slicedData.map(({ id, ...item }) => (
    <tr key={id} className={styles.tableRow}>
      <th className={styles.tableRowHeader} scope="row">
        <div className={styles.tableCellInner}>{id}</div>
      </th>
      {Object.keys(item).map((key) => (
        <td key={key} className={styles.tableCell}>
          <div className={styles.tableCellInner}>
            {key === 'description' ? (
              <div className={styles.description}>{item[key]}</div>
            ) : (
              item[key]
            )}
          </div>
        </td>
      ))}
    </tr>
  ))

  return slicedData ? (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr className={styles.tableRow}>{columns}</tr>
      </thead>
      <tbody className={styles.tableBody}>{rows}</tbody>
    </table>
  ) : (
    <></>
  )
}

export default SuperTable
