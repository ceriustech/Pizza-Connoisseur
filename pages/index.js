import Head from 'next/head';
import Banner from '../components/Banner/Banner';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Card from '../components/Card/card';
import gianellisImg from '../public/restaurants/gianellis-img.jpg';

const Home = () => {
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
				<Banner
					buttonText="View restaurants nearby"
					handleOnClick={bannerBtnClickHandler}
				/>
				<div className={styles.heroImage}>
					<Image src="/static/pizza-hero-img.jpeg" width={800} height={550} />
				</div>
				<div className={styles.cardLayout}>
					<Card
						name={'Gianellis Pizza'}
						href={'/pizza-shop/gianellis-pizza'}
						imgUrl={gianellisImg}
					/>
				</div>
			</main>
		</div>
	);
};

export default Home;
