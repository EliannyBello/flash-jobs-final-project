import React, { useContext, useEffect, useState } from 'react'
import JobCards from '../components/jobCards'
import imgSrc from './img/avatarDefault.png'
import { FaGithub, FaLinkedin, FaBookOpen, FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import { Context } from '../context/GlobalContext'
import '../styles/Profile.css'
import { TbBriefcase2Filled } from "react-icons/tb";
import Swal from 'sweetalert2';

const Profile = () => {

  const { store, actions } = useContext(Context)
  const [data, setData] = useState([])
  const userId = JSON.parse(sessionStorage.user)

  const [applications, setApplications] = useState([])

  const [loaded, setLoaded] = useState(false)


  const cardsJob = async () => {
    const datos = await actions.getjobposting(userId.id)
    console.log(datos.job_posting)
    setData(datos.job_posting)
    setLoaded(true)
  }

  //funcion para traer las applications del user
  const fetchApplications = async () => {
    const apps = await actions.getUserApplications(userId.id, sessionStorage.access_token)
    setApplications(apps || []) //asegurar que empieze en array vacio o manda error

  }

  const rateJob = async (user_id, job_id) => {
    Swal.fire({
      title: "Rate the applicant",
      input: 'select',
      inputOptions: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
      },
      inputPlaceholder: 'Select a rate',
      showCancelButton: true,
      confirmButtonText: 'Rate',
      showLoaderOnConfirm: true,
      preConfirm: (rate) => {
        return actions.rateJob(user_id, job_id, rate)
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.title}!`,
          text: result.value.message,
          icon: result.value.status
        }).then(() => {
          (result.value.status == 'success') && window.location.reload();
        });
      }
    })
  }

  const Applications = ({ item }) => (
    <div className="card application-card p-3">
      <h5 className='text-center'> Job Title: {item.job_posting.title}</h5>
      <div className='d-flex justify-content-between align-items-center'>
        <p className='m-0'>Application Status: {item.status}</p>
        {(item?.status_id == 2 && !item?.job_posting?.rated) && (
          <button onClick={() => rateJob(item.job_posting.employer, item.job_posting.id)} className="btn btn-warning btn-sm">
            Calificate
          </button>
        )}
      </div>
    </div>
  )

  useEffect(() => {
    const waitToFetch = setTimeout(() => {
      cardsJob()
      fetchApplications()
    }, 2000)
    return () => clearTimeout(waitToFetch)

  }, [])

  return (
    <div className="container mt-5 py-3 text-center">
      {!loaded ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-info mt-5" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (<div className="row justify-content-center ">
        <div className="col-md-5 col-lg-3">
          <h2 className=" mt-5 m-3">{store?.user?.username}</h2>
          <div className="mx-auto my-1 p-2">
            <img src={store?.user?.profile?.avatar || imgSrc} alt="Profile Avatar"
              className='img-fluid w-50 my-3 profile-avatar rounded-circle' />
          </div>
          <div className="d-flex justify-content-start mb-3">
            <FaEnvelope className='fs-4 me-2' />
            <h5>{store?.user?.email}</h5>
          </div>
          <div className="d-flex justify-content-start  mb-3">
            <FaBookOpen className='fs-4 me-2' />
            <h5>{store?.user?.profile?.biography || "No biography"} </h5>
          </div>
          <div className="d-flex justify-content-start  mb-3">
            <FaPhone className='fs-4 me-2' />
            <h5>{store?.user?.profile?.phone || "No phone number"} </h5>
          </div>
          <div className="d-flex justify-content-start  mb-3">
            <FaLocationDot className='fs-4 me-2' />
            <h5>{store?.user?.profile?.country || "No country added"} </h5>
          </div>
          <div className="d-flex justify-content-start  mb-3">
            <FaGithub className='fs-4 me-2' />
            <h5 > {store?.user?.profile?.github || "No Github link"} </h5>
          </div>
          <div className="d-flex justify-content-start  mb-3">
            <FaLinkedin className='fs-4 me-2' />
            <h5>{store?.user?.profile?.linkedin || "No LinkedIn link"}</h5>
          </div>

          <div className="d-flex justify-content-start">
            {store?.user?.profile?.resume ? (
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-start mb-3">
                  {/* esto va para el perfil publico */}
                  <TbBriefcase2Filled className="fs-4 me-2" />
                  <h5 className='me-1'>Resume:</h5>
                  <a href={store?.user?.profile?.resume} target='_blank'
                    className='link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover h5'>See more</a>
                </div>
                <div>

                  {/* <embed
                    src={store?.user?.profile?.resume}
                    type="application/pdf"
                    width="600"
                    height="800"
                  /> */}
                </div>

              </div>
            ) : (
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-start">
                  <TbBriefcase2Filled className="fs-4 me-2" />
                  <h5 className='me-1'>No Resume</h5>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="col-md-7 ">

          <div className="row mt-5 justify-content-center mx-2">

            <button
              className="btn btn-warning mx-2"
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

          <div className="row justify-content-center pb-4 mx-2">
            <button
              className="btn btn-info m-2"
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
                {applications?.length > 0 ? (
                  applications.map((app, index) => (
                    <Applications item={app} key={index} />
                  ))
                ) : (
                  <p>No applications found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  )
}

export default Profile