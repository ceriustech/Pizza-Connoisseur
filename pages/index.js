import Head from 'next/head';
import Banner from '../components/Banner/Banner';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Card from '../components/Card/card';
import pizzaShopsData from '../data/pizza-shops.json';

export async function getStaticProps() {
	return {
		props: {
			pizzaShops: pizzaShopsData,
		}, // will be passed to the page component as props
	};
}

const Home = ({ pizzaShops }) => {
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
				<section className={styles.heroContainer}>
					<Banner />
				</section>

				<section>
					{pizzaShopsData.length > 0 && (
						<>
							<div className={styles.headingContainer}>
								<h2 className={styles.heading}>
									<span>Top</span> Rated Pizza Shops
								</h2>
							</div>
							<div className={styles.buttonWrapper}>
								<button
									className={styles.button}
									onClick={bannerBtnClickHandler}
								>
									View restaurants nearby
								</button>
							</div>

							<div className={styles.cardLayout}>
								{pizzaShops.map((shop) => (
									<Card
										key={shop.id}
										name={shop.name}
										href={`/pizza-shop/${shop.id}`}
										imgUrl={shop.imgUrl}
										city={shop.city}
										state={shop.state}
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
