import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import UserDropDown from "./navbar/UserDropdown";

import Notifications from "./navbar/Notifications";
import { FaSearch, FaRegQuestionCircle, FaBars } from "react-icons/fa";
import '../styles/NavBar.css'

const NavBar = () => {
    const { actions, darkMode, logged } = useContext(Context)
    const [collapsed, setCollapsed] = useState()


    //please no delete, used to save temporal changes and testing
    const Testing = () => (
        <div className="btn-group dropend">
            <ul className="dropdown-menu">
                <li><form action="search">
                    <input className="form-control" type="text" />
                </form></li>
            </ul>
        </div>
    )

    const Logged = () => (
        <div className="container-fluid d-flex justify-content-between">

            <div className="d-flex justify-content-between">
                <Link className="navbar-brand nb-item mx-5" to='/' >Flash Jobs</Link>
                {collapsed && <Testing />}
            </div>
            {collapsed && <UserDropDown collapsed={collapsed} />}
            <button className={"navbar-toggler"} type="button" data-bs-toggle="collapse" data-bs-target="#nabvarGeneralOptions"
                aria-controls="nabvarGeneralOptions" aria-expanded="false" aria-label="Toggle navigation" data-bs-auto-close="true">
                <FaBars className="navbar-toggler-icon" />
            </button>
            <div className="UserDropDown collapse navbar-collapse justify-content-end me-3" id="nabvarGeneralOptions">
                <ul className="navbar-nav mb-2 mb-lg-0 align-items-start align-items-md-center">
                    <li className="nav-item">
                        <Link to='/jobform' className="btn nb-item me-5" >Create Post</Link>
                    </li>
                </ul>
                <div className="userDropDown d-flex align-items-center">
                    {!collapsed && <UserDropDown collapsed={collapsed} />}
                    <Link className="navbar-brand nb-item mx-5" to='/Help' >
                        <FaRegQuestionCircle className={"fs-4 help-icon nb-item"} />
                    </Link>
                </div>
            </div>
        </div>
    )

    const UnLogged = () => (
        <div className="container-fluid d-flex justify-content-between">

            <div className="d-flex justify-content-between">
                <Link className="navbar-brand nb-item mx-5" to='/' >Flash Jobs</Link>
                {collapsed && <Testing />}
            </div>
            {collapsed && <UserDropDown collapsed={collapsed} />}
            <button className={"navbar-toggler"} type="button" data-bs-toggle="collapse" data-bs-target="#nabvarGeneralOptions"
                aria-controls="nabvarGeneralOptions" aria-expanded="false" aria-label="Toggle navigation" data-bs-auto-close="true">
                <FaBars className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse justify-content-end me-3" id="nabvarGeneralOptions">
                <div className="d-flex align-items-center">
                    {!collapsed && <UserDropDown collapsed={collapsed} />}
                    <Link className="navbar-brand nb-item mx-5" to='/Help' >
                        <FaRegQuestionCircle className={"fs-4 help-icon nb-item"} />
                    </Link>

                </div>
            </div>
        </div>
    )

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
        <nav className={"navbar fixed-top navbar-expand-md " + (darkMode && 'nb-dark-mode')}> {/* if dark mode is activated, add the dark mode and trigger the styles changes */}
            {logged ? <Logged /> : <UnLogged />}
        </nav>
    )
}

export default NavBar;