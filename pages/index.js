import Head from 'next/head';
import Banner from '../components/Banner/Banner';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Card from '../components/Card/card';
import pizzaShopsData from '../data/pizza-shops.json';

export async function getStaticProps(context) {
	console.log('GET STATIC PROPS');
	console.log(pizzaShopsData);
	return {
		props: {
			pizzaShopsData,
		}, // will be passed to the page component as props
	};
}

const Home = ({ pizzaShopsData }) => {
	console.log('%cPROP DATA:', 'font-size:1.25em; color:red');
	console.log(pizzaShopsData);
	const bannerBtnClickHandler = () => {
		console.log('BUTTON CLICKED');
	};

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
				<section>
					<Banner
						buttonText="View restaurants nearby"
						handleOnClick={bannerBtnClickHandler}
					/>
					<div className={styles.heroImage}>
						<Image src="/static/pizza-hero-img.jpeg" width={800} height={550} />
					</div>
				</section>

				<section>
					{pizzaShopsData.length > 0 && (
						<>
							<div>
								<h2 className={styles.heading2}>Milwaukee Pizza Shops</h2>
							</div>
							<div className={styles.cardLayout}>
								{pizzaShopsData.map((store) => (
									<Card
										key={store.id}
										name={store.name}
										href={`/pizza-shop/${store.id}`}
										imgUrl={store.imgUrl}
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
