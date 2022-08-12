import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
export default function SignIn() {
    const cookies = new Cookies()
    const [disable, setDisable] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const onSubmit = (data: any) => {
        setDisable(true)
        axios.post('http://localhost:3002/userrouts/userlogin', {
            username: data.username,
            password: data.password,
        })
            .then((res:any) => {

                setDisable(false);
                cookies.set('_user',
                    { name: res.data?.name, token: res.data?.token },
                    { path: '/' });
                navigate('/dashboard')

                if (!!res.data?.msg) {
                    toast.error(res.data?.msg)
                }
            })
            .catch((error:any) => {
                setDisable(false);
                toast.error(error.message);
            });
    };
    

    return (
        <Layout>
            <div className='page_container'>
                <div className='container my-5'>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='form_area' style={{ height: '400px', padding: '60px 30px' }}>

                        <h2 className='text-center'>Sign in</h2>

                        <div className="mb-3">
                            <label
                                className="form-label"
                                htmlFor='username'>Username</label>
                            <input
                                {...register("username", { required: true })}
                                type="text"
                                className="form-control p-2"
                                placeholder="example001" />
                            {errors.username && <span className='text-danger'>This username is required</span>}
                        </div>
                        <div className="mb-3">
                            <label
                                className="form-label"
                                htmlFor='password'>Password</label>
                            <input
                                {...register("password", { required: true })}
                                type="password"
                                className="form-control p-2"
                                placeholder="*******" />
                            {errors.password && <span className="text-danger">This Password is required</span>}
                        </div>

                        <div className="mt-4">
                            <button
                                disabled={disable}
                                className='btn btn-primary px-4 py-2 w-100'>
                                Sign in
                            </button>
                        </div>
                        <div className='mt-3 text-center'>
                            <span>
                                Don't have an account? {" "}
                                <Link to="/signup" className='text-primary'>
                                    Create a new account
                                </Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
