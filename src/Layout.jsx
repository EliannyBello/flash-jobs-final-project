import { useState } from 'react'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import { NotFound } from './page/NotFound'

function Layout() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='*' element={<NotFound />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Layout
