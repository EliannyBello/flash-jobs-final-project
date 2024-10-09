import React from 'react'
import JobCards from '../components/jobCards'





const Profile = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h4 className=" mt-5">Userame(traer info desde formulario)</h4>
          <div className="mx-auto my-5 p-4">
            <img src="" alt="" className='img-fluid w-50 my-3' />
          </div>
          <div className="mb-3">
            <h5>correo </h5> 
          </div>
          <div className="mb-3">
          <h5>informacion de biografia </h5>
          </div>
          <div className="mb-3">
          <h5>link de github </h5>
          </div>
          <div className="mb-3">
          <h5>Linkedin </h5>
          </div>

        </div>

        <div className="col-md-6">
          <h4 className=" mt-5">Publicados</h4>
          <JobCards />
        </div>

      </div>
    </div>
  )
}

export default Profile