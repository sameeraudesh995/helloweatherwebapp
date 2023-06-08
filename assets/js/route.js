//update weather history

var historydata = document.getElementById("btn");

historydata.addEventListener("click", function() {
    var historyName = document.getElementById("textField").value; 
    GetHistoryInfo(historyName);
});

function GetHistoryInfo(historyName) {
    var apiKey = 'ff14f746f028478188583111231405'; 
    var epoch = Math.floor(Date.now() / 1000); 

    fetch('https://api.weatherapi.com/v1/history.json?key=' + apiKey + '&q=' + historyName + '&unixdt=' + (epoch - 604800) + '&unixend_dt=' + (epoch - 86400))
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < 7; i++) {
                $("#historyTemp" + (i + 1)).text((data.forecast.forecastday[i].day.avgtemp_c).toFixed(0) + "°C");
            
                $("#historyDate"+(i+1)).text(data.forecast.forecastday[i].date);
                $("#historyWind"+(i+1)).text((data.forecast.forecastday[i].day.maxwind_kph).toFixed(0)+"km/h");
                $("#historyImg" + (i + 1)).attr("src", "https:" + data.forecast.forecastday[i].day.condition.icon);

                
            }
        })
        .catch(error => {
            
            // console.error('Error:', error);
        });
}



  
  
  
