import React, { useContext, useEffect, useState } from 'react'
import JobCards from '../components/jobCards'
import imgSrc from './img/avatarDefault.png'
import { FaGithub, FaLinkedin, FaBookOpen, FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../context/GlobalContext'
import '../styles/Profile.css'
import { TbBriefcase2Filled } from "react-icons/tb";


const Profile = () => {

  const { store, actions } = useContext(Context)
  const [data, setData] = useState([])
  const userId = JSON.parse(sessionStorage.user)

  const [loaded, setLoaded] = useState(false)


  const cardsJob = async () => {
    const datos = await actions.getjobposting(userId.id)
    console.log(datos.job_posting)
    setData(datos.job_posting)
    setLoaded(true)
  }

  useEffect(() => {
    const waitToFetch = setTimeout(() => {
      cardsJob()
    }, 2000)
    return () => clearTimeout(waitToFetch)

  }, [])

  return (
    <div className="container mt-5 py-3">
      {!loaded ? (
        <div><h1>Loading...</h1></div>
      ) : (<div className="row ">
        <div className="col-md-5">
          <h2 className=" mt-5 ms-5">{store?.user?.username}</h2>
          <div className="mx-auto my-1 p-2">
            <img src={store?.user?.profile?.avatar || imgSrc} alt="Profile Avatar" className='img-fluid w-50 my-3 profile-avatar rounded-circle' />
          </div>
          <div className="d-flex justify-content-start mb-3">
            <FaEnvelope className='fs-4 mx-4' />
            <h5>{store?.user?.email}</h5>
          </div>
          <div className="d-flex justify-content-start  mb-3">
            <FaBookOpen className='fs-4 mx-4' />
            <h5>{store?.user?.profile?.biography || "No biography"} </h5>
          </div>
          <div className="d-flex justify-content-start  mb-3">
            <FaPhone className='fs-4 mx-4' />
            <h5>{store?.user?.profile?.phone || "No phone number"} </h5>
          </div>
          <div className="d-flex justify-content-start  mb-3">
            <FaLocationDot className='fs-4 mx-4' />
            <h5>{store?.user?.profile?.country || "No country added"} </h5>
          </div>
          <div className="d-flex justify-content-start  mb-3">
            <FaGithub className='fs-4 mx-4' />
            <h5 > {store?.user?.profile?.github || "No Github link"} </h5>
          </div>
          <div className="d-flex justify-content-start  mb-3">
            <FaLinkedin className='fs-4 mx-4' />
            <h5>{store?.user?.profile?.linkedin || "No LinkedIn link"}</h5>
          </div>
          <div className="d-flex justify-content-start  mb-3">
            <TbBriefcase2Filled className='fs-4 mx-4' />
            <a href={store?.user?.profile?.resume}><h5>{store?.user?.profile?.resume || "No Resume link"}</h5></a>
          </div>

        </div>

        <div className="col-md-7 ">

          <div className="row mt-5">

            <button
              className="btn btn-warning"
              data-bs-toggle="collapse"
              href="#multiCollapseExample1"
              role="button"
              aria-expanded="false"
              aria-controls="multiCollapseExample1"
            > Your offers</button>



            <div className="collapse multi-collapse" id="multiCollapseExample1">
              <div className="">
                <JobCards data={data} />
              </div>
            </div>
          </div>

          <div className="row">
            <button
              className="btn btn-info"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#multiCollapseExample2"
              aria-expanded="false"
              aria-controls="multiCollapseExample2"
            >
              Your applications
            </button>
            <div className="collapse multi-collapse" id="multiCollapseExample2">
              <div className="">

              </div>
            </div>
          </div>




        </div>
      </div>)}
    </div>
  )
}


export default Profile