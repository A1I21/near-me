import React, { useState } from 'react';
import Layout from '../Layout/Layout';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import ObjectID from 'bson-objectid';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
	const navigate = useNavigate();
	const [disable, setDisable] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data: any) => {
		setDisable(true);

		axios
			.post('http://localhost:3002/userrouts/usercreate', {
				user_id: new ObjectID(),
				username: data.username,
				password: data.password,
				email: data.email,
				phone: data.phone,
				name: data.name,
			})
			.then((res: any) => {
				toast.success(res.data.msg);
				setDisable(false);
				navigate('/signin');
			})
			.catch((error: any) => {
				toast.error(error.message);
				setDisable(false);
			});
	};
	return (
		<Layout>
			<div className='page_container mt-5'>
				<div
					className='container 
                 d-flex align-items-center'
				>
					<form onSubmit={handleSubmit(onSubmit)} className='form_area'>
						<h2 className='text-center'>Sign up</h2>
						<div className='mb-3'>
							<label className='form-label' htmlFor='username'>
								Username
							</label>
							<input
								{...register('username', { required: true })}
								type='text'
								className='form-control'
								placeholder='example001'
							/>
							{errors.username && <span className='text-danger'>This username is required</span>}
						</div>
						<div className='mb-3'>
							<label className='form-label' htmlFor='name'>
								Full Name
							</label>
							<input
								{...register('name', { required: true })}
								type='text'
								className='form-control'
								placeholder='Mohammad'
							/>
							{errors.name && <span className='text-danger'>This name is required</span>}
						</div>
						<div className='mb-3'>
							<label className='form-label' htmlFor='email'>
								Email address
							</label>
							<input
								{...register('email', { required: true })}
								type='text'
								className='form-control'
								placeholder='name@example.com'
							/>
							{errors.email && <span className='text-danger'>This email is required</span>}
						</div>
						<div className='mb-3'>
							<label className='form-label' htmlFor='phone'>
								Phone
							</label>
							<input
								{...register('phone', { required: true })}
								type='text'
								className='form-control'
								placeholder='name@example.com'
							/>
							{errors.phone && <span className='text-danger'>This Phone is required</span>}
						</div>
						<div className='mb-3'>
							<label className='form-label' htmlFor='password'>
								Password
							</label>
							<input
								{...register('password', { required: true })}
								type='password'
								className='form-control'
								placeholder='name@example.com'
							/>
							{errors.password && <span className='text-danger'>This Password is required</span>}
						</div>

						<div className=''>
							<button disabled={disable} className='btn btn-primary px-4 py-2 w-100'>
								Sign up
							</button>
						</div>
						<div className='mt-3 text-center'>
							<span>
								Already have account?{' '}
								<Link to='/signin' className='text-primary'>
									Sign in
								</Link>
							</span>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
}
