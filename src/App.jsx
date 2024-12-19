import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Sidebar from './Components/SideBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Sidebar/>
    </>
  )
}

export default App
