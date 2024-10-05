import React from 'react'
import { LuLogIn } from "react-icons/lu";
import { FaLockOpen } from "react-icons/fa";

const Login = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h4 className="text-center mt-5"> Login <LuLogIn /></h4>
                    <form className="w-50 mx-auto my-5 p-4">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control"/>
                            <small className="invalid-feedback"></small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="******" />
                        </div>
                        <button className="btn btn-success btn-sm w-100 py-2">Login <FaLockOpen /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login