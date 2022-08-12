import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import './Home.css';
import ItemList from './ItemList';
import SearchInput from './SearchInput';
import Typewriter from 'typewriter-effect';

export default function Home() {
	const [data, setData] = useState([]);

	return (
		<Layout>
			<div className='banner_section'>
				<div className='container'>
					<div className='py-5'>
						<h3 className='banner_title d-flex gap-2'>
							Find Nearby
							<Typewriter
								options={{
									strings: ['Cafe', 'Restaurants'],
									autoStart: true,
									loop: true,
								}}
							/>
						</h3>
						<p className='banner_subtitle'>
							The way to a good mood <br /> Good Food,Good Mood
						</p>
						<SearchInput setData={setData} />

						<ItemList data={data} />
					</div>
				</div>
			</div>
		</Layout>
	);
}
