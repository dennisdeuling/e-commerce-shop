import React, { useEffect, useRef, useState } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../../../lib/commerce';

import { createObjectArray } from '../../../../lib/helperFunctions';

import FormInput from './components/FormInput';

const AddressForm = ({ checkoutToken, next }) => {
	// TODO: Refactor this code especially the select field
	const nodeRef = useRef(null);
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState('');
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState('');
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState('');

	const methods = useForm();

	const countries = createObjectArray(shippingCountries, false);

	const subdivisions = createObjectArray(shippingSubdivisions, false);

	const options = createObjectArray(shippingOptions, true);

	useEffect(() => {
		let isMounted = true;

		const fetchShippingCountries = async checkoutTokenId => {
			const { countries: response } = await commerce.services.localeListShippingCountries(
				checkoutTokenId
			);
			if (isMounted) {
				setShippingCountries(response);
				setShippingCountry(Object.keys(response)[0]);
			}
		};

		fetchShippingCountries(checkoutToken.id);

		return () => {
			isMounted = false;
		};
	}, [checkoutToken.id]);

	useEffect(() => {
		const fetchSubdivisions = async countryCode => {
			const { subdivisions: response } = await commerce.services.localeListSubdivisions(
				countryCode
			);
			setShippingSubdivisions(response);
			setShippingSubdivision(Object.keys(response)[0]);
		};

		if (shippingCountry) fetchSubdivisions(shippingCountry);
	}, [shippingCountry, checkoutToken.id]);

	useEffect(() => {
		const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
			const response = await commerce.checkout.getShippingOptions(checkoutTokenId, {
				country,
				region
			});
			setShippingOptions(response);
			setShippingOption(response[0].id);
		};

		if (shippingSubdivision)
			fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
	}, [shippingCountry, shippingSubdivision, checkoutToken.id]);

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(data =>
						next({ ...data, shippingCountry, shippingSubdivision, shippingOption })
					)}
				>
					<Grid container spacing={3}>
						<FormInput name="firstName" label="First name" />
						<FormInput name="lastName" label="Last name" />
						<FormInput name="address" label="Address" />
						<FormInput name="email" label="Email" />
						<FormInput name="city" label="City" />
						<FormInput name="zip" label="Zip / Postal code" />
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								value={shippingCountry}
								ref={nodeRef}
								fullWidth
								onChange={event => setShippingCountry(event.target.value)}
							>
								{countries.map(country => {
									return (
										<MenuItem key={country.id} value={country.id}>
											{country.label}
										</MenuItem>
									);
								})}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivisions</InputLabel>
							<Select
								value={shippingSubdivision}
								fullWidth
								onChange={event => setShippingSubdivision(event.target.value)}
							>
								{subdivisions.map(subdivision => {
									return (
										<MenuItem key={subdivision.id} value={subdivision.id}>
											{subdivision.label}
										</MenuItem>
									);
								})}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select
								value={shippingOption}
								fullWidth
								onChange={event => setShippingOption(event.target.value)}
							>
								{options.map(option => {
									return (
										<MenuItem key={option.id} value={option.id}>
											{option.label}
										</MenuItem>
									);
								})}
							</Select>
						</Grid>
					</Grid>
					<br />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button component={Link} to="/cart" variant="outlined">
							Back to cart
						</Button>
						<Button type="submit" variant="contained" color="primary">
							Next
						</Button>
					</div>
				</form>
			</FormProvider>
		</React.Fragment>
	);
};

export default AddressForm;
