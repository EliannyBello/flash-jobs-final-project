import { useState } from 'react'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import NotFound from './page/NotFound'
import Home from './page/Home'
import Register from './page/Register'
import Login from './page/Login'
import ProfileEmpleador from './page/ProfileEmpleador'
import ProfileTrabajador from './page/ProfileTrabajador'


function Layout() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profileEmpleador' element={<ProfileEmpleador />} />
        <Route path='/profileTrabajador' element={<ProfileTrabajador />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Layout
