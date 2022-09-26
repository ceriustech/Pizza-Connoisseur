import { createApi } from 'unsplash-js';

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getListOfPizzaRestaurantImages = async (imgSize) => {
	const photos = await unsplash.search.getPhotos({
		query: 'pizza restaurant',
		page: 1,
		perPage: 6,
	});

	const unsplashResults = photos.response.results;

	const unsplashImages = unsplashResults.map((image) => image.urls[imgSize]);

	return unsplashImages;
};

const getUrlForPizzaRestaurants = (query, latlong, limit) => {
	return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}${
		limit ? `&limit=${limit}` : ''
	}`;
};

export const fetchPizzaRestaurants = async () => {
	const pizzaImaages = await getListOfPizzaRestaurantImages('small');

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

	const apiData = data.results.map((result) => {
		return {
			...result,
			imgUrl: pizzaImaages[0],
		};
	});

	console.log('PIZZA DATA:', apiData);

	return apiData;
};

// fetch('https://api.foursquare.com/v3/places/search?query=pizza-restaurants&ll=43.149682478673455%2C-88.00836091469839&limit=5', options)
