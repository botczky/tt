import { useState } from "react";
import SuperTableContainer from './containers/SuperTableContainer'
import ColorSchemeSwitcher from './components/ColorSchemeSwitcher'
import './App.scss'

const App = () => {
  const [colorScheme, setColorScheme] = useState('dark')

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
