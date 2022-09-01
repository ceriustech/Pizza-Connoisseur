import Navigation from './Navigation';
import Footer from './footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Navigation />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

export default MyApp;
