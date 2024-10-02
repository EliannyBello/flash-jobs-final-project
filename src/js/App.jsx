import { useState } from 'react'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
