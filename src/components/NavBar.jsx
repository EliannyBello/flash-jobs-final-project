import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import { FaSearch, FaRegQuestionCircle, FaBars } from "react-icons/fa";
import '../styles/NavBar.css'

const NavBar = () => {
    const context = useContext(Context);
    const [collapsed, setCollapsed] = useState()

    const SearchForm = () => (
        <form className="d-flex" role="search">
            <div className="input-group">
                <input type="text" className="form-control input-search" placeholder="Search..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button className="btn btn-search" type="button" id="btn-search">
                    <FaSearch className="search-icon" />
                </button>
            </div>
        </form>
    )

    const Loggin = () => (
        <div className="mx-2">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Log In
            </a>
            <form className="dropdown-menu dropdown-menu-end p-3 me-1">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-login">Submit</button>
            </form>
        </div>
    )

    const DropdownList = () => (
        <div>
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
            </a>
            <ul className="dropdown-menu nb-dropdown-list mt-3">
                <li><Link className="dropdown-item" href="#">Action</Link></li>
                <li><Link className="dropdown-item" href="#">Another action</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" href="#">Something else here</Link></li>
            </ul>
        </div>
    )

    //please no delete, used to save temporal changes and testing
    const Testing = () => (
        <div className="btn-group dropend">
            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <FaSearch className="search-icon" />
            </button>
            <ul className="dropdown-menu">
                <li><form action="search">
                    <input className="form-control" type="text" />
                </form></li>
            </ul>
        </div>
    )

    const setNavBar = () => {
        if (context.logged) return <div></div>
        else return <LogoutNavbar />
    }

    useEffect(() => {
        const isCollapsed = () => {
            setCollapsed(window.innerWidth < 768)
        }
        window.addEventListener('resize', isCollapsed);
        isCollapsed();
        return () => {
            window.removeEventListener('resize', isCollapsed);
        };
    }, []);

    return (
        <nav className={"navbar navbar-expand-md " + (context.darkMode && 'nb-dark-mode')}>
            <div className="container-fluid d-flex justify-content-between">
                <div className="d-flex justify-content-between w-auto">
                    <Link className="navbar-brand" to='/' >Logo</Link>
                    {collapsed && <Testing />}
                </div>
                {collapsed && <Loggin />}
                <button className={"navbar-toggler"} type="button" data-bs-toggle="collapse" data-bs-target="#nabvarGeneralOptions"
                    aria-controls="nabvarGeneralOptions" aria-expanded="false" aria-label="Toggle navigation">
                    <FaBars className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="nabvarGeneralOptions">
                    <ul className="navbar-nav mb-2 mb-lg-0 align-items-start align-items-md-center">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item dropdown">

                            <DropdownList />
                        </li>
                        {!collapsed && <SearchForm />}
                    </ul>
                    <div className="d-flex align-items-center">
                        {!collapsed && <Loggin />}
                        <FaRegQuestionCircle className={"fs-4 help-icon"} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;