const btn = $("#btn");
const textFeild = $("#textField");
const currentTemp = $("#currentTemp");
const currentdate=$("#currentdate")
const lc = $("#lc");
const country = $("#country");
const iconCurrent = $("#icon1");
const currentText = $("#currentText")

// air Quality
const air1 = $("#air1");
const air2 = $("#air2");
const air3 = $("#air3");
const air4 = $("#air4");

const sunrise1 =$("#sunrise1");
const sunset2 =$("#sunset2");

const humidity=$("#humidity");
const pressure=$("#pressure");
const visibility=$("#visibility");
const feelLike=$("#feel_like");

const day1 =$("#day1");
const day2 =$("#day2");
const day3 =$("#day3");
const day4 =$("#day4");
const day5 =$("#day5");




btn.click(function(){

    var searchLocation =textFeild.val();

    $.ajax({
        url: `http://api.weatherapi.com/v1/forecast.json?q=${searchLocation}&key=ff14f746f028478188583111231405&aqi=yes`,
        method : "GET",

        success : function (resp){
            console,console.log(resp);
            lc.text(resp.location.name);
            country.text(resp.location.country);
            currentTemp.text(Math.round((resp.current.temp_c)));
            currentdate.text( resp.current.last_updated);
            currentText.text(resp.current.condition.text);

            // ait quality
            air1.text(Math.round(( resp.current.air_quality.co)));
            air2.text( Math.round((resp.current.air_quality.no2)));
            air3.text(Math.round((resp.current.air_quality.o3)));
            air4.text( Math.round((resp.current.air_quality.so2)));

            sunset2.text(resp.forecast.forecastday[0].astro.sunrset);
            sunrise1.text(resp.forecast.forecastday[0].astro.sunrise);

            humidity.text(resp.current.humidity);
            pressure.text(resp.current.pressure_mb);
            visibility.text(resp.current.vis_km);
            feelLike.text(resp.current.feelslike_c);
           
            day1.text(resp.forecast.forecastday[1].day.avgtemp_c);


        },
        error : function (error){
            
        }
   
    });

    
});

