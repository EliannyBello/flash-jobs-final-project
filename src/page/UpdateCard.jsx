import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../context/GlobalContext";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCard = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [minDate, setMinDate] = useState('')
    const { store, actions } = useContext(Context);
    const daysRef = useRef()

    const [jobPost, setJobPost] = useState([]);

    const onChange = (num = 3) => {
        const today = new Date();
        const toAdd = (typeof num === 'string') ? parseInt(num, 10) : num;
        const newDate = new Date(today.setDate(today.getDate() + ((toAdd <= 0 || isNaN(toAdd)) ? 1 : toAdd)));
        setMinDate(newDate.toISOString().substring(0, 10));
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const dateConverter = (stringDate) => {
        const date = new Date(stringDate);
        const newDate = date.toISOString().substring(0, 10)
        return newDate;
    }



    const fetchJobPost = async () => {
        const data = await actions.getJobPost(params.id, store.access_token);
        if (data) {
            setJobPost(data);
            setValue('title', data.title);
            setValue('description', data.description);
            setValue('payment', data.payment);
            setValue('required_time', data.required_time);
            setValue('expiration_date', dateConverter(data.expiration_date));
            setValue('languages', data.languages);
            setValue('technologies', data.technologies);
        }
    };

    useEffect(() => {
        fetchJobPost()
        onChange()
    }, [params, actions, store.access_token, setValue]);

    const onSubmit = async (data) => {
        console.log(data);
        const response = await actions.updateJobCards(params.id, data, sessionStorage.access_token);
        if (response?.status == 'success') {
            Swal.fire({
                title: response.title,
                text: response.message,
                icon: response.status
            }).then(() => {
                navigate('/profile');
            });
        }
    };



    return (
        <div className="container-fluid d-flex pt-5 mt-3 mb-5 justify-content-center">
            <div className="card justify-content-center col-12 col-md-10 col-lg-8 col-xl-7 pt-3 mt-5 card-form">
                <div className="card-body" >
                    <h2 className="text-center">Update Post</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="w-100">

                        <div className="row gy-3">
                            <div className="col-md-12 form-group">
                                <h6 htmlFor="postTitle">Title</h6>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    {...register('title', { required: 'Title is required!' })}
                                />
                                {errors.title?.type === "required" && (
                                    <p className="text-danger p-1 m-1" role="alert">{errors.title.message}</p>
                                )}
                            </div>

                            <div className="col-md-12 form-group mt-2">
                                <h6 htmlFor="postDescription">Description</h6>
                                <textarea
                                    className="form-control"
                                    id="postDescription"
                                    name="description"
                                    placeholder="Enter job description"
                                    {...register('description', { required: 'Description is required!' })}
                                ></textarea>
                                {errors.description?.type === "required" && (
                                    <p className="text-danger p-1 m-1" role="alert">{errors.description.message}</p>
                                )}
                            </div>
                        </div>


                        <div className="row mt-1 gy-2">
                            <div className="col-md-6 col-lg-3">
                                <h6 htmlFor="rank">Rank</h6>
                                <select
                                    name="rank"
                                    id="rank"
                                    className="form-control"
                                    {...register('rank', { required: 'Seniority is required!' })}
                                >
                                    <option value="1">Junior</option>
                                    <option value="2">Semi Senior</option>
                                    <option value="3">Senior</option>
                                </select>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <h6 htmlFor="payment">Budget USD</h6>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="payment"
                                    {...register('payment', { required: 'Payment is required!' })}
                                />
                                {errors.payment?.type === "required" && (
                                    <p className="text-danger p-1 m-1" role="alert">{errors.payment.message}</p>
                                )}
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <h6 htmlFor="requiredTime">Required Days</h6>
                                <input
                                    ref={daysRef}
                                    onKeyUp={e => onChange(e.target.value)}
                                    type="number"
                                    className="form-control"
                                    id="requiredTime"
                                    {...register('required_time', { required: 'Required time is required!' })}
                                />
                                {errors.required_time?.type === "required" && (
                                    <p className="text-danger p-1 m-1" role="alert">{errors.required_time.message}</p>
                                )}
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <h6 htmlFor="expirationDate">Expiration Date</h6>
                                <input
                                    type="date"
                                    className="form-control"
                                    min={minDate}
                                    id="expirationDate"
                                    {...register('expiration_date', { required: 'Expiration date is required!' })}
                                />

                            </div>
                        </div>




                        <div className="row mt-2">
                            <div className="col-md-6">
                                <h6 htmlFor="postLanguages">Post Languages</h6>
                                <div className="form-control" id="postLanguages">
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="languageEnglish"
                                            value="English"
                                            {...register('languages', { required: 'Languages is required!' })}
                                        />
                                        <label className="ms-1" htmlFor="languageEnglish">English</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="languageSpanish"
                                            value="Spanish"
                                            {...register('languages', { required: 'Languages is required!' })}
                                        />
                                        <label className="ms-1" htmlFor="languageSpanish"> Spanish</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="languageKorean"
                                            value="Korean"
                                            {...register('languages', { required: 'Languages is required!' })}
                                        />
                                        <label className="ms-1" htmlFor="languageKorean"> Korean</label>
                                    </div>
                                </div>
                                {errors.languages && <p className="text-danger p-1 m-1">{errors.languages.message}</p>}
                            </div>

                            <div className="col-md-6 mt-2 mt-md-0">
                                <h6 htmlFor="techKnowledges">Tech Knowledges</h6>
                                <div className="form-control tech-knowledges-list" id="techKnowledges">
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techSQL"
                                            value="SQL"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label className="ms-1" htmlFor="techSQL">SQL</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techReact"
                                            value="React"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label className="ms-1" htmlFor="techReact">React</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techPython"
                                            value="Python"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label className="ms-1" htmlFor="techPython">Python</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techJava"
                                            value="Java"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label className="ms-1" htmlFor="techJava">Java</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techJavaScript"
                                            value="Javascript"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label className="ms-1" htmlFor="techJavaScript">JavaScript</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techCSS"
                                            value="CSS"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label className="ms-1" htmlFor="techCSS">CSS</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techGo"
                                            value="GO"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label className="ms-1" htmlFor="techGo">GO</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techNodeJS"
                                            value="NodeJS"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label className="ms-1" htmlFor="techNodeJS">NodeJS</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techBootstrap"
                                            value="Bootstrap"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label className="ms-1" htmlFor="techBootstrap">Bootstrap</label>
                                    </div>
                                </div>
                                {errors.technologies && <p className="text-danger p-1 m-1">{errors.technologies.message}</p>}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary my-2 w-100">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateCard;
