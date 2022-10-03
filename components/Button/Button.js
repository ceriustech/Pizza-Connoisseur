import styles from './Button.module.css';

const Button = ({ isLocation, buttonText, clickHandler }) => {
	let location = isLocation ? 'Locating...' : 'View restaurants nearby';

	let text = buttonText ? buttonText : '';

	return (
		<div className={styles.buttonWrapper}>
			<button className={styles.button} onClick={clickHandler}>
				{buttonText ? '' : location}
				{text}
			</button>
		</div>
	);
};

export default Button;
