import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import UserDropDown from "./navbar/UserDropdown";

import Notifications from "./navbar/Notifications";
import { FaSearch, FaRegQuestionCircle, FaBars } from "react-icons/fa";
import '../styles/NavBar.css'

const NavBar = () => {
    const context = useContext(Context);
    /* const { actions } = useContext(Context) */
    const [collapsed, setCollapsed] = useState()
    const [input, setInput] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (input) {
            fetchData(input);
        }
    }, [input]);

    const fetchData = async (value) => {
        try {
            const jobPostings = await actions.getAllJobPosting();
            // Filter job postings based on search input, change tittle to other?
            const filteredResults = jobPostings.filter(job =>
                job.title.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filteredResults); // Update state with filtered results
        } catch (error) {
            console.log("Error fetching job postings:", error);
        }
    }
    const handleChange = (e) => {
        setInput(e.target.value)
        
    }




    const SearchForm = () => (
        <form className="d-flex mx-3" role="search" >
            <div className="input-group">
                <input type="text" className="form-control input-search"
                    placeholder=" Type to search..."
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    onChange={(e) => handleChange(e.target.value)}
                />

                <button className="btn btn-search" type="button" id="btn-search">
                    <FaSearch className="search-icon" />
                </button>
            </div>

        </form>
    )

    const renderSearchResults = () => (
        <div className="search-results">
            {searchResults.length > 0 ? (
                searchResults.map((job, index) => (
                    <div key={index}>
                        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
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
                    <Link to='/jobform' className="btn nb-item" >Create Post</Link>
                </li>
            </ul>
            {!collapsed && <SearchForm />}
            
            {!collapsed && renderSearchResults()}

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
            {!collapsed && <SearchForm />}
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
    <nav className={"navbar fixed-top navbar-expand-md " + (context.darkMode && 'nb-dark-mode')}> {/* if dark mode is activated, add the dark mode and trigger the styles changes */}
        {context.logged ? <Logged /> : <UnLogged />}
    </nav>
)
}

export default NavBar;