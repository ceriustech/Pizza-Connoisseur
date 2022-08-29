import { useRouter } from 'next/router';
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
	return {
		paths: [
			{ params: { id: '0' } },
			{ params: { id: '1' } },
			{ params: { id: '2' } },
		],
		fallback: false, // can also be true or 'blocking'
	};
}

const PizzaShop = ({ pizzaShop }) => {
	const router = useRouter();
	console.log('%cPROP DATA:', 'font-size: 1.5em;color:red');
	console.log(pizzaShop);

	return (
		<div>
			<Link href="/">
				<a>Back To Home</a>
			</Link>

			<h2>Pizza Shop Page {router.query.id}</h2>

			<Link href="/pizza-shop/2">
				<a>Go To Page dynamic</a>
			</Link>
			<p>{pizzaShop.name}</p>
			<p>{pizzaShop.address}</p>
		</div>
	);
};

export default PizzaShop;
