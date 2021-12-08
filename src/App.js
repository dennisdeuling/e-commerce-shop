import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Route, Switch } from 'react-router-dom';
import { ProductList, Navbar, Cart, Checkout } from './components';

import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

const App = () => {
	// const [products, setProducts] = useState([]);
	// const [cart, setCart] = useState({});
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState('');

	// const fetchProducts = async () => {
	// 	const { data } = await commerce.products.list();
	// 	setProducts(data);
	// };

	// const fetchCart = async () => {
	// 	// TODO: Refactor this code
	// 	setCart(await commerce.cart.retrieve());
	// };
	//
	// const handleAddToCart = async (productId, quantity) => {
	// 	const item = await commerce.cart.add(productId, quantity);
	//
	// 	setCart(item.cart);
	// };
	//
	// const handleUpdateCartQty = async (productId, quantity) => {
	// 	const { cart: response } = await commerce.cart.update(productId, { quantity });
	// 	setCart(response);
	// };
	//
	// const handleRemoveFromCart = async productId => {
	// 	const { cart: response } = await commerce.cart.remove(productId);
	// 	setCart(response);
	// };
	//
	// const handleEmptyCart = async () => {
	// 	const { cart: response } = await commerce.cart.empty();
	// 	setCart(response);
	// };
	//
	// const refreshCart = async () => {
	// 	const response = await commerce.cart.refresh();
	// 	setCart(response);
	// };

	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
			setOrder(incomingOrder);
			// refreshCart();
		} catch (error) {
			setErrorMessage(error.data.error.message);
		}
	};

	useEffect(() => {
		// fetchProducts();
		// fetchCart();
	}, []);

	return (
		<React.Fragment>
			<CartProvider>
				<ProductProvider>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<ProductList />
						</Route>
						<Route exact path="/cart">
							<Cart />
						</Route>
						<Route exact path="/checkout">
							<Checkout
								// cart={cart}
								order={order}
								errorMessage={errorMessage}
								handleCaptureCheckout={handleCaptureCheckout}
							/>
						</Route>
					</Switch>
				</ProductProvider>
			</CartProvider>
		</React.Fragment>
	);
};

export default App;
