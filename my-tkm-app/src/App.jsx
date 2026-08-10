import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../src/pages/Home'
import Master from '../src/pages/Master'
import Service_TKM from '../src/pages/Service_TKM'
import JsdCustomerMaster from '../src/pages/JsdCustomerMaster'
import MainLayout from "./layout/MainLayout";
import ColorMaster from "./pages/ColorMaster";



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout/>} >
            <Route path='/' element={<Home/>} />
            <Route path="/jdp" element={<JsdCustomerMaster />} />
            <Route path='/master' element={<Master/>} />
            <Route path='/service_TKM' element={<Service_TKM/>} />
            <Route path="/colorMaster" element={<ColorMaster />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}



export default App;







