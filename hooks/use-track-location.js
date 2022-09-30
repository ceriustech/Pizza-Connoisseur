import { useState } from 'react';

export const useTrackLocation = () => {
	const [locationErrMsg, setLocationErrorMsg] = useState('');
	const [latLong, setLatLong] = useState('');
	const [isFindingLocation, setIsFindingLocation] = useState(false);

	const successHandler = (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		setLatLong(`${latitude},${longitude}`);
		setLocationErrorMsg('');
		setIsFindingLocation(false);
	};

	const errorHandler = () => {
		setIsFindingLocation(false);
		setLocationErrorMsg('Unable to retrieve your location');
	};

	const trackLocationHandler = () => {
		setIsFindingLocation(true);

		if (!navigator.geolocation) {
			setLocationErrorMsg('Geolocation is not supported by your browser');
			setIsFindingLocation(false);
		} else {
			// status.textContent = 'Locating…';
			navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
		}
	};

	return {
		latLong,
		trackLocationHandler,
		locationErrMsg,
		isFindingLocation,
	};
};
