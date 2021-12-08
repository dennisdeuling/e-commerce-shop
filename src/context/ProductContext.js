import React, { useEffect, useState } from 'react';
import { commerce } from '../lib/commerce';

export const ProductContext = React.createContext([]);

export const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		setProducts(data);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<React.Fragment>
			<ProductContext.Provider value={products}>{children}</ProductContext.Provider>
		</React.Fragment>
	);
};
