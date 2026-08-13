import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Todos from './components/Todos'
import AddTodos from './components/AddTodos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>Learn About Redux</div>
      <AddTodos />
      <Todos />
    </>
  )
}

export default App
