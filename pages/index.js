import Head from 'next/head';
import Banner from '../components/Banner/Banner';
import StateSearch from '../components/Search/StateSearch/StateSearch';
import CitySearch from '../components/Search/CitySearch/CitySearch';
import styles from '../styles/Home.module.css';
import Card from '../components/Card/card';
import pizzaShopsData from '../data/pizza-shops.json';
import { icons } from '../data/Icons';
import { fetchPizzaRestaurants } from '../lib/pizza-picker';

export async function getStaticProps() {
	const pizzaRestaurants = (await fetchPizzaRestaurants()) ?? [];
	console.log('pizzaRestaurants', pizzaRestaurants);
	return {
		props: {
			pizzaShops: pizzaRestaurants,
		}, // will be passed to the page component as props
	};
}

const Home = ({ pizzaShops }) => {
	const bannerBtnClickHandler = () => {
		console.log('BUTTON CLICKED');
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
								View restaurants nearby
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
				</section>

				<section className="restarurantGrid">
					{pizzaShops.length > 0 && (
						<>
							<div className={styles.cardLayout}>
								{pizzaShops.map((shop) => (
									<Card
										key={shop.fsq_id}
										name={shop.name}
										href={`/pizza-shop/${shop.fsq_id}`}
										imgUrl={pizzaShopsData[0].imgUrl || shop.link}
										upVoteImgUrl={thumbUp}
										city={shop.location.locality}
										state={shop.location.region}
									/>
								))}
							</div>
						</>
					)}
				</section>
			</main>
		</div>
	);
};

export default Home;
