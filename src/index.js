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

//! To get date+time in searched city
function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  console.log(date);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes} `;
  // console.log(`${day} ${hours}:${minutes} `);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return days[day];
}

//! To show forecast in searched city (5 days)
function displayForecast(response) {
  // console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector('.weather-five-days');

  let forecastHTML = `<div class="days-wrapper">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="weather-day">
        <div class="day">${formatDay(forecastDay.dt)}</div>
        <img 
          class="img"
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="64"
        />
        <div class="weather-forecast-temperatures">
          <span class="numbers-max">${Math.round(forecastDay.temp.max)}°</span>
          <span class="numbers-min">${Math.round(forecastDay.temp.min)}°</span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  // console.log(forecastHTML);
}

//! To get forcast in searched city for 5 days
function getForecast(coordinates) {
  console.log(coordinates);
  let API_KEY = '2daf65f0cdaa917f11026e8a128ce271';
  let API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric`;
  axios.get(API_URL).then(displayForecast);
  // console.log(API_URL);
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

  let windEl = document.querySelector('.js-wind');
  let wind = Math.round(response.data.wind.speed);
  windEl.innerHTML = `${wind}km/h`;

  let dateEl = document.querySelector('.js-day');
  let date = response.data.dt * 1000;
  dateEl.innerHTML = formatDate(`${date}`);

  let iconEl = document.querySelector('.weather-icon');
  iconEl.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconEl.setAttribute('alt', response.data.weather[0].description);

  document.querySelector('.js-hour').innerHTML = '';
  document.querySelector('.weather-state').innerHTML =
    response.data.weather[0].description;
  document.querySelector('.search-input').value = '';

  getForecast(response.data.coord);
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

searchCityWeather('Irpin');
displayForecast();
