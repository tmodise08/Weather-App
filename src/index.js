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
let minutes = now.getMinutes();

let h2 = document.querySelector(".h2");

h2.innerHTML = `${day} ${time}:${minutes}`;

function form(event) {
  event.preventDefault();
  let input = document.querySelector(".input");
  let h3 = document.querySelector("h3");
  h3.innerHTML = input.value;

  let apiKey = "1a46c2ddb4f23a0843f1e06f7ae609ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
  console.log(apiKey);
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemp);
}
let click = document.querySelector("form");

click.addEventListener("submit", form);

function showTemp(response) {
  let h4 = document.querySelector("h4");
  h4.innerHTML = response.data.main.temp;
}
