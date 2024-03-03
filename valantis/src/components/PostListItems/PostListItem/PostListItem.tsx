import React from 'react';
import styles from './postListItem.css';

interface Post {
	id: number;
	brand: string | null;
	price: number;
	product: string;
}
export function PostListItem({ post, index }: { post: Post; index: number }) {
	return (
		<li key={post.id} className='list-group-item list-group-item-action'>
			<div>{index + 1}</div>
			<div>{post.brand === null ? 'Нет бренда' : post.brand}</div>
			<div>{post.id}</div>
			<div>{post.price}</div>
			<div>{post.product}</div>
		</li>
	);
}
