import styles from './Banner.module.css';

const Banner = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.subTitle}>
				Help your fellow pizza lovers. <span>VOTE</span> the best pizza
				restaurants near you!
			</h1>
		</div>
	);
};

export default Banner;
