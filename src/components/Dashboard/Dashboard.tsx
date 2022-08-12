import React from 'react';
import Layout from '../Layout/Layout';
import './Dashboard.css';
import Cookies from 'universal-cookie';
import avatar from '../../assets/avatar.png';
import { Edit } from 'react-feather';
import FavItems from '../Home/FavItems';

export default function Dashboard() {
	const cookies = new Cookies();
	const user = cookies.get('_user');
	let favitems = localStorage.getItem('favourite');

	let a = !favitems ? [] : JSON.parse(favitems);

	return (
		<Layout>
			<div className='container-12'>
				<div className='avatar-flip'>
					<img
						src='http://media.idownloadblog.com/wp-content/uploads/2012/04/Phil-Schiller-headshot-e1362692403868.jpg'
						height='150'
						width='150'
					/>
					<img
						src='http://i1112.photobucket.com/albums/k497/animalsbeingdicks/abd-3-12-2015.gif~original'
						height='150'
						width='150'
					/>
				</div>
				<div className='dd'>
					<h2>{user.name}</h2>
					<h4>test@testt.com</h4>
					<p>hello im {user.name} and i love to eat and im very good at</p>
					<div className='favs-box'>
						<p id='myf-p'>My Favorites</p>
						{/* get the favouriteItems  */}
						<FavItems data={a} />
					</div>
				</div>
			</div>
		</Layout>
	);
}
