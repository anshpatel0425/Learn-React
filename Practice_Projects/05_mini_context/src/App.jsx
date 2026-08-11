import { useState } from 'react'
import UserContextProvider from './context/UserContextProvider'
import Login from './components/Login'
import Profile from './components/Profile'

import './App.css'

function App() {
  

  return (
   <UserContextProvider>
   <h1>Context Api learning - Ansh Patel</h1>
   <Login />
   <Profile />
   </UserContextProvider>
  )
}

export default App
