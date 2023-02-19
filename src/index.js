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

function serchCity(event) {
  event.preventDefault();
  let city = document.querySelector('.city');
  city.innerHTML = `${searchCityInput.value}`;
  onGetDay();
  onGetTime();
  searchCityInput.value = '';
}
let searchCityInput = document.querySelector('.search-input');
let searchForm = document.querySelector('.weather-form');

searchForm.addEventListener('submit', serchCity);
