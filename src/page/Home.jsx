import React, { useContext, useEffect, useState } from 'react'
import JobCards from '../components/jobCards'
import { Context } from '../context/GlobalContext'
import Carrusel from '../components/Carrusel.jsx'
import '../styles/home.css'

const Home = () => {
  const { actions } = useContext(Context)
  const [data, setData] = useState([])

  const getJobPosting = async () => {
    const response = await actions.getAllJobPosting()
    setData(response)
  }

  useEffect(() => {
    getJobPosting()
  }, [])

  return (
    <div className="container-fluid mt-5 py-3 ">

      <div className="text-overlay">
        <h1>Welcome to job offers!</h1>
        <h4>A new opportunity is waiting for you</h4>
      </div>


      <Carrusel />

      <br />

      <div className='container-fluid d-flex justify-content-center'>
        <div className='container-fluid'>

            <JobCards data={data} />
          </div>
       
      </div>
    </div>


  )
}

export default Home