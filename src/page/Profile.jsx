import React, { useContext } from 'react'
import JobCards from '../components/jobCards'
import imgSrc from './img/avatarDefault.png'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/GlobalContext'



const Profile = () => {
  const navigate = useNavigate()
  const { store } = useContext(Context)

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
          <h4 className=" mt-5 text-center">Publicados</h4>
          <JobCards />
        </div>
      </div>
    </div>
  )
}

export default Profile