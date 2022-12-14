import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
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
