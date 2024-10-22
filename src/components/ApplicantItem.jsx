import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/GlobalContext";
import { FaWindowClose, FaCheckSquare } from "react-icons/fa";
import { Link } from "react-router-dom";  // Importamos Link de react-router-dom

const ApplicantItem = ({ item }) => {
    const [user, setUser] = useState({})
    const { actions } = useContext(Context)

    const getInfo = async () => {
        const user = await actions.getUserByid(item.user, sessionStorage.access_token)
        console.log(user)
        setUser(user)
    }

    useEffect(() => {
        getInfo()
    }, [])

    return (
        <li className="list-group-item align-items-center d-flex text-bg-dark justify-content-between">
   
            <Link to={`/profile/${user.id}`} className="m-0 text-light text-decoration-none">
                {user.username}
            </Link>  
            <div className="d-flex"> 
                <FaCheckSquare className="btn-hover check fs-4" />
                <FaWindowClose className="btn-hover reject ms-2 fs-4" />
            </div>
        </li>
    )
}

export default ApplicantItem;
