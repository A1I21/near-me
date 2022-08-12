import React from 'react';
import Favitem from './FavItem';

import './Home.css';
import Item from './Item';

export default function FavItems({ data }: { data: any }) {
	return (
		<div className='list_area mt-5'>
			<ul className='list-unstyled'>
				{data.map((item: any, i: number) => (
					<Favitem key={i} item={item} />
				))}
			</ul>
		</div>
	);
}
