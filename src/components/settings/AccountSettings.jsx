import React from "react";
import { useForm } from "react-hook-form";
import { Context } from '../../context/GlobalContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


// falta solicitar contraseña actual para el cambio y quizas un alert de succesful
//cuando intentamos logear con datos incorrectos que envie error(actualmente se bugea)
const AccountSettings = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const {
        register,
        
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        
        const formData = new FormData();
        
        formData.append('password', data.password);
    
        // Check if password and confirm_password match
        if (data.password !== data.confirm_password) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Passwords don't match",
                showConfirmButton: false,
                timer: 1500
              });
            return;
        }
        
        const response = await actions.updateProfile(formData, store.access_token)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.message,
            showConfirmButton: false,
            timer: 1500
          });

    };

    useEffect(() => {
        if (store?.access_token == null) {
            navigate('/')
        }
    }, [])

    return (
        <div className='mx-2'>
            <h4 className=" mt-3">Account</h4>
            <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" defaultValue={store?.user?.email} className="form-control " name='email' placeholder="Your Email" readOnly disabled />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                    <input type="text" defaultValue={store?.user?.username} className="form-control" name='username' placeholder="Username" readOnly disabled />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="********" {...register('password', { required: 'Password is required!' })} />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirm_password" name='confirm_password' placeholder="********" {...register('confirm_password')} />
                </div>

                <button className="btn btn-warning btn-sm w-100 py-2">Update</button>
            </form>
        </div>
    )
}

export default AccountSettings;