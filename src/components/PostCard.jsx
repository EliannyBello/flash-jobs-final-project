import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Context } from "../context/GlobalContext";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import PostIcons from "./PostIcons";
import { useForm } from "react-hook-form";

const PostCard = ({ datos, data }) => {
    const { actions } = useContext(Context)
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
            <div className="container pe-4">
                <form onChange={handleSubmit(onSubmit)} className="row row-jobform my-3">
                    <select name="status" defaultValue={datos.status_id} id="status"className="form-control" {...register('status_id', { required: 'Status is required!' })}>
                        <option value="1" >Public</option>
                        <option value="2" >Completed</option>
                        <option value="3" >In Process</option>
                        <option value="7" >Private</option>
                    </select>
                </form>
            </div>
        )
    }

    useEffect(() => {
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
            <div className={"card p-2 mb-2 " + (!collapsed && "h-100")}>
                <div className="d-flex flex-column flex-md-row">
                    <PostIcons list={datos.technologies} len={datos.technologies.length} collapsed={collapsed} />
                    <div className="ms-3 w-100">
                        {location.pathname == "/profile" && <Getstatus id={datos.id} />}
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
                {(location.pathname != "/") && <Link to={`/applicants/${datos.id}`} className="btn btn-dark m-1">Applicants</Link>}
            </div>
        </div>
    )
}

export default PostCard;