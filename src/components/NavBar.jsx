import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import UserDropDown from "./navbar/UserDropdown";
import Notifications from "./navbar/Notifications";
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

    const DropdownList = () => (
        <div>
            <a className="nav-link dropdown-toggle nb-item" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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

    const Logged = () => (
        <div className="container-fluid d-flex justify-content-between">
            <div className="d-flex justify-content-between">
                <Link className="navbar-brand nb-item" to='/' >Home</Link>
                {collapsed && <Testing />}
            </div>
            {collapsed && <UserDropDown collapsed={collapsed} />}
            <button className={"navbar-toggler"} type="button" data-bs-toggle="collapse" data-bs-target="#nabvarGeneralOptions"
                aria-controls="nabvarGeneralOptions" aria-expanded="false" aria-label="Toggle navigation" data-bs-auto-close="true">
                <FaBars className="navbar-toggler-icon" />
            </button>
            <div className="UserDropDown collapse navbar-collapse justify-content-between" id="nabvarGeneralOptions">
                <ul className="navbar-nav mb-2 mb-lg-0 align-items-start align-items-md-center">
                    <li className="nav-item">
                        <Link to='/jobform' className="btn nb-item" >CREATE POST</Link>
                    </li>
                </ul>
                {!collapsed && <SearchForm />}
                <div className="userDropDown d-flex align-items-center">
                    {!collapsed && <UserDropDown collapsed={collapsed} />}
                    <FaRegQuestionCircle className={"fs-4 help-icon"} />
                </div>
            </div>
        </div>
    )

    const UnLogged = () => (
        <div className="container-fluid d-flex justify-content-between">
            <div className="d-flex justify-content-between">
                <Link className="navbar-brand nb-item" to='/' >Home</Link>
                {collapsed && <Testing />}
            </div>
            {collapsed && <UserDropDown collapsed={collapsed} />}
            <button className={"navbar-toggler"} type="button" data-bs-toggle="collapse" data-bs-target="#nabvarGeneralOptions"
                aria-controls="nabvarGeneralOptions" aria-expanded="false" aria-label="Toggle navigation" data-bs-auto-close="true">
                <FaBars className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="nabvarGeneralOptions">
                <ul className="navbar-nav mb-2 mb-lg-0 align-items-start align-items-md-center">
                    <li className="nav-item">
                        <a className="nav-link nb-item" href="#">Link</a>
                    </li>
                </ul>
                {!collapsed && <SearchForm />}
                <div className="d-flex align-items-center">
                    {!collapsed && <UserDropDown collapsed={collapsed} />}
                    <FaRegQuestionCircle className={"fs-4 help-icon nb-item"} />
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
        <nav className={"navbar fixed-top navbar-expand-md " + (context.darkMode && 'nb-dark-mode')}> {/* if dark mode is activated, add the dark mode and trigger the styles changes */}
            {context.logged ? <Logged /> : <UnLogged />}
        </nav>
    )
}

export default NavBar;