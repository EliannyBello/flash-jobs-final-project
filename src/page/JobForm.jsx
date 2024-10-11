import { useForm } from "react-hook-form";
import { Context } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import '../styles/JobForm.css';

const JobForm = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        console.log(data);
        const response = await actions.jobposting(data);
        if (response) {
            navigate('/profile');
        }
    };

    return (
        <div className="container-fluid pt-3 mt-5">
            <div className="container container-jobform m-auto justify-content-center pt-3">
                <h3>Post Job</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="row row-jobform my-3">
                    <div className="form-group form-group-jobform">
                        <label htmlFor="postTitle">Title</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Title" {...register('title', { required: 'Title is required!' })}
                        /> {errors.Title && <span>{errors.Title.message}</span>}
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
                        {errors.Description && <span>{errors.Description.message}</span>}
                    </div>


                    <div className="col-mb-6">
                        <label htmlFor="payment">Payment</label>
                        <input type="number" className="form-control" id="payment" {...register('payment', { required: 'Payment is required!' })}
                        />
                        {errors.Payment && <span>{errors.Payment.message}</span>}
                    </div>



                    <div className="row row-jobform">
                        <div className="col-mb-6">
                            <label htmlFor="requiredTime">Required Time</label>
                            <input type="number" className="form-control" id="requiredTime" defaultValue={3}{...register('required_time', { required: 'Required time is required!' })}
                            />
                            {errors.RequiredTime && <span>{errors.RequiredTime.message}</span>}
                        </div>

                        <div className="col-mb-6">
                            <label htmlFor="expirationDate">Expiration Date</label>
                            <input type="date" className="form-control" id="expirationDate" {...register('expiration_date', { required: 'Expiration date is required!' })}
                            />
                            {errors.ExpirationDate && <span>{errors.ExpirationDate.message}</span>}
                        </div>
                    </div>

                    <div className="row row-jobform">
                        <div className="col-mb-6">
                            <label htmlFor="postLanguages">Post Languages</label>
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
                            {errors.languages && <span>{errors.languages.message}</span>}
                        </div>

                        <div className="col-mb-6">
                            <label htmlFor="techKnowledges">Tech Knowledges</label>
                            <div className="form-control tech-knowledges-list" id="techKnowledges">
                                <div>
                                    <input
                                        type="checkbox"
                                        id="techSQL"
                                        value="SQL"
                                        {...register('tech_Knowledges', { required: 'Tech Knowledges is required!' })}
                                    />
                                    <label htmlFor="techSQL">SQL</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="techReact"
                                        value="React"
                                        {...register('tech_Knowledges', { required: 'Tech Knowledges is required!' })}
                                    />
                                    <label htmlFor="techReact">React</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="techPython"
                                        value="Python"
                                        {...register('tech_Knowledges', { required: 'Tech Knowledges is required!' })}
                                    />
                                    <label htmlFor="techPython">Python</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="techJava"
                                        value="Java"
                                        {...register('tech_Knowledges', { required: 'Tech Knowledges is required!' })}
                                    />
                                    <label htmlFor="techJava">Java</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="techJavaScript"
                                        value="JavaScript"
                                        {...register('tech_Knowledges', { required: 'Tech Knowledges is required!' })}
                                    />
                                    <label htmlFor="techJavaScript">JavaScript</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="techCSS"
                                        value="CSS"
                                        {...register('tech_Knowledges', { required: 'Tech Knowledges is required!' })}
                                    />
                                    <label htmlFor="techCSS">CSS</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="techGo"
                                        value="GO"
                                        {...register('tech_Knowledges', { required: 'Tech Knowledges is required!' })}
                                    />
                                    <label htmlFor="techGo">GO</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="techNodeJS"
                                        value="NodeJS"
                                        {...register('tech_Knowledges', { required: 'Tech Knowledges is required!' })}
                                    />
                                    <label htmlFor="techNodeJS">NodeJS</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="techBootstrap"
                                        value="Bootstrap"
                                        {...register('tech_Knowledges', { required: 'Tech Knowledges is required!' })}
                                    />
                                    <label htmlFor="techBootstrap">Bootstrap</label>
                                </div>
                            </div>
                            {errors.tech_Knowledges && <span>{errors.tech_Knowledges.message}</span>}
                        </div>


                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default JobForm;
