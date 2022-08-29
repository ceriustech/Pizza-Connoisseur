import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import pizzaShopsData from '../../data/pizza-shops.json';

export async function getStaticProps({ params }) {
	console.log('PARAMS', params);
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
	console.log('%cPROP DATA:', 'font-size: 1.5em;color:red');
	console.log(pizzaShop);

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const { name, address, neighborhood } = pizzaShop;

	return (
		<div>
			<Head>
				<title>{name}</title>
			</Head>
			<Link href="/">
				<a>Back To Home</a>
			</Link>

			<h2>Pizza Shop Page {router.query.id}</h2>

			<Link href="/pizza-shop/2">
				<a>Go To Page dynamic</a>
			</Link>
			<p>{name}</p>
			<p>{address}</p>
			<p>{neighborhood}</p>
		</div>
	);
};

export default PizzaShop;
