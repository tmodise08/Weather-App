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
showForecast();

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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.longitude}&lat=${coordinates.latitude}}&key=${apiKey}}&units=metric`;
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

function changeDegree(event) {
  event.preventDefault();
  let h4 = document.querySelector("h4");

  let calculate = Math.round(h4.innerHTML * 9) / 5 + 32;
  h4.innerHTML = calculate;
}

let fahrenheit = document.querySelector(".link");
fahrenheit.addEventListener("click", changeDegree);
changeDegree();

function showForecast(response) {
  console.log(response);
  let forecast = document.querySelector("#cardRow");
  let days = ["Sat", "Sun", "Mon"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
        <div class="col-2">
          <div class="card" style="width: 5rem">
            <h5 class= "cardTitle">${day}</h5>
            <img class ="cardImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACHCAMAAAALObo4AAAAY1BMVEX///8AAAD7+/tGRkZkZGTT09PY2Ni3t7fLy8vx8fGPj4/r6+vf39+BgYHCwsLQ0NBbW1uVlZVsbGx7e3tRUVGsrKwcHBwqKipBQUE5OTkTExOlpaUNDQ0hISFzc3Obm5syMjIxwgAaAAACdElEQVR4nO2Y25KCMBBEGe7hEpGAoCD6/1+5Ca4uq6i4tRNe+rxBpUgzmelM4jgAAAAAAAAAAAAAAAAAAFgZlYu1JRgComhtDYaOKF5nZpEPk6ecmnQdHRFRcntwC/LWkeGIlmhze1KUr6TDiYnaW424sbuWDmd7yU0RSCnjNat20AkSlvsDac5FdI2IKLzQshLh0w/epXLljuhkV8bGTF9uZRB3Ss8+5qpRVlpepURPeV2CdHsRQtTXtnM2VVMzj3uizomU7eR4ID1OLYUfkWZBmM7kgLaUypqKULVjebTq8d8LIkvbTOBNKrW932M3002Hk1rPfqgS7aBJZSr1zijclnwbxWJq07/WQ1bSw+/71FjwjpMOhpw8x8d7IQkd+BMk0/8fvn5jRYe27Prule6GimlClGZdasmqJdQu/vAy/92YeuSPSURVxqZDET1+PDO7Wiq+kzPodb5EY03fR+7/8H4vwQXXp77pmyoZTU1HJ9CBk13BFg8R7WY9ans1tSYwK7dnmv6buDz387FO95XKh6o3XuIxn2JEefnlF5tpmI8jWLv2se3yu+j1kmfa5wtOGanp9BakXdhQz1etjlsRqUUjJdHwftRfqZd/faAdW0Bcj45LbVoy3j5oi1xcBC5jwUSfeMKOr2JOn7ScDV+frM9Kyzusni8e9dwu+wTB2CbLD7ZwrVm+H/U30mZuu59FOx7jLdmw2BROrKcX3XEdgyUDdYWfORtTc1pYIKQj7jtUZTbclzdgblab0x33lfLY++2957RHc0XGf6MctPSWxMplVNap0n+KSth8Ywb3KRZFAAAAAAAAAAAAAAAAAABr8gWiwBV6c+IVPgAAAABJRU5ErkJggg==" alt="">
          </div>
          </div>
          `;
  });

  forecastHTML = forecastHTML + `</div`;
  forecast.innerHTML = forecastHTML;
}
