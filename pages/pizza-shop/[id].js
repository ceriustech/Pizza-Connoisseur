import { useRouter } from 'next/router';
import Link from 'next/link';

const PizzaShop = () => {
	const router = useRouter();
	console.log('ROUTER', router);
	return (
		<div>
			<Link href="/">
				<a>Back To Home</a>
			</Link>

			<h2>Pizza Shop Page {router.query.id}</h2>

			<Link href="/pizza-shop/2">
				<a>Go To Page dynamic</a>
			</Link>
		</div>
	);
};

export default PizzaShop;
