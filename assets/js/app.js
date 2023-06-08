const btn = $("#btn");
const textFeild = $("#textField");
const currentTemp = $("#currentTemp");
const currentdate = $("#currentdate");
const lc = $("#lc");
const country = $("#country");
const iconCurrent = $("#icon1");
const currentText = $("#currentText");

// air Quality
const air1 = $("#air1");
const air2 = $("#air2");
const air3 = $("#air3");
const air4 = $("#air4");

const sunrise1 = $("#sunrise1");
const sunset2 = $("#sunset2");

const humidity = $("#humidity");
const pressure = $("#pressure");
const visibility = $("#visibility");
const feelLike = $("#feel_like");

const day1 = $("#day1");
const day2 = $("#day2");
const day3 = $("#day3");
const day4 = $("#day4");
const day5 = $("#day5");

//Current weather details and hourly forecast wether details

btn.click(function () {
  var searchLocation = textFeild.val();

  GetWeather(searchLocation);
});
  function GetWeather(searchLocation){
    
  $.ajax({
    url: `https://api.weatherapi.com/v1/forecast.json?q=${searchLocation}&key=ff14f746f028478188583111231405&aqi=yes`,
    method: "GET",

    success: function (resp) {
      console, console.log(resp);
      lc.text(resp.location.name);
      country.text(resp.location.country);
      currentTemp.text(Math.round(resp.current.temp_c));
      currentdate.text(resp.current.last_updated);
      currentText.text(resp.current.condition.text);

      // ait quality
      air1.text(Math.round(resp.current.air_quality.co));
      air2.text(Math.round(resp.current.air_quality.no2));
      air3.text(Math.round(resp.current.air_quality.o3));
      air4.text(Math.round(resp.current.air_quality.so2));

      sunset2.text(resp.forecast.forecastday[0].astro.sunrset);
      sunrise1.text(resp.forecast.forecastday[0].astro.sunrise);

      humidity.text(resp.current.humidity);
      pressure.text(resp.current.pressure_mb);
      visibility.text(resp.current.vis_km);
      feelLike.text(Math.round(resp.current.feelslike_c));

      document.getElementById("imgmain").src =
        "http:" + resp.current.condition.icon;

      for (let i = 0; i < 24; i += 3) {
        document.getElementById("hourlyTemp" + i).innerHTML = 
        Number(resp.forecast.forecastday[0].hour[i].temp_c).toFixed(0) + "°C";

        document.getElementById("hourlyimg" + i).src =
          "http:" + resp.forecast.forecastday[0].hour[i].condition.icon;
        document.getElementById("hourlywind" + i).innerHTML =
          Number(resp.forecast.forecastday[0].hour[i].wind_kph).toFixed(0) +
          "km/h";
      }
       
    },
    error: function (error) {},
  });
}

//forcaste weather details

var myIcon = document.getElementById("btn");

myIcon.addEventListener("click", function () {
  var newName = document.getElementById("textField");
  GetInfo(newName);
});

function GetInfo(newName) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" +newName.value +"&appid=997de838f7807adb42f8d2ed9d53369f")
    .then((response) => response.json())
    .then((data) => {
      //Getting Temp
      for (var i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1)).innerHTML =
          Number(data.list[i + 1].main.temp - 273.15).toFixed(1) + "°c";

        document.getElementById("currentwind" + (i + 1)).innerHTML = Number(data.list[i + 1].wind.speed * 3.6).toFixed(0);
      }

      for (i = 0; i < 5; i++) {
        document.getElementById("img" + (i + 1)).src =
          "https://openweathermap.org/img/wn/" +data.list[i + 1].weather[0].icon +".png";
      }

      console.log(data);
    })

    .catch((err) =>
      alert("Something Went Wrong: Try Checking Your Internet Coneciton")
    );
}

//Display Days
function DefaultScreen() {
  document.getElementById("cityInput").defaultValue = "London";
  getInfoFromGeolocation();
}

//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//Function to get the correct integer for the index of the days array
function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

for (var i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1) + "day").innerHTML =
    weekday[CheckDay(i + 1)];
}

  
