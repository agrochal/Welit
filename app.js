console.log("Welcome to Welit!\n");
console.log("Type 'exit' instead of city to stop the program\n");

const config = require('./config');
const fetch = require('node-fetch');
const readline = require('readline');

let jsondata;

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
      var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + config.api;
      getWeather(city, url);
   } else {
      console.log("\nEnter valid city name!\n");
      getInput();
   }
}


function getWeather(city, url) {
   fetch(url)
      .then(function(u) {
         return u.json();
      }).then(
         function(json) {
            jsondata = json;
            if (jsondata.cod == 200) {
               var weather = '';
               for (let i = 0; i < jsondata.weather.length; i++) {
                  weather += jsondata.weather[i].main + " ";
                  if (i == jsondata.weather.length - 1) {
                     console.log("\n" + city + ' | Temp: ' + jsondata.main.temp + '°C | ' + weather + '\n');
                     getInput();
                  }
               }
            } else {
               console.log("\nEnter valid city name!\n");
               getInput();
            }
         }
      )
}
