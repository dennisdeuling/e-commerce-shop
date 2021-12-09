import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProductList, Navbar, Cart, Checkout } from './components';

import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

const App = () => {
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
							<Checkout />
						</Route>
					</Switch>
				</ProductProvider>
			</CartProvider>
		</React.Fragment>
	);
};

export default App;
