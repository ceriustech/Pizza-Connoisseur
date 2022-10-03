import styles from './Button.module.css';

const Button = ({ isLocation, buttonText, clickHandler, size }) => {
	let location = isLocation ? 'Locating...' : 'View restaurants nearby';

	let text = buttonText ? buttonText : '';

	switch (size) {
		case 'small':
			size = {
				padding: ' 0.45rem 1rem',
			};
			break;
		case 'medium':
			size = {
				padding: '0.75rem 2rem',
			};
			break;
		default:
			return '';
	}

	return (
		<div className={styles.buttonWrapper}>
			<button className={styles.button} onClick={clickHandler} style={size}>
				{buttonText ? '' : location}
				{text}
			</button>
		</div>
	);
};

export default Button;
