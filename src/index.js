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

  let apiKey = "1a46c2ddb4f23a0843f1e06f7ae609ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemp);
}
let click = document.querySelector("form");

click.addEventListener("submit", form);

function showTemp(response) {
  let h4 = document.querySelector("h4");
  let temp = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  h4.innerHTML = `${temp}℃`;
  description.innerHTML = response.data.weather[0].description;
}
