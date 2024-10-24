import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/GlobalContext";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCard = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [minDate, setMinDate] = useState('')
    const { store, actions } = useContext(Context);


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
            setValue('technologies',data.technologies);
        }
    };

    useEffect(() => {
        fetchJobPost()
        onChange()
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
                                <input onKeyUp={e => onChange(e.target.value)} type="number" className="form-control" id="requiredTime" defaultValue={3}{...register('required_time', { required: 'Required time is required!' })}
                                />
                                {errors.required_time?.type === "required" && (
                                    <p className="text-danger p-1 m-1" role="alert">{errors.required_time.message}</p>
                                )}
                            </div>

                            <div className="col-mb-6">
                                <label htmlFor="expirationDate">Expiration Date</label>
                                <input type="date" min={minDate} className="form-control" id="expirationDate" {...register('expiration_date', { required: 'Expiration date is required!' })}
                                />
                            </div>
                        </div>
                        <div className="row mt-4">
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
                                        <label htmlFor="languageEnglish">English</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="languageSpanish"
                                            value="Spanish"
                                            {...register('languages', { required: 'Languages is required!' })}
                                        />
                                        <label htmlFor="languageSpanish">Spanish</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="languageKorean"
                                            value="Korean"
                                            {...register('languages', { required: 'Languages is required!' })}
                                        />
                                        <label htmlFor="languageKorean">Korean</label>
                                    </div>
                                </div>
                                {errors.languages && <p className="text-danger p-1 m-1">{errors.languages.message}</p>}
                            </div>

                            <div className="col-md-6">
                                <h6 htmlFor="techKnowledges">Tech Knowledges</h6>
                                <div className="form-control tech-knowledges-list" id="techKnowledges">
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techSQL"
                                            value="SQL"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label htmlFor="techSQL">SQL</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techReact"
                                            value="React"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label htmlFor="techReact">React</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techPython"
                                            value="Python"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label htmlFor="techPython">Python</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techJava"
                                            value="Java"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label htmlFor="techJava">Java</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techJavaScript"
                                            value="JavaScript"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label htmlFor="techJavaScript">JavaScript</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techCSS"
                                            value="CSS"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label htmlFor="techCSS">CSS</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techGo"
                                            value="GO"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label htmlFor="techGo">GO</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techNodeJS"
                                            value="NodeJS"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label htmlFor="techNodeJS">NodeJS</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="techBootstrap"
                                            value="Bootstrap"
                                            {...register('technologies', { required: 'Tech Knowledges is required!' })}
                                        />
                                        <label htmlFor="techBootstrap">Bootstrap</label>
                                    </div>
                                </div>
                                {errors.technologies && <p className="text-danger p-1 m-1">{errors.technologies.message}</p>}
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
