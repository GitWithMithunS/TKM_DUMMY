import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import Home from '../src/pages/Home'
import JsdCustomerMaster from '../src/pages/JsdCustomerMaster'
import ColorMaster from "./pages/ColorMaster";



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/jsd" element={<JsdCustomerMaster />} />
          <Route path="/colorMaster" element={<ColorMaster />} />
            </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;