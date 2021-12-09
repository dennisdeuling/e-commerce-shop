import React, { useEffect, useState } from 'react';
import { commerce } from '../lib/commerce';

export const CartContext = React.createContext([]);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState({});

	const fetchCart = async () => {
		// TODO: Refactor this code
		setCart(await commerce.cart.retrieve());
	};

	const handleAddToCart = async (productId, quantity) => {
		const item = await commerce.cart.add(productId, quantity);

		setCart(item.cart);
	};

	const handleUpdateCartQty = async (productId, quantity) => {
		const { cart: response } = await commerce.cart.update(productId, { quantity });
		setCart(response);
	};

	const handleRemoveFromCart = async productId => {
		const { cart: response } = await commerce.cart.remove(productId);
		setCart(response);
	};

	const handleEmptyCart = async () => {
		const { cart: response } = await commerce.cart.empty();
		setCart(response);
	};

	const refreshCart = async () => {
		const response = await commerce.cart.refresh();
		setCart(response);
	};

	useEffect(() => {
		fetchCart();
	}, []);

	return (
		<CartContext.Provider
			value={{
				...cart,
				handleAddToCart,
				handleUpdateCartQty,
				handleRemoveFromCart,
				handleEmptyCart,
				refreshCart
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
