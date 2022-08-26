import Image from 'next/image';
import Link from 'next/link';
import styles from './card.module.css';
import cls from 'classnames';

const Card = ({ href, name, imgUrl }) => {
	return (
		<Link href={href}>
			<a className={styles.cardLink}>
				<div className={cls('card', styles.container)}>
					<div className={styles.cardImageContainer}>
						<Image
							className={styles.cardImage}
							alt={name}
							src={imgUrl}
							layout="responsive"
							objectFit="cover"
							width={260}
							height={160}
						/>
					</div>
					<div className={styles.cardHeaderContainer}>
						<h2 className={styles.cardHeader}>{name}</h2>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default Card;
