//! To get day
function onGetDay() {
  let now = new Date();

  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = days[now.getDay()];
  let currentDay = document.querySelector('.js-day');
  currentDay.innerHTML = day;
  return onGetDay;
}

//! To get time
function onGetTime() {
  let now = new Date();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentHour = document.querySelector('.js-hour');
  currentHour.innerHTML = `${hour}:${minutes}`;
  return onGetTime;
}

//! To get time in searched city
function formatDate(timestamp) {
  let date = new Date(timestamp);
  console.log(date);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  return `${day} ${hours}:${minutes} `;
  // console.log(`${day} ${hours}:${minutes} `);
}

//! To get weather in searched city
function displayWeather(response) {
  console.log(response.data);
  document.querySelector('.city').innerHTML = response.data.name;

  let temperatureEl = document.querySelector('.temperature');
  let temperature = Math.round(response.data.main.temp);
  temperatureEl.innerHTML = `${temperature}°C`;

  let humidityEl = document.querySelector('.js-humidity');
  let humidity = response.data.main.humidity;
  humidityEl.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windEl = document.querySelector('.js-wind');
  windEl.innerHTML = `${wind}km/h`;

  let dateEl = document.querySelector('.js-day');
  let date = response.data.dt * 1000;
  dateEl.innerHTML = formatDate(`${date}`);

  document.querySelector('.weather-state').innerHTML =
    response.data.weather[0].description;

  // onGetDay();
  // onGetTime();
  document.querySelector('.search-input').value = '';
}

function searchCityWeather(city) {
  let API_KEY = 'cac1dff680f5759730af0dd3a315ae8d';
  let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  axios.get(API_URL).then(displayWeather);
}

//! To submit form (btn search + submit)
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector('.search-input').value;
  searchCityWeather(city);
}

let searchForm = document.querySelector('.weather-form');
searchForm.addEventListener('submit', handleSubmit);

searchCityWeather('Irpin');

//! To show current city weather
function showCurrentCityWeather(response) {
  console.log(response.data);

  let temperature = Math.round(response.data.main.temp);
  let temperatureEl = document.querySelector('.temperature');
  let descriptionEl = document.querySelector('.weather-state');
  let cityEl = document.querySelector('.city');
  let humidityEl = document.querySelector('.js-humidity');
  let humidity = response.data.main.humidity;
  let windEl = document.querySelector('.js-wind');
  let wind = Math.round(response.data.wind.speed);
  temperatureEl.innerHTML = `${temperature}°C`;
  descriptionEl.innerHTML = response.data.weather[0].description;
  cityEl.innerHTML = response.data.name;
  humidityEl.innerHTML = `${humidity}%`;
  windEl.innerHTML = `${wind}km/h`;
  onGetDay();
  onGetTime();
}

//! To get position for current weather
function onGetPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let API_KEY = 'cac1dff680f5759730af0dd3a315ae8d';
  let API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  axios.get(`${API_URL}`).then(showCurrentCityWeather);
}
navigator.geolocation.getCurrentPosition(onGetPosition);

//! To get current position (btn current)
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(onGetPosition);
}
let currentBtnEl = document.querySelector('.btn-current');
currentBtnEl.addEventListener('click', getCurrentPosition);

//? function showCelsiusTemp() {
//   let currentTemperatureC = document.querySelector(".current-temperature");
//   currentTemperatureC.innerHTML = "+1";
//   let celsiusSign = document.querySelector(".sign");
//   celsiusSign.innerHTML = "°C";
// }

// let celsiusButton = document.querySelector(".celsius");
// celsiusButton.addEventListener("click", showCelsiusTemp);

//? function showFahrenheitTemp() {
//   let currentTemperatureF = document.querySelector(".current-temperature");
//   currentTemperatureF.innerHTML = `+34`;
//   let fahrenheitSign = document.querySelector(".sign");
//   fahrenheitSign.innerHTML = "°F";
// }

// let fahrenheitButton = document.querySelector(".fahrenheit");
// fahrenheitButton.addEventListener("click", showFahrenheitTemp);

//? const API_KEY = 'cac1dff680f5759730af0dd3a315ae8d';
// let city = 'Irpin';
// const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
// API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

//? Geolocation
// function showPosition(position) {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     alert('Geolocation is not supported by this browser.');
//   }
//   console.log(position.coords.latitude);
//   console.log(position.coords.longitude);
// }
// navigator.geolocation.getCurrentPosition(showPosition);

//? To get city/input
// function onSerchCity(event) {
//   event.preventDefault();
//   let cityEl = document.querySelector('.city');
//   let searchCityInput = document.querySelector('.search-input');
//   cityEl.innerHTML = searchCityInput.value;
//   onGetDay();
//   onGetTime();
//   searchCityInput.value = '';
// }
// let searchForm = document.querySelector('.weather-form');
// searchForm.addEventListener('submit', onSerchCity);
