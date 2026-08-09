import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../src/pages/Home'
import JsdCustomerMaster from '../src/pages/JsdCustomerMaster'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/jsdCustomerMaster" element={<JsdCustomerMaster />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
