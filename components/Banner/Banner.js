import styles from './Banner.module.css';

const Banner = (props) => {
	const { buttonText, handleOnClick } = props;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				P<span className={styles.title_left}>izz</span>a{' '}
				<span className={styles.title_right}>
					Conno<span>is</span>seur
				</span>
			</h1>
			<p className={styles.subTitle}>Rate your local pizza shops!</p>
			<button className={styles.button} onClick={handleOnClick}>
				{buttonText}
			</button>
		</div>
	);
};

export default Banner;
