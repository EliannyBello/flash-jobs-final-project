import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import { FaSearch, FaRegQuestionCircle } from "react-icons/fa";
import '../styles/NavBar.css'

const NavBar = () => {
    const context = useContext(Context);

    const LogoutNavbar = () => (
        <div className="container-fluid d-flex justify-content-between">
            <Link className="navbar-brand" to='/' >Logo</Link>
            <form className="d-flex d-md-none" role="search">
                <div className="input-group">
                    <input type="text" className="form-control input-search" placeholder="Search..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button className="btn btn-search" type="button" id="btn-search">
                        <FaSearch className="search-icon" />
                    </button>
                </div>
            </form>
            <div className="user-access d-block d-md-none">
                <h5>
                    Login/Sign In
                </h5>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nabvarGeneralOptions"
                aria-controls="nabvarGeneralOptions" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="nabvarGeneralOptions">
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <form className="d-flex d-none d-md-block" role="search">
                        <div className="input-group">
                            <input type="text" className="form-control input-search" placeholder="Search..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button className="btn btn-search" type="button" id="btn-search">
                                <FaSearch className="search-icon" />
                            </button>
                        </div>
                    </form>
                </ul>

                <div className="d-flex align-items-center">
                    <div className="user-access d-none d-md-block me-3">
                        <h5>
                            Login/Sign In
                        </h5>
                    </div>
                    <FaRegQuestionCircle className="fs-4" />
                </div>
            </div>
        </div>
    )

    const setNavBar = () => {
        if (context.logged) return <div></div>
        else return <LogoutNavbar />
    }

    useEffect(() =>{
        console.log(context);
    },[])

    return (
        <nav className="navbar navbar-expand-md navbar-light-mode">
            {setNavBar()}
        </nav>
    )
}

export default NavBar;