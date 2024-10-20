const axios = require('axios');

const getTokenPrice = async (symbol, quoteCurrency = 'USDT') => {
	try {
		const response = await axios.get('https://api.mexc.com/api/v3/ticker/price', {
			params: {
				symbol: `${symbol.toUpperCase()}${quoteCurrency.toUpperCase()}`,
			},
		});

		return response.data.price;
	} catch (error) {
		console.error('Error fetching crypto price:', error);
		return null;
	}
};

module.exports = getTokenPrice;
