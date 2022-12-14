import { useState, useEffect } from 'react';
import Head from 'next/head';
import Banner from '../components/Banner/Banner';
import StateSearch from '../components/Search/StateSearch/StateSearch';
import CitySearch from '../components/Search/CitySearch/CitySearch';
import Button from '../components/Button/Button';
import styles from '../styles/Home.module.css';
import Card from '../components/Card/card';
import pizzaShopsData from '../data/pizza-shops.json';
import { icons } from '../data/Icons';
import { fetchPizzaRestaurants } from '../lib/pizza-picker';
import { useTrackLocation } from '../hooks/use-track-location';

export async function getStaticProps() {
	const pizzaRestaurants = (await fetchPizzaRestaurants()) || [];
	console.log('pizzaRestaurants', pizzaRestaurants);
	return {
		props: {
			pizzaShops: pizzaRestaurants,
		}, // will be passed to the page component as props
	};
}

const Home = ({ pizzaShops }) => {
	const { trackLocationHandler, latLong, locationErrMsg, isFindingLocation } =
		useTrackLocation();

	const [pizzaPlaces, setPizzaPlaces] = useState('');
	const [pizzaPlacesError, setPizzaPlacesError] = useState(null);

	console.log('%cLOCATION DATA', 'font-size: 1.5em; color:red');
	console.log({ latLong, locationErrMsg });
	console.log('PIZZA PLACES', pizzaPlaces);

	useEffect(() => {
		async function getPizzaRestaurantsByLocation() {
			if (latLong) {
				try {
					const fetchedPizzaRestaurants = await fetchPizzaRestaurants(
						latLong,
						30
					);
					setPizzaPlaces(fetchedPizzaRestaurants);
				} catch (error) {
					console.log('UNABLE TO FETCH RESTAURANT DATA:', error);
					setPizzaPlacesError(error.message);
				}
			}
		}

		getPizzaRestaurantsByLocation();
	}, [latLong]);

	// console.log('%cFETCHED PIZZA SHOPS:', 'font-size:1.5em;color:yellow');
	// console.log(pizzaPlaces);

	const bannerBtnClickHandler = () => {
		trackLocationHandler();
	};

	const { thumbUp } = icons;

	const pizzaPlaceCount = pizzaPlaces.length;

	let pizzaRestaurantsHeader;

	if (pizzaPlaceCount > 0) {
		pizzaRestaurantsHeader = (
			<h2 className={styles.heading}>
				<span>Pizza</span> Restaurants Near You
			</h2>
		);
	} else {
		pizzaRestaurantsHeader = (
			<h2 className={styles.heading}>
				<span>Checkout</span> These Restaurants
			</h2>
		);
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Pizza Picker</title>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/static/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/static/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/static/favicon-16x16.png"
				/>
				<link rel="manifest" href="/static/site.webmanifest" />
				<link rel="icon" href="/static/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<section className={styles.heroContainer}>
					<Banner />
				</section>

				<section className={styles.restaurantSearch}>
					<div className={styles.searchContainer}>
						<Button
							isLocation={isFindingLocation}
							clickHandler={bannerBtnClickHandler}
							size="medium"
						/>
						<div className={styles.searchFieldContainer}>
							<StateSearch />
							<CitySearch />
							<Button buttonText="Submit" size="small" />
						</div>
					</div>
					<div className={styles.headingContainer}>
						{pizzaRestaurantsHeader}
					</div>
					{locationErrMsg && (
						<div className={styles.errorMsgContainer}>
							<p className={styles.errorMsgText}>{locationErrMsg}</p>
						</div>
					)}
					{pizzaPlacesError && (
						<div className={styles.errorMsgContainer}>
							<p className={styles.errorMsgText}>{pizzaPlacesError}</p>
						</div>
					)}
				</section>

				<section className="restarurantGrid">
					{pizzaPlaceCount > 0 && (
						<>
							<div className={styles.cardLayout}>
								{pizzaPlaces.map((shop) => (
									<Card
										key={shop.id}
										name={shop.name}
										href={`/pizza-shop/${shop.id}`}
										imgUrl={shop?.imgUrl || pizzaShopsData[0].imgUrl}
										upVoteImgUrl={thumbUp}
										city={shop.city}
										state={shop.state}
									/>
								))}
							</div>
						</>
					)}

					{pizzaShops.length > 0 && pizzaPlaceCount <= 0 ? (
						<>
							<div className={styles.cardLayout}>
								{pizzaShops.map((shop) => (
									<Card
										key={shop.id}
										name={shop.name}
										href={`/pizza-shop/${shop.id}`}
										imgUrl={shop?.imgUrl || pizzaShopsData[0].imgUrl}
										upVoteImgUrl={thumbUp}
										city={shop.city}
										state={shop.state}
									/>
								))}
							</div>
						</>
					) : (
						''
					)}
				</section>
			</main>
		</div>
	);
};

export default Home;
