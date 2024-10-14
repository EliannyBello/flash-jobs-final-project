import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import { FaTrash, FaPencilAlt } from "react-icons/fa";


const PostCard = ({ datos, data }) => {
    const { store, actions } = useContext(Context)
    const [user, setUser] = useState({})

    const location = useLocation()

    const EditsIcon = ({ datos }) => (
        <div className="ms-auto">
            <Link to={`/jobform/${datos.id}`}>
                <FaPencilAlt className="me-3" />
            </Link>
            <FaTrash />
        </div>
    )

    async function getPostInfo() {
        const user = await actions.getUserByid(datos.employer)
        setUser(user)
        console.log(user)
    }

    useEffect(() => {
        getPostInfo()
    }, [])

    return (
        <div className="card p-2 mb-2">
            <div className="d-flex ">
                <img src={user?.profile?.avatar} className="rounded-circle profile-avatar" alt="avatar" />
                <div className="ms-3 w-100">
                    <Link className='link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover' to={`/post/${datos.id}`}>{datos.title}</Link>
                    <div className="text-muted">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        {datos.description}
                    </div>
                    <div className="text-muted">
                        <i className="fas fa-phone me-2"></i>
                        {datos.payment}
                    </div>
                    <div className="text ">
                        <i className="fas fa-envelope me-2"></i>
                        {datos.languages.join(", ")}
                    </div>
                    <div className="text-muted">
                        <i className="fas fa-laptop-code me-2"></i>
                        {datos.technologies.join(", ")}
                    </div>
                </div>
                {location.pathname != '/' && <EditsIcon datos={data} />}
            </div>
        </div>
    )
}

export default PostCard;