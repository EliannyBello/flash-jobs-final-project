import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/GlobalContext";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCard = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { store, actions } = useContext(Context);


    const [jobPost, setJobPost] = useState([]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

  
    const fetchJobPost = () => {
        const data = actions.getJobPost(params.id, store.access_token);
        if (data) {
            setJobPost(data);
            setValue('title', data.title);
            setValue('description', data.description);
            setValue('payment', data.payment);
            setValue('required_time', data.required_time);
            setValue('expiration_date', data.expiration_date);
        }
    };

    useEffect(() => {
        fetchJobPost();
    }, [params, actions, store.access_token, setValue]);

    const onSubmit = async (data) => {
        console.log(data);
        const response = actions.updateJobCards(params.id, data, sessionStorage.access_token);
        if (response) {
            navigate('/profile');
        }
    };



    return (
        <div className="container-fluid pt-3 mt-5">
            <div className="container container-jobform m-auto justify-content-center pt-3">
                <h3>Edit Post Job</h3>

                {jobPost ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="row row-jobform my-3">
                        <div className="form-group form-group-jobform">
                            <label htmlFor="postTitle">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                placeholder="Title"
                                {...register('title', { required: 'Title is required!' })}
                            />
                            {errors.title && (
                                <p className="text-danger p-1 m-1" role="alert">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div className="form-group form-group-jobform">
                            <label htmlFor="postDescription">Description</label>
                            <textarea
                                className="form-control"
                                id="postDescription"
                                name="description"
                                placeholder="Enter job description"
                                {...register('description', { required: 'Description is required!' })}
                            ></textarea>
                            {errors.description && (
                                <p className="text-danger p-1 m-1" role="alert">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        <div className="col-mb-6">
                            <label htmlFor="payment">Budget USD</label>
                            <input
                                type="number"
                                className="form-control"
                                id="payment"
                                name="payment"
                                {...register('payment', { required: 'Payment is required!' })}
                            />
                            {errors.payment && (
                                <p className="text-danger p-1 m-1" role="alert">
                                    {errors.payment.message}
                                </p>
                            )}
                        </div>
                        <div className="row row-jobform">
                            <div className="col-mb-6">
                                <label htmlFor="requiredTime">Required Time</label>
                                <input type="number" className="form-control" id="requiredTime" defaultValue={3}{...register('required_time', { required: 'Required time is required!' })}
                                />
                                {errors.required_time?.type === "required" && (
                                    <p className="text-danger p-1 m-1" role="alert">{errors.required_time.message}</p>
                                )}
                            </div>

                            <div className="col-mb-6">
                                <label htmlFor="expirationDate">Expiration Date</label>
                                <input type="date" className="form-control" id="expirationDate" {...register('expiration_date', { required: 'Expiration date is required!' })}
                                />

                            </div>
                        </div>


                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default UpdateCard;
