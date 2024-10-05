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
        <h5 className="me-1">
            Log In
        </h5>
    )

    //please no delete, used to save temporal changes and tes
    const Testing = () => (
        <div></div>
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
        <nav className={"navbar navbar-expand-md " + (context.darkMode ? 'navbar-dark-mode' : 'navbar-light-mode')}>
            <div className="container-fluid d-flex justify-content-between">
                <Link className="navbar-brand" to='/' >Logo</Link>
                {collapsed && <SearchForm />}
                {collapsed && <Loggin />}
                <button className={"navbar-toggler " + (context.darkMode && 'border-dark-mode')} type="button" data-bs-toggle="collapse" data-bs-target="#nabvarGeneralOptions"
                    aria-controls="nabvarGeneralOptions" aria-expanded="false" aria-label="Toggle navigation">
                    <FaBars className={"navbar-toggler-icon text-light " + (context.darkMode && 'text-light')} />
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
                        {!collapsed && <SearchForm />}
                    </ul>

                    <div className="d-flex align-items-center">
                        {!collapsed && <Loggin />}
                        <FaRegQuestionCircle className={"fs-4 " + (context.darkMode && 'text-light')} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;