import React from 'react'
import ReactDOM from 'react-dom'
import * as ReactRedux from 'react-redux'
import store from './store'
import ColorSchemeProvider from './services/color-scheme'
import App from './App'
import './styles'

ReactDOM.render(
  <React.StrictMode>
    <ReactRedux.Provider store={store}>
      <ColorSchemeProvider>
        <App />
      </ColorSchemeProvider>
    </ReactRedux.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
