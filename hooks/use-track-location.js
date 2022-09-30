import { useState } from 'react';

export const useTrackLocation = () => {
	const [locationErrMsg, setLocationErrorMsg] = useState('');
	const [latLong, setLatLong] = useState('');

	const successHandler = (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		setLatLong(`${latitude},${longitude}`);
		setLocationErrorMsg('');
	};

	const errorHandler = () => {
		setLocationErrorMsg('Unable to retrieve your location');
	};

	const trackLocationHandler = () => {
		if (!navigator.geolocation) {
			setLocationErrorMsg('Geolocation is not supported by your browser');
		} else {
			// status.textContent = 'Locating…';
			navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
		}
	};

	return {
		latLong,
		trackLocationHandler,
		locationErrMsg,
	};
};
