import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { Context } from '../context/GlobalContext';
import { useForm } from "react-hook-form";

const ProfilePostCard = ({ datos }) => {
    const { actions } = useContext(Context)
    const [collapsed, setCollapsed] = useState()


    const EditsIcon = ({ id }) => (
        <div className="ms-auto pe-4">
            <Link to={`/post/${id}/edit`}>
                <FaPencilAlt className="me-3" />
            </Link>
            <FaTrash />
        </div>
    )

    const onSubmit = async (data) => {
        const response = actions.updateJobCards(datos.id, data, sessionStorage.access_token);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const Getstatus = () => (
        <div className="container pe-4">
            <form onChange={handleSubmit(onSubmit)} className="row row-jobform my-3">
                <select name="status" defaultValue={datos.status_id} id="status" className="form-control"
                    {...register('status_id', { required: 'Status is required!' })}>
                    <option value="1" >Public</option>
                    <option value="2" >Completed</option>
                    <option value="3" >In Process</option>
                    <option value="7" >Private</option>
                </select>
            </form>
        </div>
    )

    return (
        <div className="container-fluid">
            <div className={"card shadow p-2 mb-2 " + (!collapsed && "h-100")}>
                <div className="d-flex flex-column flex-md-row">
                    <div className="ms-3 w-100">
                        {location.pathname == "/profile" && <Getstatus id={datos.id} />}
                        <div className='d-flex'>
                            <Link className='link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover col-9'
                                to={`/post/${datos.id}`}>{datos.title}</Link>
                            <EditsIcon id={datos.id} />
                        </div>
                        <div className="">
                            {datos.rank}
                        </div>
                        <div className="text-muted">
                            {`$ ${datos.payment}`}
                        </div>
                        <div className="text-muted">
                            {datos.technologies.join(", ")}
                        </div>
                    </div>
                </div>
                {(location.pathname != "/") && <Link to={`/applicants/${datos.id}`} className="btn btn-dark m-1">Applicants</Link>}
            </div>
        </div>
    );
};

export default ProfilePostCard;