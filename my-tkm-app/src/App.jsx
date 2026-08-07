import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../src/pages/Home'
import Vehicle from '../src/pages/Vehicle'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/vehicle" element={<Vehicle />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
