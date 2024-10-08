import React from 'react'
import { useForm } from "react-hook-form";

const Register = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit =(data) => console.log(data)

    return (
        <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h4 className="text-center mt-5">Register</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto my-5 p-4">
                    <div className="mb-3">
                        <label htmlFor="input" className="form-label">Email</label>
                        <input type="email" className="form-control " placeholder="email@example.com" {...register('email', { required: 'Email is required!' })}/>
                        <small className="invalid-feedback"></small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="input" className="form-label">Username</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Username" {...register('username', { required: 'Username is required!' })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="input" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="******"  {...register('password')}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="input" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm_password" name='confirm_password' placeholder="******" {...register('confirm_password')}/>
                    </div>
                    <button className="btn btn-success btn-sm w-100 py-2">Create Account</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Register