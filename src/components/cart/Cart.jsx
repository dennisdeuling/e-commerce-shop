import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './style';
import { germanPrice } from '../../lib/helperFunctions';
import CartItem from './cartitem/CartItem';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
	const classes = useStyles();

	const EmptyCart = () => {
		return (
			<Typography variant="subtitle1">
				You have no items in your shopping cart,
				<Link className={classes.link} to="/">
					start adding some!
				</Link>
			</Typography>
		);
	};

	const FilledCart = () => {
		return (
			<React.Fragment>
				<Grid container spacing={3}>
					{cart.line_items.map(item => {
						return (
							<Grid item xs={12} sm={4} key={item.id}>
								<CartItem
									item={item}
									handleUpdateCartQty={handleUpdateCartQty}
									handleRemoveFromCart={handleRemoveFromCart}
								/>
							</Grid>
						);
					})}
				</Grid>
				<div className={classes.cardDetails}>
					<Typography variant="h4">
						Subtotal: {germanPrice(cart.subtotal.formatted_with_symbol)}
					</Typography>
					<div>
						<Button
							className={classes.emptyButton}
							size="large"
							type="button"
							variant="contained"
							color="secondary"
							onClick={handleEmptyCart}
						>
							Empty cart
						</Button>
						<Button
							className={classes.checkoutButton}
							component={Link}
							to="checkout"
							size="large"
							type="button"
							variant="contained"
							color="primary"
						>
							Checkout
						</Button>
					</div>
				</div>
			</React.Fragment>
		);
	};

	if (!cart.line_items.length) return 'Loading ...';

	return (
		<Container>
			{/*TODO: delete this div maybe*/}
			<div className={classes.toolbar} />
			<Typography className={classes.title} variant="h3" gutterBottom>
				Your Shopping Cart
			</Typography>
			{!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
		</Container>
	);
};

export default Cart;
