import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store.js'
import './index.css'
import { Game } from './game.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <Game />
    </Provider>
  </StrictMode>,
)
