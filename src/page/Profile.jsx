import React from 'react'
import JobCards from '../components/jobCards'





const Profile = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h4 className=" mt-5">Userame</h4>
          <form className=" mx-auto my-5 p-4">
            <div className="mb-3">
              <img src="" alt="" className='img-fluid w-50 my-3' />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
              <input type="email" defaultValue="" className="form-control " id="email" name='email' placeholder="name@example.com" />
              <small className="invalid-feedback"></small>
            </div>
            
            <div className="mb-3">
              <label htmlFor="biography" className="form-label">Biography</label>
              <textarea className="form-control" id="biography" name="biography" rows="3" placeholder='Your biography here' defaultValue=""></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="github" className="form-label">Github</label>
              <input type="text" className={"form-control"} id="github" name='github' placeholder="" defaultValue="" />
              <small className="invalid-feedback"></small>
            </div>
            <div className="mb-3">
              <label htmlFor="linkedin" className="form-label">Linkedin</label>
              <input type="text" className={"form-control"} id="linkedin" name='linkedin' placeholder="" defaultValue="" />
              <small className="invalid-feedback"></small>
            </div>
          
          </form>
        </div>
        
        <div className="col-md-6">
        <h4 className=" mt-5">Publicados</h4>
          <JobCards/>
        </div>

      </div>
    </div>
  )
}

export default Profile