import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../components/Button/Button';
import { icons } from '../../data/Icons';
import { fetchPizzaRestaurants } from '../../lib/pizza-picker';
import styles from '../../styles/PizzaShop.module.css';

export async function getStaticProps(staticProps) {
	const { params } = staticProps;

	console.log('IN GETSTATIC PROPS - PARAMS', params);

	let pizzaRestaurants;
	try {
		pizzaRestaurants = await fetchPizzaRestaurants();
	} catch (err) {
		console.log('ERROR', err);
	}

	console.log('IN GETSTATIC PROPS - PIZZA RESTAURANT', pizzaRestaurants);

	const findPizzaShopById = pizzaRestaurants.find(
		(pizzaShop) => pizzaShop.id.toString() === params.id
	);

	console.log('IN GETSTATIC PROPS - FINDPIZZASHOP BY ID', findPizzaShopById);

	if (findPizzaShopById) {
		return {
			props: {
				pizzaShop: findPizzaShopById,
			}, // will be passed to the page component as props
		};
	}

	return {
		props: {
			pizzaShop: {},
		},
	};
}

// Will use server side props at a later date
// export async function getServerSideProps(context) {
// 	// console.log('CONTEXT', context);

// 	const options = {
// 		method: 'GET',
// 		headers: {
// 			accept: 'application/json',
// 			Authorization: 'fsq3A6gdNJgZqeSygwsUcNHVIlsCp9qtxNK6uNBnVn8zTtg=',
// 		},
// 	};

// 	let fetchPizzaRestaurant;
// 	try {
// 		fetchPizzaRestaurant = await (
// 			await fetch(
// 				`https://api.foursquare.com/v3/places/${context.params.id}`,
// 				options
// 			)
// 		).json();
// 	} catch (err) {
// 		console.error('THERE WAS AN ERROR', err);
// 	}

// 	if (fetchPizzaRestaurant) {
// 		return {
// 			props: {
// 				pizzaShop: {
// 					name: fetchPizzaRestaurant.name,
// 					address: fetchPizzaRestaurant.location.address,
// 					city: fetchPizzaRestaurant.location.city,
// 					state: fetchPizzaRestaurant.location.state,
// 					neighborhood: fetchPizzaRestaurant.location.neighborhood,
// 					imgUr:
// 						'https://images.unsplash.com/photo-1560433679-ac26da4b954d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
// 				},
// 			},
// 		};
// 	}

// 	console.log(fetchPizzaRestaurant);

// 	return {
// 		props: {
// 			pizzaShop: fetchPizzaRestaurant,
// 		},
// 	};
// }

export async function getStaticPaths() {
	const pizzaRestaurants = (await fetchPizzaRestaurants()) || [];

	const paths = pizzaRestaurants.map((pizzaShop) => ({
		params: {
			id: pizzaShop.id.toString(),
		},
	}));

	return {
		paths: paths,
		fallback: true, // can also be true or 'blocking'
	};
}

const PizzaShop = ({ pizzaShop }) => {
	const router = useRouter();

	console.log('%cCOMPONENT PROP - PIZZA SHOP:', 'font-size:2em;color:yellow');
	console.log(pizzaShop);

	if (router.isFallback) {
		return <div className={styles.loader}></div>;
	}

	const {
		name = '',
		address = '',
		city = '',
		state = '',
		neighborhood = '',
		imgUrl = 'https://via.placeholder.com/150',
	} = pizzaShop;
	const { cityState, map, restaurant, thumbUp } = icons;

	return (
		<div style={styles.layout}>
			<Head>
				<title>{name}</title>
			</Head>

			<main id="restaurantPage" className={styles.pizzaPlaceContainer}>
				<Link href="/">
					<a className={styles.backToHomeLink}>Back to home</a>
				</Link>
				<section className={styles.pizzaPlaceInfoContainer}>
					<div className={styles.col1}>
						<div className={styles.imageContainer}>
							<Image
								src={imgUrl}
								width={600}
								height={360}
								objectFit="cover"
								className={styles.shopImg}
								alt={name}
							/>
						</div>
					</div>
					<div className={styles.col2}>
						<h2 className={styles.name}>{name}</h2>
						<p className={styles.pizzaPlaceInfo}>
							<span className={styles.icon}>
								<Image
									src={map}
									width={24}
									height={24}
									objectFit="cover"
									className={styles.iconImg}
									alt={name}
								/>
							</span>
							{address}
						</p>
						<p className={styles.pizzaPlaceInfo}>
							<span className={styles.icon}>
								<Image
									src={cityState}
									width={24}
									height={24}
									objectFit="cover"
									className={styles.iconImg}
									alt={name}
								/>
							</span>
							{city}, {state}
						</p>
						{neighborhood.length > 0 && (
							<p className={styles.pizzaPlaceInfo}>
								<span className={styles.icon}>
									<Image
										src={restaurant}
										width={24}
										height={24}
										objectFit="cover"
										className={styles.iconImg}
										alt={name}
									/>
								</span>
								{neighborhood}
							</p>
						)}

						<p className={styles.pizzaPlaceInfo}>
							<span className={styles.icon}>
								<Image
									src={thumbUp}
									width={24}
									height={24}
									objectFit="cover"
									className={styles.iconImg}
									alt={name}
								/>
							</span>
							count
						</p>

						<Button buttonText="Up Vote!" size="small" />
					</div>
				</section>
			</main>
		</div>
	);
};

export default PizzaShop;
