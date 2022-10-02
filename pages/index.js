import { useEffect } from 'react';
import Head from 'next/head';
import Banner from '../components/Banner/Banner';
import StateSearch from '../components/Search/StateSearch/StateSearch';
import CitySearch from '../components/Search/CitySearch/CitySearch';
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

	console.log('%cLOCATION DATA', 'font-size: 1.5em; color:red');
	console.log({ latLong, locationErrMsg });
	console.log('PIZZA SHOPS', pizzaShops);

	useEffect(() => {
		async function getPizzaRestaurantsByLocation() {
			if (latLong) {
				try {
					const fetchedPizzaRestaurants = await fetchPizzaRestaurants(
						latLong,
						15
					);
					console.log('%cFETCHED PIZZA SHOPS:', 'font-size:1.5em;color:yellow');
					console.log(fetchedPizzaRestaurants);
				} catch (error) {
					console.log('UNABLE TO FETCH RESTAURANT DATA:', error);
				}
			}
		}

		getPizzaRestaurantsByLocation();
	}, [latLong]);

	const bannerBtnClickHandler = () => {
		console.log('BUTTON CLICKED');
		trackLocationHandler();
	};

	const { thumbUp } = icons;

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
						<div className={styles.buttonWrapper}>
							<button className={styles.button} onClick={bannerBtnClickHandler}>
								{isFindingLocation ? 'Locating...' : 'View restaurants nearby'}
							</button>
						</div>
						<StateSearch />
						<CitySearch />
					</div>
					<div className={styles.headingContainer}>
						<h2 className={styles.heading}>
							<span>Top</span> Rated Pizza Shops
						</h2>
					</div>
					{locationErrMsg && (
						<div className={styles.errorMsgContainer}>
							<p className={styles.errorMsgText}>{locationErrMsg}</p>
						</div>
					)}
				</section>

				<section className="restarurantGrid">
					{(pizzaShops.length > 0 && (
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
					)) || <div>Sorry, we can't find any pizza places at this time.</div>}
				</section>
			</main>
		</div>
	);
};

export default Home;
