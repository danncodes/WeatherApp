// Query Selectors
const cityForm = document.querySelector('form');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// Update User Function

const updateUI = data => {
	const cityDets = data.cityDets;
	const weather = data.weather;

	// Update Details Template String

	details.innerHTML = `
    <div class="text-muted text-uppercase text-center details">
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    </div>`;

	// Update Night and Day and Icon img

	const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
	icon.setAttribute('src', iconSrc);

	let timeSrc = null;

	if (weather.IsDayTime) {
		timeSrc = 'img/day.svg';
	} else {
		timeSrc = 'img/night.svg';
	}

	time.setAttribute('src', timeSrc);

	if (card.classList.contains('d-none')) {
		card.classList.remove('d-none');
	}
};

//Update City

const updateCity = async city => {
	const cityDets = await getCity(city);
	const weather = await getWeather(cityDets.Key);

	return {
		cityDets: cityDets,
		weather: weather
	};
};

cityForm.addEventListener('submit', e => {
	e.preventDefault();

	const city = cityForm.city.value.trim();
	cityForm.reset();

	// Update User Interface
	updateCity(city)
		.then(data => updateUI(data))
		.catch(err => console.log(err));

	// Set Local Storage
	localStorage.setItem('@WeatherApp:city', city);
});

// Run Update City and Update User Interface if Data Exisits on Local Storage
if (localStorage.getItem('@WeatherApp:city')) {
	updateCity(localStorage.getItem('city'))
		.then(data => updateUI(data))
		.catch(err => console.log(err));
}
