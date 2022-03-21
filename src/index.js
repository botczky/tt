import React from 'react'
import ReactDOM from 'react-dom'
import * as ReactRedux from 'react-redux'
import store from './store'
import App from './App'
import './styles'

ReactDOM.render(
  <React.StrictMode>
    <ReactRedux.Provider store={store}>
      <App />
    </ReactRedux.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
