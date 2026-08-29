import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../src/pages/Home'
import Master from '../src/pages/Master'
import Service_TKM from '../src/pages/Service_TKM'
import JdpCustomerMaster from '../src/pages/JdpCustomerMaster'
import MainLayout from "./layout/MainLayout";
import ColorMaster from "./pages/ColorMaster"
import { ToastContainer } from "react-toastify";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout/>} >
            <Route path='/' element={<Home/>} />
            <Route path="/jdp" element={<JdpCustomerMaster />} />
            <Route path='/colorMaster' element={<ColorMaster/>} />
            <Route path='/master' element={<Master/>} />
            <Route path='/service_TKM' element={<Service_TKM/>} />
          </Route>
        </Routes>
        <ToastContainer  />
      </BrowserRouter>
    </>
  )
}



export default App







