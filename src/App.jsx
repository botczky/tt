import SuperTableContainer from './containers/SuperTableContainer'
import ColorSchemeSwitcher from './components/ColorSchemeSwitcher'
import { useColorScheme } from './services/color-scheme'
import './App.scss'

const App = () => {
  const [colorScheme, setColorScheme] = useColorScheme()

  return (
    <div className="App">
      <div className="App-corner">
        <ColorSchemeSwitcher value={colorScheme} onChange={setColorScheme} />
      </div>
      <SuperTableContainer />
    </div>
  )
}

export default App
