import { useState } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './components/Routes/Router'
import { store } from './state/store'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>  )
}

export default App
