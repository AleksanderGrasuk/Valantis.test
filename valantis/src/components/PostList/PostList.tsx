import { useOffsetStore } from '../../hooks/useOffsetStore';
import { useEffect } from 'react';
import { PostListItem } from './PostListItem';
import './postlist.css';

interface Post {
	id: string;
	brand: string | null;
	price: number;
	product: string;
}

function filterPosts(posts: Post[]) {
	const ids: string[] = [];
	const result = [];
	for (let post of posts) {
		if (!ids.includes(post.id)) {
			ids.push(post.id);
			result.push(post);
		}
	}
	return result.slice(0, Math.min(result.length, 50));
}
export function PostList() {
	const { offset, responseData, loading, getData, price, brand, product } =
		useOffsetStore() as any;

	useEffect(() => {
		let params;
		let action = 'filter';
		if (price) {
			params = {
				price: price,
			};
		} else if (brand) {
			params = {
				brand: brand,
			};
		} else if (product) {
			params = {
				product: product,
			};
		} else {
			action = 'get_ids';
			params = { offset: offset, limit: 60 };
		}

		let data = {
			action: action,
			params: params,
		};

		getData(data);
	}, [getData, price, brand, product, offset]);

	const dataItems = responseData ? responseData : null;
	let posts: Post[] = [];
	if (dataItems) {
		posts = filterPosts(dataItems);
	}

	return (
		<div>
			{loading ? (
				<div className='loading'>
					<span className='loader'></span>
				</div>
			) : (
				<ul className='list-group postlist'>
					{posts.map((post) => (
						<PostListItem key={post.id} post={post} />
					))}
				</ul>
			)}
		</div>
	);
}
