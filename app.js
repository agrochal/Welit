console.log("Welcome to Welit!\n");
console.log("Type 'exit' instead of the city to stop the program.\n");

const config = require('./config');
const fetch = require('node-fetch');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getInput() {
  rl.question('Weather for which city do you want to know? ', (answer) => {
    if (answer == "exit") {
      rl.close();
    } else {
      getData(answer);
    }
  });
}

getInput();

function getData(city) {
  const reg = /^[A-Za-z]+$/;
  if ((city.replace(/ /g, "")).match(reg)) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${config.api}`;
    getWeather(city, url);
  } else {
    console.log("\nEnter a valid city name!\n");
    getInput();
  }
}

function getWeather(city, url) {
  fetch(url)
    .then(function(u) {
      return u.json();
    }).then(
      function(json) {
        if (json.cod == 200) {
          console.log(`\n${city} | Temp: ${json.main.temp}°C | ${json.weather[0].main}\n`);
          getInput();
        } else {
          console.log("\nEnter a valid city name!\n");
          getInput();
        }
      }
    )
}
