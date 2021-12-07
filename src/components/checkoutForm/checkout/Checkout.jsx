import React, { useState, useEffect } from 'react';
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	CircularProgress,
	Divider,
	Button,
	CssBaseline
} from '@material-ui/core';

import { commerce } from '../../../lib/commerce';

import useStyles from './style';
import AddressForm from './AdressForm/AddressForm';
import PaymentForm from './PaymentForm/PaymentForm';
import { Link } from 'react-router-dom';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, errorMessage, handleCaptureCheckout }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData] = useState({});
	const classes = useStyles();

	useEffect(() => {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
				setCheckoutToken(token);
			} catch (error) {
				console.log(error);
			}
		};
		generateToken();
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

	const Confirmation = () =>
		order.customer ? (
			<React.Fragment>
				<div>
					<Typography variant="5">
						Thank you for your purchase {order.customer.firstname} {order.customer.lastname}
					</Typography>
					<Divider className={classes.divider} />
					<Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
				</div>
				<br />
				<Button component={Link} to="/" variant="outlined" type="button">
					Back to home
				</Button>
			</React.Fragment>
		) : (
			<div className={classes.spinner}>
				<CircularProgress />
			</div>
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
						{activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
					</Paper>
				</main>
			</div>
		</React.Fragment>
	);
};

export default Checkout;