const germanPrice = price => {
	if (price.includes(',') && price.includes('.')) {
		return price.replace('.', ',').replace(',', '.');
	} else {
		return price.replace('.', ',');
	}
};

export { germanPrice };
