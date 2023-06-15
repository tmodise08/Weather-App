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
  let apiKey = "1a46c2ddb4f23a0843f1e06f7ae609ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemp);
}

let click = document.querySelector("form");

click.addEventListener("submit", form);
let celsiusTemperature = null;
function showTemp(response) {
  let h4 = document.querySelector("h4");
  celsiusTemperature = Math.round(response.data.main.temp);
  let temp = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let cloud = document.querySelector("#cloud");
  let icon = response.data.weather[0].icon;
  let img = document.querySelector("#img");
  h4.innerHTML = `${temp}`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind speed: ${response.data.wind.speed} m/s`;
  cloud.innerHTML = `${response.data.clouds.all}  % Cloudiness`;
  img.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
}

function changeDegree(event) {
  event.preventDefault();
  let h4 = document.querySelector("h4");

  let calculate = Math.round(h4.innerHTML * 9) / 5 + 32;
  h4.innerHTML = calculate;
}

let fahrenheit = document.querySelector(".link");
fahrenheit.addEventListener("click", changeDegree);
changeDegree();
