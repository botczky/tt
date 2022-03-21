import { useState, useEffect } from 'react'

const usePreferredColorScheme = () => {
  const mql = matchMedia('(prefers-color-scheme: dark)')
  const [value, setValue] = useState(mql.matches ? 'dark' : 'light')

  const switchValue = () => setValue(value === 'dark' ? 'light' : 'dark')

  mql.addEventListener('change', switchValue)

  useEffect(() => () => {
    mql.removeEventListener('change', switchValue)
  })

  return value
}

export default usePreferredColorScheme
