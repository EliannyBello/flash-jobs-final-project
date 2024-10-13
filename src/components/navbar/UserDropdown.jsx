import React, { useContext } from "react";
import { Context } from "../../context/GlobalContext";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import imgSrc from '../../page/img/avatarDefault.png'


const UserDropDown = ({ collapsed }) => {

    const { store, actions, logged } = useContext(Context);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const response = await actions.login(data);
        if (response) {
            navigate('/');
        }
    };

    if (logged) {
        return (
            <div className="dropdown">
                <a className="nav-link dropdown-toggle not-arrow me-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={store?.user?.profile?.avatar || imgSrc} alt="Profile Avatar" className='img-fluid user-avatar rounded-circle' />
                </a>
                <ul className={"dropdown-menu mt-3 " + (collapsed ? ' full-width' : 'dropdown-menu-end text-end me-1')}>
                    <li><p className="text-center">Hello, {store?.user?.username}</p></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/settings">Account Settings</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button onClick={() => {
                        actions.logout();
                        navigate('/');
                    }} className="dropdown-item" to="/logout">Log out</button></li>
                </ul>
            </div>
        );
    } else {
        return (
            <div className={"dropdown mx-2"}>
                <a className="nav-link dropdown-toggle not-arrow me-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaRegUserCircle className="fs-1" />
                </a>
                <div className={"dropdown-menu mt-3 " + (collapsed ? ' full-width' : 'dropdown-menu-end me-1 mid-width')}>
                    <form className="px-4 py-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="input" className="form-label">Email</label>
                            <input type="email" className="form-control " name='email' placeholder="email@example.com" {...register('email', { required: 'Email is required!' })} />
                            {errors.email?.type === "required" && (
                                <p role="alert">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="input" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="******" {...register('password', { required: 'Password is required!' })} />
                            {errors.password?.type === "required" && (
                                <p role="alert">{errors.password.message}</p>
                            )}
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                                <label className="form-check-label" htmlFor="dropdownCheck">
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </form>
                    <div className="dropdown-divider"></div>
                    <Link to="/register" className="dropdown-item">New around here? Sign up</Link>
                    <a className="dropdown-item" href="#">Forgot password?</a>
                </div>
            </div >
        );
    }
}

export default UserDropDown;
