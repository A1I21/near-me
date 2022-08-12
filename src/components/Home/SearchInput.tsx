import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Home.css';
import { ChevronDown, ChevronUp, MapPin } from 'react-feather';
import Cookies from 'universal-cookie';
import { getData } from '../../Api/HttpService';
import toast from 'react-hot-toast';

export default function SearchInput({ setData }: { setData: any }) {
	const cookies = new Cookies();
	const [category, setCategory] = useState('Burger');
	const [disable, setDisable] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const [searchBy, setSearchBy] = useState('');
	const { register, handleSubmit } = useForm();

	const resposseFunc = (res: any) => {
		if (!!res?.data) {
			setDisable(false);
			setData(res.data);
		} else {
			toast.error(res.messsage);
		}
	};
	const onSubmit = async (data: any) => {
		setDisable(true);
		const user = await cookies.get('_user');

		if (searchBy === 'popularRating' || searchBy === 'byRating') {
			const res = await getData(
				`rating?category=${category}&city=${data.location}&rating=${data.rating}`,
				user?.token
			);
			resposseFunc(res);
		} else if (searchBy === 'byName') {
			const res = await getData(`place?name=${data?.name}`, user?.token);
			resposseFunc(res);
		} else if (searchBy === 'expensive') {
			const res = await getData(`/mostexpensive?category=${data?.category}`, user?.token);
			resposseFunc(res);
		} else if (searchBy === 'cheap') {
			const res = await getData(`pricesearch?category=${data?.category}`, user?.token);
			resposseFunc(res);
		} else if (searchBy === 'popular') {
			const res = await getData(`trendy?category=${data.category}`, user?.token);
			resposseFunc(res);
		}
	};

	const handleSearchBy = (e: any) => {
		if (!!e.target?.value) {
			setSearchBy(e.target.value);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
				<div className='d-none d-lg-block bg-white rounded-pill'>
					<div className='w-100 py-3 px-3'>
						<select onChange={(e: any) => handleSearchBy(e)} className='form-select border-0 rounded-pill'>
							<option value='false'>What the search method do you want?</option>
							<option value='byName'>Search by name</option>
							<option value='byRating'>Search by the best rating</option>
							<option value='expensive'>Search by the best price most expensive</option>
							<option value='popular'>Search by the most popular</option>
							<option value='popularRating'>Search by the most popular and the best rating</option>
							<option value='cheap'>Search by the most cheap</option>
						</select>
					</div>
				</div>

				<div className='d-none d-lg-block bg-white rounded-pill mt-5'>
					{/* search popular rating  */}

					{(searchBy === 'popularRating' || searchBy === 'byRating') && (
						<div className='d-flex justify-content-between'>
							<div className='row w-100 py-3 px-3'>
								<div className='col-md-4  border-end d-flex align-items-center'>
									<input
										{...register('rating', { required: false })}
										type='text'
										className='search_input w-100'
										placeholder='Enter rating'
									/>
								</div>

								<div className='col-md-4  border-end d-flex gap-2 justify-content-between align-items-center'>
									<div style={{ width: '85%' }}>
										<input
											{...register('location', { required: false })}
											type='text'
											className='search_input w-100'
											placeholder='Location'
										/>
									</div>
									<div>
										<MapPin size={15} />
									</div>
								</div>

								<div className='col-md-4  d-flex align-items-center'>
									<div className=' bg-white position-relative w-75'>
										<a
											onClick={() => setDropdown(!dropdown)}
											href='#category'
											className='btn border-0 bg-none'
										>
											{category} {dropdown ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
										</a>

										<ul
											className={`list-unstyled p-3 shadow-sm bg-white position-absolute w-100 ${
												dropdown ? 'd-block' : 'd-none'
											}`}
										>
											<li>
												<a
													onClick={() => {
														setCategory('Burger');
														setDropdown(false);
													}}
													className='dropdown-item'
													href='#action'
												>
													Burger
												</a>
											</li>
											<li>
												<a
													onClick={() => {
														setCategory('Cafe');
														setDropdown(false);
													}}
													className='dropdown-item'
													href='#action'
												>
													Cafe
												</a>
											</li>
											<li>
												<a
													onClick={() => {
														setCategory('Restaurants');
														setDropdown(false);
													}}
													className='dropdown-item'
													href='#action'
												>
													Restaurants
												</a>
											</li>
											<li>
												<a
													onClick={() => {
														setCategory('parks');
														setDropdown(false);
													}}
													className='dropdown-item'
													href='#action'
												>
													parks
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className='d-flex align-items-center justify-content-end py-2 px-2'>
								<button disabled={disable} className='btn search_btn px-5 py-3 rounded-pill'>
									Search
								</button>
							</div>
						</div>
					)}

					{/* search by name */}

					{searchBy === 'byName' && (
						<div className='d-flex justify-content-between'>
							<div className='row w-100 py-3 px-3'>
								<div className='col-md-12  d-flex align-items-center'>
									<input
										{...register('name', { required: true })}
										type='text'
										className='search_input w-100'
										placeholder='What are you looking for?'
									/>
								</div>
							</div>

							<div className='d-flex align-items-center justify-content-end py-2 px-2'>
								<button disabled={disable} className='btn search_btn px-5 py-3 rounded-pill'>
									Search
								</button>
							</div>
						</div>
					)}

					{/* search by most expensive or cheap */}
					{(searchBy === 'expensive' || searchBy === 'cheap') && (
						<div className='d-flex justify-content-between'>
							<div className='row w-100 py-3 px-3'>
								<div className='col-md-12  d-flex align-items-center'>
									<div className=' bg-white position-relative w-100'>
										<select
											className='form-select w-100 rounded-pill border-0 p-2'
											{...register('category', { required: true })}
										>
											<option value={'Burger'}>Burger</option>
											<option value={'Cafe'}>Cafe</option>
											<option value={'Restaurants'}>Restaurants</option>
											<option value={'Parks'}>Parks</option>
										</select>
									</div>
								</div>
							</div>

							<div className='d-flex align-items-center justify-content-end py-2 px-2'>
								<button disabled={disable} className='btn search_btn px-5 py-3 rounded-pill'>
									Search
								</button>
							</div>
						</div>
					)}

					{/* search by most popular*/}
					{searchBy === 'popular' && (
						<div className='d-flex justify-content-between'>
							<div className='row w-100 py-3 px-3'>
								<div className='col-md-12  d-flex align-items-center'>
									<div className=' bg-white position-relative w-100'>
										<select
											className='form-select w-100 rounded-pill border-0 p-2'
											{...register('category', { required: true })}
										>
											<option value={'Burger'}>Burger</option>
											<option value={'Cafe'}>Cafe</option>
											<option value={'Burger'}>Restaurants</option>
											<option value={'Cafe'}>Parks</option>
										</select>
									</div>
								</div>
							</div>

							<div className='d-flex align-items-center justify-content-end py-2 px-2'>
								<button disabled={disable} className='btn search_btn px-5 py-3 rounded-pill'>
									Search
								</button>
							</div>
						</div>
					)}
				</div>
			</form>
		</>
	);
}
