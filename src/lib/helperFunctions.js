const germanPrice = price => {
	if (price.includes(',') && price.includes('.')) {
		return price.replace('.', ',').replace(',', '.');
	} else {
		return price.replace('.', ',');
	}
};

const createObjectArray = (input, modifiedLabel) => {
	let result;

	switch (modifiedLabel) {
		case true:
			result = input.map(option => ({
				id: option.id,
				label: `${option.description} - ${germanPrice(option.price.formatted_with_symbol)}`
			}));

			return result;

		case false:
			result = Object.entries(input).map(([code, name]) => ({
				id: code,
				label: name
			}));
			return result;
		default:
			return {};
	}
};

export { germanPrice, createObjectArray };
