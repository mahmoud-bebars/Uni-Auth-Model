import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(
  // useing strict mode to detect any potiontal errors
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
