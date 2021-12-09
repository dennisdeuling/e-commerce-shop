import React from 'react';
import { Button, CircularProgress, Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Confirmation = ({ order, classes }) => {
	return order.customer ? (
		<React.Fragment>
			<div>
				<Typography variant="h5">
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
};

export default Confirmation;
