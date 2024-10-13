import React, { useContext, useEffect, useState } from 'react'
import JobCards from '../components/jobCards'
import { Context } from '../context/GlobalContext'

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
    <div className="container mt-5 py-3">
      <h1>Homepage</h1>
      <p>job offers in cards</p>
      <JobCards data={data} />

    </div>
  )
}

export default Home