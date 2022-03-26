const SortingIcon = ({ state, className }) => {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" className={className}>
      <path
        display={!state || state === 'asc' || 'none'}
        d="M11.2794 1.74885C11.6728 1.34001 12.3272 1.34001 12.7206 1.74885L19.0308 8.30662C19.6421 8.94193 19.1919 10 18.3102 10H5.68977C4.80811 10 4.35788 8.94193 4.9692 8.30662L11.2794 1.74885Z"
      />
      <path
        display={!state || state === 'desc' || 'none'}
        d="M11.2794 22.2512C11.6728 22.66 12.3272 22.66 12.7206 22.2512L19.0308 15.6934C19.6421 15.0581 19.1919 14 18.3102 14H5.68977C4.80811 14 4.35788 15.0581 4.9692 15.6934L11.2794 22.2512Z"
      />
    </svg>
  )
}

export default SortingIcon
