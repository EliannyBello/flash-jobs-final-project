import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../styles/Settings.css'
import AccountSettings from '../components/settings/AccountSettings'
import NotificationsSettings from '../components/settings/NotificationsSettings'
import PrivacyAndSecureSettings from '../components/settings/PrivacyAndSecureSettings'
import ProfileSettings from '../components/settings/ProfileSettings'

const Settings = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
} = useForm()

  const onSubmit = async (data) => {
    const formData = new FormData()

    formData.append('username', data.username)
    formData.append('biography', data.biography)
    formData.append('github', data.github)
    formData.append('linkedin', data.linkedin)
    formData.append('avatar', data.avatar[0])

        await actions.updateProfile(formData, store.access_token)
    }

    useEffect(() => {
      if(store?.access_token == null){
          navigate('/')
      }
  }, [])

  return (
    <div className="container-fluid mt-5 py-4 mb-3">
      <div className="row d-flex justify-content-center">
        <div className='col-12 col-md-3 col-xl-2 d-flex justify-content-between'>
          <form className='container'>
            <div className={'d-flex text-center text-md-start flex-md-column mt-4 justify-content-center ' + (!collapsed && 'sticky-top')}>
              {!collapsed && <h4>Settings</h4>}
              <Link to='/settings/account' className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover mx-1">
                Account
              </Link>
              <Link to='/settings/profile' className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover mx-1">
                Profile
              </Link>
              <Link to='/settings/privsec' className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover mx-1">
                Privacy and Security
              </Link>
              <Link to='/settings/notification' className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover mx-1">
                Notifications
              </Link>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
              <input type="username" defaultValue="" className={"form-control " + (errors.username ? 'is-invalid' : '')}  id="username" name='username' placeholder="Your Username" {...register('username')}/>
              <small className="invalid-feedback">{errors?.username?.message}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" placeholder="********" {...register('password')}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirm_password" name='confirm_password' placeholder="********" {...register('confirm_password')} />
            </div>
            <div className="mb-3">
              <label htmlFor="biography" className="form-label">Biography</label>
              <textarea className="form-control" id="biography" name="biography" rows="3" placeholder='Your biography here' {...register('biography')} defaultValue={store?.user?.profile?.biography}></textarea>
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
            <button className="btn btn-warning btn-sm w-100 py-2">Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings