import React from 'react'

const Settings = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h4 className=" mt-5">Profile</h4>
          <form className=" mx-auto my-5 p-4">
            <div className="mb-3">
              <img src="" alt="" className='img-fluid w-50 my-3' />
              <input type="file" className="form-control " id="avatar" name='avatar' />
              <small className="invalid-feedback"></small>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
              <input type="username" defaultValue="" className="form-control " id="username" name='username' placeholder="Your Username" />
              <small className="invalid-feedback"></small>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" placeholder="********" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirm_password" name='confirm_password' placeholder="********" />
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
            <button className="btn btn-warning btn-sm w-100 py-2">Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings