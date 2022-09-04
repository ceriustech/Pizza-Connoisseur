import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { icons } from '../../data/Icons';
import pizzaShopsData from '../../data/pizza-shops.json';
import styles from '../../styles/PizzaShop.module.css';

export async function getStaticProps({ params }) {
	// const icon = icons;
	return {
		props: {
			icon: icons,
			pizzaShop: pizzaShopsData.find(
				(pizzaShop) => pizzaShop.id.toString() === params.id
			),
		}, // will be passed to the page component as props
	};
}

export async function getStaticPaths() {
	const paths = pizzaShopsData.map((pizzaShop) => ({
		params: {
			id: pizzaShop.id.toString(),
		},
	}));

	return {
		paths: paths,
		fallback: true, // can also be true or 'blocking'
	};
}

const PizzaShop = ({ pizzaShop, icon }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const { name, address, neighborhood, imgUrl, city, state } = pizzaShop;
	const { cityState, map, restaurant, thumbUp } = icon;

	return (
		<div style={styles.layout}>
			<Head>
				<title>{name}</title>
			</Head>

			<section className={styles.pizzaPlaceContainer}>
				<Link href="/">
					<a className={styles.backToHomeLink}>Back to home</a>
				</Link>
				<main className={styles.pizzaPlaceInfoContainer}>
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
							<span>
								{' '}
								<Image
									src={map}
									width={24}
									height={24}
									objectFit="cover"
									className={styles.iconImg}
									alt={name}
								/>
							</span>{' '}
							{address}
						</p>
						<p className={styles.pizzaPlaceInfo}>
							<span>
								{' '}
								<Image
									src={cityState}
									width={24}
									height={24}
									objectFit="cover"
									className={styles.iconImg}
									alt={name}
								/>
							</span>{' '}
							{city}, {state}
						</p>
						<p className={styles.pizzaPlaceInfo}>
							<span>
								{' '}
								<Image
									src={restaurant}
									width={24}
									height={24}
									objectFit="cover"
									className={styles.iconImg}
									alt={name}
								/>
							</span>{' '}
							{neighborhood}
						</p>
						<p className={styles.pizzaPlaceInfo}>
							<span>
								{' '}
								<Image
									src={thumbUp}
									width={24}
									height={24}
									objectFit="cover"
									className={styles.iconImg}
									alt={name}
								/>
							</span>{' '}
							count
						</p>

						<button className={styles.upvoteButton}>Up Vote!</button>
					</div>
				</main>
			</section>
		</div>
	);
};

export default PizzaShop;
