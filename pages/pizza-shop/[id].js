import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../components/Button/Button';
import { icons } from '../../data/Icons';
import { fetchPizzaRestaurants } from '../../lib/pizza-picker';
import styles from '../../styles/PizzaShop.module.css';

export async function getStaticProps({ params }) {
	const pizzaRestaurants = (await fetchPizzaRestaurants()) || [];
	const findPizzaShopById = pizzaRestaurants.find(
		(pizzaShop) => pizzaShop.id.toString() === params.id
	);

	return {
		props: {
			pizzaShop: findPizzaShopById ? findPizzaShopById : {},
		}, // will be passed to the page component as props
	};
}

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

	if (router.isFallback) {
		return <div className={styles.loader}></div>;
	}

	if (pizzaShop == undefined) {
		console.log('TRUE', pizzaShop);
		return <div>OOPS Can't find any pizza shops!</div>;
	}

	const { name, address, city, state, neighborhood, imgUrl } = pizzaShop;
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
