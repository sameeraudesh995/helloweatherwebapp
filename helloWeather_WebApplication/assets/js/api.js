const epoch = Math.round(Date.now()/1000);

    fetch('https://api.weatherapi.com/v1/history.json?key='+WEATHER_API_KEY+'&q='+location+'&unixdt='+(epoch-604800)+'&unixend_dt='+(epoch-86400))
      .then(response => {
        if (response.ok) {
            return response.json();
        }
      })

      .then(json => {
        historyData=json;    
        for(var i=0; i<7; i++){
            $(".history-day"+(i+1)).text(json.forecast.forecastday[i].date);
            $(".history-condition-text"+(i+1)).text(json.forecast.forecastday[i].day.condition.text);
            $(".history-temp"+(i+1)).text(json.forecast.forecastday[i].day.avgtemp_c+" °C");
            $(".history-humidity"+(i+1)).text(json.forecast.forecastday[i].day.avghumidity+" %");
        }        
      })
      .catch(error =>{
        
        
      })