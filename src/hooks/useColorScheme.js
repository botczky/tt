import { useState, useEffect, useCallback } from 'react'
import usePreferredColorScheme from './usePreferredColorScheme'

const useColorScheme = () => {
  const preferredColorScheme = usePreferredColorScheme()
  const [colorScheme, setColorScheme] = useState(
    localStorage.getItem('color-scheme') || preferredColorScheme
  )

  useEffect(() => {
    if (localStorage.getItem('color-scheme') === null) {
      setColorScheme(preferredColorScheme)
    }
  }, [preferredColorScheme])

  useEffect(() => {
    if (colorScheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [colorScheme])

  // prettier-ignore
  const storeColorScheme = useCallback((value) => {
    if (value !== preferredColorScheme) {
      localStorage.setItem('color-scheme', value)
    } else {
      localStorage.removeItem('color-scheme')
    }

    setColorScheme(value)
  }, [preferredColorScheme])

  return [colorScheme, storeColorScheme]
}

export default useColorScheme
