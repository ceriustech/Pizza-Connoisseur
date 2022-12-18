import { createApi } from 'unsplash-js';

const unsplash = createApi({
	accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getListOfPizzaRestaurantImages = async (imgSize, imgCount = 45) => {
	const photos = await unsplash.search.getPhotos({
		query: 'pizza restaurant',
		perPage: imgCount,
	});

	const unsplashResults = photos.response.results || [];

	const unsplashImages = unsplashResults.map((image) => image.urls[imgSize]);

	return unsplashImages;
};

const getUrlForPizzaRestaurants = (query, latlong, limit) => {
	return `https://api.foursquare.com/v3/places/search?query=${query}&client_id=${
		process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_ID
	}&client_secret=${
		process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_SECRET
	}&ll=${latlong}${limit ? `&limit=${limit}` : ''}`;
};

export const fetchPizzaRestaurants = async (
	latLong = '43.149682478673455%2C-88.00836091469839',
	limit = 6
) => {
	const pizzaImaages = await getListOfPizzaRestaurantImages('small');

	console.log('FETCHPIZZARESTAURANTS - RESTAURANT LIMIT:', limit);

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
		},
	};

	const url = getUrlForPizzaRestaurants('pizza-restaurants', latLong, limit);

	const response = await fetch(url, options);
	const data = (await response.json()) || {};

	const apiData = data.results.map((result, index) => {
		const neighborhood = result.location.neighborhood || [];
		return {
			id: result.fsq_id,
			name: result.name,
			address: result.location.address,
			city: result.location.locality,
			state: result.location.region,
			neighborhood: neighborhood.length > 0 ? neighborhood[0] : '',
			imgUrl: pizzaImaages.length > 0 ? pizzaImaages[index] : null,
		};
	});

	console.log('FETCHPIZZARESTAURANTS - PIZZA DATA:', apiData);

	return apiData;
};

// fetch('https://api.foursquare.com/v3/places/search?query=pizza-restaurants&ll=43.149682478673455%2C-88.00836091469839&limit=5', options)
