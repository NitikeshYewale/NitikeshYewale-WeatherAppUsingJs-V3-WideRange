
const searchBox = document.querySelector("input");
const searchBtn = document.querySelector("button");
const weatherIcon = document.querySelector(".weather-icon");


const apiUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const key = "44QHSCQEF2DFVGWHACA6VQSUX";

async function checkWeather(city) {
    //for Current weather

    const response = await fetch(apiUrl + city + "?unitGroup=metric&include=days%2Ccurrent&key="+key+"&contentType=json");
    var data = await response.json();

    console.log(data);
    document.querySelector(".weatherIcon h2").innerHTML = data.currentConditions.conditions + " " + Math.round((data.currentConditions.temp)) + "°C";
    document.querySelector(".desc strong").innerHTML = data.resolvedAddress;


    //for requested City date and time
    let d = new Date();
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset
    var cityDate = utc + (data.tzoffset * 60 * 60000);
    let showCityDate = new Date(cityDate);
    var sym = "";
    if (data.tzoffset > 0) sym = "+";

    document.querySelector(".date").innerHTML = showCityDate.toDateString() + " " + showCityDate.toTimeString().substring(0, 9) + " <br>GMT" + sym + data.tzoffset + " (" + data.timezone + ")";

    //for current user date
    var sysDate = new Date().toString();
    document.querySelector(".systemDate").innerHTML = "" + sysDate.substring(0, 24) + "<br>" + sysDate.substring(24,);//.toDateString() + " " + new Date().toTimeString().substring(0, 9)+" <br>("+new Date().toTimeString().substring(19,new Date().toTimeString().length-1)+")";

    document.querySelector(".description").innerHTML = data.days[0].description;

    document.querySelector(".hu").innerHTML = data.currentConditions.humidity + "%";

    document.querySelector(".wind h2").innerHTML = data.currentConditions.windspeed + "km/hr";

    weatherIcon.src = "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/2nd%20Set%20-%20Color/" + data.currentConditions.icon + ".svg";//console.log(weatherIcon.src);

    //for 7 days weather forecast

    var x = 1;
    var previousDate = 0;
    for (i = 0; i < 16; i++) {

        document.getElementById("date" + x).innerHTML = new Date(data.days[i].datetimeEpoch * 1000).toDateString();
        document.getElementById("img" + x).src = "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/2nd%20Set%20-%20Color/" + data.days[i].icon + ".svg";
        let ls = data.days[i];
        document.getElementById("temp" + x).innerHTML = Math.round(Math.min(ls.feelslike, ls.feelslikemax, ls.feelslikemin, ls.temp, ls.tempmin, ls.tempmax)) + "°C / " + Math.round(Math.max(ls.feelslike, ls.feelslikemax, ls.feelslikemin, ls.temp, ls.tempmin, ls.tempmax)) + "°C";
        document.getElementById("desc" + x).innerHTML = data.days[i].conditions;
        x++;
        if (x > 7) break;



    }
    console.log(document.getElementById("app").innerText);

    sendMail(city);
   

}




searchBtn.addEventListener("click", () => {
    var cName=searchBox.value.trim();
    checkWeather(cName);
    
});


//for enter key event
searchBox.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        var cName=searchBox.value.trim();
        checkWeather(cName);
        
    }
})









