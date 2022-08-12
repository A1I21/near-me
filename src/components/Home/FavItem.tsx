import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Heart, MapPin } from 'react-feather';

export default function Favitem({ item }: { item: any }) {
	const [collapse, setCollapse] = useState(false);
	//function to delete the favourite item from local storage
	const deleteFavourite = () => {
		const favourite = localStorage.getItem('favourite');
		if (favourite) {
			const favouriteItems = JSON.parse(favourite);
			const newFavouriteItems = favouriteItems.filter((favItem: any) => favItem.id !== item.id);
			localStorage.setItem('favourite', JSON.stringify(newFavouriteItems));
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
						<div>
							<Heart className='likedd-btn' onClick={deleteFavourite} />
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
