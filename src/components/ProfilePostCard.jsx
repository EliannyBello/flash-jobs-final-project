import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { Context } from '../context/GlobalContext';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ProfilePostCard = ({ datos }) => {
    const { actions } = useContext(Context)
    const [collapsed, setCollapsed] = useState()



    const EditsIcon = ({ id }) => {

        const handleDelete = async (id) => {
            const result = await Swal.fire({
                title: '¿Are you sure?',
                text: "This action cannot be undone",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete',
                cancelButtonText: 'Cancel'
            }).then(async (result) => {
                try {
                    if (result.isConfirmed) {
                        const response = await actions.updateJobCards(id, { status_id: 8 }, sessionStorage.access_token);
                        if (response && response.status === "success") {
                            Swal.fire("Deleted", "The post has been deleted.", "success");
                        } Swal.fire({
                            title: `${response.title}!`,
                            text: response.message,
                            icon: response.status
                        }).then(() => {
                            (response.status == 'success') && window.location.reload();
                        });
                    }
                } catch (error) {
                    console.log(error.message)
                }
            });
        }

        return (
            <div className="ms-auto">
                <Link to={`/post/${id}/edit`}>
                    <FaPencilAlt className="me-3" />
                </Link>
                <FaTrash onClick={() => handleDelete(datos.id)} style={{ cursor: "pointer", color: "red" }} />
            </div>
        );
    };


    const onSubmit = (data) => {
        actions.updateJobCards(datos.id, data, sessionStorage.access_token);
    };

    const completeJob = async (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "This will mark the job as Completed, this change cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept!"
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    const response = await actions.completeJobPost(id)
                    Swal.fire({
                        title: `${response.title}!`,
                        text: response.message,
                        icon: response.status
                    }).then(() => {
                        (response.status == 'success') && window.location.reload();
                    });
                }
            } catch (error) {
                console.log(error.message)
            }
        });
    }

    const rateApplicant = async (user_id, app_id) => {
        Swal.fire({
            title: "Rate the applicant",
            input: 'select',
            inputOptions: {
                '1': '1',
                '2': '2',
                '3': '3',
                '4': '4',
                '5': '5',
            },
            inputPlaceholder: 'Select a rate',
            showCancelButton: true,
            confirmButtonText: 'Rate',
            showLoaderOnConfirm: true,
            preConfirm: (rate) => {
                return actions.rateApplicant(user_id, app_id, rate)
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `${result.value.title}!`,
                    text: result.value.message,
                    icon: result.value.status
                }).then(() => {
                    (result.value.status == 'success') && window.location.reload();
                });
            }
        })
    }


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const Getstatus = () => (
        <div className="w-100">
            <div className="d-flex w-100 justify-content-between align-items-center">

                {/* <form onChange={handleSubmit(onSubmit)} className=" w-50 ">
                    <select name="status" defaultValue={datos.status_id} id="status" className="form-control"
                        {...register('status_id', { required: 'Status is required!' })}>
                        <option value="1" >Public</option>
                        <option value="3" >In Process</option>
                        <option value="7" >Private</option>
                    </select>
                </form> */}
                <p>{datos.status}</p>
                {(datos?.status_id == 3) && (
                    <button onClick={() => completeJob(datos.id)} className="btn btn-success btn-sm">
                        Mark as Completed
                    </button>
                )}
                {(datos?.status_id == 2 && !datos?.applicant?.rated) && (
                    <button onClick={() => rateApplicant(datos?.applicant?.user_id, datos?.applicant?.application_id)} className="btn btn-warning btn-sm">
                        Calification pending
                    </button>
                )}
            </div>
        </div>
    )
    if (datos.status_id === 8) return null;

    return (
        <div className="container-fluid">
            <div className={"card shadow p-2 mb-2 " + (!collapsed && "h-100")}>
                <div className="d-flex flex-column flex-md-row">
                    <div className="w-100 m-2">
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