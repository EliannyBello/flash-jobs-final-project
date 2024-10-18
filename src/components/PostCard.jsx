import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, Form } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import PostIcons from "./PostIcons";
import '../styles/PostCard.css'
import imgPrf from '../page/img/avatarDefault.png'
import { useForm } from "react-hook-form";


const PostCard = ({ datos, data }) => {
    const { store, actions } = useContext(Context)
    const [user, setUser] = useState({})
    const [collapsed, setCollapsed] = useState()


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


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const response = actions.updateJobCards(datos.id, data, sessionStorage.access_token);

    };
    const Getstatus = () => {
        return (
            <form onChange={handleSubmit(onSubmit)} className="row row-jobform my-3">
                <select name="status" id="status" className="form-control" {...register('status_id', { required: 'Status is required!' })}>
                    <option value="1">Public</option>
                    <option value="2">Completed</option>
                    <option value="3">In Process</option>
                </select>
            </form>
        )
    }

    useEffect(() => {
        getPostInfo()
        const isCollapsed = () => {
            setCollapsed(window.innerWidth < 768)
        }
        window.addEventListener('resize', isCollapsed);
        isCollapsed();
        return () => {
            window.removeEventListener('resize', isCollapsed);
        };
    }, [])

    return (
        <div className={(location.pathname == "/") ? "col-12 col-md-6" : "container-fluid"}>
            <div className={"card p-2 mb-2 "+(!collapsed && "h-100")}>
                <div className="d-flex flex-column flex-md-row">
                    {/* <img src={user?.profile?.avatar || imgPrf } className="rounded-circle profile-avatar" alt="avatar" /> */}
                    <PostIcons list={datos.technologies} len={datos.technologies.length} collapsed={collapsed} />
                    <div className="ms-3 w-100">
                        {location.pathname == "/profile" && <Getstatus  id={datos.id}/>}
                        <Link className='link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover' to={`/post/${datos.id}`}>{datos.title}</Link>
                        <div className="">
                            {datos.rank}
                        </div>
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
                        {location.pathname != '/' && <EditsIcon id={datos.id} />}
                    </div>
                </div>
                {(location.pathname != "/") && <Link to={`/applicants/${data.id}`} className="btn btn-dark m-1">Applicants</Link>}
            </div>
        </div>
    )
}

export default PostCard;