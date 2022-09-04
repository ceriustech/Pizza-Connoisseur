import styles from './Banner.module.css';

const Banner = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.subTitle}>Help your fellow pizza lovers.</h1>
			<h2 className={styles.subTitle_h2}>
				<span>VOTE</span> the best restaurants!
			</h2>
		</div>
	);
};

export default Banner;
