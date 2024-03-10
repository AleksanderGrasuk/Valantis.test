import React from 'react';
import { useOffsetStore } from '../../hooks/useOffsetStore';
import { debounce } from 'lodash';
import './pagination.css';
export function Pagination() {
	const { offset, decrement, increment, initPrice, initBrand, initProduct } =
		useOffsetStore() as any;

	const paginationPrev = 'Prev';
	const paginationNext = 'Next';

	function editProduct(event: any) {
		initProduct(String(event.target.value));
	}
	function editBrand(event: any) {
		initBrand(String(event.target.value));
	}
	function editPrice(event: any) {
		initPrice(Number(event.target.value));
	}
	const debouncedPrice = debounce(editPrice, 1000);
	const debouncedProduct = debounce(editProduct, 1000);
	const debouncedBrand = debounce(editBrand, 1000);

	return (
		<div id='nav-list'>
			<div className='pagination'>
				<button
					disabled={offset === 0}
					className='list-group-item list-group-item-primary page-link btn-pagination'
					onClick={decrement}
				>
					{paginationPrev}
				</button>
				<button
					className='list-group-item list-group-item-primary page-link btn-pagination'
					onClick={increment}
				>
					{paginationNext}
				</button>
			</div>
			<div className='filters'>
				<input
					className='input-filter'
					placeholder='Введите название'
					onChange={debouncedProduct}
				/>
				<input
					className='input-filter'
					placeholder='Введите бренд'
					onChange={debouncedBrand}
				/>
				<input
					className='input-filter'
					placeholder='Введите цену'
					onChange={debouncedPrice}
				/>
			</div>
		</div>
	);
}
