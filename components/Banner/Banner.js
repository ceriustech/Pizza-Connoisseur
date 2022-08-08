import styles from './Banner.module.css';

const Banner = (props) => {
	const { buttonText, handleOnClick } = props;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				<span className={styles.span_left}>Pizza</span>
				<span className={styles.span_right}>Connoisseur</span>
			</h1>
			<p className={styles.subTitle}>Rate your local pizza shops!</p>
			<button className={styles.button} onClick={handleOnClick}>
				{buttonText}
			</button>
		</div>
	);
};

export default Banner;
