import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Heart } from 'react-feather';

export default function Item({ item }: { item: any }) {
	const [collapse, setCollapse] = useState(false);
	const [liked, setliked] = useState(false);

	console.log(item);
	//function to set the favourite item to local storage
	const setFavourite = () => {
		const favourite = localStorage.getItem('favourite');
		if (favourite) {
			const favouriteItems = JSON.parse(favourite);
			favouriteItems.push(item);
			localStorage.setItem('favourite', JSON.stringify(favouriteItems));
			setliked(!liked);
		} else {
			const favouriteItems = [];
			favouriteItems.push(item);
			localStorage.setItem('favourite', JSON.stringify(favouriteItems));
		}
	};

	return (
		<>
			<li
				onClick={() => setCollapse(!collapse)}
				className={`item_list ${collapse ? 'h-auto' : ''}`}
				style={{ cursor: 'pointer' }}
			>
				<div>
					<div
						className='
                     p-3 shadow-sm  d-flex justify-content-between 
                    align-items-center'
					>
						<Heart onClick={setFavourite} className={liked ? 'likedd-btn' : 'liked-btn'}></Heart>
						<div>
							<a className='item_link' href='#item'>
								{item.name}
							</a>
						</div>

						<div>
							<button className='collapse_btn'>{collapse ? <ChevronUp /> : <ChevronDown />}</button>
						</div>
					</div>
					<div className={`p-3`}>
						<div className='d-flex gap-5'>
							<div>
								<p className='mb-0'>
									<MapPin size={14} /> {item.address}, {item.city}
								</p>
								<p className='mb-0'>Phone: {item.phone}</p>
								<p className='mb-0'>Price: {item.price}</p>
								<p className='mb-0'>Price: {item.rating}</p>
								<p className='mb-0'>Rating: {item.rating}</p>
								<p className='mb-0'>Opening Hours: {item.openinghours}</p>
								<a
									href={`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`}
									target='_blank'
								>
									<p className='mb-0'>Directions</p>
								</a>
							</div>
							<div className=''>
								<h5>Category: </h5>
								<ul className=''>
									{item.category?.map((cat: string, i: number) => (
										<li key={i}>{cat}</li>
									))}
								</ul>

								<h5>Delevery Apps: </h5>
								<ul className=''>
									{item.delevryapps?.map((de: string, i: number) => (
										<li key={i}>{de}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</li>
		</>
	);
}
