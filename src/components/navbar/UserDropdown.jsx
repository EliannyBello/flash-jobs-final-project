import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/GlobalContext";
import { FaRegUserCircle } from "react-icons/fa";

const UserDropDown = ({ collapsed }) => {
    const context = useContext(Context);

    if (context.logged) {
        return (
            <div className="dropdown">
                <a className="nav-link dropdown-toggle not-arrow me-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaRegUserCircle className="fs-1" />
                </a>
                <ul className={"dropdown-menu mt-3 " + (collapsed ? ' full-width' : 'dropdown-menu-end text-end me-1')}>
                    <li><Link className="dropdown-item" href="#">Profile</Link></li>
                    <li><Link className="dropdown-item" href="#">Account Settings</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" href="#">Log out</Link></li>
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
                    <form className="px-4 py-3">
                        <div className="mb-3">
                            <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
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
                    <Link to="/register" className="dropdown-item" href="#">New around here? Sign up</Link>
                    <a className="dropdown-item" href="#">Forgot password?</a>
                </div>
            </div >
        );
    }
}

export default UserDropDown;
