import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/GlobalContext";
import { FaWindowClose, FaCheckSquare } from "react-icons/fa";


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
            <p className="m-0">{user.username}</p>  
            <div className="d-flex"> 
            <FaCheckSquare className="btn-hover check fs-4" />
            <FaWindowClose className="btn-hover reject ms-2 fs-4" />
            </div>

        </li>
    )
}

export default ApplicantItem;