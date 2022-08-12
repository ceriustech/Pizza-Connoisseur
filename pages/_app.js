import Head from 'next/head';
import Footer from './footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

export default MyApp;
