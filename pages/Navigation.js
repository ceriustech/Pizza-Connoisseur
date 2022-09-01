import Link from 'next/link';
import styles from '../styles/Navigation.module.css';

const Navigation = () => {
	return (
		<header role="navigation" aria-label="navigation" className={styles.header}>
			<ul className={styles.navigationContainer}>
				<div>
					<Link href="/">
						<a>
							<h1 className={styles.title}>
								P<span className={styles.title_left}>izz</span>a{' '}
								<span className={styles.title_right}>
									P<span>i</span>cker
								</span>
							</h1>
						</a>
					</Link>
				</div>
				<div className={styles.navItemsContainer}>
					<Link href="/">
						<a className={styles.navItemLink}>
							<li className={styles.navItem}>Home</li>
						</a>
					</Link>
					<Link href="/">
						<a className={styles.navItemLink}>
							<li className={styles.navItem}>About</li>
						</a>
					</Link>
				</div>
			</ul>
		</header>
	);
};

export default Navigation;
