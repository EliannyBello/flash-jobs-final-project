import { useForm } from "react-hook-form";
import { Context } from '../context/GlobalContext';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import '../styles/register.css'
const Register = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const response = await actions.register(data)
        navigate('/')
    }
    return (
        <div className="container container-register">
            <div className="card card-register p-3">
                <div className="card-body-register p-3 my-5 justify-content-center">
                    <h3 className="text-center">Register</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto p-2">
                        <div className="mb-3">
                            <label htmlFor="input" className="form-label">Email</label>
                            <input type="email" className="form-control " name='email' placeholder="email@example.com" {...register('email', { required: 'Email is required!' })} />
                            {errors.email?.type === "required" && (
                                <p role="alert">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="input" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" name="username" placeholder="Username" {...register('username', { required: 'Username is required!' })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="input" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="******"  {...register('password')} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="input" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirm_password" name='confirm_password' placeholder="******" {...register('confirm_password')} />
                        </div>
                        <button className="btn btn-primary">Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register