import styles from '../SearchField.module.css';

const CitySearch = () => {
	return (
		<form className={styles.form}>
			<label className={styles.label}>City</label>
			<input
				type="text"
				name="city"
				placeholder="search a city..."
				className={styles.inputField}
			/>
		</form>
	);
};

export default CitySearch;
