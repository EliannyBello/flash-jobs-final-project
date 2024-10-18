import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import PostIcons from "./PostIcons";
import imgPrf from'../page/img/avatarDefault.png'
import '../styles/PostCard.css'


const PostCard = ({ datos, data }) => {
    const { store, actions } = useContext(Context)
    const [user, setUser] = useState({})
   

    const location = useLocation()

    const EditsIcon = ({ id }) => (
        <div className="ms-auto">
            <Link to={`/post/${id}/edit`}>
                <FaPencilAlt className="me-3" />
            </Link>
            <FaTrash />
        </div>
    )

    async function getPostInfo() {
        const user = await actions.getUserByid(datos.employer)
        setUser(user)
    }

    const DisplayIcons = () => (
        <div>
            
        </div>
    )


    useEffect(() => {
        getPostInfo()
    }, [])

    return (
        <div className={(location.pathname == "/") ? "col-12 col-md-6" : "container-fluid"}>
            <div className="card p-2 mb-2 h-100">
                <div className="d-flex ">
                    {/* <img src={user?.profile?.avatar || imgPrf } className="rounded-circle profile-avatar" alt="avatar" /> */}
                    <PostIcons list={datos.technologies}/>
                    <div className="ms-3 w-100">
                        <Link className='link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover' to={`/post/${datos.id}`}>{datos.title}</Link>
                        <div className="text-muted">
                            {datos.description}
                        </div>
                        <div className="text-muted">
                            {`$ ${datos.payment}`}
                        </div>
                        <div className="text ">
                            {datos.languages.join(", ")}
                        </div>
                        <div className="text-muted">
                            {datos.technologies.join(", ")}
                        </div>
                    </div>
                    {location.pathname != '/' && <EditsIcon id={datos.id} />}
                </div>
               {(location.pathname != "/") &&  <Link to={`/applicants/${data.id}`} className="btn btn-dark m-1">Applicants</Link>}
            </div>
        </div>
    )
}

export default PostCard;