import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/GlobalContext";


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
        <li className="list-group-item">{user.username}</li>
    )
}

export default ApplicantItem;