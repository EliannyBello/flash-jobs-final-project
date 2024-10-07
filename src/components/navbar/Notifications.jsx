import React from "react"
import { Link } from "react-router-dom"
import { FaRegBell } from "react-icons/fa";

const Notifications = () => (
    <div className="dropdown">
        <a className="nav-link not-arrow dropdown-toggle p-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <FaRegBell className="fs-4" />
        </a>
        <ul className="dropdown-menu dropdown-menu-end nb-dropdown-list navbar-noti-custom">
            <li><Link className="dropdown-item" href="#">Notification 1</Link></li>
            <li><Link className="dropdown-item" href="#">Notification 2</Link></li>
            <li><Link className="dropdown-item" href="#">Notification 3</Link></li>
        </ul>
    </div>
)

export default Notifications;