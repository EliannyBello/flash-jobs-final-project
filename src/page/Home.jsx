import React, { useContext, useEffect, useState } from 'react'
import JobCards from '../components/jobCards'
import { Context } from '../context/GlobalContext'
import Carrusel from '../components/Carrusel.jsx'
import '../styles/home.css'

const Home = () => {
  const { actions } = useContext(Context)
  const [data, setData] = useState([])
  const [loaded, setLoaded] = useState(false)

  const getJobPosting = async () => {
    const response = await actions.getAllJobPosting()
    setData(response)
    console.log(response)
    setLoaded(true)
  }

  useEffect(() => {
    setLoaded(false)
    const waitToFetch = setTimeout(() => {
      getJobPosting()
    }, 2000)
    return () => clearTimeout(waitToFetch)
  }, [])

  return (
    <div className="container-fluid mt-5 py-3 ">

      <div className="text-overlay">
        <h1>Welcome to Flash Jobs!</h1>
        <h3>Work from anywhere in the world with only remote offers</h3>
        <h4>A new opportunity is waiting for you!</h4>
      </div>
      <Carrusel />
      <br />
      <div className='container-fluid d-flex justify-content-center'>
        <div className='container-fluid'>
          {loaded ? (<JobCards data={data} />) : (<h1>Loading...</h1>)}
        </div>
      </div>

    </div>


  )
}

export default Home