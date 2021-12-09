import React, { useState, useEffect, useContext } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CssBaseline } from '@material-ui/core';

import { commerce } from '../../../lib/commerce';

import useStyles from './style';
import AddressForm from './AdressForm/AddressForm';
import PaymentForm from './PaymentForm/PaymentForm';
import Confirmation from './Confirmation/Confirmation';

import { CartContext } from '../../../context/CartContext';

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
	const cart = useContext(CartContext);
	const [order, setOrder] = useState({});
	const [activeStep, setActiveStep] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData] = useState({});
	const classes = useStyles();

	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
			setOrder(incomingOrder);
			cart.refreshCart();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
				setCheckoutToken(token);
			} catch (error) {
				console.log(error);
			}
		};
		if (cart.total_items) generateToken();
	}, [cart]);

	const nextStep = () => setActiveStep(prevActiveStep => prevActiveStep + 1);

	const backStep = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

	const next = data => {
		setShippingData(data);

		nextStep();
	};

	const Form = () =>
		activeStep === 0 ? (
			<AddressForm checkoutToken={checkoutToken} next={next} />
		) : (
			<PaymentForm
				shippingData={shippingData}
				checkoutToken={checkoutToken}
				backStep={backStep}
				nextStep={nextStep}
				handleCaptureCheckout={handleCaptureCheckout}
			/>
		);

	return (
		<React.Fragment>
			<CssBaseline />
			{/*TODO: delete this div later*/}
			<div className={classes.toolbar}>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography variant="h4" align="center">
							Checkout
						</Typography>
						<Stepper activeStep={activeStep} className={classes.stepper}>
							{steps.map(step => {
								return (
									<Step key={step}>
										<StepLabel>{step}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
						{activeStep === steps.length ? (
							<Confirmation order={order} classes={classes} />
						) : (
							checkoutToken && <Form />
						)}
					</Paper>
				</main>
			</div>
		</React.Fragment>
	);
};

export default Checkout;
