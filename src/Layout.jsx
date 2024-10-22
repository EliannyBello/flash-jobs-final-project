import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import NotFound from './page/NotFound'
import Home from './page/Home'
import Register from './page/Register'
import Profile from './page/Profile'
import Settings from './page/Settings'
import Post from './page/Post'
import JobForm from './page/JobForm'
import ApplicantsList from './page/ApplicantsList'
import UpdateCard from './page/updateCard'
import Help from './page/Help'
import PublicProfile from './page/PublicProfile'



function Layout() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/:id' element={<PublicProfile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/settings/:tab' element={<Settings />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/jobform' element={<JobForm/>} />
        <Route path='/help' element={<Help/>} />
        <Route path='/applicants/:id' element={<ApplicantsList/>} />
        <Route path='/post/:id/edit' element={<UpdateCard/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Layout
