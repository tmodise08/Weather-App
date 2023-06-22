let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let time = now.getHours();
if (time < 10) {
  time = `0${time}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let h2 = document.querySelector(".h2");

h2.innerHTML = `${day} ${time}:${minutes}`;

function form(event) {
  event.preventDefault();
  let input = document.querySelector(".input");
  let h3 = document.querySelector("h3");
  h3.innerHTML = input.value.toUpperCase();

  search(input.value);
}
search("johannesburg");

function search(input) {
  let apiKey = "ffef30738ae0dab8014c9284ct83eo91";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${input}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

let click = document.querySelector("form");

click.addEventListener("submit", form);
let celsiusTemperature = null;

function forecastCoords(coordinates) {
  console.log(coordinates);
  let apiKey = "ffef30738ae0dab8014c9284ct83eo91";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showTemp(response) {
  let h4 = document.querySelector("h4");
  celsiusTemperature = Math.round(response.data.temperature.current);
  let temp = Math.round(response.data.temperature.current);
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let feels = document.querySelector("#feels");
  let icon = response.data.condition.icon;
  let img = document.querySelector("#img");
  let feelsLike = Math.round(response.data.temperature.feels_like);
  h4.innerHTML = `${temp}`;
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  wind.innerHTML = `Wind speed: ${response.data.wind.speed} m/s`;
  feels.innerHTML = `This weather feels like ${feelsLike}℃ `;
  img.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
  );

  forecastCoords(response.data.coordinates);
}
if (now.getHours() < 18) {
  video.setAttribute("src", `day.mp4`);
}
function changeFdegree(event) {
  event.preventDefault();
  let h4 = document.querySelector("h4");

  let calculate = Math.round(celsiusTemperature * 9) / 5 + 32;
  h4.innerHTML = calculate;
}
function changeCdegree(event) {
  event.preventDefault();
  let h4 = document.querySelector("h4");

  h4.innerHTML = celsiusTemperature;
}
let fahrenheit = document.querySelector(".link");
fahrenheit.addEventListener("click", changeFdegree);

let celsius = document.querySelector(".cLink");
celsius.addEventListener("click", changeCdegree);

changeFdegree();
changeCdegree();

function showDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let dailyForecast = response.data.daily;
  let forecast = document.querySelector("#cardRow");

  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
        <div class="col-2">
          <div class="card" style="width: 5rem">
            <h5 class= "cardTitle">${showDays(forecastDay.time)}</h5>
            <img class ="cardImage" src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png">
            <h6>${Math.round(forecastDay.temperature.maximum)}°/${Math.round(
          forecastDay.temperature.minimum
        )}°</h6>
          </div>
          </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div`;
  forecast.innerHTML = forecastHTML;
}
