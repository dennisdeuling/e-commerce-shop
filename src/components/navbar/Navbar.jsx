import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/logo-6483207_1280.png';

import useStyles from './style';

const Navbar = ({ totalItems }) => {
	const classes = useStyles();
	const location = useLocation();

	return (
		<React.Fragment>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography
						component={Link}
						to="/"
						variant="h6"
						className={classes.title}
						color="inherit"
					>
						<img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
						Commerce.js
					</Typography>
					<div className={classes.grow} />
					{location.pathname === '/' && (
						<div className={classes.button}>
							<IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
								<Badge badgeContent={totalItems} color="error">
									<ShoppingCart />
								</Badge>
							</IconButton>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
};

export default Navbar;
