import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import RoutesSite from './auxTypePlsDeleteMe/routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <RoutesSite/>
    </BrowserRouter>
  )
}

export default App
