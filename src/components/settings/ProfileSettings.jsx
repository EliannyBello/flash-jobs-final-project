import React from 'react'
import { useForm } from "react-hook-form";
import { Context } from '../../context/GlobalContext';
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import imgSrc from '../../page/img/avatarDefault.png'
import Swal from 'sweetalert2'
import { BiUnderline } from 'react-icons/bi';

const ProfileSettings = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const formData = new FormData()

        formData.append('username', data.username)
        formData.append('biography', data.biography)
        formData.append('github', data.github)
        formData.append('linkedin', data.linkedin)
        formData.append('avatar', data.avatar[0])
        formData.append('resume', data.resume[0])
        formData.append('phone', data.phone)
        formData.append('country', data.country)

        let avatarFile = null
        let avatarSize = null
        let resumeFile = null
        let resumeSize = null

        if (data.avatar.length > 0) {
            avatarFile = data.avatar[0]
            avatarSize = (avatarFile.size / 1024)
            console.log(avatarSize)
        }

        if (data.resume.length > 0 ) {
            resumeFile = data.resume[0]
            resumeSize = (resumeFile.size / 1024)
            console.log(resumeSize)
        }



        if (!avatarFile && !resumeFile) {
            const response = await actions.updateProfile(formData, store.access_token)
            Swal.fire({
                position: "center",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 1500
            });
        } else if (avatarSize > 500 || resumeSize > 500) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: 'The file size is too big: max. 500kb',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            const response = await actions.updateProfile(formData, store.access_token)
            Swal.fire({
                position: "center",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    useEffect(() => {
        if (store?.access_token == null) {
            navigate('/')
        }
    }, [])

    return (
        <div className='container-fluid mx-2'>
            <h4 className="text-center mt-5">Edit Profile</h4>
            <form onSubmit={handleSubmit(onSubmit)} className="my-3 p-4 ">
                <div className="mb-3 text-center">
                    <img src={store?.user?.profile?.avatar || imgSrc} alt="" className='img-fluid w-50 profile-avatar rounded-circle mb-3' />
                    <input type="file" accept='.png,.jpg,.jpeg' className={"form-control " + (errors.avatar ? 'is-invalid' : '')} id="avatar" name='avatar' {...register('avatar')} />
                    <small className="invalid-feedback">{errors?.avatar?.message}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="biography" className="form-label">Biography</label>
                    <textarea className="form-control" id="biography" name="biography" rows="3" placeholder='Your biography here' {...register('biography')} defaultValue={store?.user?.profile?.biography}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="text" className={"form-control"} id="phone" name='phone' placeholder="(+12)34567890 " {...register('phone')} defaultValue={store?.user?.profile?.phone} />
                    <small className="invalid-feedback"></small>
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country of residence</label>
                    <input type="text" className={"form-control"} id="country" name='country' placeholder="Country" {...register('country')} defaultValue={store?.user?.profile?.country} />
                    <small className="invalid-feedback"></small>
                </div>
                <div className="mb-3">
                    <label htmlFor="github" className="form-label">Github</label>
                    <input type="text" className={"form-control"} id="github" name='github' placeholder="Github profile link" {...register('github')} defaultValue={store?.user?.profile?.github} />
                    <small className="invalid-feedback"></small>
                </div>
                <div className="mb-3">
                    <label htmlFor="linkedin" className="form-label">Linkedin</label>
                    <input type="text" className={"form-control"} id="linkedin" name='linkedin' placeholder="Linkedin profile link" {...register('linkedin')} defaultValue={store?.user?.profile?.linkedin} />
                    <small className="invalid-feedback"></small>
                </div>
                <div className="mb-3">
                    <label htmlFor="resume" className="form-label">Resume</label>
                    <input type="file" accept='.pdf' className={"form-control" + (errors.resume ? 'is-invalid' : '')} id="resume" name='resume' {...register('resume')} />
                    <small className="invalid-feedback">{errors?.resume?.message}</small>
                </div>
                <button className="btn btn-warning btn-sm w-100 py-2">Update</button>
            </form>
        </div>
    )
}

export default ProfileSettings;