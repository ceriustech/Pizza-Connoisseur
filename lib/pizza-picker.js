const getUrlForPizzaRestaurants = (query, latlong, limit) => {
	return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}${
		limit ? `&limit=${limit}` : ''
	}`;
};

export const fetchPizzaRestaurants = async () => {
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: process.env.FOURSQUARE_API_KEY,
		},
	};

	const url = getUrlForPizzaRestaurants(
		'pizza-restaurants',
		'43.149682478673455%2C-88.00836091469839',
		'6'
	);

	const response = await fetch(url, options);
	const data = await response.json();
	return data.results;
};

// fetch('https://api.foursquare.com/v3/places/search?query=pizza-restaurants&ll=43.149682478673455%2C-88.00836091469839&limit=5', options)
