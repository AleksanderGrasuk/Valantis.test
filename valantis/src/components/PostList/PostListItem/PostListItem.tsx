// import React from 'react';
import './postListItem.css';

interface Post {
	id: string;
	brand: string | null;
	price: number;
	product: string;
}
export function PostListItem({ post }: { post: Post }) {
	return (
		<li
			key={post.id}
			className='list-group-item list-group-item-action postlistitems'
		>
			<div className='postlistitem'>
				{post.brand === null ? 'Нет бренда' : post.brand}
			</div>
			<div className='postlistitem'>{post.id}</div>
			<div className='postlistitem'>{post.price}</div>
			<div className='postlistitem'>{post.product}</div>
		</li>
	);
}
