import { createContext, useState, useEffect, useMemo, useContext } from 'react'

const useStoredColorScheme = () => {
  const [value, setValue] = useState(localStorage.getItem('color-scheme'))

  useEffect(() => {
    if (value === null) {
      localStorage.removeItem('color-scheme')
    } else {
      localStorage.setItem('color-scheme', value)
    }
  }, [value])

  return [value, setValue]
}

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

const Context = createContext()

const Provider = ({ children }) => {
  const preferred = usePreferredColorScheme()
  const [stored, storeColorScheme] = useStoredColorScheme()

  const colorScheme = useMemo(() => {
    return stored || preferred
  }, [stored, preferred])

  const setColorScheme = (value) => {
    storeColorScheme(value === preferred ? null : value)
  }

  useEffect(() => {
    if (colorScheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [colorScheme])

  return (
    <Context.Provider value={[colorScheme, setColorScheme]}>
      {children}
    </Context.Provider>
  )
}

export default Provider
export const useColorScheme = () => useContext(Context)
