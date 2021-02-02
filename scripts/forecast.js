// API Key
const key = 'luVL3G45dk2h1UFUQE9n7OUzaTVZgQ2F';
const baseURL = 'http://dataservice.accuweather.com';

// Get Weather Information
const getWeather = async id => {
	const query = `${baseURL}/currentconditions/v1/${id}?apikey=${key}`;

	const response = await fetch(query);
	const data = await response.json();
	return data[0];
};

// Get City Information
const getCity = async city => {
	const query = `${baseURL}/locations/v1/cities/search?apikey=${key}&q=${city}`;

	const response = await fetch(query);
	const data = await response.json();

	return data[0];
};
