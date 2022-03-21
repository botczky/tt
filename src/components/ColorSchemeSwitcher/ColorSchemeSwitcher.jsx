import { ReactComponent as SunIcon } from '../../assets/bxs-sun.svg'
import { ReactComponent as MoonIcon } from '../../assets/bxs-moon.svg'
import './ColorSchemeSwitcher.scss'

const ColorSchemeSwitcher = ({ value, onChange }) => {

  const clickHandler = () => {
    onChange(value === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      className="ColorSchemeSwitcher"
      role="switch"
      aria-checked={value === 'dark'}
      onClick={clickHandler}>
      <div className="ColorSchemeSwitcher-track">
        <div className="ColorSchemeSwitcher-thumb"></div>
        <SunIcon className="ColorSchemeSwitcher-icon sun" />
        <MoonIcon className="ColorSchemeSwitcher-icon moon" />
      </div>
      {/* тут могбыбыть label */}
    </button>
  )
}

export default ColorSchemeSwitcher
