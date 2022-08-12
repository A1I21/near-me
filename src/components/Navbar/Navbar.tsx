import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Navbar.css';
import Cookies from 'universal-cookie';
import { User } from 'react-feather';

export default function Navbar() {
	const cookies = new Cookies();
	const [toggle, setToogle] = useState(false);
	const _user = cookies.get('_user');
	const navigate = useNavigate();

	const handleSignOut = () => {
		cookies.remove('_user', { path: '/' });
		navigate('/');
	};
	return (
		<nav className='navbar navbar-expand-lg bg-light shadow-sm'>
			<div className='container'>
				<Link to={'/'} className='navbar-brand'>
					<img className='image-fluid w-75 nav-logo' src={logo} alt='logo here' />
				</Link>

				<button
					onClick={() => setToogle(!toggle)}
					className={`navbar-toggler ${toggle ? 'collapsed' : ''}`}
					type='button'
				>
					<span className='navbar-toggler-icon' />
				</button>

				<div className={`collapse navbar-collapse ${toggle ? 'show' : ''}`}>
					<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
						<li className='nav-item m-1'>
							<NavLink
								to={'/'}
								className={({ isActive }) =>
									isActive ? 'nav_active nav-link nav_btn' : 'nav-link nav_btn'
								}
							>
								Home
							</NavLink>
						</li>
						{!_user?.token && (
							<>
								<li className='nav-item m-1'>
									<NavLink
										to={'/signup'}
										className={({ isActive }) =>
											isActive ? 'nav_active nav-link nav_btn' : 'nav-link nav_btn'
										}
									>
										Sign up
									</NavLink>
								</li>
								<li className='nav-item m-1'>
									<NavLink
										to={'/signin'}
										className={({ isActive }) =>
											isActive ? 'nav_active nav-link nav_btn' : 'nav-link nav_btn'
										}
									>
										Sign in
									</NavLink>
								</li>{' '}
							</>
						)}

						{_user?.token && (
							<>
								<li className='nav-item m-1'>
									<NavLink
										to={'/dashboard'}
										className={({ isActive }) =>
											isActive
												? 'nav_active nav-link nav_btn  d-flex align-items-center'
												: 'nav-link nav_btn  d-flex align-items-center'
										}
									>
										<span className='d-flex gap-2 justify-content-between align-items-center'>
											<User size={25} /> {_user?.name}
										</span>
									</NavLink>
									{/* <NavLink
                                        to={'/dashboard'}
                                        className={({ isActive }) => isActive ? 'nav_active nav-link nav_btn' : 'nav-link nav_btn'}

                                    >Dashboard</NavLink> */}
								</li>
								<li className='nav-item m-1'>
									<a onClick={() => handleSignOut()} href='#signout' className='nav-link nav_btn'>
										Sign out
									</a>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
