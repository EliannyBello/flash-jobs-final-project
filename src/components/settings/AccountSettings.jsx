import React from "react";

const AccountSettings = () => (
    <div className='mx-2'>
        <h4 className=" mt-3">Account</h4>
        <form className=" mx-auto">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" defaultValue="" className="form-control " id="email" name='email' placeholder="Your Email" />
                <small className="invalid-feedback"></small>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="********" />
            </div>
            <div className="mb-3">
                <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirm_password" name='confirm_password' placeholder="********" />
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
)

export default AccountSettings;