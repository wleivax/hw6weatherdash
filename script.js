function showCities() {
	$('#prevCities').empty();
	$('#cityInput').val('');
	for (i = 0; i < prevCities.length; i++) {
		let a = $('<a>');
		a.addClass('list-group-item list-group-item-action list-group-item-primary city');
		a.attr('data-name', prevCities[i]);
		a.text(prevCities[i]);
		$('#prevCities').prepend(a);
	}
}

let prevCities = [];
let cityInput;

function getCities() {
	let storedCities = JSON.parse(localStorage.getItem('cities'));
	if (storedCities !== null) {
		prevCities = storedCities;
	}
	showCities();
}

function getWeather() {
	let storedWeather = JSON.parse(localStorage.getItem('currentCity'));
	if (storedWeather !== null) {
		cityInput = storedWeather;
		showWeather();
		showFiveDayForecast();
	}
}

getCities();
getWeather();

function storeCityArray() {
	localStorage.setItem('cities', JSON.stringify(prevCities));
}

function storeCurrentCity() {
	localStorage.setItem('currentCity', JSON.stringify(cityInput));
}

$('#citySearchButton').on('click', function (event) {
	event.preventDefault();
	cityInput = $('#cityInput').val().trim();
	if (cityInput === '') {
		alert('Please enter a city to look up');
	} else if (prevCities.length >= 5) {
		prevCities.shift();
		prevCities.push(cityInput);
	} else {
		prevCities.push(cityInput);
	}
	storeCurrentCity();
	storeCityArray();
	showCities();
	showWeather();
	showFiveDayForecast();
});

$('#cityInput').keypress(function (e) {
	if (e.which == 13) {
		$('#citySearchButton').click();
	}
});

async function showWeather() {
	let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=4a1cb443538eef96d21d68c52754c10e`;
	let response = await $.ajax({
		url: queryURL,
		method: 'GET',
	});
	console.log(response);

	let currentWeatherDiv = $("<div class='card-body' id='currentWeather'>");
	let getCurrentCity = response.name;
	let date = new Date();
	let val = date.toLocaleDateString();
	let getCurrentWeatherIcon = response.weather[0].icon;
	let showCurrentWeatherIcon = $(
		`<img src = http://openweathermap.org/img/wn/${getCurrentWeatherIcon}@2x.png />`
	);
	let currentCityEl = $("<h3 class = 'card-body'>").text(`${getCurrentCity} (${val})`);
	currentCityEl.append(showCurrentWeatherIcon);
	currentWeatherDiv.append(currentCityEl);
	let getTemp = response.main.temp.toFixed(1);
	let tempEl = $("<p class='card-text'>").text(`Temperature: ${getTemp}° F`);
	currentWeatherDiv.append(tempEl);
	let getHumidity = response.main.humidity;
	let humidityEl = $("<p class='card-text'>").text(`Humidity: ${getHumidity}%`);
	currentWeatherDiv.append(humidityEl);
	let getWindSpeed = response.wind.speed.toFixed(1);
	let windSpeedEl = $("<p class='card-text'>").text('Wind Speed: ' + getWindSpeed + ' mph');
	currentWeatherDiv.append(windSpeedEl);
	let getLong = response.coord.lon;
	let getLat = response.coord.lat;

	let uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=4a1cb443538eef96d21d68c52754c10e&lat=${getLat}&lon=${getLong}`;
	let uvResponse = await $.ajax({
		url: uvURL,
		method: 'GET',
	});

	let getUVInfo = uvResponse.value;
	let uvNumber = $('<span>');

	if (getUVInfo > 0 && getUVInfo < 3) {
		uvNumber.addClass('uv-low');
	} else if (getUVInfo >= 3 && getUVInfo < 8) {
		uvNumber.addClass('uv-medium');
	} else if (getUVInfo >= 6 && getUVInfo < 88) {
		uvNumber.addClass('uv-high');
	} else if (getUVInfo >= 8 && getUVInfo < 11) {
		uvNumber.addClass('uv-very-high');
	} else {
		uvNumber.addClass('uv-extreme');
	}
	uvNumber.text(getUVInfo);
	let uvIndexEl = $("<p class='card-text'>").text('UV Index: ');
	uvNumber.appendTo(uvIndexEl);
	currentWeatherDiv.append(uvIndexEl);
	$('#weatherContainer').html(currentWeatherDiv);
}

async function showFiveDayForecast() {
	let queryURL =
		`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=imperial&appid=4a1cb443538eef96d21d68c52754c10e`;

	let response = await $.ajax({
		url: queryURL,
		method: 'GET',
	});
	let forecastContainer = $("<div  id='fiveDayForecast'>");
	let forecastHeader = $("<h5 class='card-header border-secondary'>").text(
		'5 Day Forecast'
	);
	forecastContainer.append(forecastHeader);
	let cardDeck = $("<div  class='card-deck'>");
	forecastContainer.append(cardDeck);

	console.log(response);
	for (i = 0; i < 5; i++) {
		let forecastCard = $("<div class='card mb-3 mt-3'>");
		let cardBody = $("<div class='card-body'>");
		let date = new Date();
		let newDate = date.setDate(date.getDate() + i + 1);
		let getDate = date.toLocaleDateString();
		let forecastDate = $("<h5 class='card-title'>").text(getDate);

		cardBody.append(forecastDate);
		let getCurrentWeatherIcon = response.list[i].weather[0].icon;
		console.log(getCurrentWeatherIcon);
		let showWeatherIcon = $(
			`<img src = http://openweathermap.org/img/wn/${getCurrentWeatherIcon}.png />`
		);
		cardBody.append(showWeatherIcon);
		let getTemp = response.list[i].main.temp;
		let tempEl = $("<p class='card-text'>").text('Temp: ' + getTemp + '° F');
		cardBody.append(tempEl);
		let getHumidity = response.list[i].main.humidity;
		let humidityEl = $("<p class='card-text'>").text(`Humidity: ${getHumidity}%`);
		cardBody.append(humidityEl);
		forecastCard.append(cardBody);
		cardDeck.append(forecastCard);
	}
	$('#forecastContainer').html(forecastContainer);
}

function getPreviousCities() {
	cityInput = $(this).attr('data-name');
	showWeather();
	showFiveDayForecast();
	console.log(cityInput);
}

$(document).on('click', '.city', getPreviousCities);
