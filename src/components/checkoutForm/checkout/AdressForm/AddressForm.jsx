import React, { useEffect, useState } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../../../lib/commerce';

import { germanPrice } from '../../../../lib/helperFunctions';

import FormInput from './components/FormInput';

const AddressForm = ({ checkoutToken, next }) => {
	// TODO: Refactor this code especially the select field
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState('');
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState('');
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState('');

	const methods = useForm();

	const countries = Object.entries(shippingCountries).map(([code, name]) => ({
		id: code,
		label: name
	}));

	const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({
		id: code,
		label: name
	}));

	const options = shippingOptions.map(option => ({
		id: option.id,
		label: `${option.description} - ${germanPrice(option.price.formatted_with_symbol)}`
	}));

	const fetchShippingCountries = async checkoutTokenId => {
		const { countries: response } = await commerce.services.localeListShippingCountries(
			checkoutTokenId
		);
		setShippingCountries(response);
		setShippingCountry(Object.keys(response)[0]);
	};

	const fetchSubdivisions = async countryCode => {
		const { subdivisions: response } = await commerce.services.localeListSubdivisions(countryCode);

		setShippingSubdivisions(response);
		setShippingSubdivision(Object.keys(response)[0]);
	};

	const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
		const response = await commerce.checkout.getShippingOptions(checkoutTokenId, {
			country,
			region
		});
		setShippingOptions(response);
		setShippingOption(response[0].id);
	};

	useEffect(() => {
		fetchShippingCountries(checkoutToken.id);
	}, []);

	useEffect(() => {
		if (shippingCountry) fetchSubdivisions(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		if (shippingSubdivision)
			fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
	}, [shippingSubdivision]);

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
						<FormInput name="city" label="city" />
						<FormInput name="zip" label="Zip / Postal code" />
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								value={shippingCountry}
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
