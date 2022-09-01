import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import pizzaShopsData from '../../data/pizza-shops.json';
import styles from '../../styles/PizzaShop.module.css';

export async function getStaticProps({ params }) {
	return {
		props: {
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

const PizzaShop = ({ pizzaShop }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const { name, address, neighborhood, imgUrl } = pizzaShop;

	return (
		<div style={styles.layout}>
			<Head>
				<title>{name}</title>
			</Head>

			<section>
				<div className={styles.col1}>
					<Link href="/">
						<a>Back To Home</a>
					</Link>
					<div className={styles.pizzaShopNameContainer}>
						<h2 style={styles.name}>{name}</h2>
					</div>

					<Image
						src={imgUrl}
						width={600}
						height={300}
						className={styles.shopImg}
						alt={name}
					/>
				</div>
				<div className={styles.col2}>
					<p>{address}</p>
					<p>{neighborhood}</p>
				</div>
			</section>
		</div>
	);
};

export default PizzaShop;
