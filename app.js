const app = document.querySelector(".weather");
const temp = document.querySelector(".weather__temp");
const nameOutput = document.querySelector(".weather__city--name");
const timeOutput = document.querySelector(".weather__city--time");
const dateOutput = document.querySelector(".weather__city--date");
const icon = document.querySelector(".weather__card--icon");
const conditionOutput = document.querySelector(".weather__card--condition");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.querySelector(".weather__panel--form");
const search = document.querySelector(".weather__panel--search");
const button = document.querySelector(".weather__panel--button");
const cities = document.querySelectorAll(".weather__panel--city");

let cityInput = "London"; //this is default city

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;

    fetchWeatherData();
    app.style.opacity = "0";
  });
});

form.addEventListener("submit", (e) => {
  if (search.value.length === 000) {
    //If the input field is empty, throw an alert
    alert("Please, type a city name");
  } else {
    cityInput = search.value;

    fetchWeatherData();
    search.value = ""; //Remove all text from the input field
    app.style.opacity = "0";
  }
  e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${year}-${month}-${day}`).getDay()];
}

function fetchWeatherData() {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=4d501754783a4e85bb541613221605&q=${cityInput}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      temp.innerHTML = data.current.temp_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;

      const date = data.location.localtime;
      console.log(date);
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
      timeOutput.innerHTML = time;

      nameOutput.innerHTML = data.location.name;

      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64".length
      );
      console.log(iconId);
      icon.src = "./icons/" + iconId;

      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      let timeOfDay = "day";
      const code = data.current.condition.code; //Get unique id for each weather condition

      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      if (code === 1000) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
        button.style.background = "#e5ba92";
        if (timeOfDay === "night") {
          button.style.background = "#181e27";
        }
      } else if (
        code === 1003 ||
        code === 1006 ||
        code === 1009 ||
        code === 1030 ||
        code === 1069 ||
        code === 1087 ||
        code === 1135 ||
        code === 1273 ||
        code === 1276 ||
        code === 1279 ||
        code === 1282
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
        button.style.background = "#fa6d1b";
        if (timeOfDay === "night") {
          button.style.background = "#181e27";
        }
      } else if (
        code === 1063 ||
        code === 1069 ||
        code === 1072 ||
        code === 1150 ||
        code === 1153 ||
        code === 1180 ||
        code === 1183 ||
        code === 1186 ||
        code === 1189 ||
        code === 1192 ||
        code === 1195 ||
        code === 1204 ||
        code === 1207 ||
        code === 1240 ||
        code === 1243 ||
        code === 1246 ||
        code === 1249 ||
        code === 1252
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
        button.style.background = "#647d75";
        if (timeOfDay === "night") {
          button.style.background = "#325c80";
        }
      } else {
        app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
        button.style.background = "#4d72aa";
        if (timeOfDay === "night") {
          button.style.background = "#1b1b1b";
        }
      }
      app.style.opacity = "1";
    })
    .catch(() => {
      alert("City not found, please try again");
      app.style.opacity = "1";
    });
}

fetchWeatherData();
app.style.opacity = "1";
