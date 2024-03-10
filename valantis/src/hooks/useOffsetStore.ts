import { create } from 'zustand';
import { GenerateHash } from './useGenerateHash';
import axios from 'axios';

const token = GenerateHash();
export const useOffsetStore = create((set) => ({
	offset: 0,
	responseData: null,
	loading: false,
	error: false,
	price: '',
	brand: '',
	product: '',
	increment: () =>
		set((state: { offset: number }) => ({ offset: state.offset + 50 })),
	decrement: () =>
		set((state: { offset: number }) => ({ offset: state.offset - 50 })),
	getData: (data: any) => {
		set({ loading: true });
		axios
			.post('https://api.valantis.store:41000/', data, {
				headers: {
					'X-Auth': token,
					'Content-Type': 'application/json',
				},
			})
			.then((res) => {
				const requestData = {
					action: 'get_items',
					params: { ids: res.data.result },
				};
				axios
					.post('https://api.valantis.store:41000/', requestData, {
						headers: {
							'X-Auth': token,
							'Content-Type': 'application/json',
						},
					})
					.then((res) => {
						set({ responseData: res.data.result });
					})
					.catch((err) => {
						console.log(err.message);
						set({ error: true });
					})
					.finally(() => {
						set({ loading: false });
					});
			})
			.catch((err) => {
				console.log(err.message);
				set({ error: true });
			})
			.finally(() => {
				set({ loading: false });
			});
	},
	initPrice: (price: number) => set({ price }),
	initBrand: (brand: string) => set({ brand }),
	initProduct: (product: string) => set({ product }),
}));
