import React, { useContext, useEffect, useState } from 'react'
import JobCards from '../components/jobCards'
import imgSrc from './img/avatarDefault.png'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../context/GlobalContext'



const Profile = () => {

  const { store, actions } = useContext(Context)
  const [data, setData] = useState([])
  const userId = JSON.parse(sessionStorage.user)


  const cardsJob = async ()  => {
    const datos = await actions.getjobposting(userId.id)
    console.log(datos.job_posting)
    setData(datos.job_posting)
  }

  useEffect(() => {

    cardsJob()
   
  }, [])

  return (
    <div className="container mt-5 py-3">
      <div className="row">
        <div className="col-md-5">
          <h4 className=" mt-5">{store?.user?.username}</h4>
          <div className="mx-auto my-5 p-4">
            <img src={store?.user?.profile?.avatar || imgSrc} alt="Profile Avatar" className='img-fluid w-50 my-3' />
          </div>
          <div className="mb-3">
            <h5>{store?.user?.email}</h5>
          </div>
          <div className="mb-3">
            <h5>{store?.user?.profile?.biography || "No biography"} </h5>
          </div>
          <div className="mb-3">
            <h5>{store?.user?.profile?.github || "No Github link"} </h5>
          </div>
          <div className="mb-3">
            <h5>{store?.user?.profile?.linkedin || "No LinkedIn link"}</h5>
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
                <JobCards data={data}/>
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
      </div>
    </div>
  )
}


export default Profile