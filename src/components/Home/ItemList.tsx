import React from 'react';

import './Home.css';
import Item from './Item';

export default function ItemList({ data }: { data: any }) {
	console.log(data);
	return (
		<div className='list_area mt-5'>
			<ul className='list-unstyled'>
				{data.map((item: any, i: number) => (
					<Item key={i} item={item} />
				))}
			</ul>
		</div>
	);
}
