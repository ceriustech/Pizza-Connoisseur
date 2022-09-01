import Image from 'next/image';
import Link from 'next/link';
import styles from './card.module.css';
import cls from 'classnames';

const Card = ({ href, name, imgUrl, city, state }) => {
	return (
		<Link href={href}>
			<a className={styles.cardLink}>
				<div className={cls('card', styles.container)}>
					<div className={styles.cardImageContainer}>
						<Image
							className={styles.cardImage}
							alt={name}
							src={imgUrl}
							objectFit="cover"
							width={200}
							height={200}
						/>
					</div>
					<div className={styles.cardTextContainer}>
						<h2 className={styles.cardHeader}>{name}</h2>
						<p className={styles.cardSubtext}>
							{city}, {state}
						</p>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default Card;
