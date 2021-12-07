import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

import { germanPrice } from '../../../../lib/helperFunctions';

const Review = ({ checkoutToken }) => {
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Order summary
			</Typography>
			<List disablePadding>
				{checkoutToken.live.line_items.map(product => {
					return (
						<ListItem style={{ padding: '10px 0' }} key={product.name}>
							<ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
							<Typography variant="body2">
								{germanPrice(product.line_total.formatted_with_symbol)}
							</Typography>
						</ListItem>
					);
				})}
				<ListItem style={{ padding: '10px 0' }}>
					<ListItemText primary="Total" />
					<Typography variant="subtitle1" style={{ fontWeight: 700 }}>
						{germanPrice(checkoutToken.live.subtotal.formatted_with_symbol)}
					</Typography>
				</ListItem>
			</List>
		</React.Fragment>
	);
};

export default Review;
